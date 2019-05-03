import { fromJS } from 'immutable';

import { LANDING_PAGE_TOGGLE_MENU } from './constants';


export const defaultLandingPageReducer = fromJS({
  isMenuOpened: false,
});

const landingPageReducer = (state = defaultLandingPageReducer, action) => {
  switch (action.type) {
    case LANDING_PAGE_TOGGLE_MENU:
      return state.merge({
        isMenuOpened: action.opened,
      });

    default:
      return state;
  }
};

export default landingPageReducer;
