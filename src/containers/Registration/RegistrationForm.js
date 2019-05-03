/**
*
* RegistrationForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { FACEBOOK } from 'configuration';
import {
  CardForm,
  FormElement,
  FacebookButton,
  FacebookIcon,
} from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import { LegalInfo, Separator, SeparatorText } from 'components/Paragraph';
import { Button } from 'components/Button';
import LogoPlatform from 'components/LogoPlatform';
import icon from 'icons/buttons';
import validate from './validator';

export const required = (value) => value ? undefined : 'Obbligatorio';

export class Registration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { invalid, product, handleSubmit, responseFacebookFunction } = this.props;

    return (
      <CardForm onSubmit={handleSubmit}>
        <FormElement margin="0 auto 36px">
          <LogoPlatform
            product={product}
            formLogo
          />
        </FormElement>
        <FormElement>
          <FacebookLogin
            appId={FACEBOOK.appId}
            language={FACEBOOK.language}
            version={FACEBOOK.version}
            callback={responseFacebookFunction}
            isMobile
            disableMobileRedirect
            fields="name,email"
            scope="public_profile,email"
            render={/* istanbul ignore next */ (renderProps) => (
              <FacebookButton full onClick={renderProps.onClick} type="button">
                <FacebookIcon {...icon.facebook} left /> Registrati con Facebook
              </FacebookButton>
            )}
          />
        </FormElement>
        <Separator>
          <SeparatorText>oppure</SeparatorText>
        </Separator>
        <FormElement>
          <Field name="email" component={renderedField} type="email" label="Indirizzo email" validate={[required]} />
        </FormElement>
        <FormElement>
          <Field name="password" component={renderedField} type="password" label="Scegli una password" validate={[required]} />
        </FormElement>
        <FormElement>
          <Field name="password2" component={renderedField} type="password" label="Verifica la password" validate={[required]} />
        </FormElement>
        <FormElement>
          <LegalInfo>
            <Field
              name="privacy"
              id="privacy"
              component="input"
              type="checkbox"
              validate={[required]}
            />
            &nbsp;
            <label htmlFor="privacy">&nbsp; Ho letto ed accetto le <a href="https://maieuticallabs.it/privacy" target="_blank">normative sulla privacy</a></label>
          </LegalInfo>
        </FormElement>
        <FormElement>
          <Button actioncolor="okay" full type="submit" disabled={invalid}>Invia</Button>
        </FormElement>
      </CardForm>
    );
  }
}

Registration.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  product: PropTypes.string,
  responseFacebookFunction: PropTypes.func.isRequired,
};

const RegistrationForm = reduxForm({
  form: 'registration',
  validate,
  asyncBlurFields: ['username'],
})(Registration);

export default RegistrationForm;
