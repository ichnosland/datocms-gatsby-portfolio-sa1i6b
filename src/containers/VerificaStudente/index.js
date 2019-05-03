/**
 *
 * VerificheStudenteView
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
  verificaStepInitialize,
} from 'containers/Verifica/actions';
import { watchDownloadProtetti } from 'containers/DownloadProtetti/saga';

import VerificheLivelloOverview from './VerificheLivelloStudenteOverview';


export class VerificheStudenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onVerificaLivelloFetch, match } = this.props;

    onVerificaLivelloFetch(match.params.id, false);
  }

  eseguiFunction = (id) => {
    const {
      onVerificaStepInitialize,
      history: { push: historyPush },
      dispatch,
      configuration: { product },
      userAppData: { hints, enableSuoni },
      userAnagraphics: { id: userId },
      match: { params: { id: livelloId } },
    } = this.props;

    googleAnalyticsWrapper('event', {
      category: 'Verifica',
      action: 'Esegui studente',
    });

    onVerificaStepInitialize({
      backUrl: `/verifiche-livello/${livelloId}`,
      id,
      isDocente: false,
      userHints: hints,
      historyPush,
      dispatchFunction: dispatch,
      productName: product,
      userId,
      livelloId: parseInt(livelloId, 10),
      enableSuoni,
    });
  }

  visualizzaStatistiche = () => {
    const {
      match: { params: { id: livelloId } },
      history,
    } = this.props;

    history.push(
      `/verifiche-livello-statistiche/${livelloId}`
    );
  }

  render() {
    const {
      configuration,
      verificaLivello: {
        verificheAssegnate,
        isLoaded,
      },
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
          title="Prova di verifica"
          single
        />
        <Container>
          {(spinner || !isLoaded) && <Spinner />}
          {!spinner && isLoaded && !feedback.hasFeedback && (
            <VerificheLivelloOverview
              verificheAssegnate={verificheAssegnate}
              eseguiFunction={this.eseguiFunction}
              visualizzaStatisticheFunction={this.visualizzaStatistiche}
            />
          )}
          {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </Container>
      </Page>
    );
  }
}

VerificheStudenteView.propTypes = {
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
  verificaLivello: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    titolo: PropTypes.string.isRequired,
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
  }),
  onVerificaLivelloFetch: PropTypes.func.isRequired,
  onVerificaStepInitialize: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
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
    onVerificaLivelloFetch: (livelloId, isStudente, idCorso) => {
      dispatch(verificaLivelloFetch(livelloId, isStudente, idCorso));
    },
    onVerificaStepInitialize: (payload) => {
      dispatch(verificaStepInitialize(payload));
    },
  };
}

const withSaga = injectSaga({ key: 'downloadProtetti', saga: watchDownloadProtetti });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(VerificheStudenteView);
