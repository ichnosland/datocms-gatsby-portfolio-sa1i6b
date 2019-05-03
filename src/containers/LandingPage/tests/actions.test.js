import { landingPageToggleMenu } from '../actions';
import { LANDING_PAGE_TOGGLE_MENU } from '../constants';

describe('Actions', () => {
  it('check livelliFetch output is correct', () => {
    const expectedAction = {
      type: LANDING_PAGE_TOGGLE_MENU,
      opened: true,
    };
    expect(landingPageToggleMenu(true)).toEqual(expectedAction);
  });
});
