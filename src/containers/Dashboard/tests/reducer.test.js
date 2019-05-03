import { fromJS } from 'immutable';

import dashboardReducer from '../reducer';
import {
  livelliSet,
  livelliFetch,
  spinnerSet,
  unitaFiltra,
  livelliReset,
  dashboardMenuEggSet,
  dashboardSearchActiveSet,
  livelliIsLoadingSet,
} from '../actions';

describe('dashboardReducer reducer', () => {
  it('should return the initial combined state', () => {
    expect(dashboardReducer(fromJS({}), { type: undefined }).toJS()).toEqual({
      livelli: [],
      filterUnita: '',
      spinner: true,
      searchActive: false,
      menuEggStatus: '',
      isLoading: false,
    });
  });

  it('should return combined state after DASHBOARD_LIVELLI_FETCH action is triggered', () => {
    expect(
      dashboardReducer(fromJS({}), livelliFetch()).toJS()
    ).toEqual({
      livelli: [],
      filterUnita: '',
      spinner: true,
      searchActive: false,
      menuEggStatus: '',
      isLoading: false,
    });
  });

  it('should return combined state after DASHBOARD_LIVELLI_SET action is triggered', () => {
    const livelliMock = [{
      id: 1,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 10,
        unita: [{
          id: 1001,
          locked: false,
          nome: 'Unita 1',
        }],
      }],
    }];
    expect(
      dashboardReducer(fromJS({}), livelliSet(livelliMock)).toJS()
    ).toEqual({
      livelli: livelliMock,
      filterUnita: '',
      spinner: true,
      searchActive: false,
      menuEggStatus: '',
      isLoading: false,
    });
  });

  it('should return combined state after DASHBOARD_LIVELLI_RESET action is triggered', () => {
    const livelliMock = fromJS({
      livelli: [{
        id: 1,
        titolo: 'Livello 1',
        missioni: [{
          titolo: 'Missione 1',
          id: 10,
          unita: [{
            id: 1001,
            locked: false,
            nome: 'Unita 1',
          }],
        }],
      }],
      filterUnita: '',
      spinner: true,
      searchActive: false,
      menuEggStatus: '',
      isLoading: false,
    });
    expect(
      dashboardReducer(livelliMock, livelliReset())
    ).toEqual(livelliMock.merge({
      livelli: [],
    }));
  });

  it('should return combined state after DASHBOARD_UNITA_FILTRA action is triggered', () => {
    expect(
      dashboardReducer(fromJS({}), unitaFiltra('filtrami')).toJS()
    ).toEqual({
      livelli: [],
      filterUnita: 'filtrami',
      spinner: true,
      searchActive: false,
      menuEggStatus: '',
      isLoading: false,
    });
  });

  it('should return combined state after DASHBOARD_SPINNER_SET action is triggered', () => {
    expect(
      dashboardReducer(fromJS({}), spinnerSet(false)).toJS()
    ).toEqual({
      livelli: [],
      filterUnita: '',
      spinner: false,
      searchActive: false,
      menuEggStatus: '',
      isLoading: false,
    });
  });

  it('should return combined state after DASHBOARD_MENUEGG_SET action is triggered', () => {
    expect(
      dashboardReducer(fromJS({}), dashboardMenuEggSet('valore')).toJS()
    ).toEqual({
      livelli: [],
      filterUnita: '',
      spinner: true,
      searchActive: false,
      menuEggStatus: 'valore',
      isLoading: false,
    });
  });

  it('should return combined state after DASHBOARD_SEARCHACTIVE_SET action is triggered', () => {
    expect(
      dashboardReducer(fromJS({}), dashboardSearchActiveSet(true)).toJS()
    ).toEqual({
      livelli: [],
      filterUnita: '',
      spinner: true,
      searchActive: true,
      menuEggStatus: '',
      isLoading: false,
    });
  });

  it('should return combined state after DASHBOARD_LIVELLI_ISLOADING_SET action is triggered', () => {
    expect(
      dashboardReducer(fromJS({}), livelliIsLoadingSet(true)).toJS()
    ).toEqual({
      livelli: [],
      filterUnita: '',
      spinner: true,
      searchActive: false,
      menuEggStatus: '',
      isLoading: true,
    });
  });
});
