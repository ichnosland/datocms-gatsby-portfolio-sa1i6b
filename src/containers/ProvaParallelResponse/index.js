/**
 *
 * ProvaParallelResponse
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { provaParallelReset } from 'containers/ProvaParallel/actions';
import ResponseView from 'components/ResponseView';

import goodBg from './images/good.gif';


export class ProvaParallelResponseView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      esecuzione: { isLoaded, consegnata },
      history: { push },
      configuration,
    } = this.props;

    if (!isLoaded || !consegnata) {
      push(configuration.homePage);
    }
  }

  render() {
    const {
      history: { push },
      configuration: { homePage, product },
      onPurgeProvaParallel,
    } = this.props;

    return (
      <ResponseView
        votoApprossimato={10}
        goodSrc={goodBg}
        titolo="Hai completato la prova"
        nascondiVoto
        resetFunction={() => {
          onPurgeProvaParallel();
          push(homePage); // FIXME
        }}
        product={product}
      />
    );
  }
}

ProvaParallelResponseView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
  esecuzione: PropTypes.shape({
    consegnata: PropTypes.bool.isRequired,
  }).isRequired,
  onPurgeProvaParallel: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onPurgeProvaParallel: () => {
    dispatch(provaParallelReset());
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  esecuzione: state.get('provaParallel').toJS().esecuzione,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const connectData = compose(
  withConnect,
)(ProvaParallelResponseView);

export default connectData;
