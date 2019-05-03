/**
 *
 * VersioniStatistiche
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Page from 'components/Page';
import FlexBox from 'components/FlexBox';
import { GhostButton } from 'components/Button';
import Svg from 'components/Svg';
import { H2 } from 'components/Heading';
import icon from 'icons/globals';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import StatisticheView from 'components/StatisticheView';
import ZendeskTicket from 'containers/ZendeskTicket';
import { modalSetData } from 'containers/ModalBox/actions';
import { API_BASE_PATH } from 'configuration';
import {
  calcolaElencoStudentiStatistiche,
  calcolaTraduzioneVersioneStudente,
  calcolaMediaRisposteUtente,
  calcolaSezioniAperteStatistiche,
} from 'common/statistiche';

import reducer from './reducer';
import { watchVersioniStatistiche } from './saga';
import {
  versioniStatisticheDataSet,
  versioniStatisticheDataFetch,
  versioniStatisticheDataSelect,
  versioniStatisticheDidascaliaSet,
  versioniStatisticheDidascaliaReset,
} from './actions';

export class VersioniStatisticheView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      match,
      onFetchDataStatistiche,
      userAppData,
      corsoSelezionato,
      history,
      statisticheCaricate,
      userAnagraphics,
    } = this.props;

    if (corsoSelezionato.isIscrittiLoaded || !userAppData.docente) {
      onFetchDataStatistiche({
        idAssegnazione: match.params.idAssegnazione,
        idMissione: match.params.idMissione,
        idCorso: corsoSelezionato.pk,
        isDocente: userAppData.docente,
        idUtente: userAppData.docente ?
          (statisticheCaricate.utenteSelezionato || {}).id :
          userAnagraphics.id,
        history,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      corsoSelezionato,
      userAppData,
      match,
      onFetchDataStatistiche,
      history,
      statisticheCaricate,
    } = this.props;

    if (userAppData.docente && prevProps.corsoSelezionato.pk !== corsoSelezionato.pk) {
      onFetchDataStatistiche({
        idAssegnazione: match.params.idAssegnazione,
        idMissione: match.params.idMissione,
        idCorso: corsoSelezionato.pk,
        isDocente: userAppData.docente,
        idUtente: (statisticheCaricate.utenteSelezionato || {}).id,
        history,
      });
    }
  }

  selezionaUtente = (user) => {
    const { onSetDataStatistiche, userAppData } = this.props;
    if (!userAppData.docente) {
      return false;
    }
    onSetDataStatistiche({
      utenteSelezionato: user,
    });

    return true;
  }

  calcolaMediaRisposte = () => {
    const { statisticheCaricate: { stepPks, media, utenteSelezionato } } = this.props;
    const selectedUser = utenteSelezionato || {};
    if (selectedUser.id > 0) {
      return calcolaMediaRisposteUtente(stepPks, media, selectedUser);
    }
    return media;
  }

  apriChiudiSezioni = (key, blocco = true, risposte = false, studenti = {}) => {
    const { onSetDataStatistiche, statisticheCaricate: { openedSections } } = this.props;
    onSetDataStatistiche({
      openedSections: calcolaSezioniAperteStatistiche(
        key, blocco, risposte, studenti, openedSections
      ),
    });
  }

  calcolaTraduzioneStudente = () => {
    const { statisticheCaricate } = this.props;
    const userKey = (statisticheCaricate.utenteSelezionato || {}).key;

    return calcolaTraduzioneVersioneStudente(
      userKey,
      statisticheCaricate.stepPks,
      statisticheCaricate.risposte,
      statisticheCaricate.esercizi,
    );
  }

  calcolaElencoStudenti = () => {
    const {
      corsoSelezionato: { iscritti: iscrittiCorso },
      statisticheCaricate: { studenti: studentiReport },
      userAppData: { docente: isDocente },
      userAnagraphics,
    } = this.props;

    return calcolaElencoStudentiStatistiche(iscrittiCorso, studentiReport, userAnagraphics, isDocente);
  }

  loadStat = (idAssegnazione) => {
    const { onStatisticheSelect, statisticheCaricate, history, userAppData, userAnagraphics } = this.props;

    onStatisticheSelect({
      idAssegnazione,
      statisticheDisponibili: statisticheCaricate.statisticheDisponibili,
      idMissione: statisticheCaricate.idMissione,
      history,
      idUtente: userAppData.docente ?
        (statisticheCaricate.utenteSelezionato || {}).id || 0 :
        userAnagraphics.id,
    });
  }

  render() {
    const {
      spinner,
      feedback,
      statisticheCaricate,
      onModalSetData,
      corsoSelezionato,
      match,
      userAppData,
      didascalia,
      onDidascaliaSet,
      onDidascaliaReset,
    } = this.props;

    const topBarProps = {
      pinned: true,
      backNav: {
        url: `/versione-preview/${userAppData.docente ? statisticheCaricate.id : statisticheCaricate.idAssegnazione}`,
        enabled: true,
      },
      title: 'Reportistica',
    };

    if ((userAppData.docente && !statisticheCaricate.utenteSelezionato) || !userAppData.docente) {
      topBarProps.rightBtn = {
        icon: 'topBarFeedback',
        onClickFunction: () => onModalSetData({
          contenuto: (
            <ZendeskTicket
              ticketData={{
                provenienza: 'statistiche_versioni',
                provenienzaReadable: 'Statistiche versione',
                titolo: statisticheCaricate.nome,
                adminUrl: `${API_BASE_PATH}admin/cicero_academy/assegnazioneversione/${match.params.idAssegnazione}/change`,
                adminURI: `/versione-statistiche/${match.params.idAssegnazione}`,
                corsoSelezionato: userAppData.docente ? `${corsoSelezionato.nome} (${corsoSelezionato.pk})` : undefined,
              }}
            />
          ),
          show: true,
          disableClose: true,
          isPopup: false,
        }),
      };
    }

    if (userAppData.docente && statisticheCaricate.utenteSelezionato) {
      topBarProps.button = {
        buttonIcon: 'print',
        label: 'Stampa',
        bone: true,
        onClick: () => window.print(),
      };
    }

    return (
      <Page>
        <TopBar
          {...topBarProps}
        />
        <Container>
          {!spinner && !feedback.hasFeedback && [
            (
              <FlexBox justifyContent="space-between" margin="10px 0 30px" key="button_wrapper">
                <span>
                  {statisticheCaricate.previousId > -1 && (
                    <GhostButton onClick={() => this.loadStat(statisticheCaricate.previousId)}>
                      <Svg {...icon.chevronLeft} />
                    </GhostButton>
                  )}
                </span>
                <H2 center margin="0" key="statistiche_titolo">{statisticheCaricate.nome}</H2>
                <span>
                  {statisticheCaricate.nextId > -1 && (
                    <GhostButton onClick={() => this.loadStat(statisticheCaricate.nextId)}>
                      <Svg {...icon.chevronRight} />
                    </GhostButton>
                  )}
                </span>
              </FlexBox>
            ),
            <StatisticheView
              onDidascaliaSet={onDidascaliaSet}
              onDidascaliaReset={onDidascaliaReset}
              didascalia={didascalia}
              key="statistiche_viewer"
              selezionaUtenteFx={this.selezionaUtente}
              risposte={statisticheCaricate.risposte}
              grafici={statisticheCaricate.grafici}
              scores={statisticheCaricate.scores || []}
              traduzione={this.calcolaTraduzioneStudente()}
              studentiVersione={this.calcolaElencoStudenti()}
              utenteSelezionato={statisticheCaricate.utenteSelezionato}
              esercizi={statisticheCaricate.esercizi}
              media={this.calcolaMediaRisposte()}
              stepPks={statisticheCaricate.stepPks}
              apriChiudiSezioniFx={this.apriChiudiSezioni}
              openedSections={statisticheCaricate.openedSections}
              isDocente={userAppData.docente}
              idAssegnazione={statisticheCaricate.idAssegnazione}
            />,
          ]}
          {spinner && <Spinner />}
          {!spinner && feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </Container>
      </Page>
    );
  }
}

VersioniStatisticheView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      idAssegnazione: PropTypes.string.isRequired,
      idStudente: PropTypes.string,
    }),
  }).isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  userAnagraphics: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  statisticheCaricate: PropTypes.shape({
    esercizi: PropTypes.object.isRequired,
    stepPks: PropTypes.array.isRequired,
    risposte: PropTypes.object.isRequired,
    reportDisponibili: PropTypes.array.isRequired,
    grafici: PropTypes.array.isRequired,
    openedSections: PropTypes.object.isRequired,
  }).isRequired,
  corsoSelezionato: PropTypes.shape({
    isIscrittiLoaded: PropTypes.bool.isRequired,
    isCorsoLoaded: PropTypes.bool.isRequired,
    pk: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    iscritti: PropTypes.array.isRequired,
  }).isRequired,
  onFetchDataStatistiche: PropTypes.func.isRequired,
  onSetDataStatistiche: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onStatisticheSelect: PropTypes.func.isRequired,
  onDidascaliaSet: PropTypes.func.isRequired,
  onDidascaliaReset: PropTypes.func.isRequired,
  didascalia: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
    x: PropTypes.string.isRequired,
    titolo: PropTypes.string.isRequired,
    campioni: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  spinner: state.get('versioniStatistiche').toJS().spinner,
  feedback: state.get('versioniStatistiche').toJS().feedback,
  didascalia: state.get('versioniStatistiche').toJS().didascalia,
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
  statisticheCaricate: state.get('versioniStatistiche').toJS().statisticheCaricate,
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchDataStatistiche: (payload) => {
      dispatch(versioniStatisticheDataFetch(payload));
    },
    onSetDataStatistiche: (payload) => {
      dispatch(versioniStatisticheDataSet(payload));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onStatisticheSelect: (payload) => {
      dispatch(versioniStatisticheDataSelect(payload));
    },
    onDidascaliaSet: (payload) => {
      dispatch(versioniStatisticheDidascaliaSet(payload));
    },
    onDidascaliaReset: () => {
      dispatch(versioniStatisticheDidascaliaReset());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'versioniStatistiche', reducer });
const withSaga = injectSaga({ key: 'versioniStatistiche', saga: watchVersioniStatistiche });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VersioniStatisticheView);
