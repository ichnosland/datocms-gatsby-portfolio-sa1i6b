/*
 *
 * ModalBox reducer
 *
 */

import { fromJS } from 'immutable';
import {
  MODAL_SET_DATA,
  MODAL_SET_EMPTY_DATA,
} from './constants';

export const initialState = fromJS({
  titolo: '',
  contenuto: '',
  show: false,
  acceptButton: undefined,
  closeButton: undefined,
  disableClose: false,
  isPopup: true,
});

function modalBoxReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_SET_DATA:
      return initialState.merge(action.payload);
    case MODAL_SET_EMPTY_DATA:
      return initialState;
    default:
      return state;
  }
}

export default modalBoxReducer;
