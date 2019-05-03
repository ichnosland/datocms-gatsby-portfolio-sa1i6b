/*
 *
 * DashboardAcademy
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ModalOverlay } from 'components/Modal';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import EggMenu from 'components/EggMenu';
import Spinner from 'components/Spinner';
import Svg from 'components/Svg';
import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { cookieSet } from 'common/cookies';
import ButtonGroup from 'components/ButtonGroup';
import {
  ListItem,
  ListLink,
  ListItemText,
  ListPanelHeader,
  LeftBox,
} from 'components/NewListPanels';
import { getHintToDisplay } from 'common/hints';
import ListSideBox from 'components/NewListPanels/ListSideBox';
import AlertBanner from 'components/AlertBanner';
import DashboardLine from 'components/Dashboard/DashboardLine';
import MissionTag from 'components/Dashboard/MissionTag';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { userDataSet } from 'containers/User/actions';
import { corsiCorsoSelectedDocenteTrigger } from 'containers/Corsi/actions';
import icon from 'icons/globals';
import hourglass from 'images/infocard-icn_hourglass.png';

import {
  DashboardBaseView,
  dashboardMapDispatchToProps,
} from './DashboardBase';
import makeSelectLivelliDashboard from './selectors';
import { calculateMenuData } from './Menu';


export class DashboardAcademyView extends DashboardBaseView { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { configuration, user, loadLivelli, corsi } = this.props;
    if (!user.appData.docente || corsi.corsoSelezionato.isCorsoLoaded || !configuration.hasClassi) {
      loadLivelli(configuration, user.appData.docente, corsi.corsoSelezionato.pk);
    }
    this.initSearchActive();
    this.displayPremiumMessage();
  }

  componentDidUpdate = (oldProps) => {
    const {
      user: { authentication: { codiceDaSbloccare: oldCodiceDaSbloccare } },
      corsi: { corsoSelezionato: { isCorsoLoaded: isCorsoLoadedOld } },
    } = oldProps;
    const {
      user: { authentication: { codiceDaSbloccare } },
      corsi: { corsoSelezionato: { isCorsoLoaded, pk: pkCorso } },
      loadLivelli,
      user,
      configuration,
      isLoading,
    } = this.props;

    if (!isLoading && isCorsoLoadedOld !== isCorsoLoaded && isCorsoLoaded) {
      loadLivelli(configuration, user.appData.docente, pkCorso);
    }
    /* istanbul ignore else */
    if (oldCodiceDaSbloccare !== codiceDaSbloccare) {
      this.displayPremiumMessage();
    }
  }

  displayPremiumMessage = () => {
    const {
      configuration,
      user,
      onUserDataSet,
      onUserCookieSet,
      onModalSetEmptyData,
      onModalSetData,
      history,
    } = this.props;

    if (!user.appData.docente && user.authentication.codiceDaSbloccare) {
      const hintToDisplay = getHintToDisplay(configuration.product, 'dashboard', user.appData.hints);

      if (hintToDisplay) {
        const closeFunction = /* istanbul ignore next */ () => {
          const cookieName = `${hintToDisplay.nome}_${configuration.product}_${user.anagraphics.id}`;

          onUserCookieSet(cookieName, false);
          onUserDataSet({ appData: { hints: { ...user.appData.hints, dashboard: false } } });
          onModalSetEmptyData();
        };

        onModalSetData({
          contenuto: hintToDisplay.contenuto,
          image: hintToDisplay.image,
          closeButton: {
            text: 'Annulla',
            onClick: closeFunction,
          },
          acceptButton: {
            text: 'Passa a premium',
            onClick: /* istanbul ignore next */ () => /* istanbul ignore next */ {
              history.push('/sblocca');
              closeFunction();
            },
          },
          show: true,
        });
      }
    }
  };

  changeCorso = (e) => {
    const { loadCorso, configuration, user } = this.props;
    loadCorso(
      e.target.value,
      configuration,
      user.appData.docente,
      user.anagraphics.studenteAcademy.id
    );
  }

  calcolaUrlContenuto = (item) => {
    const { user } = this.props;

    let url = '#';
    const id = user.appData.docente ? item.id : (item.assegnazione || {}).id || 0;

    switch (item.tipo) {
      case 'testo-introduttivo':
        url = `/testo-introduttivo/${item.id}`;
        break;
      case 'versioneacademy':
        url = `/versione-preview/${id}`;
        break;
      case 'provacompetenzaacademy':
        url = `/prova-competenza-preview/${id}`;
        break;
      case 'provaparallel':
        url = `/prova-parallel/${id}`;
        break;
      case 'verifica':
        url = `/verifica-preview/${id}`;
        break;
      case 'unita':
        url = `/unita-preview/${item.id}`;
        break;
      default:
        break;
    }
    return url;
  }

  displayContenuti = (missione) => {
    const {
      onModalSetData,
      user: {
        appData: { docente: isDocente },
        authentication: { codiceDaSbloccare, codiceSbloccato },
      } } = this.props;
    const contenutiMission = missione.contenuti.map((item) => {
      let isLocked = !!item.locked;
      let isAssegnato = (item.assegnazione || {}).id > 0;
      let isRitirato = (item.assegnazione || {}).ritirata;

      // gli utenti non premium non vedono le assegnazioni
      if (codiceDaSbloccare) {
        isAssegnato = false;
        isRitirato = false;
      }

      // se l'utente è studente controllo se il contenuto è bloccato
      if (!isDocente) {
        // casi in cui l'unità risulta bloccata
        if (item.tipo === 'unita') {
          if (item.locked) {
            isLocked = true;
          } else {
            // l'utente è premium ma l'unità non risulta né sbloccata né assegnata
            if (codiceSbloccato && !item.sbloccata && !(item.assegnazione || {}).id) {
              isLocked = true;
            }

            // l'utente non è premium e l'unità non risulta sbloccata
            if (codiceDaSbloccare && !item.sbloccata) {
              isLocked = true;
            }
          }
          // casi in cui versioni / verifiche / prove per competenza risultano bloccate:
          // l'utente non è premium
          // l'utente è premium ma non ha assegnazioni
        } else if (codiceDaSbloccare || (codiceSbloccato && !(item.assegnazione || {}).id)) {
          isLocked = true;
        }
      }

      const key = `${item.tipo}_${item.id}`;
      let percentuale = isDocente ? -1 : 0;
      if (!isDocente && item.completata) {
        percentuale = 100;
      } else if (!isDocente && item.inCorso) {
        percentuale = 50;
      } else if (!isDocente && item.lezioniEseguite > 0 && item.lezioniTotali > 0) {
        percentuale = (item.lezioniEseguite / item.lezioniTotali) * 100;
      }

      return isLocked ? (
        <ListItem
          key={key}
          onClick={item.locked ? () => onModalSetData({
            contenuto: 'Contenuti in fase di sviluppo',
            closeButton: {
              text: 'Ok',
            },
            image: {
              src: hourglass,
              width: '180px',
              height: '130px',
              alt: 'Traduci',
            },
            show: true,
          }) : null}
        >
          <ListItemText
            unit
            locked
          >
            {item.lessico && <Svg {...icon.parole} />}{item.titolo}
          </ListItemText>
          <ListSideBox locked />
        </ListItem>
      ) :
        (
          <ListLink key={key} to={this.calcolaUrlContenuto(item)}>

            <ListItemText unit>
              {item.lessico &&
                <LeftBox>
                  <span>
                    <Svg {...icon.parole} />
                  </span>
                </LeftBox>
              }
              {item.titolo}
            </ListItemText>
            <ListSideBox
              unit
              percentuale={percentuale}
              assigned={isAssegnato}
              retired={isRitirato}
            />
          </ListLink>
        );
    });

    return [
      missione.displayTitolo && (
        codiceDaSbloccare || !missione.hasTesto ?
          (
            <ListItem
              key={missione.id}
              first={1}
            >
              <ListItemText
                unit
                locked={codiceDaSbloccare}
              >
                {missione.titolo}
              </ListItemText>
              <ListSideBox locked={codiceDaSbloccare} />
            </ListItem>
          ) :
          (
            <ListLink
              key={missione}
              to={this.calcolaUrlContenuto({ tipo: 'testo-introduttivo', id: missione.id })}
              first={1}
            >
              <ListItemText unit>{missione.titolo}</ListItemText>
              <ListSideBox unit lesson />
            </ListLink>
          )
      ),
      ...contenutiMission,
    ];
  }

  calcolaPulsantiLivello = (livello) => {
    const {
      history: { push },
      user: {
        appData: { docente: isDocente },
        authentication: { codiceDaSbloccare },
      },
    } = this.props;
    const buttonList = [];

    if (!isDocente && codiceDaSbloccare) {
      return false;
    }

    if (livello.versioni && (isDocente || livello.versioni.assegnate)) {
      const { assegnate, daRitirare, daConsegnare } = livello.versioni;
      let secondoContatore;
      let primoContatore;

      if (isDocente && assegnate > 0) {
        primoContatore = daRitirare;
        secondoContatore = assegnate - daRitirare;
      } else if (!isDocente) {
        primoContatore = daConsegnare;
        secondoContatore = assegnate - daConsegnare;
      }

      buttonList.push({
        id: `livello_${livello.id}_versioni_pulsante`,
        label: (
          <FlexBox key={`livello_${livello.id}_versioni_label`}>Versioni {
            assegnate > 0 && (
              <CountBadge key={`livello_${livello.id}_versioni_badge`}>
                {primoContatore > 0 && (
                  <CountBadgeItem actioncolor="help">
                    {primoContatore}
                  </CountBadgeItem>
                )}
                {secondoContatore > 0 && <CountBadgeItem actioncolor="okay">{secondoContatore}</CountBadgeItem>}
              </CountBadge>
            )}
          </FlexBox>
        ),
        onClickFunction: () => push(`/versioni-livello${isDocente ? '-docente' : ''}/${livello.id}`),
      });
    }

    if (livello.verifiche && (isDocente || livello.verifiche.assegnate)) {
      const { assegnate, daRitirare, daConsegnare } = livello.verifiche;
      let secondoContatore;
      let primoContatore;

      if (isDocente && assegnate > 0) {
        primoContatore = daRitirare;
        secondoContatore = assegnate - daRitirare;
      } else if (!isDocente) {
        primoContatore = daConsegnare;
        secondoContatore = assegnate - daConsegnare;
      }

      buttonList.push({
        id: `livello_${livello.id}_verifiche_pulsante`,
        label:
          (
            <FlexBox key={`livello_${livello.id}_verifiche_label`}>Verifiche
              {assegnate > 0 && (
                <CountBadge key={`livello_${livello.id}_verifiche_badge`}>
                  {primoContatore > 0 && (
                    <CountBadgeItem actioncolor="help">
                      {primoContatore}
                    </CountBadgeItem>
                  )}
                  {secondoContatore > 0 && <CountBadgeItem actioncolor="okay">{secondoContatore}</CountBadgeItem>}
                </CountBadge>
              )}
            </FlexBox>
          ),
        onClickFunction: () => push(`/verifiche-livello${isDocente ? '-docente' : ''}/${livello.id}`),
      });
    }

    return buttonList.length ? (
      <ButtonGroup
        key={`livello${livello.id}_pulsanti`}
        buttons={buttonList}
        margin="20px auto"
        half
      />
    ) : undefined;
  }

  render() {
    let counterMissioni = 0;
    let switcherData = { items: [] };
    const incrementCounterMissioni = () => {
      counterMissioni += 1;
      return counterMissioni;
    };

    const {
      menuEggStatus,
      searchActive,
      spinner,
      livelli,
      filterUnita,
      user,
      corsi,
      configuration,
      onModalSetData,
      modalBoxShow,
    } = this.props;

    if (user.appData.docente && configuration.hasClassi) {
      switcherData = {
        items: corsi.corsiAttivi.items.map((corso) => ({
          key: corso.pk,
          name: corso.nome,
        })),
        itemSelected: corsi.corsoSelezionato.pk,
        onChangeFunction: (e) => this.changeCorso(e),
      };
    } else if (configuration.switchMateria) {
      switcherData = {
        items: Object.keys(configuration.switchMateria).map(
          (key) => ({
            key,
            name: configuration.switchMateria[key].title,
            pos: configuration.switchMateria[key].pos || 0,
          })
        ).sort((a, b) => (a.pos - b.pos)),
        itemSelected: Object.keys(configuration.switchMateria)
          .filter((key) => (
            configuration.switchMateria[key].disciplinaId === configuration.disciplinaId
          ))[0],
        onChangeFunction: (e) => this.changeMateria(e),
      };
    }

    return (
      <div>
        <ModalOverlay show={menuEggStatus === 'apri'} overlaybg="hsla(0,0%,96%,.9)" />
        <TopBar
          {...{
            ...this.topBarConfiguration,
            backArrow: {
              ...this.topBarConfiguration.backArrow,
              enabled: searchActive,
            },
            topSwitcher: switcherData,
          }}
          searchActive={searchActive}
          searchValue={filterUnita}
          premiumActive={user.authentication.codiceSbloccato}
        />
        {spinner ?
          <Container>
            <Spinner />
          </Container> :
          <Container padding="64px 20px 30px 34px">
            <DashboardLine />
            {!corsi.error.hasError ? livelli.map((livello) => (
              <div key={`livello_${livello.id}`}>
                <ListPanelHeader uppercase>
                  {livello.titolo}
                </ListPanelHeader>
                {livello.missioni.map((missione) => (
                  <Div key={`missione_${missione.id}`}>
                    <MissionTag
                      number={incrementCounterMissioni()}
                      searchActive={searchActive}
                    />
                    <div>
                      {this.displayContenuti(missione)}
                    </div>
                  </Div>
                ))}
                {this.calcolaPulsantiLivello(livello)}
              </div>
            )) : <AlertBanner actioncolor="error">{corsi.error.errorMessage}</AlertBanner>}
          </Container>
        }
        {!modalBoxShow && (<EggMenu
          {...{
            ...this.menuConfiguration,
            vociMenu: calculateMenuData({
              configuration,
              onModalSetData,
              isDocente: user.appData.docente,
              codiceDaSbloccare: user.authentication.codiceDaSbloccare,
            }),
          }}
          active={menuEggStatus === 'apri'}
          animate={menuEggStatus !== ''}
        />)}
      </div>
    );
  }
}

DashboardAcademyView.propTypes = {
  livelli: PropTypes.array.isRequired,
  spinner: PropTypes.bool.isRequired,
  onSetFilterUnita: PropTypes.func.isRequired,
  loadLivelli: PropTypes.func.isRequired,
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
    hasPremium: PropTypes.bool.isRequired,
    disciplinaId: PropTypes.number.isRequired,
  }).isRequired,
  onChangeTopSelect: PropTypes.func,
  filterUnita: PropTypes.string.isRequired,
  corsi: PropTypes.shape({
    corsiAttivi: PropTypes.object.isRequired,
    corsoSelezionato: PropTypes.shape({
      isIscrittiLoaded: PropTypes.bool.isRequired,
      isCorsoLoaded: PropTypes.bool.isRequired,
      pk: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      iscritti: PropTypes.array.isRequired,
    }).isRequired,
    error: PropTypes.shape({
      hasError: PropTypes.bool,
      errorMessage: PropTypes.string,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loadCorso: PropTypes.func.isRequired,
  menuEggStatus: PropTypes.string.isRequired,
  searchActive: PropTypes.bool.isRequired,
  modalBoxShow: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  ...dashboardMapDispatchToProps(dispatch),
  loadCorso: (idCorso, configuration, isDocente, userId) => {
    dispatch(corsiCorsoSelectedDocenteTrigger(idCorso, configuration, isDocente, userId));
  },
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
  onModalSetEmptyData: () => {
    dispatch(modalSetEmptyData());
  },
  onUserCookieSet: (cookieKey, payload) => {
    cookieSet({ cookieKey, payload });
  },
  onUserDataSet: (payload) => {
    dispatch(userDataSet(payload));
  },
});

const mapStateToProps = (state) => ({
  livelli: makeSelectLivelliDashboard(state.get('dashboard').toJS(), 'contenuti', 'titolo'),
  filterUnita: state.get('dashboard').toJS().filterUnita,
  spinner: state.get('dashboard').toJS().spinner,
  configuration: state.get('configuration').toJS(),
  corsi: state.get('corsi').toJS(),
  user: state.get('user').toJS(),
  menuEggStatus: state.get('dashboard').toJS().menuEggStatus,
  searchActive: state.get('dashboard').toJS().searchActive,
  isLoading: state.get('dashboard').toJS().isLoading,
  modalBoxShow: state.get('modalBox').toJS().show,
});

const DashboardConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const DashboardAcademyComposed = compose(
  DashboardConnect
)(DashboardAcademyView);

export default DashboardAcademyComposed;
