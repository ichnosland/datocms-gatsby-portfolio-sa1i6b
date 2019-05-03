import React from 'react';
import { shallow } from 'enzyme';

import { CardForm } from 'components/FormElements';
import { CambiaPassword, required } from '../CambiaPasswordForm';

const product = 'product';

describe('<CambiaPassword />', () => {
  it('should render a CardForm', () => {
    const renderedComponent = shallow(
      <CambiaPassword
        handleSubmit={() => { }}
        responseFacebookFunction={() => { }}
        product={product}
        backFunction={() => { }}
      />
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
