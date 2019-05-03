/**
 *
 * ProvaCompetenzaPreviewView
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
  provaCompetenzaContenutoFetch,
  provaCompetenzaAssegna,
  provaCompetenzaRitira,
  provaCompetenzaStepInitialize,
} from 'containers/ProvaCompetenza/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

export class ProvaCompetenzaPreviewView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onProvaCompetenzaContenutoFetch, userAppData, corsoSelezionato, match } = this.props;

    onProvaCompetenzaContenutoFetch(match.params.id, userAppData.docente, corsoSelezionato.pk);
  }

  componentDidUpdate(prevProps) {
    const { corsoSelezionato, userAppData, onProvaCompetenzaContenutoFetch, match } = this.props;
    if (prevProps.corsoSelezionato.pk !== corsoSelezionato.pk) {
      onProvaCompetenzaContenutoFetch(match.params.id, userAppData.docente, corsoSelezionato.pk);
    }
  }

  eseguiProvaFunction = () => {
    const {
      userAppData,
      onProvaCompetenzaStepInizialize,
      contenutoProva,
      history,
      dispatch,
      userAnagraphics,
      configuration,
    } = this.props;

    googleAnalyticsWrapper('event', {
      category: 'Prova per competenza',
      action: `Esegui ${userAppData.docente ? 'docente' : 'studente'}`,
    });

    onProvaCompetenzaStepInizialize({
      id: contenutoProva.id,
      isDocente: userAppData.docente,
      history,
      dispatch,
      configuration,
      userAnagraphics,
      userAppData,
    });
  }

  assegnaFunction = () => {
    const {
      onModalSetData,
      onModalSetEmptyData,
      corsoSelezionato,
      contenutoProva,
      onProvaCompetenzaAssegna,
    } = this.props;

    /* istanbul ignore else */
    if (corsoSelezionato.iscritti.length === 0) {
      let messaggio = 'Per assegnare una prova devi avere creato almeno una classe';
      if (corsoSelezionato.pk > 0) {
        messaggio = `Non posso assegnare una prova per competenza ad una classe vuota (<strong>${corsoSelezionato.nome}</strong>)`;
      }
      onModalSetData({
        titolo: 'Assegnazione prova per competenza',
        contenuto: messaggio,
        show: true,
      });
    } else {
      onModalSetData({
        titolo: 'Assegnazione prova per competenza',
        contenuto: `Si desidera assegnare la prova per competenza<br /><strong>${contenutoProva.titolo}</strong><br /> alla classe <strong>${corsoSelezionato.nome}</strong>?`,
        acceptButton: {
          onClick: () => {
            onProvaCompetenzaAssegna(contenutoProva.id, corsoSelezionato.pk);
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
      contenutoProva,
      onProvaCompetenzaRitira,
    } = this.props;

    /* istanbul ignore next */
    onModalSetData({
      titolo: 'Ritira prova per competenza',
      contenuto: `Si desidera ritirare la prova per competenza <strong>${contenutoProva.titolo}</strong> per la classe <strong>${corsoSelezionato.nome}</strong>?`,
      acceptButton: {
        onClick: () => {
          onProvaCompetenzaRitira(contenutoProva.id, corsoSelezionato.pk);
          onModalSetEmptyData();
        },
      },
      show: true,
    });
  }

  visualizzaStatistiche = () => {
    const { contenutoProva, history, userAppData } = this.props;
    history.push(
      `/prova-competenza-statistiche/${contenutoProva.missione}/${userAppData.docente ? contenutoProva.idAssegnazione : contenutoProva.id}`
    );
  }

  render() {
    const {
      configuration,
      userAppData,
      contenutoProva,
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
          title="Prova di competenza"
          single
        />
        <Container>
          {spinner && <Spinner />}
          {!spinner && !feedback.hasFeedback && (
            <EsecuzioneOverview
              isDocente={userAppData.docente}
              totaleDomande={contenutoProva.totaleDomande}
              tempoEsecuzione={contenutoProva.totaleDomande * 3}
              titolo={contenutoProva.titolo}
              testo={contenutoProva.testo}
              autore={contenutoProva.autore}
              fonte={contenutoProva.fonte}
              difficolta={contenutoProva.difficolta}
              sottotitolo={contenutoProva.sottotitolo}
              prerequisito={contenutoProva.prerequisito}
              isRitirata={contenutoProva.ritirata}
              isAssegnata={contenutoProva.assegnata}
              isConsegnata={contenutoProva.consegnata}
              inCorso={contenutoProva.inCorso}
              dataAssegnazione={contenutoProva.dataAssegnazione}
              assegnaFx={this.assegnaFunction}
              ritiraFx={this.ritiraFunction}
              eseguiSimulaFx={this.eseguiProvaFunction}
              visualizzaStatisticheFx={this.visualizzaStatistiche}
            />
          )}
          {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </Container>
      </Page>
    );
  }
}

ProvaCompetenzaPreviewView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  corsoSelezionato: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    iscritti: PropTypes.array.isRequired,
  }).isRequired,
  contenutoProva: PropTypes.shape({
    isLoaded: PropTypes.bool,
    inCorso: PropTypes.bool.isRequired,
    consegnata: PropTypes.bool,
    ritirata: PropTypes.bool.isRequired,
    assegnata: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string,
    autore: PropTypes.string,
    fonte: PropTypes.string,
    difficolta: PropTypes.string,
    prerequisito: PropTypes.string,
    sottotitolo: PropTypes.string,
    testo: PropTypes.string,
    totaleDomande: PropTypes.number,
  }).isRequired,
  onProvaCompetenzaContenutoFetch: PropTypes.func.isRequired,
  onProvaCompetenzaAssegna: PropTypes.func.isRequired,
  onProvaCompetenzaRitira: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalSetEmptyData: PropTypes.func.isRequired,
  onProvaCompetenzaStepInizialize: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  spinner: state.get('provaCompetenza').toJS().spinner,
  feedback: state.get('provaCompetenza').toJS().feedback,
  contenutoProva: state.get('provaCompetenza').toJS().contenuto,
  step: state.get('provaCompetenza').toJS().step,
  risposta: state.get('provaCompetenza').toJS().risposta,
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onProvaCompetenzaContenutoFetch: (id, isDocente, idCorso) => {
      dispatch(provaCompetenzaContenutoFetch(id, isDocente, idCorso));
    },
    onProvaCompetenzaAssegna: (idVersione, idCorso) => {
      dispatch(provaCompetenzaAssegna(idVersione, idCorso));
    },
    onProvaCompetenzaRitira: (idAssegnazione, idCorso) => {
      dispatch(provaCompetenzaRitira(idAssegnazione, idCorso));
    },
    onProvaCompetenzaStepInizialize: (payload) => {
      dispatch(provaCompetenzaStepInitialize(payload));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalSetEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ProvaCompetenzaPreviewView);
