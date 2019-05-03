import { LANDING_PAGE_TOGGLE_MENU } from './constants';

export const landingPageToggleMenu = (opened) => ({
  type: LANDING_PAGE_TOGGLE_MENU,
  opened,
});
