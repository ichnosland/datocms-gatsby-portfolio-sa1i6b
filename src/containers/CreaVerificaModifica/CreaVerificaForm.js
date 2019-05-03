/**
*
* CreaVerificaForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { FormElement } from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import { Button, Icon } from 'components/Button';
import ItemCounter from 'components/TopBar/ItemCounter';
import { ExpandButtonGroup } from 'components/StyledButtonGroup';
import BtnIcn from 'icons/buttons';

export const required = (value) => value ? undefined : 'Campo obbligatorio';

export class CreaVerifica extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      handleSubmit,
      aggiungiEserciziFunction,
      svuotaEserciziFunction,
      saveDisabled,
      itemCount,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormElement>
          <Field
            name="titolo"
            component={renderedField}
            type="text"
            label="Aggiungi un titolo"
            validate={[required]}
          />
        </FormElement>
        <FormElement>
          <Field
            name="note"
            component={renderedField}
            type="text"
            label="note"
            note
          />
        </FormElement>
        <ExpandButtonGroup justifyContent="space-between">
          <Button
            type="button"
            onClick={aggiungiEserciziFunction}
          >
            <Icon {...BtnIcn.plus} left />
            Aggiungi
          </Button>
          {itemCount > 0 &&
            <Button
              actioncolor="escape"
              type="button"
              onClick={svuotaEserciziFunction}
            >
              <Icon {...BtnIcn.trash} left />
              Svuota
            </Button>}
          <Button
            actioncolor="okay"
            type="submit"
            disabled={saveDisabled}
          >
            {itemCount && <ItemCounter hidden={saveDisabled}>{itemCount}</ItemCounter>}
            Salva
          </Button>
        </ExpandButtonGroup >
      </form >
    );
  }
}

CreaVerifica.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  saveDisabled: PropTypes.bool,
  aggiungiEserciziFunction: PropTypes.func.isRequired,
  svuotaEserciziFunction: PropTypes.func.isRequired,
  itemCount: PropTypes.string,
};

const CreaVerificaForm = reduxForm({
  form: 'creaVerifica',
})(CreaVerifica);

export default CreaVerificaForm;
