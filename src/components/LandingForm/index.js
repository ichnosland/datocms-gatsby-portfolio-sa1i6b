/**
*
* LandingForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Field, reduxForm } from 'redux-form/immutable';
import { H2, H3 } from 'components/Heading';
import Div from 'components/Div';
import P from 'components/Paragraph';
import AlertBanner from 'components/AlertBanner';
import { ActionButton } from 'components/Button';
import FlexBox, { FlexChild } from 'components/FlexBox';
import { singleFieldRequired } from 'common/forms';
import media from 'style/mediainjector';
import InputRadioCheck from 'components/FormElements/InputRadioCheck';
import SelectField from 'components/FormElements/SelectField';
import { colore } from 'style/color';

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

const tipologiaAdozione = [{
  label: 'No, richiedo classe di prova',
  value: 'prova',
}, {
  label: 'Si, versione solo digitale',
  value: 'digitale',
}, {
  label: 'Si, versione cartaceo + digitale',
  value: 'cartaceo_e_digitale',
}];

const piattaforme = [{
  label: 'Academy',
  value: 'academy',
}, {
  label: 'Lyceum',
  value: 'lyceum',
}];

export const requiredPiattaforma = (_, allValues) => {
  const piattaforma = allValues.toJS().piattaforma;

  return Object.keys(piattaforma || {}).filter((key) => piattaforma[key]).length ?
    undefined : 'Obbligatorio';
};

export class LandingFormView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      formtitle,
      alatin,
      valid,
      handleClose,
      handleSubmit,
      feedback,
      closeFeedbackFunction,
      color,
      privacy,
      formFields,
    } = this.props;

    return (
      <Div
        padding="30px 20px 20px"
        color={color}
        height="100%"
      >
        {feedback.hasFeedback && (feedback.tipologia === 'okay' ? (
          <FlexBox direction="column" align="center" height="100%" className="FlexFeedback">
            <H3 align="center" margin="24px auto 48px" color="currentColor">{feedback.messaggio}</H3>
            <ActionButton
              shadow={1}
              sectionbutton={1}
              bgcolor={colore.actions.help}
              onClick={closeFeedbackFunction}
              type="submit"
            >
              Chiudi
            </ActionButton>
          </FlexBox>
        ) : (<AlertBanner margin="10px auto 20px" actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>)
        )}
        {feedback.tipologia !== 'okay' && (
          <form>
            <H2 center margin="0">{formtitle}</H2>
            <P align="center">* campi obbligatori</P>
            {formFields.map((field) => (
              field.title ? field.title : (
                <InputRow key={`landing_form_input_${field.id}`}>
                  <Field
                    {...field}
                  >
                    {field.opts && field.opts.map((opt) => (
                      <option
                        key={`landing_form_input_${field.id}_${opt.id}`}
                        id={`landing_form_input_${field.id}_${opt.id}`}
                        value={opt.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                </InputRow>
              )))
            }
            {alatin &&
              <Div>
                <P align="center">Scegli la piattaforma:</P>
                <FlexBox justifyContent="space-between">
                  {piattaforme.map((piattaforma) => (
                    <FlexChild
                      key={`piattaforma_${piattaforma.value}`}
                      maxWidth="48%"
                      flexGrow="1"
                    >
                      <Field
                        htmlFor={`piattaforma_${piattaforma.value}`}
                        name={`piattaforma[${piattaforma.value}]`}
                        id={`piattaforma_${piattaforma.value}`}
                        component={InputRadioCheck}
                        validate={[requiredPiattaforma]}
                        type="checkbox"
                        value={piattaforma.value}
                        label={piattaforma.label}
                        bgcolor="rgba(255, 255, 255, 0.3)"
                      />
                    </FlexChild>
                  ))}
                </FlexBox>
                <Div>
                  <P align="center">Hai già adottato?</P>
                  <Field
                    name="tipologiaAdozione"
                    component={SelectField}
                    validate={[singleFieldRequired]}
                  >
                    <option key="tipologiaAdozione_label" value="" disabled>Seleziona un&apos;opzione dall&apos;elenco*</option>
                    {tipologiaAdozione.map((field) => (
                      <option
                        key={`tipologiaAdozione_${field.value}`}
                        id={`tipologiaAdozione_${field.value}`}
                        value={field.value}
                      >
                        {field.label}
                      </option>
                    ))
                    }
                  </Field>
                </Div>
              </Div>
            }
            {privacy && [
              <P align="center" key="privacy_label"><small>È necessario accettare i termini della privacy</small></P>,
              <Field
                key="privacy_field"
                name="privacy"
                id="privacy"
                component={InputRadioCheck}
                validate={[singleFieldRequired]}
                type="checkbox"
                bgcolor="rgba(255, 255, 255, 0.2)"
                label={<small htmlFor="privacy">Ho letto e accetto le <a href="https://maieuticallabs.it/privacy" target="_blank">normative sulla Privacy</a></small>}
              />,
            ]}
            <FlexBox justifyContent="space-between" align="center" margin="24px auto 0" wrap="wrap">
              <FormButton
                shadow={1}
                bgcolor={colore.actions.escape}
                onClick={handleClose}
                type="button"
              >
                Annulla
              </FormButton>
              <FormButton
                shadow={1}
                bgcolor={colore.landing.green}
                disabled={!valid}
                onClick={handleSubmit}
                type="button"
              >
                Invia
              </FormButton>
            </FlexBox>
          </form>
        )}
      </Div>
    );
  }
}

LandingFormView.propTypes = {
  alatin: PropTypes.bool,
  privacy: PropTypes.bool,
  formtitle: PropTypes.string,
  color: PropTypes.string,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      validate: PropTypes.arrayOf(PropTypes.func),
    }),
  ),
  closeFeedbackFunction: PropTypes.func,
};

const LandingForm = reduxForm({
  form: 'feedbackForm',
})(LandingFormView);

export default LandingForm;
