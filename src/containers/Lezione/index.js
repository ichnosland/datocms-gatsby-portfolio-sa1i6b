/**
 *
 * Lezione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import Div from 'components/Div';
import { H2 } from 'components/Heading';
import lezioneReducer from 'containers/Lezione/reducer';
import { lezioneWatch } from 'containers/Lezione/saga';
import { HtmlStyles } from 'style/HtmlStylesLezione';
import { lezioneDataFetch } from './actions';
import Carosello from './Carosello';

export const HtmlText = styled(Div)`
  ${HtmlStyles};
  table {
    th {
      background-color: ${(props) => props.theme.brand};
    }
  }
`;

HtmlText.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};



export class LezioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onDataFetch, match: { params: { id } } } = this.props;
    onDataFetch(id);
  }

  calcolaContenuto = (item) => {
    const { testoData: { tabelle } } = this.props;
    switch (item.type) {
      default:
        return item.content;
      case 'html':
        return React.createElement('span', {
          dangerouslySetInnerHTML: { __html: item.content },
          key: `html_${item.key}`,
        });
      case 'carosello':
        return React.createElement(Carosello, {
          tabelle: (tabelle[item.carosello] || []).map((tabella, key) => ({
            ...tabella,
            key: `${item.key}_${key}`,
          })),
          key: `carosello_${item.key}`,
        });
    }
  }

  render() {
    const {
      testoData: { titolo, contenuto, unitaId },
      match: { params: { source } },
      error,
      spinner,
      history,
    } = this.props;

    return (
      <Page>
        <TopBar
          pinned
          closeBtn={{
            onClickFunction: () => {
              history.push(
                source === 'unita-esecuzione' ?
                  '/unita-esecuzione' :
                  `/unita-preview/${unitaId}`
              );
            },
            enabled: true,
          }}
          title="Lezione"
          single
        />
        {spinner ?
          <Container>
            <Spinner />
          </Container> :
          <Container>
            {!error.hasErrors ? (
              <HtmlText>
                <H2 margin="0 0 1em">{titolo}</H2>
                {contenuto.map((c) => this.calcolaContenuto(c))}
              </HtmlText>
            ) :
              <AlertBanner actioncolor="error">{error.errorMessage}</AlertBanner>
            }
          </Container>
        }
      </Page>
    );
  }
}

LezioneView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  testoData: PropTypes.shape({
    titolo: PropTypes.string.isRequired,
    contenuto: PropTypes.array.isRequired,
  }).isRequired,
  error: PropTypes.shape({
    hasErrors: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }).isRequired,
  spinner: PropTypes.bool.isRequired,
  onDataFetch: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  testoData: state.get('lezione').toJS().testoData,
  titolo: state.get('lezione').toJS().titolo,
  spinner: state.get('lezione').toJS().spinner,
  error: state.get('lezione').toJS().error,
});

function mapDispatchToProps(dispatch) {
  return {
    onDataFetch: (filtro) => {
      dispatch(lezioneDataFetch(filtro));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withLezioneReducer = injectReducer({ key: 'lezione', reducer: lezioneReducer });
const withLezioneSaga = injectSaga({ key: 'lezione', saga: lezioneWatch });

export default compose(
  withLezioneReducer,
  withLezioneSaga,
  withConnect
)(LezioneView);
