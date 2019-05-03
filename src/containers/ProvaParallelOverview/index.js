/**
 *
 * ProvaParallelOvervewView
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
import { provaParallelOverviewFetch } from 'containers/ProvaParallel/actions';


export class ProvaParallelOvervewView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      onProvaParallelOverviewFetch,
      match: { params: { id } },
    } = this.props;

    onProvaParallelOverviewFetch(parseInt(id, 10)); // FIXME
  }

  eseguiFunction = () => {
    const {
      match: { params: { id } },
      history: { push },
    } = this.props;

    push(`/prova-parallel-esecuzione/${id}`);
  }

  previewFunction = () => {
    const {
      match: { params: { id } },
      history: { push },
    } = this.props;

    push(`/prova-parallel-preview/${id}`);
  }

  render() {
    const {
      configuration,
      overview: {
        totaleDomande,
        titolo,
        testo,
        autore,
        fonte,
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
          title="Prova Parallel"
          single
        />
        <Container>
          {spinner && <Spinner />}
          {!spinner && !feedback.hasFeedback && (
            <EsecuzioneOverview
              isDocente
              isAssegnata={false}
              isRitirata={false}
              totaleDomande={totaleDomande}
              tempoEsecuzione={totaleDomande}
              titolo={titolo}
              testo={testo}
              autore={autore}
              fonte={fonte}
              eseguiSimulaFx={this.eseguiFunction}
              previewFx={this.previewFunction}
            />
          )}
          {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </Container>
      </Page>
    );
  }
}

ProvaParallelOvervewView.propTypes = {
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
  overview: PropTypes.shape({
    isLoaded: PropTypes.bool,
    consegnata: PropTypes.bool,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string,
    autore: PropTypes.string,
    fonte: PropTypes.string,
    sottotitolo: PropTypes.string,
    testo: PropTypes.string,
    totaleDomande: PropTypes.number,
  }).isRequired,
  onProvaParallelOverviewFetch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  spinner: state.get('provaParallel').toJS().spinner,
  feedback: state.get('provaParallel').toJS().feedback,
  overview: state.get('provaParallel').toJS().overview,
  step: state.get('provaParallel').toJS().step,
});

function mapDispatchToProps(dispatch) {
  return {
    onProvaParallelOverviewFetch: (id) => {
      dispatch(provaParallelOverviewFetch(id));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ProvaParallelOvervewView);
