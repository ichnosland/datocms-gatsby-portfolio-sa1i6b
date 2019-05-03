/**
*
* FeedbackForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { Button } from 'components/Button';
import { ExpandButtonGroup } from 'components/StyledButtonGroup';
import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { FormElement } from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import TextAreaField from 'components/FormElements/TextArea';
import InputRadioCheck from 'components/FormElements/InputRadioCheck';
import P from 'components/Paragraph';

export const validate = (values) => {
  const errors = {};

  if (!values.get('tipologia')) {
    errors.tipologia = 'Campo obbligatorio';
  }

  if (!values.get('descrizione')) {
    errors.descrizione = 'Campo obbligatorio';
  } else if (values.get('descrizione').length < 3) {
    errors.descrizione = 'Devi inserire almeno 3 caratteri';
  }

  return errors;
};

export const validateNome = (value) => {
  if (!value) {
    return 'Campo obbligatorio';
  } else if (value.length < 3) {
    return 'Devi inserire almeno 3 caratteri';
  }
  return undefined;
};

export const validateEmail = (value) => {
  if (!value) {
    return 'Campo obbligatorio';
  } else if (!/^[\w.-]+(\+\w+)?@[\w.-]+\.[\w.]{2,}$/i.test(value)) {
    return 'Indirizzo email non valido';
  }
  return undefined;
};


export class ZendeskFormView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, handleClose, hasAnagraphics, valid } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
      >
        <P align="center">Hai riscontrato un problema</P>
        <FormElement>
          <FlexBox justifyContent="space-around">
            <Field
              htmlFor="tipologia_tecnico"
              name="tipologia"
              id="tipologia_tecnico"
              component={InputRadioCheck}
              type="radio"
              value="tecnico"
              label="Tecnico"
            />
            <Field
              htmlFor="tipologia_contenuto"
              name="tipologia"
              id="tipologia_contenuto"
              component={InputRadioCheck}
              type="radio"
              value="contenuto"
              label="Di contenuto"
            />
          </FlexBox>
        </FormElement>
        {hasAnagraphics && (
          <Div>
            <FormElement>
              <Field
                name="nome"
                component={renderedField}
                validate={[validateNome]}
                type="text"
                label="Nome"
              />
            </FormElement>
            <FormElement>
              <Field
                name="email"
                component={renderedField}
                validate={[validateEmail]}
                type="text"
                label="Email"
              />
            </FormElement>
          </Div>
        )}
        <FormElement>
          <Field
            label="Descrivi brevemente il problema"
            component={TextAreaField}
            name="descrizione"
          />
        </FormElement>
        <ExpandButtonGroup>
          <Button
            standard
            radius="3px"
            type="submit"
            disabled={!valid}
            actioncolor="help"
          >Invia
          </Button>
          <Button
            standard
            radius="3px"
            type="button"
            onClick={handleClose}
          >Annulla
          </Button>
        </ExpandButtonGroup>
      </form>
    );
  }
}

ZendeskFormView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  hasAnagraphics: PropTypes.bool,
  valid: PropTypes.bool,
};

const ZendeskForm = reduxForm({
  form: 'feedbackForm',
  validate,
})(ZendeskFormView);

export default ZendeskForm;
