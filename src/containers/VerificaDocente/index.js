/**
 *
 * VerificheDocenteView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { googleAnalyticsWrapper } from 'common/utils';
import {
  verificaLivelloFetch,
  verificaLivelloSet,
  verificaAssegna,
  verificaRitira,
  verificaLivelloProvaTrigger,
} from 'containers/Verifica/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { watchDownloadProtetti } from 'containers/DownloadProtetti/saga';
import { downloadProtettiFetch } from 'containers/DownloadProtetti/actions';

import VerificheLivelloOverview from './VerificheLivelloDocenteOverview';
import { verificheCartacee } from './verificheCartacee';


export class VerificheDocenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      onVerificaLivelloFetch,
      corsoSelezionato,
      match: { params: { id, idsUnita = '', soloLatino = 'F' } },
    } = this.props;

    onVerificaLivelloFetch(
      id,
      true,
      corsoSelezionato.pk,
      idsUnita.split('-').filter((uu) => (uu)).map((u) => parseInt(u, 10)),
      soloLatino === 'T'
    );
  }

  componentDidUpdate(prevProps) {
    const {
      onVerificaLivelloFetch,
      corsoSelezionato,
      match: { params: { id, idsUnita = '', soloLatino = 'F' } },
    } = this.props;

    if (prevProps.corsoSelezionato.pk !== corsoSelezionato.pk) {
      onVerificaLivelloFetch(
        id,
        true,
        corsoSelezionato.pk,
        idsUnita.split('-').filter((uu) => (uu)).map((u) => parseInt(u, 10)),
        soloLatino === 'T'
      );
    }
  }

  simulaFunction = () => {
    const {
      onVerificaStepProvaTrigger,
      verificaLivello: { datiVerifica: { soloLatino, unitaSelezionate }, titolo },
      history,
      dispatch,
      userAnagraphics: { id },
      configuration: { product },
      userAppData: { hints, enableSuoni },
      match: { params: { id: livelloId } },
    } = this.props;

    googleAnalyticsWrapper('event', {
      category: 'Verifica',
      action: 'Esegui docente',
    });

    onVerificaStepProvaTrigger({
      backUrl: `/verifiche-livello-docente/${livelloId}/${soloLatino ? 'T' : 'F'}/${unitaSelezionate.join('-')}`,
      userHints: hints,
      livelloId,
      history,
      dispatch,
      product,
      userId: id,
      soloLatino,
      unitaSelezionate,
      titolo,
      enableSuoni,
    });
  }

  assegnaFunction = () => {
    const {
      onModalSetData,
      onModalSetEmptyData,
      corsoSelezionato,
      verificaLivello: { datiVerifica: { soloLatino, unitaSelezionate }, unita },
      onVerificaAssegna,
      match: { params: { id: livelloId } },
    } = this.props;

    if (!unitaSelezionate.length) {
      return false;
    }


    if (corsoSelezionato.iscritti.length === 0) {
      let messaggio = 'Per assegnare una verifica devi avere creato almeno una classe';
      if (corsoSelezionato.pk > 0) {
        messaggio = `Non posso assegnare una verifica ad una classe vuota (<strong>${corsoSelezionato.nome}</strong>)`;
      }
      onModalSetData({
        titolo: 'Assegnazione verifica',
        contenuto: messaggio,
        show: true,
      });
    } else {
      onModalSetData({
        titolo: 'Assegnazione verifica',
        contenuto: `Si desidera creare e assegnare una nuova verifica contenente le seguenti unità:<ul class="fake-table">${
          unita.filter((u) => (unitaSelezionate.indexOf(u.id) > -1)).map((u) => (`<li>${u.nome}</li>`)).join('')
        }</ul> alla classe <strong>${
          corsoSelezionato.nome
        }</strong>, con traduzione di tipo <strong>${
          soloLatino ? 'solo dal latino' : 'latino e italiano'
        }</strong>?`,
        acceptButton: {
          onClick: /* istanbul ignore next */ () => {
            onVerificaAssegna({
              livelloId,
              corsoId: corsoSelezionato.pk,
              soloLatino,
              unita: unitaSelezionate,
            });
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
      corsoSelezionato,
      verificaLivello: { verificheAssegnate, titolo },
      onVerificaRitira,
    } = this.props;

    if (!verificheAssegnate[key]) {
      return false;
    }
    const verificaDaRitirare = verificheAssegnate[key];

    onModalSetData({
      titolo: 'Ritira verifica',
      contenuto: `Si desidera ritirare la verifica <strong>${titolo}</strong> per la classe <strong>${corsoSelezionato.nome}</strong>?`,
      acceptButton: {
        onClick: /* istanbul ignore next */ () => {
          onVerificaRitira(verificaDaRitirare.id, verificheAssegnate);
          onModalSetEmptyData();
        },
      },
      show: true,
    });

    return true;
  }

  aggiungiUnita = (unitaId) => {
    const {
      onCreaVerificaSet,
      verificaLivello: { datiVerifica: { unitaSelezionate, soloLatino } },
    } = this.props;

    onCreaVerificaSet({
      soloLatino,
      unitaSelezionate: unitaSelezionate.indexOf(unitaId) > -1 ?
        unitaSelezionate.filter((u) => (u !== unitaId)) :
        [...unitaSelezionate, unitaId],
    });
  }

  toggleSoloLatino = (value) => {
    const {
      onCreaVerificaSet,
      verificaLivello: { datiVerifica: { unitaSelezionate } },
    } = this.props;

    onCreaVerificaSet({
      soloLatino: value,
      unitaSelezionate,
    });
  }

  visualizzaStatistiche = () => {
    const {
      match: { params: { id: livelloId } },
      history: { push },
      verificaLivello: {
        spinnerSmall: { assegna: isSpinnerAssegna, ritira: isSpinnerRitira },
      },
    } = this.props;

    if (isSpinnerAssegna || isSpinnerRitira) {
      return false;
    }

    push(`/verifiche-livello-statistiche/${livelloId}`);

    return true;
  }

  render() {
    const {
      configuration: { homePage, product, hasLatino },
      verificaLivello: {
        titolo,
        datiVerifica,
        verificheAssegnate,
        spinnerSmall,
        unita,
      },
      spinner,
      feedback,
      match: { params: { id: livelloId } },
      onDownloadProtetti,
    } = this.props;

    const conteggioStep = unita
      .filter((u) => (datiVerifica.unitaSelezionate.indexOf(u.id) > -1))
      .reduce((acc, u) => (acc + u.domande[`conteggio_${datiVerifica.soloLatino ? 'lat_ita' : 'totale'}`]), 0);

    let cartacee = [];
    if (verificheCartacee[product]) {
      const livelloInt = parseInt(livelloId, 10);
      cartacee = verificheCartacee[product][livelloInt] || [];
    }

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            url: homePage,
            enabled: true,
          }}
          title="Prova di verifica"
          single
        />
        <Container>
          {spinner && <Spinner />}
          {!spinner && !feedback.hasFeedback && (
            <VerificheLivelloOverview
              titolo={titolo}
              datiVerifica={datiVerifica}
              verificheAssegnate={verificheAssegnate}
              spinner={spinnerSmall}
              unita={unita}
              simulaFunction={this.simulaFunction}
              assegnaFunction={this.assegnaFunction}
              ritiraFunction={this.ritiraFunction}
              visualizzaStatisticheFunction={this.visualizzaStatistiche}
              aggiungiUnitaFunction={this.aggiungiUnita}
              verificheCartacee={cartacee}
              downloadProtettiFunction={onDownloadProtetti}
              hasRisultati={verificheAssegnate.filter((v) => (v.ritirata)).length > 0}
              toggleSoloLatinoFunction={this.toggleSoloLatino}
              totaleDomande={conteggioStep}
              tempoEsecuzione={conteggioStep}
              unitaAssegnate={datiVerifica.unitaSelezionate.length}
              switcherLingua={!!hasLatino}
            />
          )}
          {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </Container>
      </Page>
    );
  }
}

VerificheDocenteView.propTypes = {
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
    hasLatino: PropTypes.bool,
    product: PropTypes.string.isRequired,
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
  verificaLivello: PropTypes.shape({
    spinnerSmall: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    titolo: PropTypes.string.isRequired,
    // TODO: applicarla alla selezione delle unità se va mantenuta
    unitSelectionEnabled: PropTypes.bool.isRequired,
    unita: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        domande: PropTypes.shape({
          conteggio_lat_ita: PropTypes.number.isRequired,
          conteggio_totale: PropTypes.number.isRequired,
        }).isRequired,
        assegnata: PropTypes.bool.isRequired,
      })
    ).isRequired,
    verificheAssegnate: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        titolo: PropTypes.string.isRequired,
        solo_latino: PropTypes.bool.isRequired,
        ritirata: PropTypes.bool.isRequired,
        unita: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            nome: PropTypes.string.isRequired,
            domande: PropTypes.shape({
              conteggio_lat_ita: PropTypes.number.isRequired,
              conteggio_totale: PropTypes.number.isRequired,
            }).isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    datiVerifica: PropTypes.shape({
      soloLatino: PropTypes.bool.isRequired,
      unitaSelezionate: PropTypes.array.isRequired,
    }).isRequired,
  }),
  onVerificaLivelloFetch: PropTypes.func.isRequired,
  onVerificaAssegna: PropTypes.func.isRequired,
  onVerificaRitira: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalSetEmptyData: PropTypes.func.isRequired,
  onVerificaStepProvaTrigger: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onCreaVerificaSet: PropTypes.func.isRequired,
  onDownloadProtetti: PropTypes.func.isRequired,
  userAppData: PropTypes.shape({
    hints: PropTypes.object.isRequired,
    enableSuoni: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  spinner: state.get('verifiche').toJS().spinner,
  feedback: state.get('verifiche').toJS().feedback,
  verificaLivello: state.get('verifiche').toJS().livello,
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCreaVerificaSet: (payload) => {
      dispatch(verificaLivelloSet({
        datiVerifica: payload,
      }));
    },
    onVerificaLivelloFetch: (...data) => {
      dispatch(verificaLivelloFetch(...data));
    },
    onVerificaAssegna: (payload) => {
      dispatch(verificaAssegna(payload));
    },
    onVerificaRitira: (idVerifica, verificheAssegnate) => {
      dispatch(verificaRitira(idVerifica, verificheAssegnate));
    },
    onVerificaStepProvaTrigger: (payload) => {
      dispatch(verificaLivelloProvaTrigger(payload));
    },
    onDownloadProtetti: (slug) => {
      dispatch(downloadProtettiFetch(slug, window.open('', '_blank')));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalSetEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
  };
}

const withSaga = injectSaga({ key: 'downloadProtetti', saga: watchDownloadProtetti });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(VerificheDocenteView);
