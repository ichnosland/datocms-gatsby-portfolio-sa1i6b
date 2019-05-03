/*
 *
 * ModalBox actions test
 *
 */

import {
  modalSetData,
  modalSetEmptyData,
} from '../actions';
import {
  MODAL_SET_DATA,
  MODAL_SET_EMPTY_DATA,
} from '../constants';

describe('ModalBox actions', () => {
  it('provides a MODAL_SET_EMPTY_DATA action', () => {
    const expected = {
      type: MODAL_SET_DATA,
      payload: { data: 123 },
    };
    expect(modalSetData({ data: 123 })).toEqual(expected);
  });

  it('provides a MODAL_SET_EMPTY_DATA action', () => {
    const expected = {
      type: MODAL_SET_EMPTY_DATA,
    };
    expect(modalSetEmptyData()).toEqual(expected);
  });
});
