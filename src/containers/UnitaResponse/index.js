/**
 *
 * UnitaResponse
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { unitaReset } from 'containers/Unita/actions';
import ResponseView from 'components/ResponseView';
import goodBg from './images/good.gif';


export class UnitaResponseView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      contenutoUnita: { isLoaded, id, consegnata },
      history,
      configuration: { homePage },
    } = this.props;

    if (!isLoaded || !consegnata) {
      history.push(id > 0 ? `/unita-preview/${id}` : homePage);
    }
  }

  render() {
    const {
      history,
      configuration,
      onPurgeUnita,
      contenutoUnita: { id, lezioni: { completate, totali } },
      userAppData: { docente },
    } = this.props;

    return (
      <ResponseView
        votoApprossimato={10}
        goodSrc={goodBg}
        nascondiVoto
        resetFunction={() => {
          onPurgeUnita();
          history.push(`/unita-preview/${id}`);
        }}
        titolo="Hai completato la lezione"
        steps={!docente}
        lezioniCompletate={completate}
        lezioniTotali={totali}
        product={configuration.product}
      />
    );
  }
}

UnitaResponseView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
  contenutoUnita: PropTypes.shape({
    consegnata: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    lezioni: PropTypes.shape({
      totali: PropTypes.number.isRequired,
      completate: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onPurgeUnita: PropTypes.func.isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }).isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onPurgeUnita: () => {
    dispatch(unitaReset());
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  spinner: state.get('unita').toJS().spinner,
  feedback: state.get('unita').toJS().feedback,
  contenutoUnita: state.get('unita').toJS().contenuto,
  step: state.get('unita').toJS().step,
  risposta: state.get('unita').toJS().risposta,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const connectData = compose(
  withConnect,
)(UnitaResponseView);

export default connectData;
