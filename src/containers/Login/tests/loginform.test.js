import React from 'react';
import { shallow } from 'enzyme';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { CardForm } from 'components/FormElements';
import { Login, required } from '../LoginForm';

const product = 'product';

describe('<Login />', () => {
  it('should render a CardForm', () => {
    const renderedComponent = shallow(
      <Login
        handleSubmit={() => { }}
        responseFacebookFunction={() => { }}
        product={product}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(FacebookLogin).length).toBe(1);
  });
});

describe('Required', () => {
  it('should return undefined if there is a value', () => {
    expect(required('valore')).toBeUndefined();
  });
  it('should return `Required` if there isn\'t a value', () => {
    expect(required()).toBe('Obbligatorio');
  });
});
