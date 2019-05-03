/**
*
* ResetPasswordForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  CardForm,
  FormElement,
} from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import { Button } from 'components/Button';
import LogoPlatform from 'components/LogoPlatform';
import { Separator, SeparatorText } from 'components/Paragraph';
import { resetPasswordValidator, required } from './validator';

export class ResetPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, invalid, product, backFunction } = this.props;
    return (
      <CardForm
        onSubmit={handleSubmit}
      >
        <FormElement margin="0 auto 36px">
          <LogoPlatform
            product={product}
            formLogo
          />
        </FormElement>
        <Separator>
          <SeparatorText>Reimposta la tua password</SeparatorText>
        </Separator>
        <FormElement>
          <Field
            name="email"
            component={renderedField}
            type="email"
            label="Email di registrazione"
            validate={[required]}
          />
        </FormElement>
        <FormElement>
          <Button
            full
            type="button"
            onClick={backFunction}
          >Annulla
          </Button>
        </FormElement>
        <FormElement>
          <Button
            actioncolor="okay"
            full
            type="submit"
            disabled={invalid}
          >Invia
          </Button>
        </FormElement>
      </CardForm>
    );
  }
}

ResetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  product: PropTypes.string,
  backFunction: PropTypes.func.isRequired,
};

const ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  validate: resetPasswordValidator,
})(ResetPassword);

export default ResetPasswordForm;
