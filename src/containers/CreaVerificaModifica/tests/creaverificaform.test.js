import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form/immutable';

import { Button } from 'components/Button';
import { CreaVerifica, required } from '../CreaVerificaForm';
import { ItemCounter } from '../../../components/TopBar/ItemCounter';

describe('<CreaVerifica />', () => {
  const propsMock = {
    handleSubmit: () => {},
    aggiungiEserciziFunction: () => {},
    svuotaEserciziFunction: () => {},
    pristine: false,
    submitting: false,
    itemCount: '',
  };

  it('should render one CreaVerifica on default condition when itemCount is 0', () => {
    const renderedComponent = shallow(
      <CreaVerifica
        {...propsMock}
      />
    );
    expect(renderedComponent.find('form').length).toBe(1);
    expect(renderedComponent.find(Field).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent.find(ItemCounter).length).toBe(0);
  });

  it('should render one CreaVerifica on default condition when itemCount is > 0', () => {
    const renderedComponent = shallow(
      <CreaVerifica
        {...{ ...propsMock, itemCount: '12' }}
      />
    );
    expect(renderedComponent.find('form').length).toBe(1);
    expect(renderedComponent.find(Field).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(3);
    expect(renderedComponent.find(ItemCounter).length).toBe(1);
  });
});

describe('Required', () => {
  it('error message should be undefine when a value is provided', () => {
    expect(required('valore')).toBeUndefined();
  });
  it('when no value is provided should return a \'campo obbligatorio\' message', () => {
    expect(required()).toBe('Campo obbligatorio');
  });
});

