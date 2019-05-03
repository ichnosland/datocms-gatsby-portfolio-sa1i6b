/**
*
* ButtonRadioCheck
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colore } from 'style/color';
import { RadioCheckInput } from './InputRadioCheck';

export const ButtonRadioCheckLabel = styled.label`
  position: relative;
  display: block;
  padding: 12px;
  margin: 10px 0;
  background-color: ${colore.ui.contrast};
  border: 1px solid ${(props) => props.theme.brand};
  border-bottom-width: 3px;
  border-radius: ${(props) => props.theme.radius.general};
  ${({ checked }) => checked && css`
    color: ${(props) => props.theme.brand};
    border-width: 1px;
    &:after{
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 5px;
      border: 3px solid ${(props) => props.theme.pale};
    }
  `};
`;

ButtonRadioCheckLabel.defaultProps = {
  theme: {
    brand: '#00BBEF',
    pale: 'rgb(199, 231, 245)',
    radius: {
      general: '6px',
    },
  },
};

class ButtonRadioCheck extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { label, type, id, input } = this.props;
    return (
      <ButtonRadioCheckLabel
        type={type}
        checked={input.checked}
        htmlFor={id}
      >
        <RadioCheckInput
          {...input}
          type={type}
          id={id}
        />
        {label}
      </ButtonRadioCheckLabel>
    );
  }
}

ButtonRadioCheck.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  input: PropTypes.object,
};

export default ButtonRadioCheck;
