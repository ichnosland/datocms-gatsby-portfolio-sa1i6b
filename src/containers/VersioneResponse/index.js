/**
 *
 * VersioneResponse
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { versioniPurgeTrigger } from 'containers/Versioni/actions';
import ResponseView from 'components/ResponseView';
import { round } from 'common/utils';
import goodBg from './images/good.gif';
import badBg from './images/bad.gif';

export class VersioneResponseView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { versioneCaricata, history, configuration } = this.props;

    if (!versioneCaricata.isEsecuzioneLoaded || !versioneCaricata.isConsegnata) {
      history.push(configuration.homePage);
    }
  }

  render() {
    const {
      versioneAvanzamento,
      versioneCaricata: { backUrl },
      history,
      configuration,
      onPurgeVersione,
    } = this.props;
    const votoApprossimato = round(versioneAvanzamento.votoFinale, 2);

    return (
      <ResponseView
        votoApprossimato={votoApprossimato}
        goodSrc={goodBg}
        badSrc={badBg}
        resetFunction={() => {
          onPurgeVersione();
          history.push(backUrl);
        }}
        product={configuration.product}
      />
    );
  }
}

VersioneResponseView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
  versioneCaricata: PropTypes.shape({
    titolo: PropTypes.string.isRequired,
    isConsegnata: PropTypes.bool.isRequired,
  }),
  versioneAvanzamento: PropTypes.shape({
    votoFinale: PropTypes.number.isRequired,
  }),
  onPurgeVersione: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  onPurgeVersione: () => {
    dispatch(versioniPurgeTrigger());
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  versioneAvanzamento: state.get('versioni').toJS().versioneAvanzamento,
  versioneCaricata: state.get('versioni').toJS().versioneCaricata,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const connectData = compose(
  withConnect,
)(VersioneResponseView);

export default connectData;
