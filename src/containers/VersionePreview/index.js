/**
 *
 * VersionePreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import EsecuzioneOverview from 'components/EsecuzioneOverview';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { googleAnalyticsWrapper } from 'common/utils';
import {
  versioniVersioneFetchTrigger,
  versioniVersioneAssegna,
  versioniVersioneRitira,
  versioniVersioneEsecuzioneInitialize,
} from 'containers/Versioni/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';


export class EsecuzionePreviewView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { match, fetchVersione, userAppData, corsoSelezionato } = this.props;

    fetchVersione(match.params.id, userAppData.docente, corsoSelezionato.pk);
  }

  componentDidUpdate(prevProps) {
    const { corsoSelezionato, userAppData, match, fetchVersione } = this.props;
    if (prevProps.corsoSelezionato.pk !== corsoSelezionato.pk) {
      fetchVersione(match.params.id, userAppData.docente, corsoSelezionato.pk);
    }
  }

  eseguiProvaFunction = () => {
    const { match, userAppData: { docente }, onInitializeEsecuzione, versioneCaricata, history } = this.props;

    googleAnalyticsWrapper('event', {
      category: 'Versione',
      action: `Esegui ${docente ? 'docente' : 'studente'}`,
    });

    onInitializeEsecuzione({
      backUrl: `/versione-preview/${versioneCaricata.id}`,
      id: match.params.id,
      isDocente: docente,
      inCorso: versioneCaricata.inCorso,
      history,
    });
  }

  assegnaFunction = () => {
    const {
      onModalSetData,
      onModalSetEmptyData,
      corsoSelezionato,
      versioneCaricata,
      versioneAssegna,
    } = this.props;

    /* istanbul ignore else */
    if (corsoSelezionato.iscritti.length === 0) {
      let messaggio = 'Per assegnare una versione devi avere creato almeno una classe';
      if (corsoSelezionato.pk > 0) {
        messaggio = `Non posso assegnare una versione ad una classe vuota (<strong>${corsoSelezionato.nome}</strong>)`;
      }
      onModalSetData({
        titolo: 'Assegnazione versione',
        contenuto: messaggio,
        show: true,
      });
    } else {
      onModalSetData({
        titolo: 'Assegnazione versione',
        contenuto: `Si desidera assegnare la versione<br /><strong>${versioneCaricata.titolo}</strong><br /> alla classe <strong>${corsoSelezionato.nome}</strong>?`,
        acceptButton: {
          onClick: () => {
            versioneAssegna(versioneCaricata.id, corsoSelezionato.pk);
            onModalSetEmptyData();
          },
        },
        show: true,
      });
    }
  }

  ritiraFunction = () => {
    const {
      onModalSetData,
      onModalSetEmptyData,
      corsoSelezionato,
      versioneCaricata,
      versioneRitira,
    } = this.props;

    /* istanbul ignore next */
    onModalSetData({
      titolo: 'Ritira versione',
      contenuto: `Si desidera ritirare la versione <strong>${versioneCaricata.titolo}</strong> per la classe <strong>${corsoSelezionato.nome}</strong>?`,
      acceptButton: {
        onClick: () => {
          versioneRitira(versioneCaricata.id, corsoSelezionato.pk);
          onModalSetEmptyData();
        },
      },
      show: true,
    });
  }

  visualizzaStatistiche = () => {
    const { versioneCaricata, history, userAppData } = this.props;
    history.push(
      `/versione-statistiche/${versioneCaricata.missione}/${userAppData.docente ? versioneCaricata.idAssegnazione : versioneCaricata.id}`
    );
  }

  render() {
    const {
      configuration,
      userAppData,
      versioneCaricata,
      spinner,
      feedback,
    } = this.props;

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            url: configuration.homePage,
            enabled: true,
          }}
          title="Versione"
          single
        />
        <Container>
          {spinner && <Spinner />}
          {!spinner && !feedback.hasFeedback && (
            <EsecuzioneOverview
              isDocente={userAppData.docente}
              totaleDomande={versioneCaricata.totaleDomande}
              tempoEsecuzione={versioneCaricata.totaleDomande}
              titolo={versioneCaricata.titolo}
              sottotitolo={versioneCaricata.sottotitolo}
              prerequisito={versioneCaricata.prerequisito}
              autore={versioneCaricata.autore}
              testo={versioneCaricata.testo}
              fonte={versioneCaricata.fonte}
              isRitirata={versioneCaricata.ritirata}
              isAssegnata={versioneCaricata.assegnata}
              isConsegnata={versioneCaricata.consegnata}
              inCorso={versioneCaricata.inCorso}
              dataAssegnazione={versioneCaricata.dataAssegnazione}
              assegnaFx={this.assegnaFunction}
              ritiraFx={this.ritiraFunction}
              eseguiSimulaFx={this.eseguiProvaFunction}
              visualizzaStatisticheFx={this.visualizzaStatistiche}
            />)
          }
          {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </Container>
      </Page>
    );
  }
}

EsecuzionePreviewView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  versioneCaricata: PropTypes.shape({
    titolo: PropTypes.string.isRequired,
    assegnata: PropTypes.bool.isRequired,
    ritirata: PropTypes.bool.isRequired,
    totaleDomande: PropTypes.number,
    testo: PropTypes.string,
  }),
  versioneAssegna: PropTypes.func,
  versioneRitira: PropTypes.func,
  corsoSelezionato: PropTypes.shape({
    isIscrittiLoaded: PropTypes.bool.isRequired,
    isCorsoLoaded: PropTypes.bool.isRequired,
    pk: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    iscritti: PropTypes.array.isRequired,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  history: PropTypes.object.isRequired,
  fetchVersione: PropTypes.func,
  onModalSetData: PropTypes.func,
  onModalSetEmptyData: PropTypes.func,
  onInitializeEsecuzione: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  versioneCaricata: state.get('versioni').toJS().versioneCaricata,
  spinner: state.get('versioni').toJS().spinner,
  feedback: state.get('versioni').toJS().feedback,
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchVersione: (id, isDocente, idCorso) => {
      dispatch(versioniVersioneFetchTrigger(id, isDocente, idCorso));
    },
    versioneAssegna: (idVersione, idCorso) => {
      dispatch(versioniVersioneAssegna(idVersione, idCorso));
    },
    versioneRitira: (idVersione, idCorso) => {
      dispatch(versioniVersioneRitira(idVersione, idCorso));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalSetEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
    onInitializeEsecuzione: (payload) => {
      dispatch(versioniVersioneEsecuzioneInitialize(payload));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(EsecuzionePreviewView);
