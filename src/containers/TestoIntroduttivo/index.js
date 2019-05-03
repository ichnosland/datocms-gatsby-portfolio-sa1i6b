/**
 *
 * TestoIntroduttivo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { H1 } from 'components/Heading';
import Div from 'components/Div';
import testoIntroduttivoReducer from 'containers/TestoIntroduttivo/reducer';
import { testoIntroduttivoWatch } from 'containers/TestoIntroduttivo/saga';
import { HtmlStyles } from 'style/HtmlStylesLezione';
import { testoIntroduttivoDataFetch } from './actions';

export const HtmlText = styled(Div)`
  ${HtmlStyles};
`;

HtmlText.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export class TestoIntroduttivoView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onDataFetch, match } = this.props;
    onDataFetch(match.params.id);
  }

  render() {
    const { testoIntroduttivo, history, configuration } = this.props;
    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            onClickFunction: () => { history.push(configuration.homePage); },
            enabled: true,
          }}
          title="Lezione"
          single
        />
        {testoIntroduttivo.spinner ?
          <Container>
            <Spinner />
          </Container> :
          <Container>
            {!testoIntroduttivo.error.hasErrors ? (
              <div>
                <H1 margin="0 0 1em">{testoIntroduttivo.testoData.titolo}</H1>
                <HtmlText
                  dangerouslySetInnerHTML={{
                    __html: testoIntroduttivo.testoData.testo,
                  }}
                />
              </div>
            ) : <AlertBanner actioncolor="error">{testoIntroduttivo.error.errorMessage}</AlertBanner>}
          </Container>}
      </Page>
    );
  }
}

TestoIntroduttivoView.propTypes = {
  testoIntroduttivo: PropTypes.shape({
    spinner: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      hasErrors: PropTypes.bool.isRequired,
      errorMessage: PropTypes.string.isRequired,
    }),
    testoData: PropTypes.shape({
      titolo: PropTypes.string.isRequired,
      testo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onDataFetch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export const mapStateToProps = (state) => ({
  testoIntroduttivo: state.get('testoIntroduttivo').toJS(),
  configuration: state.get('configuration').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDataFetch: (filtro) => {
      dispatch(testoIntroduttivoDataFetch(filtro));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withTestoIntroduttivoReducer = injectReducer({ key: 'testoIntroduttivo', reducer: testoIntroduttivoReducer });
const withTestoIntroduttivoSaga = injectSaga({ key: 'testoIntroduttivo', saga: testoIntroduttivoWatch });

export default compose(
  withTestoIntroduttivoReducer,
  withTestoIntroduttivoSaga,
  withConnect
)(TestoIntroduttivoView);
