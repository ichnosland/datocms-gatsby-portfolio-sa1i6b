import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import { modalSetData } from 'containers/ModalBox/actions';
import LandingCard from 'components/LandingCard';
import LandingForm from 'components/LandingForm';
import userReducer from 'containers/User/reducer';
import { StickyTop, StickyBottom } from 'components/StickyFooter';
import ZendeskTicket from 'containers/ZendeskTicket';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import { singleFieldRequired, singleFieldValidateEmail } from 'common/forms';
import { Button } from 'components/Button';
import InputField from 'components/FormElements/Field';
import ladingPageReducer from 'containers/LandingPage/reducer';
import AlertCookies from 'components/AlertCookies';
import { userDataSet } from 'containers/User/actions';
import modalBoxReducer from 'containers/ModalBox/reducer';

import HomePageContainer, { HomePage, atLeast3Chars } from '../index';


const configuration = {
  disciplinaId: 21,
  product: 'landingalatin',
  blocco: false,
  unitaSbloccate: [],
  titoloApplicazione: 'Alatin Academy',
  homePage: '/',
  hasClassi: false,
};

const mockProps = {
  onModalSetData: () => { },
  configuration,
  landingPage: {
    isMenuOpened: true,
  },
  userAppData: {
    hints: {
      cookiesDisclaimer: true,
    },
  },
  onUserCookieSet: () => { },
  onlandingPageToggleMenu: () => { },
  match: {
    path: '/path',
  },
  modalBox: {
    show: false,
  },
};

describe('<HomePage />', () => {
  it('controllo che contenga gli elementi principali della home', () => {
    const renderedComponent = shallow(<HomePage {...mockProps} />);
    expect(renderedComponent.find(LandingCard).length).toBe(5);
    expect(renderedComponent.find(StickyTop).length).toBe(1);
    expect(renderedComponent.find(StickyBottom).length).toBe(1);
    expect(renderedComponent.find(AlertCookies).length).toBe(1);
    expect(renderedComponent.find(AlertCookies).props()).toEqual({
      onClickFunction: expect.any(Function),
      show: true,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo AlertCookies quando non ha display true', () => {
    const props = {
      ...mockProps,
      userAppData: {
        ...mockProps.userAppData,
        hints: {
          cookiesDisclaimer: false,
        },
      },
    };

    const renderedComponent = shallow(<HomePage {...props} />);
    expect(renderedComponent.find(LandingCard).length).toBe(5);
    expect(renderedComponent.find(StickyTop).length).toBe(1);
    expect(renderedComponent.find(StickyBottom).length).toBe(1);
    expect(renderedComponent.find(AlertCookies).length).toBe(1);
    expect(renderedComponent.find(AlertCookies).props()).toEqual({
      onClickFunction: expect.any(Function),
      show: false,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('AlertCookies > click deve chiamare onUserCookieSet', () => {
    const props = {
      ...mockProps,
      onUserCookieSet: jest.fn(),
      userAppData: {
        ...mockProps.userAppData,
        hints: {
          cookiesDisclaimer: false,
        },
      },
    };

    const renderedComponent = shallow(<HomePage {...props} />);
    expect(props.onUserCookieSet).not.toHaveBeenCalled();
    renderedComponent.find(AlertCookies).dive().find(Button).simulate('click');
    expect(props.onUserCookieSet).toHaveBeenCalledWith(
      'cookiesDisclaimer_landingalatin_0',
      'false', {
        cookiesDisclaimer: false,
      }
    );
  });

  it('il pulsante richiedi codice deve aprire onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
      theme: {
        brand: 'red',
      },
    };
    const renderedComponent = shallow(<HomePage {...props} />);

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(LandingCard).at(3).props().actionButton.richiediCodice();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'landing Itaca',
            titolo: 'Richiesta codice classe',
            tipologia: 'comunicazione',
          }}
          formConfiguration={{
            component: LandingForm,
            props: {
              formtitle: 'Richiesta codice classe',
              itaca: true,
              privacy: true,
              formFields: [{
                id: 'nome',
                type: 'text',
                name: 'nome',
                label: 'Nome e cognome*',
                landing: true,
                validate: [atLeast3Chars],
                component: InputField,
              }, {
                id: 'email',
                type: 'text',
                name: 'email',
                label: 'Email*',
                landing: true,
                validate: [singleFieldValidateEmail],
                component: InputField,
              }, {
                id: 'scuola',
                type: 'text',
                name: 'scuola',
                label: 'Scuola*',
                landing: true,
                validate: [singleFieldRequired],
                component: InputField,
              }, {
                id: 'citta',
                type: 'text',
                name: 'citta',
                label: 'Città*',
                landing: true,
                validate: [singleFieldRequired],
                component: InputField,
              }, {
                id: 'ruolo',
                type: 'text',
                name: 'ruolo',
                label: 'Ruolo*',
                landing: true,
                validate: [singleFieldRequired],
                component: InputField,
              }],
            },
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
      formBox: true,
      maxWidth: '480px',
    });
  });
});

describe('<HomePageContainer />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withLandingConfiguration = injectReducer({ key: 'landingPage', reducer: ladingPageReducer });
  const withReducerUser = injectReducer({ key: 'user', reducer: userReducer });
  const withReducerModalBox = injectReducer({ key: 'modalBox', reducer: modalBoxReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withLandingConfiguration,
    withReducerUser,
    withReducerModalBox,
    connect()
  )(HomePageContainer);
  const mockStore = configureStore({}, {});
  mockStore.dispatch = jest.fn();
  it('onModalSetData deve chiamare modalSetData', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper match={mockProps.match} />, { context: { store: mockStore } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.props();

    // onModalSetData
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );
    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    // onlandingPageToggleMenu
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );
    receivedProps.onlandingPageToggleMenu(true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );

    // onUserCookieSet
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      userDataSet({
        appData: { hints: { data: 123, cookiesDisclaimer: true } },
      })
    );
    receivedProps.onUserCookieSet('key', 'true', { data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      userDataSet({
        appData: { hints: { data: 123, cookiesDisclaimer: true } },
      })
    );
  });
});
