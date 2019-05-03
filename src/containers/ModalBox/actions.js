/*
 *
 * ModalBox actions
 *
 */

import {
  MODAL_SET_EMPTY_DATA,
  MODAL_SET_DATA,
} from './constants';

export function modalSetData(payload) {
  return {
    type: MODAL_SET_DATA,
    payload,
  };
}

export function modalSetEmptyData() {
  return {
    type: MODAL_SET_EMPTY_DATA,
  };
}
