/**
*
* ContactForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Field, reduxForm } from 'redux-form/immutable';
import Container from 'components/Container';
import { singleFieldRequired, singleFieldValidateEmail, atLeastNChars } from 'common/forms';
import Div from 'components/Div';
import AlertBanner from 'components/AlertBanner';
import P from 'components/Paragraph';
import { ActionButton } from 'components/Button';
import renderedField from 'components/FormElements/Field';
import TextArea from 'components/FormElements/TextArea';
import InputRadioCheck from 'components/FormElements/InputRadioCheck';
import media from 'style/mediainjector';

export const InputRow = styled.div`
  background-color: transparent;
`;

export const FormButton = styled(ActionButton)`
  width: 48%;
  font-size: 18px;
  padding: 14px 30px;
  margin: 0 10px;
  flex: 1;
  ${media.lt667`
    display: block;
    width: 100%;
    margin: 0 auto 18px;
    flex: auto;
  `}
`;

const formFields = [{
  id: 'nome',
  type: 'text',
  name: 'nome',
  label: 'Nome e cognome*',
  landing: true,
  validate: [atLeastNChars(3)],
}, {
  id: 'email',
  type: 'text',
  name: 'email',
  label: 'Email*',
  landing: true,
  validate: [singleFieldValidateEmail],
}, {
  id: 'scuola',
  type: 'text',
  name: 'scuola',
  label: 'Scuola*',
  landing: true,
  validate: [singleFieldRequired],
}, {
  id: 'ruolo',
  type: 'text',
  name: 'ruolo',
  label: 'Ruolo*',
  landing: true,
  validate: [singleFieldRequired],
}];


export class ContactFormView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { feedback, valid, handleSubmit, buttonColor, buttonBg } = this.props;
    return (
      <Container color="#12334e">
        {feedback.hasFeedback && (
          <AlertBanner
            margin="10px auto 20px"
            actioncolor={feedback.tipologia}
          >
            {feedback.messaggio}
          </AlertBanner>
        )}
        {feedback.tipologia !== 'okay' && (
          <form>
            {formFields.map((field) => (
              <InputRow key={`richiesta_informazioni_form_${field.id}`}>
                <Field {...field} component={renderedField} />
              </InputRow>
            ))}
            <InputRow>
              <Field
                name="descrizione"
                id="descrizione"
                component={TextArea}
                validate={[singleFieldRequired, atLeastNChars(3)]}
                label="Scrivi qui*"
                landing
              />
            </InputRow>
            <Field
              name="privacy"
              id="privacy"
              component={InputRadioCheck}
              validate={[singleFieldRequired]}
              type="checkbox"
              bgcolor="rgba(255, 255, 255, 0.2)"
              label={<small htmlFor="privacy">Ho letto e accetto le <a href="https://maieuticallabs.it/privacy" target="_blank">normative sulla Privacy</a></small>}
            />
            <Div align="center">
              <P>* campi obbligatori</P>
              <FormButton
                shadow={1}
                bgcolor={buttonBg}
                color={buttonColor}
                disabled={!valid}
                onClick={handleSubmit}
                type="button"
              >
                Invia
              </FormButton>
            </Div>
          </form>
        )}
      </Container>
    );
  }
}

ContactFormView.propTypes = {
  valid: PropTypes.bool,
  buttonBg: PropTypes.string,
  buttonColor: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
};

const contactForm = reduxForm({
  form: 'richiestaInformazioniForm',
})(ContactFormView);

export default contactForm;
