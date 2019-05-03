import React from 'react';
import { shallow } from 'enzyme';

import AlertBanner from 'components/AlertBanner';
import { CardForm } from 'components/FormElements';
import { Button } from 'components/Button';
import {
  FormTitle,
  SbloccaCodiceForm,
  required,
  maskDefinitions,
} from '../SbloccaCodiceForm';


const sbloccaCodiceFormProps = {
  feedback: {
    hasFeedback: false,
    tipologia: 'help',
    messaggio: 'messaggio',
  },
  handleSubmit: () => { },
  togglePaypalBox: () => { },
  valid: true,
};

describe('<SbloccaCodiceForm />', () => {
  it('visualizza un container con il form principale al suo interno', () => {
    const renderedComponent = shallow(
      <SbloccaCodiceForm
        {...sbloccaCodiceFormProps}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(FormTitle).length).toBe(2);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza un container con un messaggio di feedback', () => {
    const props = {
      ...sbloccaCodiceFormProps,
      feedback: {
        ...sbloccaCodiceFormProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(
      <SbloccaCodiceForm
        {...props}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent.find(FormTitle).length).toBe(2);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('CardForm > Button deve essere enabled quando valid = true', () => {
    const props = {
      ...sbloccaCodiceFormProps,
      valid: true,
    };

    const renderedComponent = shallow(
      <SbloccaCodiceForm
        {...props}
      />
    );

    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(false);
  });

  it('CardForm > Button deve essere disabled quando valid = false', () => {
    const props = {
      ...sbloccaCodiceFormProps,
      valid: false,
    };

    const renderedComponent = shallow(
      <SbloccaCodiceForm
        {...props}
      />
    );

    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(true);
  });
});

describe('<required />', () => {
  it('controllo che il comportamento della funzione required sia corretto', () => {
    expect(required('valore')).toBe(undefined);
    expect(required('')).toBe('Campo obbligatorio');
  });
});

describe('<maskDefinitions />', () => {
  it('controllo che il comportamento del maskDefinitions.A.transform sia corretto', () => {
    expect(maskDefinitions.A.transform('abcd-908-defg')).toBe('ABCD-908-DEFG');
  });
});
