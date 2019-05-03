/**
 *
 * ModalBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import Modal from 'components/Modal';
import PopUp from 'components/PopUp';
import { modalSetEmptyData } from './actions';
import reducer from './reducer';

export class ModalBoxView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { history, onModalEmptyData } = props;

    /**
     * Ho bisogno di fare una listen della history per
     * poter chiudere il popup se sto cambiando pagina usando
     * i tasti prev / next del browser
     */
    this.historyCancel = history.listen(/* istanbul ignore next */ () => onModalEmptyData());
  }

  componentWillUnmount() {
    this.historyCancel();
  }

  render() {
    const { modal, onModalEmptyData } = this.props;
    if (!modal.show) {
      return null;
    }

    const modalProps = {
      ...modal,
      closeButton: modal.disableClose ? null : {
        onClick: onModalEmptyData,
        ...modal.closeButton || {},
      },
    };

    return (
      modal.isPopup ? <PopUp {...modalProps} /> : <Modal {...modalProps} />
    );
  }
}

ModalBoxView.propTypes = {
  modal: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    titolo: PropTypes.string,
    image: PropTypes.object,
    contenuto: PropTypes.any,
    closeButton: PropTypes.object,
    disableClose: PropTypes.bool,
    isPopup: PropTypes.bool.isRequired,
  }).isRequired,
  onModalEmptyData: PropTypes.func,
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.get('modalBox').toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  onModalEmptyData: () => {
    dispatch(modalSetEmptyData());
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'modalBox', reducer });

export default compose(
  withReducer,
  withConnect,
)(ModalBoxView);
