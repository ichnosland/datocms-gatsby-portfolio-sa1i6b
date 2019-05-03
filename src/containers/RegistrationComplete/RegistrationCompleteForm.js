/**
*
* RegistrationComplete
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { CardForm, FormElement } from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import { Button } from 'components/Button';
import LogoPlatform from 'components/LogoPlatform';

import validate from './validator';

export const required = (value) => value ? undefined : 'Obbligatorio';

export class RegistrationComplete extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { invalid, product, handleSubmit } = this.props;

    return (
      <CardForm onSubmit={handleSubmit}>
        <FormElement margin="0 auto 36px">
          <LogoPlatform
            product={product}
            formLogo
          />
        </FormElement>
        <h2>Completa il profilo</h2>
        <p>Inserisci il tuo nome e cognome<br />per completare il tuo profilo</p>
        <FormElement>
          <Field
            name="nome"
            component={renderedField}
            type="text"
            label="nome"
            validate={[required]}
          />
        </FormElement>
        <FormElement>
          <Field
            name="cognome"
            component={renderedField}
            type="text"
            label="cognome"
            validate={[required]}
          />
        </FormElement>
        <FormElement>
          <Button actioncolor="okay" full type="submit" disabled={invalid}>Salva</Button>
        </FormElement>
      </CardForm>
    );
  }
}

RegistrationComplete.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  product: PropTypes.string,
};

const RegistrationCompleteForm = reduxForm({
  form: 'registration',
  validate,
})(RegistrationComplete);

export default RegistrationCompleteForm;
