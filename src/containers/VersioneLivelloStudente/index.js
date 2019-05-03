/**
 *
 * VersioniStudenteView
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
import { versioniLivelloFetch, versioniVersioneEsecuzioneInitialize } from 'containers/Versioni/actions';

import VersioniLivelloOverview from './LivelloStudenteOverview';


export class VersioniStudenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onVersioneLivelloFetch, match } = this.props;

    onVersioneLivelloFetch(match.params.id, false);
  }

  eseguiFunction = (data) => {
    const {
      onInitializeEsecuzione,
      history,
      dispatch,
      configuration: { product },
      userAppData: { hints },
      userAnagraphics: { id: userId },
      match: { params: { id: livelloId } },
    } = this.props;

    googleAnalyticsWrapper('event', {
      category: 'Versione',
      action: 'Esegui studente',
    });

    onInitializeEsecuzione({
      backUrl: `/versioni-livello/${livelloId}`,
      id: data.assegnazione,
      isDocente: false,
      userHints: hints,
      history,
      dispatchFunction: dispatch,
      productName: product,
      inCorso: data.in_corso,
      userId,
    });
  }

  visualizzaStatistiche = () => {
    const {
      match: { params: { id: livelloId } },
      history,
    } = this.props;

    history.push(
      `/versione-livello-statistiche/${livelloId}`
    );
  }

  render() {
    const {
      configuration,
      versioniLivello: {
        versioniAssegnate,
        isLoaded,
        titolo,
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
          title={titolo}
          single
        />
        <Container>
          {(spinner || !isLoaded) && <Spinner />}
          {!spinner && isLoaded && !feedback.hasFeedback && (
            <VersioniLivelloOverview
              versioniAssegnate={versioniAssegnate}
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

VersioniStudenteView.propTypes = {
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
  versioniLivello: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    titolo: PropTypes.string.isRequired,
    versioniAssegnate: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        titolo: PropTypes.string.isRequired,
        ritirata: PropTypes.bool.isRequired,
        consegnata: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }),
  onVersioneLivelloFetch: PropTypes.func.isRequired,
  onInitializeEsecuzione: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onVersioneLivelloFetch: (livelloId, isStudente, idCorso) => {
      dispatch(versioniLivelloFetch(livelloId, isStudente, idCorso));
    },
    onInitializeEsecuzione: (payload) => {
      dispatch(versioniVersioneEsecuzioneInitialize(payload));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(VersioniStudenteView);
