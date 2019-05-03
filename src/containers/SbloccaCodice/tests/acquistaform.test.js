import React from 'react';
import { shallow } from 'enzyme';

import AlertBanner from 'components/AlertBanner';
import { CardForm } from 'components/FormElements';
import { Button } from 'components/Button';
import { H3 } from 'components/Heading';

import {
  AcquistaForm,
  required,
} from '../AcquistaForm';


const AcquistaFormProps = {
  feedback: {
    hasFeedback: false,
    tipologia: 'help',
    messaggio: 'messaggio',
  },
  togglePaypalBox: () => { },
  prodotti: [{
    id: 1,
    prezzo: '3.4',
    descrizione: 'descrizione',
    order_data: 'order_data_1',
  }, {
    id: 2,
    prezzo: '5.5',
    descrizione: 'scrizionede',
    order_data: 'order_data_2',
  }],
  selectedValue: 'order_data_1',
  authorizePaypal: () => { },
  paymentPaypal: () => { },
  userAnagraphics: {
    email: 'pippo@example.com',
  },
};

describe('<AcquistaForm />', () => {
  it('visualizza un container con il form di scelta prodotto al suo interno', () => {
    const renderedComponent = shallow(
      <AcquistaForm
        {...AcquistaFormProps}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza un container con un messaggio di feedback', () => {
    const props = {
      ...AcquistaFormProps,
      feedback: {
        ...AcquistaFormProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <AcquistaForm
        {...props}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(H3).length).toBe(0);
    expect(renderedComponent.find(Button).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('se selectedValue non fa il match, non mostro il pulsante paypal', () => {
    const props = {
      ...AcquistaFormProps,
      selectedValue: '',
    };
    const renderedComponent = shallow(
      <AcquistaForm
        {...props}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(H3).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<required />', () => {
  it('controllo che il comportamento della funzione required sia corretto', () => {
    expect(required('valore')).toBe(undefined);
    expect(required('')).toBe('Campo obbligatorio');
  });
});
