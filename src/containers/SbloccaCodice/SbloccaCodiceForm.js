/**
*
* SbloccaCodiceForm
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { createTextMask } from 'redux-form-input-masks';

import AlertBanner from 'components/AlertBanner';
import { Button } from 'components/Button';
import Img from 'components/Image';
import { H3 } from 'components/Heading';
import P, { Separator, SeparatorText, LegalInfo } from 'components/Paragraph';
import { CardForm, FormElement } from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import validate from './validator';
import paybox from './images/payboxinfo.png';


export const FormTitle = styled(H3)`
  margin: 1em 0;
`;

FormTitle.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const maskDefinitions = {
  A: {
    regExp: /[A-Za-z0-9]/,
    transform: (char) => (char.toUpperCase()),
  },
};

const codeTextMask = createTextMask({
  pattern: 'AAAA-AAAA-AAAA',
  maskDefinitions,
});

export const required = (value) => value ? undefined : 'Campo obbligatorio';


export class SbloccaCodiceForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { feedback, handleSubmit, valid, togglePaypalBox } = this.props;

    return (
      <CardForm onSubmit={handleSubmit}>
        <FormTitle>Se possiedi già un codice</FormTitle>
        <P>Inserisci qui il codice ricevuto dal tuo docente o quello che trovi sul frontespizio del libro.</P>
        <P>Assicurati di inserire tutti e 12 i caratteri da cui è composto.</P>
        {feedback.hasFeedback && (
          <AlertBanner
            text={feedback.messaggio}
            actioncolor={feedback.tipologia}
          >
            {feedback.messaggio}
          </AlertBanner>
        )}
        <FormElement>
          <Field
            name="codice"
            component={renderedField}
            type="text"
            label="codice"
            validate={[required]}
            {...codeTextMask}
            align="center"
          />
        </FormElement>
        <FormElement>
          <Button
            actioncolor="okay"
            full
            disabled={!valid}
          >Attiva Premium
          </Button>
        </FormElement>
        <Separator>
          <SeparatorText>Oppure</SeparatorText>
        </Separator>
        <FormTitle>Procedi all&apos;acquisto</FormTitle>
        <P>Assicurati di acquistare una licenza Premium solo se sei stato invitato a far parte di una classe dal tuo docente.</P>
        <FormElement>
          <Button outline={1} full onClick={togglePaypalBox} type="button">Acquista Premium</Button>
        </FormElement>
        <Img src={paybox} alt="PayPal" responsive />
        <LegalInfo>PayPal è il metodo rapido e sicuro per pagare e farsi pagare online</LegalInfo>
      </CardForm>
    );
  }
}

SbloccaCodiceForm.propTypes = {
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  togglePaypalBox: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'sbloccaCodice',
  validate,
})(SbloccaCodiceForm);
