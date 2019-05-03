/**
 *
 * ProvaCompetenzaResponse
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { provaCompetenzaReset } from 'containers/ProvaCompetenza/actions';
import { round } from 'common/utils';
import ResponseView from 'components/ResponseView';

import goodBg from './images/good.gif';
import badBg from './images/bad.gif';


export class ProvaCompetenzaResponseView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { contenutoProva, history, configuration } = this.props;

    if (!contenutoProva.isLoaded || !contenutoProva.consegnata) {
      history.push(configuration.homePage);
    }
  }

  render() {
    const {
      contenutoProva,
      history,
      configuration,
      onPurgeProvaCompetenza,
    } = this.props;
    const votoApprossimato = round(contenutoProva.voto, 2);

    return (
      <ResponseView
        votoApprossimato={votoApprossimato}
        goodSrc={goodBg}
        badSrc={badBg}
        resetFunction={() => {
          onPurgeProvaCompetenza();
          history.push(configuration.homePage);
        }}
        product={configuration.product}
      />
    );
  }
}

ProvaCompetenzaResponseView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
  contenutoProva: PropTypes.shape({
    consegnata: PropTypes.bool.isRequired,
  }).isRequired,
  onPurgeProvaCompetenza: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onPurgeProvaCompetenza: () => {
    dispatch(provaCompetenzaReset());
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  spinner: state.get('provaCompetenza').toJS().spinner,
  feedback: state.get('provaCompetenza').toJS().feedback,
  contenutoProva: state.get('provaCompetenza').toJS().contenuto,
  step: state.get('provaCompetenza').toJS().step,
  risposta: state.get('provaCompetenza').toJS().risposta,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const connectData = compose(
  withConnect,
)(ProvaCompetenzaResponseView);

export default connectData;
