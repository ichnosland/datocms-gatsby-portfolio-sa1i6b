import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import userReducer, {
  defaultAppData,
  defaultAuthentication,
  defaultAnagraphicsSettings,
} from 'containers/User/reducer';
import TopBar from 'components/TopBar';
import Profilo from 'components/Profilo';
import * as common from 'common/cookies';
import { downloadProtettiFetch } from 'containers/DownloadProtetti/actions';
import { userLogoutTrigger, userDataSet } from 'containers/User/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

import UserProfile, { UserProfileView } from '../index';

const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
  hasSuoni: true,
  whatsAppUrl: 'whatsapp://url',
};

const mockStore = configureStore({}, {});

const mockProps = {
  store: mockStore,
  userAppData: {
    docente: true,
    premiumDataScadenza: '2019-10-15T02:00:00Z',
  },
  userAnagraphics: {
    first_name: 'Ajeje',
    last_name: 'Brazorf',
    email: 'ajeje.brazorf@acme.com',
    id: 666,
    studenteAcademy: {
      punti: 5577,
    },
  },
  userSettings: {
    audioEnabled: true,
  },
  configuration: mockConfiguration,
  userAuthentication: {
    codiceSbloccato: false,
    codiceDaSbloccare: false,
  },
  onUserLogout: jest.fn(),
  onChangeAudio: () => { },
  onSetSuoni: () => { },
  history: {
    push: () => { },
  },
  onDownloadProtetti: () => { },
};

describe('<UserProfileView />', () => {
  it('must display TopBar and Profilo components', () => {
    const renderedComponent = shallow(
      <UserProfileView {...mockProps} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/homepage');
    expect(renderedComponent.find(Profilo).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('must display component when hasXp = true and docente === true', () => {
    const renderedComponent = shallow(
      <UserProfileView
        {...{
          ...mockProps,
          userAppData: {
            ...mockProps.userAppData,
            docente: true,
          },
          configuration: {
            ...mockConfiguration,
            hasXp: true,
          },
        }}
        premium={false}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/homepage');
    expect(renderedComponent.find(Profilo).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('must display component when hasXp = true and docente === false', () => {
    const renderedComponent = shallow(
      <UserProfileView
        {...{
          ...mockProps,
          userAppData: {
            ...mockProps.userAppData,
            docente: false,
          },
          configuration: {
            ...mockConfiguration,
            hasXp: true,
          },
        }}
        premium={false}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/homepage');
    expect(renderedComponent.find(Profilo).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('must display component product == lyceum', () => {
    const renderedComponent = shallow(
      <UserProfileView
        {...{
          ...mockProps,
          configuration: {
            ...mockConfiguration,
            product: 'lyceum',
          },
        }}
        premium={false}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/homepage');
    expect(renderedComponent.find(Profilo).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('toggleSuoniFx must be null when hasSuoni = false', () => {
    const renderedComponent = shallow(
      <UserProfileView
        {...{
          ...mockProps,
          configuration: {
            ...mockConfiguration,
            hasSuoni: false,
          },
        }}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Profilo).length).toBe(1);
    expect(renderedComponent.find(Profilo).props().toggleSuoniFx).toBe(null);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('toggleSuoniFx must call onSetSuoni', () => {
    const props = {
      ...mockProps,
      onSetSuoni: jest.fn(),
    };
    const renderedComponent = shallow(
      <UserProfileView
        {...props}
      />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Profilo).length).toBe(1);
    expect(props.onSetSuoni).not.toHaveBeenCalled();
    renderedComponent.find(Profilo).props().toggleSuoniFx();
    expect(props.onSetSuoni).toHaveBeenCalledWith(true, 666, 'product');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('logoutFunction should call onUserLogout', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();

    const renderedComponent = shallow(
      <UserProfileView {...mockProps} />
    );

    renderedComponent.find(Profilo).props().logoutFunction();
    expect(mockProps.onUserLogout).toHaveBeenCalledWith({
      configuration: mockConfiguration,
      history: mockProps.history,
    });
  });

  it('Profilo.gotToPremiumFunction chiama history.push se userAuthentication.codiceDaSbloccare == true', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      userAuthentication: {
        ...mockProps.userAuthentication,
        codiceDaSbloccare: true,
      },
    };
    const renderedComponent = shallow(
      <UserProfileView {...props} />
    );

    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(Profilo).props().gotToPremiumFunction();
    expect(props.history.push).toHaveBeenCalledWith('/sblocca');
  });

  it('Profilo.gotToPremiumFunction chiama history.push se userAuthentication.codiceSbloccato == true', () => {
    const props = {
      ...mockProps,
      userAuthentication: {
        ...mockProps.userAuthentication,
        codiceSbloccato: true,
      },
    };
    const renderedComponent = shallow(
      <UserProfileView {...props} />
    );

    expect(renderedComponent.find(Profilo).props().premiumActive).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Profilo.gotToPremiumFunction è null se userAuthentication.codiceDaSbloccare == false', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      userAuthentication: {
        ...mockProps.userAuthentication,
        codiceDaSbloccare: false,
      },
    };
    const renderedComponent = shallow(
      <UserProfileView {...props} />
    );

    expect(renderedComponent.find(Profilo).props().gotToPremiumFunction).toBe(null);
  });

  it('scaricaAllegato deve chiamare onDownloadProtetti', () => {
    const props = {
      ...mockProps,
      onDownloadProtetti: jest.fn(),
    };
    const renderedComponent = shallow(
      <UserProfileView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.scaricaAllegato('stub');
    expect(props.onDownloadProtetti).toHaveBeenCalled();
  });

  it('svuotaToken deve chiamare onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(
      <UserProfileView {...props} />
    );
    const instance = renderedComponent.instance();
    instance.svuotaToken();
    expect(props.onModalSetData).toHaveBeenCalled();
  });
});

describe('<UserProfile />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(mockConfiguration) });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerUser,
    connect()
  )(UserProfile);

  it('should check UserProfile initial props are properly set', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper history={mockProps.history} />, { context: { store } }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;
    expect(receivedProps.configuration).toEqual(mockConfiguration);
    expect(receivedProps.userAppData).toEqual(defaultAppData.toJS());
    expect(receivedProps.userAnagraphics).toEqual(defaultAnagraphicsSettings.toJS());
    expect(receivedProps.userAuthentication).toEqual(defaultAuthentication.toJS());
  });

  it('Profilo.onUserLogout must call userLogoutTrigger', () => {
    const store = configureStore({}, {});
    store.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper history={mockProps.history} />, { context: { store } }
    ).dive().dive().dive().dive().dive();

    const instance = renderedComponent.instance();

    expect(store.dispatch).not.toHaveBeenCalledWith(userLogoutTrigger());
    instance.props.onUserLogout();
    expect(store.dispatch).toHaveBeenCalledWith(userLogoutTrigger());

    // cookie con true
    const spy = jest.spyOn(common, 'cookieSet');
    expect(store.dispatch).not.toHaveBeenCalledWith(
      userDataSet({
        appData: { enableSuoni: true },
      })
    );
    instance.props.onSetSuoni(true, 1, 2);
    expect(spy).toHaveBeenLastCalledWith({ cookieKey: 'enableSounds_2_1', payload: 'true' });

    // cookie con false
    expect(store.dispatch).not.toHaveBeenCalledWith(
      userDataSet({
        appData: { enableSuoni: false },
      })
    );
    instance.props.onSetSuoni(false, 1, 2);
    expect(spy).toHaveBeenLastCalledWith({ cookieKey: 'enableSounds_2_1', payload: 'false' });

    expect(store.dispatch).toHaveBeenCalledWith(
      userDataSet({
        appData: { enableSuoni: true },
      })
    );

    expect(store.dispatch).not.toHaveBeenCalledWith(downloadProtettiFetch());
    instance.props.onDownloadProtetti();
    expect(store.dispatch).toHaveBeenCalledWith(downloadProtettiFetch());

    expect(store.dispatch).not.toHaveBeenCalledWith(
      modalSetData({ data: 5555 })
    );
    instance.props.onModalSetData({ data: 5555 });
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 5555 })
    );

    expect(store.dispatch).not.toHaveBeenCalledWith(
      modalSetEmptyData()
    );
    instance.props.onModalSetEmptyData();
    expect(store.dispatch).toHaveBeenCalledWith(
      modalSetEmptyData()
    );
  });
});
