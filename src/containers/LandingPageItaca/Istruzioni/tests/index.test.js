import React from 'react';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { compose } from 'redux';

import configureStore from 'configureStore';
import injectReducer from 'utils/injectReducer';
import reducerCurryer from 'common/applications/reducer';

import { modalSetData } from 'containers/ModalBox/actions';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import ZendeskTicket from 'containers/ZendeskTicket';
import LandingForm from 'components/LandingForm';
import LandingCard from 'components/LandingCard';
import ladingPageReducer from 'containers/LandingPage/reducer';
import { singleFieldRequired, singleFieldValidateEmail } from 'common/forms';
import InputField from 'components/FormElements/Field';

import IstruzioniComposed, { Istruzioni, atLeast3Chars } from '../index';

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
  configuration,
  onModalSetData: () => { },
  landingPage: {
    isMenuOpened: true,
  },
  onlandingPageToggleMenu: () => { },
  match: {
    path: '/path',
  },
};

describe('<Istruzioni />', () => {
  it('controllo che contenga gli elementi principali della home', () => {
    const renderedComponent = shallow(<Istruzioni {...mockProps} />);
    expect(renderedComponent.find(LandingCard).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('il pulsante richiedi codice deve aprire onModalSetData', () => {
    const props = {
      ...mockProps,
      onModalSetData: jest.fn(),
    };
    const renderedComponent = shallow(<Istruzioni {...props} />);

    expect(props.onModalSetData).not.toHaveBeenCalled();
    renderedComponent.find(LandingCard).at(0).props().actionButton.richiediCodice();
    expect(props.onModalSetData).toHaveBeenCalledWith({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'landing_itaca_istruzioni',
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

describe('<IstruzioniComposed />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withLandingConfiguration = injectReducer({ key: 'landingPage', reducer: ladingPageReducer });
  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withLandingConfiguration,
    connect()
  )(IstruzioniComposed);
  const mockStore = configureStore({}, {});
  mockStore.dispatch = jest.fn();
  it('onModalSetData deve chiamare modalSetData', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper match={mockProps.match} />, { context: { store: mockStore } }
    ).dive().dive().dive();

    const receivedProps = renderedComponent.props();
    receivedProps.onModalSetData({ data: 123 });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      modalSetData({ data: 123 })
    );

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );
    receivedProps.onlandingPageToggleMenu(true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      landingPageToggleMenu(true)
    );
  });
});
