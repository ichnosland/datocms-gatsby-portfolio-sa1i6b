/**
 *
 * UnitaPreviewDocente
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';

import FlexBox, { FlexChild } from 'components/FlexBox';
import { Button, Icon } from 'components/Button';
import P from 'components/Paragraph';
import Svg from 'components/Svg';
import { MiniButtonGroup } from 'components/StyledButtonGroup';
import { FormElement } from 'components/FormElements';
import SelectField from 'components/FormElements/SelectField';
import { ButtonLink } from 'components/ButtonLink';
import buttonicon from 'icons/buttons';
import icon from 'icons/globals';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const SelectBtn = styled(SelectField)`
  position: relative;
  select {
    color: ${(props) => props.theme.brand};
    padding: 7px 30px 7px 25px;
     ${media.mobile`
      padding: 9px 30px 9px 25px;
    `}
  }
  svg {
    fill: ${(props) => props.theme.brand};
  }
`;

SelectBtn.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

const StretchButton = styled(Button)`
  align-self: stretch;
`;

export const UnitButton = styled(Button)`
  width: 96px;
  height: 96px;
  padding: 0;
  text-align: center;
  svg {
    width: 32px;
    height: 39px;
    margin: 0;
    fill: #fff;
  }
  background-color: ${colore.actions.action};
  box-shadow: 0 0 0 6px rgba(0,0,0,0.1);
  &:disabled {
    background-color: ${(props) => props.theme.brand};
    box-shadow: 0 0 0 6px rgba(255,255,255,0.5);
  }
`;

const UnitBlockWrap = styled(FlexBox)`
  position:relative;
  ${media.desktop`
    margin-bottom: 30px;
  `}
  ${media.mobile`
    flex-direction: column-reverse;
  `}
`;

export const UnitBlock = styled(FlexChild)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin-bottom: 30px;
  }
  ${media.desktop`
    min-height: 180px;
    width: 50%;
    max-width: 50%;
    &:last-child {
      border-left: 1px solid ${(props) => props.theme.light};
      align-content: center;
      margin-bottom: 0;
    }
  `}
`;

UnitBlock.defaultProps = {
  theme: {
    light: '#C9E4FF',
  },
};

const LastP = styled(P)`
  margin: 0 auto;
  font-size: smaller;
`;

export class UnitaPreviewDocenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      lezioni,
      eseguiUnitaFunction,
      invalid,
      buttonAssegnaFunction,
      tempoEsecuzione,
      unitaId,
      buttonAssegnaLabel,
      buttonAssegnaIcon,
      buttonAssegnaDisabled,
    } = this.props;

    return (
      <form
        onSubmit={eseguiUnitaFunction}
      >
        <UnitBlockWrap>
          <UnitBlock>
            <FormElement>
              <P margin="0 auto 18px">Seleziona una lezione per provarla</P>
              <MiniButtonGroup>
                <Field
                  name="lezione"
                  component={SelectBtn}
                  bgColor="#fff"
                  border="1px solid #fff"
                  radius="30px"
                  color={colore.ui.groupLabelTxt}
                  arrowColor={colore.ui.groupLabelTxt}
                >
                  {lezioni.map((field) => (
                    <option
                      key={`lezione_${field.optionKey}`}
                      id={`lezione_${field.optionKey}`}
                      value={field.optionKey}
                    >
                      {field.optionLabel}
                    </option>
                  ))
                  }
                </Field>
                <StretchButton
                  border="1px solid white"
                  actioncolor="okay"
                  type="submit"
                  disabled={invalid}
                  padding="8px 25px"
                >
                  <Svg {...icon.arrowSlimRight} fill="#fff" />
                </StretchButton>
              </MiniButtonGroup>
            </FormElement>
          </UnitBlock>
          <UnitBlock>
            <P margin="0 auto 18px">{buttonAssegnaLabel}</P>
            <UnitButton
              disabled={buttonAssegnaDisabled}
              onClick={buttonAssegnaFunction}
            >
              <Svg
                {...buttonicon[buttonAssegnaIcon]} // TODO: switch dell'svg
              />
            </UnitButton>
            {buttonAssegnaDisabled &&
              <ButtonLink
                margin="20px auto 0"
                actioncolor="okay"
                to={`/unita-andamento/${unitaId}`}
              >
                <Icon {...buttonicon.stats} left />
                <span>Andamento</span>
              </ButtonLink>
            }
          </UnitBlock>
        </UnitBlockWrap>
        <LastP>Tempo di esecuzione stimato:<br />circa {tempoEsecuzione} minuti</LastP>
      </form>
    );
  }
}

UnitaPreviewDocenteView.propTypes = {
  invalid: PropTypes.bool.isRequired,
  eseguiUnitaFunction: PropTypes.func.isRequired,
  lezioni: PropTypes.arrayOf(
    PropTypes.shape({
      optionLabel: PropTypes.string.isRequired,
      optionKey: PropTypes.number.isRequired,
    }),
  ).isRequired,
  tempoEsecuzione: PropTypes.number.isRequired,
  unitaId: PropTypes.number.isRequired,
  buttonAssegnaLabel: PropTypes.string,
  buttonAssegnaIcon: PropTypes.string.isRequired,
  buttonAssegnaDisabled: PropTypes.bool.isRequired,
  buttonAssegnaFunction: PropTypes.func,
};

const unitaForm = reduxForm({
  form: 'unitaLezione',
  initialValues: { lezione: '0' },
})(UnitaPreviewDocenteView);

export default unitaForm;
