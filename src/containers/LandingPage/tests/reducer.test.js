import homePageReducer, { defaultLandingPageReducer } from '../reducer';
import { landingPageToggleMenu } from '../actions';

describe('dashboardReducer reducer', () => {
  it('lo stato iniziale deve essere uguale a landingPageToggleMenu', () => {
    expect(
      homePageReducer(undefined, { type: undefined })
    ).toEqual(defaultLandingPageReducer);
  });

  it('landingPageToggleMenu deve modificare isMenuOpened', () => {
    expect(
      homePageReducer(undefined, landingPageToggleMenu(true))
    ).toEqual(defaultLandingPageReducer.merge({ isMenuOpened: true }));
  });
});
