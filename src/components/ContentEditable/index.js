/**
*
* ContentEditable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { colore } from 'style/color';

export const EditableFieldStyle = css`
  user-select: text;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  color: ${(props) => props.color ? props.color : props.theme.brand};
  padding: ${(props) => props.padding ? props.padding : '6px'};
  border-top: 1px solid ${colore.ui.darkBg};
  border-left: 1px solid ${colore.ui.darkBg};
  border-right: 1px solid ${transparentize(0.5, colore.ui.darkBg)};
  border-bottom: 1px solid ${transparentize(0.5, colore.ui.darkBg)};
  border-radius: ${(props) => props.radius ? props.radius : '3px'};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  &:active {
    background-color: ${colore.ui.note};
  }
  &:active,
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.brand};
  }
  ${({ giusto }) => giusto && css`
    border: 2px solid ${colore.actions.okay};
  `};
  ${({ sbagliato }) => sbagliato && css`
    border: 2px solid ${colore.actions.error};
  `};
`;

export const EditableField = styled.input`
  ${EditableFieldStyle}
  &::placeholder {
    position: relative;
    color: ${(props) => props.theme.subtle};
    opacity: 1;
    overflow: visible;
  }
  &[type="number"] {
    text-align: right;
  }
`;

EditableFieldStyle.defaultProps = {
  theme: {
    brand: '#00BBEF',
    subtle: '#B4E1FF',
  },
};

class ContentEditable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      content,
      onChangeFunction,
      mustBeNumeric,
      label,
      width,
      giusto,
      sbagliato,
    } = this.props;

    return (
      <EditableField
        onChange={onChangeFunction}
        contentEditable
        placeholder={label}
        value={content}
        type={mustBeNumeric ? 'number' : 'text'}
        width={width}
        giusto={giusto}
        sbagliato={sbagliato}
      />
    );
  }
}

ContentEditable.propTypes = {
  content: PropTypes.string,
  label: PropTypes.string,
  onChangeFunction: PropTypes.func,
  mustBeNumeric: PropTypes.bool,
  giusto: PropTypes.bool,
  sbagliato: PropTypes.bool,
  width: PropTypes.string,
};

export default ContentEditable;
