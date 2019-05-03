import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';

import { H3 } from 'components/Heading';
import { ActionButton } from 'components/Button';
import Div from 'components/Div';
import AlertBanner from 'components/AlertBanner';
import { singleFieldRequired, atLeastNChars } from 'common/forms';
import InputField from 'components/FormElements/Field';
import SelectField from 'components/FormElements/SelectField';
import { LandingFormView, FormButton, requiredPiattaforma, InputRow } from '../index';

const mockProps = {
  alatin: true,
  privacy: true,
  bgcolor: 'red',
  formtitle: 'titolo',
  valid: true,
  handleSubmit: () => { },
  handleClose: () => { },
  feedback: {
    tipologia: '',
    hasFeedback: false,
    messaggio: 'messaggio',
  },
  formFields: [{
    id: 'nome',
    type: 'text',
    name: 'nome',
    label: 'Nome e cognome*',
    landing: true,
    validate: [atLeastNChars(3)],
    component: InputField,
  }, {
    id: 'indirizzoDiStudio',
    type: 'select',
    name: 'indirizzoDiStudio',
    label: 'Indirizzo di studio*',
    validate: [singleFieldRequired],
    opts: [{
      label: 'Liceo classico',
      id: 'classico',
    }, {
      label: 'Liceo scientifico',
      id: 'scientifico',
    }, {
      label: 'Liceo linguistico',
      id: 'linguistico',
    }, {
      label: 'Liceo scienze umane',
      id: 'scienze_umane',
    }, {
      label: 'Scuola media',
      id: 'scuola_media',
    }, {
      label: 'Altro',
      id: 'altro',
    }],
    component: SelectField,
  }],
};


describe('<LandingFormView />', () => {
  it('should render 6 Field when alatin == true and privacy == true', () => {
    const renderedComponent = shallow(<LandingFormView {...mockProps} />).dive();

    expect(renderedComponent.find(Div).length).toEqual(2);
    expect(renderedComponent.find(InputRow).length).toEqual(2);
    expect(renderedComponent.find(Field).length).toEqual(6);
    expect(renderedComponent.find(AlertBanner).length).toEqual(0);
  });

  it('should render 3 Field when alatin == false', () => {
    const props = {
      ...mockProps,
      alatin: false,
    };
    const renderedComponent = shallow(<LandingFormView {...props} />);

    expect(renderedComponent.find(Field).length).toEqual(3);
    expect(renderedComponent.find(InputRow).length).toEqual(2);
    expect(renderedComponent.find(AlertBanner).length).toEqual(0);
  });

  it('should render 2 Field when privacy == false and altin == false', () => {
    const props = {
      ...mockProps,
      alatin: false,
      privacy: false,
    };
    const renderedComponent = shallow(<LandingFormView {...props} />);

    expect(renderedComponent.find(Field).length).toEqual(2);
    expect(renderedComponent.find(InputRow).length).toEqual(2);
    expect(renderedComponent.find(AlertBanner).length).toEqual(0);
  });

  it('should render a H3 on confirmation feedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        tipologia: 'okay',
        hasFeedback: true,
        messaggio: 'messaggio',
      },
    };
    const renderedComponent = shallow(<LandingFormView {...props} />);

    expect(renderedComponent.find(InputRow).length).toEqual(0);
    expect(renderedComponent.find(H3).length).toEqual(1);
    expect(renderedComponent.find(ActionButton).length).toEqual(1);
  });

  it('should render a AlertBanner on error feedback', () => {
    const props = {
      ...mockProps,
      feedback: {
        tipologia: 'error',
        hasFeedback: true,
        messaggio: 'messaggio',
      },
    };
    const renderedComponent = shallow(<LandingFormView {...props} />);

    expect(renderedComponent.find(InputRow).length).toEqual(2);
    expect(renderedComponent.find(Div).length).toEqual(3);
    expect(renderedComponent.find(AlertBanner).length).toEqual(1);
    expect(renderedComponent.find(ActionButton).length).toEqual(0);
  });

  it('should FormButton at 1 must be disabled if not valid', () => {
    const props = {
      ...mockProps,
      valid: false,
    };
    const renderedComponent = shallow(<LandingFormView {...props} />);
    expect(renderedComponent.find(FormButton).at(1).props().disabled).toEqual(true);
  });

  it('should FormButton at 1 must be enabled if valid', () => {
    const renderedComponent = shallow(<LandingFormView {...mockProps} />);
    expect(renderedComponent.find(FormButton).at(1).props().disabled).toEqual(false);
  });

  it('should render a title Field if included', () => {
    const props = {
      ...mockProps,
      formFields: [{
        id: 'title_id',
        name: 'title_name',
        label: 'title_label',
        title: <section key="p_key">CIAO</section>,
      }],
    };
    const renderedComponent = shallow(<LandingFormView {...props} />);
    expect(renderedComponent.find('section').length).toEqual(1);
  });
});


describe('requiredPiattaforma', () => {
  it('should return undefined if all are selected', () => {
    expect(requiredPiattaforma(null, fromJS({
      piattaforma: {
        alatin: true,
        lyceum: true,
      },
    }))).toBeUndefined();
  });

  it('should return undefined if there is at least a value', () => {
    expect(requiredPiattaforma(null, fromJS({
      piattaforma: {
        alatin: false,
        lyceum: true,
      },
    }))).toBeUndefined();
  });

  it('should return "obbligatorio" if both false', () => {
    expect(requiredPiattaforma(null, fromJS({
      piattaforma: {
        alatin: false,
        lyceum: false,
      },
    }))).toBe('Obbligatorio');
  });

  it('should return "obbligatorio" when no values are set', () => {
    expect(requiredPiattaforma(null, fromJS({}))).toBe('Obbligatorio');
  });
});
