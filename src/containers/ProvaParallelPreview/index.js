/**
 *
 * ProvaParallelPreviewView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import HtmlInjector from 'components/NewListPanels/HtmlInjector';
import ContenutoStep from 'containers/CreaVerifiche/ContenutoStep';

import { ListPanelHeader } from 'components/NewListPanels';
import { provaParallelPreviewFetch } from 'containers/ProvaParallel/actions';

export class ProvaParallelPreviewView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      onProvaParallelPreviewFetch,
      match: { params: { id } },
    } = this.props;

    onProvaParallelPreviewFetch(parseInt(id, 10)); // FIXME
  }

  render() {
    const {
      preview: {
        titolo: titoloProva,
        id,
        steps,
      },
      spinner,
      feedback: {
        errorMessage,
        hasFeedback,
        tipologia,
      },
    } = this.props;

    return (
      <div key={`preview_${id}`}>
        <TopBar
          pinned
          backNav={{
            url: `/prova-parallel/${id}`,
            enabled: true, // FIXME
          }}
          title="Prova Parallel: preview"
          single
        />
        {spinner ? (
          <Container>
            <Spinner />
          </Container>
        ) :
          (
            <Container padding="64px 20px 30px 34px">
              {hasFeedback ? (
                <AlertBanner
                  actioncolor={tipologia}
                >
                  {errorMessage}
                </AlertBanner>
              ) :
                ([
                  <ListPanelHeader key="header">
                    {titoloProva}
                  </ListPanelHeader>,
                  steps.map((step) => ([
                    <HtmlInjector
                      key={`testo_${step.key}`}
                      text={ContenutoStep(step)}
                    />,
                    <HtmlInjector
                      key={`soluzione_${step.key}`}
                      note
                      text={`
                        <div class="consegna">
                          <span class="consegna__titolo">Esempio di risposta corretta</span>
                          ${step.soluzioneTestuale}
                        </div>
                      `}
                    />,
                  ]
                  )),
                ])}
            </Container>
          )}
      </div>
    );
  }
}

ProvaParallelPreviewView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  preview: PropTypes.shape({
    isLoaded: PropTypes.bool,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      soluzioneTestuale: PropTypes.string.isRequired,
      consegna: PropTypes.string.isRequired,
      opzioni: PropTypes.arrayOf(PropTypes.string).isRequired,
      soluzioni: PropTypes.array.isRequired,
      tipo: PropTypes.string.isRequired,
      titolo: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onProvaParallelPreviewFetch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  spinner: state.get('provaParallel').toJS().spinner,
  feedback: state.get('provaParallel').toJS().feedback,
  preview: state.get('provaParallel').toJS().preview,
  step: state.get('provaParallel').toJS().step,
});

function mapDispatchToProps(dispatch) {
  return {
    onProvaParallelPreviewFetch: (id) => {
      dispatch(provaParallelPreviewFetch(id));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ProvaParallelPreviewView);
