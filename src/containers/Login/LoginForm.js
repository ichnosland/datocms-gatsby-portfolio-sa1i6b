/**
*
* LoginForm
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
import { Button } from 'components/Button';
import LogoPlatform from 'components/LogoPlatform';
import { Separator, SeparatorText } from 'components/Paragraph';
import icon from 'icons/buttons';
import validate from './validator';

export const required = (value) => value ? undefined : 'Obbligatorio';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, product, responseFacebookFunction, invalid } = this.props;
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
                <FacebookIcon {...icon.facebook} left /> Accedi con Facebook
              </FacebookButton>
            )}
          />
        </FormElement>
        <Separator>
          <SeparatorText>oppure con i tuoi dati</SeparatorText>
        </Separator>
        <FormElement>
          <Field
            name="email"
            component={renderedField}
            type="email"
            label="Email"
            validate={[required]}
          />
        </FormElement>
        <FormElement>
          <Field
            name="password"
            component={renderedField}
            type="password"
            label="Password"
            validate={[required]}
          />
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

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  product: PropTypes.string,
  responseFacebookFunction: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
};

const LoginForm = reduxForm({
  form: 'login',
  validate,
})(Login);

export default LoginForm;
