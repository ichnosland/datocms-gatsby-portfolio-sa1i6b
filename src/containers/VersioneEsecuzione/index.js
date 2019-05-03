/**
 *
 * VersioneEsecuzione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  versioniVersioneAvanzamentoRisposteUtenteSet,
  versioniVersioneAvanzamentoRisposteUtentePost,
  versioniVersioneAvanzamentoNextTrigger,
  versioniVersioneEsecuzioneSvuotaTrigger,
} from 'containers/Versioni/actions';
import {
  checkIsRispostaSelezionata,
  cleanTesto,
  getIdsElementiEsercizio,
  creaTestoReadable,
  rappresentaSoluzioneTestuale,
  calcolaSoluzioni,
} from 'common/esercizi';
import { calcolaTraduzioneUtentePeriodo } from 'containers/Versioni/utils';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import ZendeskTicket from 'containers/ZendeskTicket';
import { FlexWrap } from 'components/FlexBox';
import LogoPlatform from 'components/LogoPlatform';
import Page from 'components/Page';
import VersionePeriodiTradotti from 'components/VersionePeriodiTradotti';
import Spinner from 'components/Spinner';
import { API_BASE_PATH } from 'configuration';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

export class VersioneEsecuzioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { versioneCaricata, history, versioneEsecuzione, configuration } = this.props;
    if (!versioneCaricata.isEsecuzioneLoaded || versioneEsecuzione.periodoCaricatoId === -1) {
      history.push(configuration.homePage);
    }
  }

  componentWillUnmount() {
    const {
      onEsecuzioneSvuota,
      versioneAvanzamento: {
        risposteFornite,
      },
      versioneCaricata: { periodi },
      history,
    } = this.props;

    onEsecuzioneSvuota({
      risposteFornite,
      periodi,
      history,
    });
  }

  helpFunction = () => {
    const {
      versioneCaricata,
      versioneEsecuzione,
      userAppData,
      onPostRispostaUtente,
      versioneAvanzamento,
    } = this.props;

    onPostRispostaUtente({
      versioneEsecuzione,
      isDocente: userAppData.docente,
      versioneAvanzamento,
      versioneCaricata,
      risposta: versioneAvanzamento.rispostaSelezionata,
      helpRequest: true,
      enableSuoni: userAppData.enableSuoni,
    });
  }

  selezionaRisposta = (data) => {
    const { onSetAvanzamento, versioneEsecuzione } = this.props;
    const stepCaricato = versioneEsecuzione.periodoCaricato[versioneEsecuzione.stepCaricatoKey];
    onSetAvanzamento({
      rispostaSelezionata: data,
      isCheckable: checkIsRispostaSelezionata(data, stepCaricato),
    });
  }

  proseguiAvanzamento = () => {
    const {
      versioneCaricata,
      userAppData,
      versioneEsecuzione,
      onSetAvanzamento,
      versioneAvanzamento,
      onAvanzamentoNext,
      history,
      configuration,
      dispatch,
      userAnagraphics,
    } = this.props;

    if (versioneAvanzamento.isCorrect || versioneAvanzamento.mostraSoluzione) {
      onAvanzamentoNext({
        periodoCaricatoId: versioneEsecuzione.periodoCaricatoId,
        periodi: versioneCaricata.periodi,
        periodoCaricato: versioneEsecuzione.periodoCaricato,
        stepCaricatoKey: versioneEsecuzione.stepCaricatoKey,
        risposteFornite: versioneAvanzamento.risposteFornite,
        isDocente: userAppData.docente,
        id: versioneCaricata.id,
        stepEseguiti: versioneEsecuzione.stepEseguiti,
        history,
        userAppData,
        configuration,
        dispatch,
        userAnagraphics,
      });
    } else {
      onSetAvanzamento({
        isInterfaceLocked: false,
        isChecked: false,
        mostraCorrezione: false,
        mostraSoluzione: false,
        isFocusEnabled: false,
      });
    }
  }

  submitRisposta = () => {
    const {
      versioneCaricata,
      versioneEsecuzione,
      versioneAvanzamento,
      userAppData,
      onPostRispostaUtente,
    } = this.props;

    onPostRispostaUtente({
      versioneEsecuzione,
      isDocente: userAppData.docente,
      versioneAvanzamento,
      versioneCaricata,
      risposta: versioneAvanzamento.rispostaSelezionata,
      helpRequest: false,
      enableSuoni: userAppData.enableSuoni,
    });
  }

  toggleFocus = (enable) => {
    const { onSetAvanzamento } = this.props;
    onSetAvanzamento({ isFocusEnabled: enable });
  }

  helpButtonFunction = /* istanbul ignore next */ () => {
    const { onModalSetData, versioneAvanzamento, versioneEsecuzione, versioneCaricata } = this.props;
    const stepCaricato = versioneEsecuzione.periodoCaricato[versioneEsecuzione.stepCaricatoKey];

    if (!versioneAvanzamento.mostraSoluzione && !versioneAvanzamento.mostraCorrezione) {
      return false;
    }

    let rispostaUtenteResponso = '';
    if (versioneAvanzamento.isHelpEnabled) {
      rispostaUtenteResponso = 'help';
    } else if (versioneAvanzamento.isCorrect) {
      rispostaUtenteResponso = 'corretta';
    } else if (!versioneAvanzamento.isCorrect) {
      rispostaUtenteResponso = 'sbagliata';
    }

    onModalSetData({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'esecuzione_versione',
            provenienzaReadable: `Esecuzione versione (periodo #${stepCaricato.periodoId}; step #${stepCaricato.id})`,
            titolo: versioneCaricata.titolo,
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/esercizioacademy/${stepCaricato.esercizi[0].esercizioId}/change`,
            consegna: (stepCaricato.esercizi[0] || {}).titolo,
            testoSemplificato: cleanTesto(stepCaricato.testi[0].testo_principale),
            elementi: getIdsElementiEsercizio(stepCaricato),
            rispostaUtente: creaTestoReadable(
              versioneAvanzamento.rispostaSelezionata, stepCaricato
            ),
            rispostaUtenteResponso,
            rispostePossibili: rappresentaSoluzioneTestuale(
              calcolaSoluzioni(stepCaricato.testi, stepCaricato.esercizi),
              stepCaricato.esercizi[0].tipo,
              ' | '
            ),
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });

    return true;
  }

  render() {
    const {
      versioneEsecuzione,
      versioneAvanzamento,
      onModalSetData,
      onModalResetData,
      versioneCaricata,
      spinner,
      onEsecuzioneSvuota,
      isModalBoxOpened,
      history,
      configuration,
    } = this.props;
    const stepCaricato = versioneEsecuzione.periodoCaricato[versioneEsecuzione.stepCaricatoKey];

    if (!stepCaricato) {
      return false;
    }

    return (
      <FlexWrap className="FlexWrap">
        {spinner ?
          <Spinner /> :
          <EsecuzioneSteps
            key={`esecuzione_versione_${stepCaricato.periodoId}_${stepCaricato.id}`}
            isVersione
            toggleFocusFunction={this.toggleFocus}
            stepCaricato={stepCaricato}
            funzioneSelezionaRisposta={(e) => this.selezionaRisposta(e)}
            stepTotali={versioneEsecuzione.stepTotali}
            stepEseguiti={versioneEsecuzione.stepEseguiti}
            rispostaSelezionata={versioneAvanzamento.rispostaSelezionata}
            helpButtonFunction={this.helpButtonFunction}
            correzioneRisposta={{
              isCheckable: versioneAvanzamento.isCheckable,
              isChecked: versioneAvanzamento.isChecked,
              isPristine: versioneAvanzamento.isPristine,
              isCorrect: versioneAvanzamento.isCorrect,
              isInterfaceLocked: versioneAvanzamento.isInterfaceLocked,
              isHelpEnabled: versioneAvanzamento.isHelpEnabled,
              correzioneStep: versioneAvanzamento.correzioneStep,
              mostraSoluzione: versioneAvanzamento.mostraSoluzione,
              mostraCorrezione: versioneAvanzamento.mostraCorrezione,
              risposteInizializza: versioneAvanzamento.risposteInizializza,
              isFocusEnabled: versioneAvanzamento.isFocusEnabled,
            }}
            disableAutofocus={isModalBoxOpened}
            correzioneRispostaFx={
              versioneAvanzamento.isInterfaceLocked ?
                this.proseguiAvanzamento :
                this.submitRisposta
            }
            apriModalBox={onModalSetData}
            chiudiModalBox={onModalResetData}
            helpFunction={this.helpFunction}
            hasHelp
            hasCorreggi
            hasLessico
            topBarParams={{
              closeBtn: {
                url: '#',
                enabled: true,
                onClickFunction: () => {
                  onEsecuzioneSvuota({
                    risposteFornite: versioneAvanzamento.risposteFornite,
                    periodi: versioneCaricata.periodi,
                    history,
                  });
                },
              },
              version: true,
              rightBtn: {
                icon: 'version',
                onClickFunction: () => onModalSetData({
                  topbar: true,
                  titolo: 'Riepilogo',
                  isPopup: false,
                  bgcolor: 'transparent',
                  contenuto: (
                    <Page full>
                      <VersionePeriodiTradotti
                        modal
                        titolo={versioneCaricata.titolo}
                        sottotitolo={versioneCaricata.sottotitolo}
                        periodi={
                          versioneCaricata.previewPeriodi.map(/* istanbul ignore next */(periodo) => ({
                            ...periodo,
                            mostraTestoTradotto: versioneAvanzamento.periodiDaEseguire.periodiIncompletiPks.indexOf(
                              periodo.idPeriodo
                            ) === -1,
                            testoTradotto: calcolaTraduzioneUtentePeriodo(
                              versioneCaricata.periodi[periodo.keyPeriodo],
                              versioneAvanzamento.risposteFornite[periodo.idPeriodo] || {}
                            ),
                          }))
                        }
                      />
                    </Page>
                  ),
                  show: true,
                }),
              },
            }}
          />}
        <LogoPlatform
          product={configuration.product}
          execLogo
          margin="0 0 20px"
          desktopOnly
        />
      </FlexWrap>
    );
  }
}

VersioneEsecuzioneView.propTypes = {
  versioneCaricata: PropTypes.shape({
    titolo: PropTypes.string.isRequired,
    sottotitolo: PropTypes.string.isRequired,
    isEsecuzioneLoaded: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    previewPeriodi: PropTypes.array.isRequired,
  }),
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }),
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  versioneAvanzamento: PropTypes.shape({
    periodiDaEseguire: PropTypes.shape({
      periodiIncompletiPks: PropTypes.array.isRequired,
      stepDaEseguire: PropTypes.object.isRequired,
    }),
    isCheckable: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isPristine: PropTypes.bool.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    isInterfaceLocked: PropTypes.bool.isRequired,
    mostraSoluzione: PropTypes.bool.isRequired,
    mostraCorrezione: PropTypes.bool.isRequired,
  }),
  history: PropTypes.object.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalResetData: PropTypes.func.isRequired,
  versioneEsecuzione: PropTypes.shape({
    periodoCaricato: PropTypes.array.isRequired,
    stepCaricatoKey: PropTypes.number.isRequired,
    periodoCaricatoId: PropTypes.number.isRequired,
    stepEseguiti: PropTypes.number.isRequired,
  }).isRequired,
  onSetAvanzamento: PropTypes.func.isRequired,
  onPostRispostaUtente: PropTypes.func.isRequired,
  onAvanzamentoNext: PropTypes.func.isRequired,
  spinner: PropTypes.bool.isRequired,
  onEsecuzioneSvuota: PropTypes.func.isRequired,
  isModalBoxOpened: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  versioneCaricata: state.get('versioni').toJS().versioneCaricata,
  versioneAvanzamento: state.get('versioni').toJS().versioneAvanzamento,
  spinner: state.get('versioni').toJS().spinner,
  versioneEsecuzione: state.get('versioni').toJS().versioneEsecuzione,
  isModalBoxOpened: state.get('modalBox').toJS().show,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSetAvanzamento: (payload) => {
      dispatch(versioniVersioneAvanzamentoRisposteUtenteSet(payload));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalResetData: () => {
      dispatch(modalSetEmptyData());
    },
    onPostRispostaUtente: (payload) => {
      dispatch(versioniVersioneAvanzamentoRisposteUtentePost(payload));
    },
    onAvanzamentoNext: (payload) => {
      dispatch(versioniVersioneAvanzamentoNextTrigger(payload));
    },
    onEsecuzioneSvuota: (payload) => {
      dispatch(versioniVersioneEsecuzioneSvuotaTrigger(payload));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(VersioneEsecuzioneView);

