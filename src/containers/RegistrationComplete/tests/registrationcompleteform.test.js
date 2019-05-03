import React from 'react';
import { shallow } from 'enzyme';

import { CardForm } from 'components/FormElements';
import { RegistrationComplete, required } from '../RegistrationCompleteForm';

describe('<RegistrationComplete />', () => {
  it('should render a CardForm', () => {
    const product = 'product';
    const renderedComponent = shallow(
      <RegistrationComplete handleSubmit={() => {}} product={product} />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
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
