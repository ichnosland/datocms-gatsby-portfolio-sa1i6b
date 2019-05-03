import { createSelector } from 'reselect';

const selectMaieuticalHomeDomain = (state) => state.get('maieuticalHome');

const makeSelectConfirmMessage = () => createSelector(
  selectMaieuticalHomeDomain,
  (substate) => substate.get('confirmMessage')
);

const makeSelectErrorMessage = () => createSelector(
  selectMaieuticalHomeDomain,
  (substate) => substate.get('errorMessage')
);

const makeSelectSpinner = () => createSelector(
  selectMaieuticalHomeDomain,
  (substate) => substate.get('spinner')
);

export {
  makeSelectConfirmMessage,
  makeSelectErrorMessage,
  makeSelectSpinner,
  selectMaieuticalHomeDomain,
};
