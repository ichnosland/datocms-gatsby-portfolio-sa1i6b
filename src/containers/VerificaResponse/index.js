/**
 *
 * VerificaResponse
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { verificaReset } from 'containers/Verifica/actions';
import ResponseView from 'components/ResponseView';
import { round } from 'common/utils';
import goodBg from './images/good.gif';
import badBg from './images/bad.gif';

export class VerificaResponseView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { verificaCaricata: { isLoaded, consegnata }, history, configuration } = this.props;

    if (!isLoaded || !consegnata) {
      history.push(configuration.homePage);
    }
  }

  render() {
    const {
      verificaCaricata: { voto, backUrl },
      history: { push },
      configuration,
      onResetVerifica,
    } = this.props;
    const votoApprossimato = round(voto, 2);

    return (
      <ResponseView
        votoApprossimato={votoApprossimato}
        goodSrc={goodBg}
        badSrc={badBg}
        resetFunction={() => {
          onResetVerifica();
          push(backUrl);
        }}
        product={configuration.product}
      />
    );
  }
}

VerificaResponseView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
  verificaCaricata: PropTypes.shape({
    consegnata: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    voto: PropTypes.number.isRequired,
    backUrl: PropTypes.string.isRequired,
  }),
  onResetVerifica: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  onResetVerifica: () => {
    dispatch(verificaReset());
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  verificaCaricata: state.get('verifiche').toJS().contenuto,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const connectData = compose(
  withConnect,
)(VerificaResponseView);

export default connectData;
