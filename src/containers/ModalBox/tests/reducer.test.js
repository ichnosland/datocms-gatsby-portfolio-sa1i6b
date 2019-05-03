
import { fromJS } from 'immutable';

import modalBoxReducer, { initialState } from '../reducer';
import { modalSetData, modalSetEmptyData } from '../actions';

describe('modalBoxReducer', () => {
  it('returns the initial state', () => {
    expect(
      modalBoxReducer(undefined, { type: undefined })
    ).toEqual(initialState);
  });

  it('returns the modified state when MODAL_SET_DATA is called', () => {
    const mockNewProps = {
      titolo: 'nuovo titolo',
      contenuto: 'nuovo contenuto',
    };

    expect(
      modalBoxReducer(
        undefined, modalSetData(mockNewProps)
      ).toJS()
    ).toEqual({
      ...initialState.toJS(),
      ...mockNewProps,
    });
  });

  it('returns the modified state when MODAL_SET_EMPTY_DATA is called', () => {
    const mockNewProps = {
      titolo: 'vecchio titolo',
      contenuto: 'vecchio contenuto',
      show: true,
      enableOnClose: false,
    };

    expect(modalBoxReducer(
      fromJS(mockNewProps), modalSetEmptyData(mockNewProps)
    )).toEqual(initialState);
  });
});
