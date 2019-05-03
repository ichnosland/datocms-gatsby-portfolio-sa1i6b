import React from 'react';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'js-cookie';

import { setAuthorizationToken, createAuthorizationHeader } from 'common/authorization';
import { API_BASE_PATH } from 'configuration';
import { getCookieName, calculateHints, cookieSet } from 'common/cookies';
import { corsiListInitialize, corsiReset } from 'containers/Corsi/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { livelliReset } from 'containers/Dashboard/actions';
import Page from 'components/Page';
import Container from 'components/Container';
import HtmlInjector from 'components/NewListPanels/HtmlInjector';

import {
  USER_FETCH_DATA,
  USER_URL_LOGIN_ENDPOINT,
  USER_URL_LOGOUT_ENDPOINT,
  USER_URL_LOGOUT_ALL_ENDPOINT,
  USER_URL_LOGIN_FACEBOOK_ENDPOINT,
  USER_URL_CODICE_SBLOCCO,
  USER_URL_REGISTER_POST,
  USER_URL_REGISTER_COMPLETE_POST,
  USER_URL_CHANGE_PASSWORD,
  USER_URL_RESET_PASSWORD,
  USER_URL_CONFIRM_NEW_PASSWORD,
  USER_URL_NOTIFICHE,

  USER_CODICE_SBLOCCO_FETCH,
  USER_URL_RESUME_ENDPOINT,
  USER_RESUME_TRIGGER,
  USER_EVALUATE_TRIGGER,
  USER_LOGOUT_TRIGGER,
  USER_REGISTER_POST,
  USER_REGISTER_COMPLETE_POST,
  USER_HINT_DISPLAY,
  USER_CHANGE_PASSWORD_POST,
  USER_RESET_PASSWORD_POST,
  USER_CONFIRM_NEW_PASSWORD_POST,
  USER_NOTIFICHE_FETCH,
} from './constants';
import {
  userSpinnerSet,
  userDataSet,
  userDataFetch,
  userCodiceSbloccoFetch,
  userErrorSet,
  userErrorClean,
  userLogoutSet,
  userResumeTrigger,
  userLogoutTrigger,
  userNotificheFetch,
} from './actions';


/**
 * Dato in input un oggetto contenente i dati
 * dell'utente, valuta se l'utente può essere
 * riloggato tramite cookie o deve effettuare il
 * login
 * @param {Object} data configuration data
 * @param {Object} data.configuration configurazione dell'app
 * @param {Function} data.dispatch funzione di dispatch
 */
export function* userEvaluate(data) {
  yield put(userDataSet({
    authentication: {
      isUpdating: true,
      isDataSynced: false,
    },
  }));

  yield put(userSpinnerSet(true));
  yield put(userErrorClean());

  const token = getCookieName(`authorizationToken_${data.configuration.product}`);
  if (token) {
    setAuthorizationToken(token);
    yield put(userResumeTrigger({
      configuration: data.configuration,
      dispatch: data.dispatch,
    }));
  } else {
    yield put(userDataSet({
      authentication: {
        isUpdating: false,
        isDataSynced: true,
      },
      appData: {
        hints: calculateHints(
          data.configuration.enabledHints,
          `${data.configuration.product}_0`
        ),
      },
    }));
  }

  yield put(userSpinnerSet(false));
}


/**
 * Effettua il resume dei dati dell'utente chiamando
 * l'endpoint che restituisce le sue info. Lo chiamo
 * quando ho salvato localmente il token di accesso
 * @param {Object} data
 * @param {Object} data.payload
 * @param {Object} data.payload.configuration configurazione dell'applicazione
 * @param {Object} data.payload.dispatch funzione di dispatch
 */
export function* userResume(data) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${USER_URL_RESUME_ENDPOINT}`, {
        params: {
          disciplina: data.payload.configuration.disciplinaId,
        },
      }
    );

    yield put(userDataSet({
      anagraphics: response.data,
      authentication: {
        logged: true,
        status: response.data.studenteAcademy.status,
        isUpdating: false,
        isDataSynced: true,
      },
      appData: {
        docente: response.data.studenteAcademy.docente,
        hints: calculateHints(
          data.payload.configuration.enabledHints,
          `${data.payload.configuration.product}_${response.data.id}`
        ),
        enableSuoni: getCookieName(
          `enableSounds_${data.payload.configuration.product}_${response.data.id}`, 'true'
        ),
      },
    }));

    if (data.payload.configuration.hasPremium && !response.data.studenteAcademy.docente) {
      yield put(userCodiceSbloccoFetch(data.payload.configuration.disciplinaId));
    }
    if (data.payload.configuration.hasClassi) {
      yield put(corsiListInitialize(
        data.payload.configuration,
        response.data.studenteAcademy.docente,
        response.data.studenteAcademy.id
      ));
    }

    yield put(userNotificheFetch({
      disciplinaId: data.payload.configuration.disciplinaId,
      product: data.payload.configuration.product,
      userId: response.data.studenteAcademy.id,
      dispatch: data.payload.dispatch,
    }));
  } catch (error) {
    yield put(userErrorSet(true, 'La tua sessione è scaduta, effettua di nuovo il login', {}));
    yield put(userDataSet({
      authentication: {
        isUpdating: false,
        isDataSynced: true,
      },
      appData: {
        hints: calculateHints(
          data.payload.configuration.enabledHints,
          `${data.payload.configuration.product}_0`
        ),
      },
    }));
  }
}

export function* checkCodiceSblocco(payload) {
  yield put(userErrorClean());
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${USER_URL_CODICE_SBLOCCO}`, {}
    );

    const codiciSbloccati = response.data.filter(
      (item) => item.disciplina === payload.disciplinaId
    );

    yield put(userDataSet({
      authentication: {
        codiceSbloccato: codiciSbloccati.length > 0,
        codiceDaSbloccare: codiciSbloccati.length === 0,
      },
      appData: {
        premiumDataScadenza: codiciSbloccati.length > 0 ?
          codiciSbloccati.sort((a, b) => {
            if (a.fine_sblocco < b.fine_sblocco) {
              return 1;
            }
            if (a.fine_sblocco > b.fine_sblocco) {
              return -1;
            }

            return 0;
          })[0].fine_sblocco :
          undefined,
      },
    }));
  } catch (error) {
    yield put(userErrorSet(true, 'Impossibile attivare il codice di sblocco', error));
  }
}


/**
 * Effettua il login dell'utente tramite username e password o tramite fbtoken
 * @param {Object} payload
 * @param {Boolean} payload.isFacebook indica se ci si sta loggando con facebook
 * @param {Object} payload.loginData dati dell'utente da usare nel login
 * @param {String} payload.loginData.email email dell'utente
 * @param {String} payload.loginData.password password utente
 * @param {String} payload.loginData.fbuid id utente di facebook
 * @param {String} payload.loginData.fbname nome utente di facebook
 * @param {Object} payload.configuration file di configurazione dell'app
 * @param {Number} payload.configuration.disciplinaId ID disciplina
 * @param {String} payload.configuration.product nome del prodotto
 * @param {Object} payload.history history dell'app
 * @param {Function} payload.dispatch funzione di dispatch
 */
export function* loadUserData(payload) {
  yield put(userErrorClean());
  yield put(userSpinnerSet(true));
  let password = payload.loginData.password;
  let authToken;

  try {
    let response;
    if (payload.isFacebook) {
      response = yield call(
        axios.post,
        `${API_BASE_PATH}${USER_URL_LOGIN_FACEBOOK_ENDPOINT}`, {
          email: payload.loginData.email,
          fbname: payload.loginData.fbname,
          fbuid: payload.loginData.fbuid,
          fbtoken: payload.loginData.fbtoken,
          register: payload.loginData.register,
          disciplina: payload.configuration.disciplinaId,
        },
      );

      const fbHeader = createAuthorizationHeader(
        payload.loginData.email, response.data.fbhash
      );
      authToken = `Basic ${fbHeader}`;
      password = response.data.fbhash;
    } else {
      const authHeader = createAuthorizationHeader(payload.loginData.email, password);
      response = yield call(
        axios.post,
        `${API_BASE_PATH}${USER_URL_LOGIN_ENDPOINT}`, {
          disciplina: payload.configuration.disciplinaId,
        }, {
          headers: {
            Authorization: `Basic ${authHeader}`,
          },
        }
      );
      authToken = `Token ${response.data.token || ''}`;
    }

    const userData = response.data.user;
    setAuthorizationToken(authToken);

    yield put(userDataSet({
      anagraphics: userData,
      authentication: {
        logged: true,
        authorizationToken: authToken,
        status: userData.studenteAcademy.status,
      },
      appData: {
        docente: userData.studenteAcademy.docente,
        hints: calculateHints(
          payload.configuration.enabledHints,
          `${payload.configuration.product}_${response.data.id}`
        ),
        enableSuoni: getCookieName(
          `enableSounds_${payload.configuration.product}_${response.data.id}`, 'true'
        ),
      },
    }));

    if (payload.configuration.hasPremium && !userData.studenteAcademy.docente) {
      yield put(userCodiceSbloccoFetch(payload.configuration.disciplinaId));
    }

    yield call(cookieSet, {
      cookieKey: `authorizationToken_${payload.configuration.product}`,
      payload: authToken,
    });

    if (payload.configuration.hasClassi) {
      yield put(corsiListInitialize(
        payload.configuration,
        userData.studenteAcademy.docente,
        userData.studenteAcademy.id
      ));
    }

    yield put(userNotificheFetch({
      disciplinaId: payload.configuration.disciplinaId,
      product: payload.configuration.product,
      userId: userData.studenteAcademy.id,
      dispatch: payload.dispatch,
    }));

    yield call(payload.history.push, payload.configuration.homePage);
  } catch (error) {
    const { response: { status = 0 } = { status: 0 } } = error;
    let msg = 'Impossibile effettuare il login';

    if (status === 401) {
      msg = 'Email e/o password errati';
    }
    yield put(userErrorSet(true, msg, error.response));
  }
  yield put(userDataSet({
    authentication: {
      isUpdating: false,
      isDataSynced: true,
    },
  }));
  yield put(userSpinnerSet(false));
}

/**
 * Effettua il logout dell'utente permettendo di sceglere tra
 * logout semplice (logoutAll == false) o di tutti i token creati
 * (logoutAll == true)
 * @param {Object} data
 * @param {Object} data.payload payload
 * @param {Object} data.payload.configuration configurazione dell'applicazione
 * @param {Object} data.payload.configuration.product nome del prodotto
 * @param {Boolen} data.payload.configuration.hasClassi indica se l'utente ha classi
 * @param {Boolen} data.payload.logoutAll effettua reset di tutti i token
 */
export function* userLogout(data) {
  yield put(userSpinnerSet(true));
  try {
    const url = data.payload.logoutAll ?
      `${API_BASE_PATH}${USER_URL_LOGOUT_ALL_ENDPOINT}` :
      `${API_BASE_PATH}${USER_URL_LOGOUT_ENDPOINT}`;
    yield call(axios.post, url);
  } /* istanbul ignore next */ catch (_) { /* non gestisco */ }

  yield put(userLogoutSet());
  yield call(Cookies.remove, `authorizationToken_${data.payload.configuration.product}`);
  yield call(setAuthorizationToken, '');
  yield call(data.payload.history.push, '/login');
  yield put(userSpinnerSet(false));
  yield put(livelliReset());
  if (data.payload.configuration.hasClassi) {
    yield put(corsiReset());
  }
}

/**
 * Effettua la registrazione dell'utente
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.username
 * @param {string} data.payload.email
 * @param {string} data.payload.password
 * @param {object} data.payload.configuration
 * @param {object} data.payload.configuration.disciplinaId
 * @param {object} data.payload.history
 */
export function* userRegisterPostSaga(data) {
  yield put(userErrorClean());
  yield put(userSpinnerSet(true));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${USER_URL_REGISTER_POST}`, {
        email: data.payload.email,
        password: data.payload.password,
        username: data.payload.username,
        disciplina: data.payload.configuration.disciplinaId,
      }
    );

    if (response.status === 201) {
      yield put(userDataFetch(
        {
          email: data.payload.email,
          password: data.payload.password,
        },
        data.payload.configuration,
        data.payload.history,
        false
      ));
    } else {
      yield put(userErrorSet(true, 'Impossibile effettuare la registrazione'));
    }
  } catch (error) {
    if ([406, 409].indexOf(((error || {}).response || {}).status) > -1) {
      yield put(userErrorSet(true, 'L\'indirizzo email inserito è già registrato'));
    } else {
      yield put(userErrorSet(true, 'Impossibile effettuare la registrazione'));
    }
  }

  yield put(userSpinnerSet(false));
}


/**
 * Esegue l'aggiornamento del profilo utente inserendo
 * nome e cognome
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.nome
 * @param {string} data.payload.cognome
 * @param {object} data.payload.configuration
 * @param {object} data.payload.history
 */
export function* userRegisterCompletePostSaga(data) {
  yield put(userErrorClean());
  yield put(userSpinnerSet(true));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${USER_URL_REGISTER_COMPLETE_POST}`, {
        disciplina: data.payload.configuration.disciplinaId,
        nome: data.payload.nome,
        cognome: data.payload.cognome,
      }
    );

    if (response.status === 200) {
      yield put(userDataSet({
        anagraphics: {
          first_name: response.data.nome,
          last_name: response.data.cognome,
        },
        authentication: {
          logged: true,
          status: 'E',
          isUpdating: false,
          isDataSynced: true,
          codiceDaSbloccare: data.payload.configuration.hasPremium,
        },
        appData: {
          hints: calculateHints(
            data.payload.configuration.enabledHints,
            `${data.payload.configuration.product}_${response.data.id}`
          ),
          enableSuoni: true,
        },
      }));

      yield call(data.payload.history.push, data.payload.configuration.homePage);
    } else {
      yield put(userErrorSet(true, 'Impossibile completare la registrazione'));
    }
  } catch (error) {
    yield put(userErrorSet(true, 'Impossibile completare la registrazione', error.response));
  }

  yield put(userSpinnerSet(false));
}


/**
 * Mostra, se presente e se non è già stato visualizzato,
 * un hint dato all'utente, permettendogli di disabilitarne
 * visualizzazioni future
 * @param {object} data data del saga
 * @param {object} data.payload payload inviato
 * @param {object} data.payload.hintToDisplay dati dell'hint da mostrare
 * @param {number} data.payload.userId pk dell'utente
 * @param {number} data.payload.product nome del product app in uso
 * @param {object} data.payload.userHints hints dell'utente attivi
 * @param {function} data.payload.dispatch funzione di dispatch
 */
export function* userHintDisplaySaga(data) {
  const hintToDisplay = data.payload.hintToDisplay;

  if (hintToDisplay) {
    yield put(modalSetData({
      contenuto: hintToDisplay.contenuto,
      image: hintToDisplay.image,
      closeButton: {
        text: 'Ok',
        onClick: () => {
          const cookieKey = `${hintToDisplay.nome}_${data.payload.product}_${data.payload.userId}`;
          cookieSet({ cookieKey, payload: 'false' });
          data.payload.dispatch(userDataSet({
            appData: {
              hints: {
                ...data.payload.userHints,
                [hintToDisplay.nome]: false,
              },
            },
          }));
          data.payload.dispatch(modalSetEmptyData());
        },
      },
      show: true,
    }));
  }
}

/**
 * Esegue il reset della password per l'utente loggato
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.new_password1
 * @param {string} data.payload.new_password2
 * @param {object} data.payload.old_password
 * @param {object} data.payload.history
 * @param {object} data.payload.configuration
 */
export function* userChangePasswordSaga(data) {
  yield put(userErrorClean());
  yield put(userSpinnerSet(true));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${USER_URL_CHANGE_PASSWORD}`, {
        new_password1: data.payload.new_password1,
        new_password2: data.payload.new_password2,
        old_password: data.payload.old_password,
      }
    );

    if (response.status === 200) {
      yield put(userErrorSet(true, 'La tua password è stata resettata correttamente. Inserisci la nuova password per collegarti', {}, 'okay'));
      yield put(userLogoutTrigger({
        configuration: data.payload.configuration,
        history: data.payload.history,
      }));
    } else {
      yield put(userErrorSet(true, 'Non è stato possibile cambiare la password'));
    }
  } catch (error) {
    yield put(userErrorSet(true, 'Non è stato possibile cambiare la password', error.response));
  }

  yield put(userSpinnerSet(false));
}


/**
 * Esegue il reset della password
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.email
 * @param {object} data.payload.disciplina
 */
export function* userResetPasswordSaga(data) {
  yield put(userErrorClean());
  yield put(userSpinnerSet(true));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${USER_URL_RESET_PASSWORD}`, {
        email: data.payload.email,
        disciplina: data.payload.disciplina,
      }
    );

    if (response.status === 200) {
      yield put(userErrorSet(true, 'Ti è stata inviata una mail con le istruzioni per il reset della password', {}, 'okay'));
    } else {
      yield put(userErrorSet(true, 'Non è stato possibile resettare la password'));
    }
  } catch (error) {
    yield put(userErrorSet(true, 'Non è stato possibile resettare la password', error.response));
  }

  yield put(userSpinnerSet(false));
}


/**
 * Esegue la conferma della nuova password
 * @param {object} data
 * @param {object} data.payload
 * @param {string} data.payload.new_password1
 * @param {string} data.payload.new_password2
 * @param {string} data.payload.uid
 * @param {string} data.payload.token
 * @param {object} data.payload.configuration
 * @param {object} data.payload.history
 */
export function* userConfirmNewPasswordSaga(data) {
  yield put(userErrorClean());
  yield put(userSpinnerSet(true));

  try {
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}${USER_URL_CONFIRM_NEW_PASSWORD}`, {
        new_password1: data.payload.new_password1,
        new_password2: data.payload.new_password2,
        uid: data.payload.uid,
        token: data.payload.token,
      }
    );

    if (response.status === 200) {
      yield put(userErrorSet(true, 'La tua password è stata impostata correttamente. Inserisci la nuova password per collegarti', {}, 'okay'));
      yield put(userLogoutTrigger({
        configuration: data.payload.configuration,
        history: data.payload.history,
      }));
    } else {
      yield put(userErrorSet(true, 'Non è stato possibile salvare la nuova password'));
    }
  } catch (error) {
    yield put(userErrorSet(true, 'Non è stato possibile salvare la nuova password', error.response));
  }

  yield put(userSpinnerSet(false));
}


/**
 * Fa il fetch delle notifiche dell'utente e, se presenti
 * le mostra in un popup
 * @param {Object} data
 * @param {Object} data.payload
 * @param {Number} data.payload.disciplinaId pk della disciplina
 * @param {String} data.payload.product nome del prodotto
 * @param {Number} data.payload.userId pk utente
 */
export function* userNotificheFetchSaga(data) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}${USER_URL_NOTIFICHE}`, {
        params: {
          disciplina: data.payload.disciplinaId,
        },
      }
    );

    if (response.status === 200) {
      const cookieKey = `notifica_${data.payload.product}_${data.payload.userId}_${response.data.uuid}`;
      const haNotifiche = getCookieName(cookieKey, 'true');

      if (haNotifiche) {
        yield put(modalSetData({
          topbar: true,
          isPopup: false,
          bgcolor: 'transparent',
          titolo: response.data.titolo,
          contenuto: (
            <Page full>
              <Container>
                <HtmlInjector
                  text={response.data.testo}
                />
              </Container>
            </Page>
          ),
          closeButton: {
            text: 'Ok',
            onClick: /* istanbul ignore next */ () => {
              cookieSet({
                cookieKey,
                payload: 'false',
              });
              data.payload.dispatch(modalSetEmptyData());
            },
          },
          show: true,
        }));
      }
    }
  } catch (_) { /* non gestisco */ }
}

export function* watchUser() {
  yield takeEvery(USER_FETCH_DATA, loadUserData);
  yield takeEvery(USER_CODICE_SBLOCCO_FETCH, checkCodiceSblocco);
  yield takeEvery(USER_RESUME_TRIGGER, userResume);
  yield takeEvery(USER_EVALUATE_TRIGGER, userEvaluate);
  yield takeEvery(USER_LOGOUT_TRIGGER, userLogout);
  yield takeEvery(USER_REGISTER_POST, userRegisterPostSaga);
  yield takeEvery(USER_REGISTER_COMPLETE_POST, userRegisterCompletePostSaga);
  yield takeEvery(USER_HINT_DISPLAY, userHintDisplaySaga);
  yield takeEvery(USER_CHANGE_PASSWORD_POST, userChangePasswordSaga);
  yield takeEvery(USER_RESET_PASSWORD_POST, userResetPasswordSaga);
  yield takeEvery(USER_CONFIRM_NEW_PASSWORD_POST, userConfirmNewPasswordSaga);
  yield takeEvery(USER_NOTIFICHE_FETCH, userNotificheFetchSaga);
}
