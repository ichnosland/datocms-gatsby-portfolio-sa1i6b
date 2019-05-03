/**
 *
 * VersioniDocenteView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { googleAnalyticsWrapper } from 'common/utils';
import {
  versioniLivelloFetch,
  versioniLivelloSet,
  versioniVersioneAssegna,
  versioniVersioneRitira,
  versioniVersioneEsecuzioneInitialize,
} from 'containers/Versioni/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

import VersioniLivelloOverview from './LivelloDocenteOverview';


export class VersioniDocenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      onVersioneLivelloFetch,
      corsoSelezionato: { pk: idCorso },
      match: { params: { id, idSelezionato = 0 } },
    } = this.props;

    onVersioneLivelloFetch(id, true, idCorso, parseInt(idSelezionato, 10));
  }

  componentDidUpdate(prevProps) {
    const { corsoSelezionato, onVersioneLivelloFetch, match } = this.props;
    if (prevProps.corsoSelezionato.pk !== corsoSelezionato.pk) {
      onVersioneLivelloFetch(match.params.id, true, corsoSelezionato.pk);
    }
  }

  simulaFunction = () => {
    const {
      onInitializeEsecuzione,
      history,
      versioniLivello: {
        versioneSelezionata,
        spinnerSmall: { assegna: isSpinnerAssegna, ritira: isSpinnerRitira },
      },
      match: { params: { id: idLivello } },
    } = this.props;

    if (!versioneSelezionata || isSpinnerAssegna || isSpinnerRitira) {
      return false;
    }

    googleAnalyticsWrapper('event', {
      category: 'Versione',
      action: 'Esegui docente',
    });

    onInitializeEsecuzione({
      backUrl: `/versioni-livello-docente/${idLivello}/${versioneSelezionata.id}`,
      id: versioneSelezionata.id,
      isDocente: true,
      inCorso: false,
      history,
    });

    return true;
  }

  assegnaFunction = (versioneId) => {
    const {
      onModalSetData,
      onModalSetEmptyData,
      corsoSelezionato: { iscritti, pk: corsoId, nome: corsoNome },
      versioniLivello: {
        versioneSelezionata,
        versioniMissione,
        versioniAssegnate,
        spinnerSmall: { assegna: isSpinnerAssegna, ritira: isSpinnerRitira },
      },
      onVersioneAssegna,
    } = this.props;

    if (!versioneSelezionata || isSpinnerAssegna || isSpinnerRitira) {
      return false;
    }

    if (iscritti.length === 0) {
      let messaggio = 'Per assegnare una versione devi avere creato almeno una classe';
      if (corsoId > 0) {
        messaggio = `Non posso assegnare una versione ad una classe vuota (<strong>${corsoNome}</strong>)`;
      }
      onModalSetData({
        titolo: 'Assegnazione versione',
        contenuto: messaggio,
        show: true,
      });
    } else {
      onModalSetData({
        titolo: 'Assegnazione versione',
        contenuto: `Si desidera assegnare la versione <strong>${versioneSelezionata.titolo}</strong> alla classe <strong>${corsoNome}</strong>?`,
        acceptButton: {
          onClick: /* istanbul ignore next */ () => {
            onVersioneAssegna(
              versioneId,
              corsoId, {
                versioniAssegnate,
                versioniMissione,
              }
            );
            onModalSetEmptyData();
          },
        },
        show: true,
      });
    }

    return true;
  }

  ritiraFunction = (key) => {
    const {
      onModalSetData,
      onModalSetEmptyData,
      corsoSelezionato: { pk: idCorso, nome: nomeCorso },
      versioniLivello: {
        versioniAssegnate,
        spinnerSmall: { assegna: isSpinnerAssegna, ritira: isSpinnerRitira },
      },
      onVersioneRitira,
    } = this.props;

    if (!versioniAssegnate[key] || isSpinnerAssegna || isSpinnerRitira) {
      return false;
    }
    const versioneDaRitirare = versioniAssegnate[key];

    onModalSetData({
      titolo: 'Ritira versione',
      contenuto: `Si desidera ritirare la versione <strong>${versioneDaRitirare.titolo}</strong> per la classe <strong>${nomeCorso}</strong>?`,
      acceptButton: {
        onClick: /* istanbul ignore next */ () => {
          onVersioneRitira(versioneDaRitirare.id, idCorso, versioniAssegnate);
          onModalSetEmptyData();
        },
      },
      show: true,
    });

    return true;
  }

  visualizzaStatistiche = () => {
    const {
      match: { params: { id: livelloId } },
      history: { push },
      versioniLivello: {
        spinnerSmall: { assegna: isSpinnerAssegna, ritira: isSpinnerRitira },
      },
    } = this.props;

    if (isSpinnerAssegna || isSpinnerRitira) {
      return false;
    }

    push(`/versione-livello-statistiche/${livelloId}`);

    return true;
  }

  selezionaVersione = (data) => {
    const {
      onCreaVersioneSet,
      versioniLivello: {
        versioneSelezionata,
        spinnerSmall: { assegna: isSpinnerAssegna },
      },
    } = this.props;

    if (isSpinnerAssegna) {
      return false;
    }

    onCreaVersioneSet({
      versioneSelezionata: (versioneSelezionata || {}).id === data.id ? undefined : data,
    });

    return true;
  }

  render() {
    const {
      configuration,
      versioniLivello: {
        titolo,
        versioneSelezionata,
        versioniAssegnate,
        spinnerSmall,
        missioni,
        versioniMissione,
      },
      spinner,
      feedback,
    } = this.props;

    const conteggioStep = (versioneSelezionata || {}).totaleDomande || 0;

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            url: configuration.homePage,
            enabled: true,
          }}
          title={titolo}
          single
        />
        <Container>
          {spinner && <Spinner />}
          {!spinner && !feedback.hasFeedback && (
            <VersioniLivelloOverview
              visualizzaStatisticheFunction={this.visualizzaStatistiche}
              versioneSelezionata={versioneSelezionata}
              versioniAssegnate={versioniAssegnate}
              missioni={missioni}
              versioniMissione={versioniMissione}
              spinner={spinnerSmall}
              simulaFunction={this.simulaFunction}
              assegnaFunction={this.assegnaFunction}
              ritiraFunction={this.ritiraFunction}
              selezionaVersioneFunction={this.selezionaVersione}
              hasRisultati={versioniAssegnate.filter((v) => (v.ritirata)).length > 0}
              totaleDomande={conteggioStep}
              tempoEsecuzione={conteggioStep}
            />
          )}
          {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </Container>
      </Page>
    );
  }
}

VersioniDocenteView.propTypes = {
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
  corsoSelezionato: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    iscritti: PropTypes.array.isRequired,
  }).isRequired,
  versioniLivello: PropTypes.shape({
    spinnerSmall: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    titolo: PropTypes.string.isRequired,
    versioniAssegnate: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        titolo: PropTypes.string.isRequired,
        ritirata: PropTypes.bool.isRequired,
      })
    ).isRequired,
    versioneSelezionata: PropTypes.shape({

    }),
  }),
  onVersioneLivelloFetch: PropTypes.func.isRequired,
  onVersioneAssegna: PropTypes.func.isRequired,
  onVersioneRitira: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalSetEmptyData: PropTypes.func.isRequired,
  onInitializeEsecuzione: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onCreaVersioneSet: PropTypes.func.isRequired,
  userAppData: PropTypes.shape({
    hints: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  spinner: state.get('versioni').toJS().spinner,
  feedback: state.get('versioni').toJS().feedback,
  versioniLivello: state.get('versioni').toJS().livello,
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
});

function mapDispatchToProps(dispatch) {
  return {
    onCreaVersioneSet: (payload) => {
      dispatch(versioniLivelloSet(payload));
    },
    onVersioneLivelloFetch: (livelloId, isDocente, idCorso, idSelezionato) => {
      dispatch(versioniLivelloFetch(livelloId, isDocente, idCorso, idSelezionato));
    },
    onVersioneAssegna: (idVersione, idCorso, versioniLivelloData) => {
      dispatch(versioniVersioneAssegna(idVersione, idCorso, versioniLivelloData));
    },
    onVersioneRitira: (idVersione, idCorso, versioniAssegnate) => {
      dispatch(versioniVersioneRitira(idVersione, idCorso, versioniAssegnate));
    },
    onInitializeEsecuzione: (payload) => {
      dispatch(versioniVersioneEsecuzioneInitialize(payload));
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
)(VersioniDocenteView);
