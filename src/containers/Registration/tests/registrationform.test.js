import React from 'react';
import { shallow } from 'enzyme';

import { CardForm } from 'components/FormElements';
import { Registration, required } from '../RegistrationForm';

const mockProps = {
  handleSubmit: () => { },
  product: 'product',
  invalid: false,
  responseFacebookFunction: () => { },
};

describe('<Registration />', () => {
  it('should render a CardForm', () => {
    const renderedComponent = shallow(
      <Registration {...mockProps} />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
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
