/**
*
* AcquistaForm
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button as ButtonPaypal } from 'paypal-checkout';

import ReactDOM from 'react-dom';

import AlertBanner from 'components/AlertBanner';
import Div from 'components/Div';
import { Button } from 'components/Button';
import { H3 } from 'components/Heading';
import { BrandTxt } from 'components/Text';
import { Separator, SeparatorText } from 'components/Paragraph';
import { CardForm, FormElement } from 'components/FormElements';
import ButtonRadioCheck from 'components/FormElements/ButtonRadioCheck';
import { PAYPAL } from 'configuration';
import validate from './validator';

export const required = (value) => value ? undefined : 'Campo obbligatorio';
const PayPalButtonComponent = ButtonPaypal.driver('react', { React, ReactDOM });

export class AcquistaForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      feedback,
      togglePaypalBox,
      prodotti,
      selectedValue,
      authorizePaypal,
      paymentPaypal,
      userAnagraphics,
    } = this.props;

    const prodottoSelezionato = prodotti.filter(
      (prodotto) => (prodotto.order_data === selectedValue)
    )[0] || undefined;

    return (
      <CardForm>
        {feedback.hasFeedback && feedback.messaggio ? (
          <AlertBanner
            text={feedback.messaggio}
            actioncolor={feedback.tipologia}
          >
            {feedback.messaggio}
          </AlertBanner>
        ) :
          ([
            !prodottoSelezionato && (
              <div key="scelta_prodotto">
                <H3 margin="1em 0">Seleziona i prodotti che desideri acquistare:</H3>
                <FormElement>
                  {prodotti.map((prodotto) => (
                    <Field
                      htmlFor="prodotto"
                      name="prodotto"
                      id={`prodotto_${prodotto.id}`}
                      key={`prodotto_${prodotto.id}`}
                      component={ButtonRadioCheck}
                      validate={[required]}
                      type="radio"
                      value={prodotto.order_data}
                      label={`${prodotto.descrizione} ${prodotto.prezzo}€`}
                    />
                  ))}
                </FormElement>
              </div>
            ),
            prodottoSelezionato && (
              <div key="prodotto_selezionato">
                <Div bgColor="white" radius="3px" padding="10px">
                  <p><strong><BrandTxt>Prodotto selezionato:</BrandTxt></strong><br />{prodottoSelezionato.descrizione}<br /><br /><strong><BrandTxt>Prezzo:</BrandTxt></strong><br />{prodottoSelezionato.prezzo}€</p>
                </Div>
                <Separator>
                  <SeparatorText>Procedi all&apos;acquisto</SeparatorText>
                </Separator>
                <FormElement>
                  <PayPalButtonComponent
                    commit
                    style={PAYPAL.style}
                    locale={PAYPAL.locale}
                    env={PAYPAL.env}
                    validate={this.paypalValidate}
                    client={PAYPAL.client}
                    payment={/* istanbul ignore next */ (data, actions) => paymentPaypal(
                      data, actions, {
                        total: prodottoSelezionato.prezzo,
                        currency: PAYPAL.currency,
                        description: `${prodottoSelezionato.descrizione} - utente: ${userAnagraphics.email}`,
                      },
                    )}
                    onAuthorize={
                      /* istanbul ignore next */ (data, actions) => authorizePaypal(data, actions, prodottoSelezionato.order_data)
                    }
                  />
                </FormElement>
                <Separator>
                  <SeparatorText>Oppure</SeparatorText>
                </Separator>
              </div>
            ),
            <Button full outline={1} onClick={togglePaypalBox} type="button" key="button_annulla">Annulla e inserisci codice</Button>,
          ])
        }
      </CardForm>
    );
  }
}

AcquistaForm.propTypes = {
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  togglePaypalBox: PropTypes.func.isRequired,
  prodotti: PropTypes.arrayOf(
    PropTypes.shape({
      prezzo: PropTypes.string.isRequired,
      descrizione: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      order_data: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  authorizePaypal: PropTypes.func.isRequired,
  paymentPaypal: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default reduxForm({
  form: 'acquista',
  validate,
})(AcquistaForm);
