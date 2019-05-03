/**
 * Test the HomePage
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Helmet } from 'react-helmet';
import { fromJS } from 'immutable';

import configureStore from 'configureStore';
import Footer from 'components/Footer';
import Maieutical, {
  MaieuticalHome,
  mapDispatchToProps,
  Logo,
  Bg,
  MobileImage,
} from '../index';

import {
  sendTicket,
} from '../actions';

describe('<MaieuticalHome />', () => {
  it('should render Main component', () => {
    const props = {
      onSendTicket: () => { },
      spinner: false,
      confirmMessage: '',
      errorMessage: '',
      store: {},
    };
    const renderedComponent = shallow(
      <MaieuticalHome
        {...props}
      />
    );
    expect(renderedComponent.find(Footer).length).toBe(1);
    expect(renderedComponent.find(Helmet).length).toBe(1);
    expect(renderedComponent.find('header').length).toBe(1);
    expect(renderedComponent.find('section').length).toBe(4);
  });
});

describe('<Maieutical />', () => {
  it('should inject reducer', () => {
    const initialState = {};
    const store = configureStore(initialState, {});
    const renderedComponent = shallow(
      <Maieutical />, { context: { store } }
    );
    const instance = renderedComponent.instance();
    const maieuticalHome = instance.context.store.getState().get('maieuticalHome');
    const expected = fromJS({
      spinner: false,
      errorMessage: '',
      confirmMessage: '',
    });
    expect(maieuticalHome.equals(expected)).toBeTruthy();
  });

  it('should have props from state', () => {
    const initialState = {};
    const store = configureStore(initialState, {});
    const renderedComponent = shallow(
      <Maieutical />, { context: { store } }
    ).dive().dive();

    expect(renderedComponent.props()).toMatchObject({
      confirmMessage: '',
      errorMessage: '',
      spinner: false,
    });
  });
});

describe('onSendTicket', () => {
  it('should be injected', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    expect(result.onSendTicket).toBeDefined();
  });

  it('should be dispatched when called', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const payload = {
      nome: 'Nome',
      messaggio: 'messaggio',
      email: 'acme@acme.com',
      ruolo: 'docente',
    };
    result.onSendTicket(payload);
    expect(dispatch).toHaveBeenCalledWith(sendTicket(payload));
  });
});

describe('<Logo />', () => {
  it('should match snapshot', () => {
    const renderedComponent = shallow(<Logo to="/" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Bg />', () => {
  it('should match snapshot', () => {
    const renderedComponent = shallow(<Bg />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<MobileImage />', () => {
  it('should match snapshot', () => {
    const renderedComponent = shallow(<MobileImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should match snapshot w/ small', () => {
    const renderedComponent = shallow(<MobileImage small />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should match snapshot w/ big', () => {
    const renderedComponent = shallow(<MobileImage big />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
