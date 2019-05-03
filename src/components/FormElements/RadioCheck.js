/**
*
* RadioCheck
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colore } from 'style/color';
import media from 'style/mediainjector';

export const RadioCheckLabel = styled.label`
  position: relative;
  display: block;
  width: 100%;
  margin: 10px 0;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  ${media.desktop`
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom-width: 2px;
  `}
  ${({ type, hasImage }) => {
    if (!hasImage && type === 'radio') {
      return css`
        border-radius: 100px;
        padding: 12px 16px 11px 52px;
      `;
    }
    if (hasImage && type === 'radio') {
      return css`
        text-align: center;
        border-radius: 6px;
        padding: 12px;
        display: inline-block;
        width: 48%;
        margin: 1%;
      `;
    }
    if (!hasImage && type === 'checkbox') {
      return css`
        border-radius: 3px;
        padding: 10px 16px 10px 44px;
      `;
    }
    if (hasImage && type === 'checkbox') {
      return css`
        padding: 12px;
        display: inline-block;
        width: 48%;
        margin: 1%;
      `;
    }
    return '';
  }};
  ${({ checked, hasImage }) => {
    if (!hasImage && checked) {
      return css`
        color: ${colore.ui.contrast};
        background-color: ${(props) => props.theme.brand};
        ${media.desktop`
          border-bottom-width: 1px;
        `}
      `;
    }
    if (hasImage && checked) {
      return css`
        box-shadow: 0 0 0 4px ${(props) => props.theme.brand};
        ${media.desktop`
          border: none;
        `}
      `;
    }
    return '';
  }};
  ${({ sbagliato, hasImage }) => {
    if (!hasImage && sbagliato) {
      return css`
        color: ${colore.ui.contrast};
        background-color: ${colore.actions.error};
        ${media.desktop`
          border-bottom-width: 1px;
        `}
      `;
    }
    if (hasImage && sbagliato) {
      return css`
        box-shadow: 0 0 0 4px ${colore.actions.error};
      `;
    }
    return '';
  }};
  ${({ giusto, hasImage }) => {
    if (!hasImage && giusto) {
      return css`
        color: ${colore.ui.contrast};
        background-color: ${colore.actions.okay};
        ${media.desktop`
          border-bottom-width: 1px;
        `}
      `;
    }
    if (hasImage && giusto) {
      return css`
        box-shadow: 0 0 0 4px ${colore.actions.okay};
      `;
    }
    return '';
  }};
  a {
    color: currentColor;
  }
  img {
    max-height: 200px;
  }
`;

RadioCheckLabel.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const FakeRadioCheck = styled.span`
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  top: 50%;
  margin: -9px 0 0 0;
  border: 4px solid ${(props) => props.theme.brand};
  background: ${colore.ui.contrast};
  box-shadow: inset 0 0 0 3px ${colore.ui.contrast};
  ${({ type }) => type === 'radio' && css`
    left: 17px;
    border-radius: 100%;
  `};
  ${({ type }) => type === 'checkbox' && css`
    left: 12px;
  `};
  ${({ checked }) => checked && css`
    border: 4px solid ${colore.ui.contrast};
    background-color: ${colore.ui.contrast};
    box-shadow: inset 0 0 0 3px ${(props) => props.theme.brand};
  `};
  ${({ sbagliato }) => sbagliato && css`
    border: 4px solid ${colore.ui.contrast};
    background-color: ${colore.ui.contrast};
    box-shadow: inset 0 0 0 3px ${colore.actions.error};
  `};
  ${({ giusto }) => giusto && css`
    border: 4px solid ${colore.ui.contrast};
    background-color: ${colore.ui.contrast};
    box-shadow: inset 0 0 0 3px ${colore.actions.okay};
  `};
  ${({ hasImage }) => hasImage && css`
    display: none;
  `};
`;

FakeRadioCheck.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

class RadioCheck extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { label, type, checked, sbagliato, giusto, hasImage } = this.props;
    return (
      <RadioCheckLabel
        type={type}
        checked={checked}
        sbagliato={sbagliato}
        giusto={giusto}
        hasImage={hasImage}
        onClick={this.props.onClickFunction}
      >
        <FakeRadioCheck
          type={type}
          checked={checked}
          readOnly={this.props.readonly}
          sbagliato={sbagliato}
          giusto={giusto}
          hasImage={hasImage}
        />
        {label}
      </RadioCheckLabel>
    );
  }
}

RadioCheck.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  sbagliato: PropTypes.bool,
  giusto: PropTypes.bool,
  readonly: PropTypes.bool,
  onClickFunction: PropTypes.func,
  hasImage: PropTypes.bool,
};

export default RadioCheck;
