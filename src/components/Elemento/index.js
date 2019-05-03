/**
*
* Elemento
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import FlexBox from 'components/FlexBox';
import Div from 'components/Div';
import media from 'style/mediainjector';
import { colore } from 'style/color';

const dragColors = [
  '#f5ee97',
  '#d6f4a0',
  '#E0D5E3',
  '#ffd8bf',
  '#cde5ff',
];

const elementoGiusto = css`
  color: ${colore.ui.contrast};
  border-width: 2px;
  border-style:solid;
  box-shadow: none;
  pointer-events: none;
`;

const elementoInattivo = css`
  color: ${(props) => props.theme.subtle};
  background-color: ${(props) => props.theme.subtle};
  border-color: ${(props) => props.theme.subtle};
  opacity: 0.3;
`;

elementoInattivo.defaultProps = {
  theme: {
    subtle: '#B4E1FF',
  },
};

const dragHelp = css`
  color: ${colore.ui.txt};
  background-color: ${colore.ui.contrast};
  border-width: 2px;
  border-style: solid;
  box-shadow: none;
  pointer-events: none;
`;

export const BaseElemento = styled(FlexBox)`
  display: inline-flex;
  color: ${colore.ui.txt};
  margin: 0 6px 8px 0;
  background-color: ${colore.ui.contrast};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  user-select: none;
  &:hover {
    border-color: rgba(0, 0, 0, 0.4);
  }
  &:active {
    color: #fff;
    background-color: ${(props) => props.theme.brand};
    box-shadow: none;
    div {
      color: #fff;
      background-color: ${(props) => props.theme.brand};
    }
  }
  span {
    padding: 6px 8px;
  }
  & span > span {
    padding: 0;
  }
  ${({ giusto }) => giusto && css`
    ${elementoGiusto}
    background-color: ${colore.actions.okay};
    border-color: ${colore.actions.okay};
  `};
  ${({ sbagliato }) => sbagliato && css`
    ${elementoGiusto}
    background-color: ${colore.actions.error};
    border-color: ${colore.actions.error};
  `};
  ${({ inserito }) => inserito && css`
    background: none;
    border: none;
    margin-bottom: 0;
    box-shadow: none;
    span {
      padding: 0;
    }
    &:hover,
    &:active,
    &:focus {
      color: ${colore.ui.txt};
      background: none;
      border: none;
      box-shadow: none;
    }
    ${media.desktop && css`
      &:hover,
      &:active,
      &:focus {
        color: ${(props) => props.theme.brand};
      }
    `}
  `};
  ${({ inattivo }) => inattivo && css`
    ${elementoInattivo}
    box-shadow: none;
    cursor: default;
    &:hover,
    &:active,
    &:focus {
      ${elementoInattivo}
    }
  `};
  ${({ trovato }) => trovato && css`
    color: ${colore.ui.contrast};
    background-color: ${(props) => props.theme.light};
    border-color: ${(props) => props.theme.light};
    box-shadow: none;
    cursor: default;
    &:hover,
    &:active,
    &:focus {
      border-color: ${(props) => props.theme.light};
    }
  `};
  ${({ disabled }) => disabled && css`
    pointer-events: none;
  `};
  ${({ drag }) => drag && css`
    flex-direction: column;
    ${({ giusto }) => giusto && css`
      ${dragHelp};
      border-color: ${colore.actions.okay};
    `};
    ${({ sbagliato }) => sbagliato && css`
      ${dragHelp};
      border-color: ${colore.actions.error};
    `};
  `};
  ${({ dragDisabled }) => dragDisabled && css`
    pointer-events: none;
    box-shadow: none;
    span {
      color: ${colore.ui.darkBg}
    }
  `};
  &:last-child {
    margin-right: 0;
  }
`;

BaseElemento.defaultProps = {
  theme: {
    brand: '#00BBEF',
    light: '#C9E4FF',
  },
};

export const SubLabel = styled(Div)`
  display: block;
  width: 100%;
  min-height: 18px;
  color: ${colore.ui.groupLabelTxt};
  padding-top: 3px;
  background-color: ${colore.ui.mainBg};
  font-family: sans-serif;
  font-size: 11px;
  pointer-events: none;
  user-select: none;
  ${({ dragDisabled }) => dragDisabled && css`
    span {
      color: ${colore.ui.mainBg}
    }
  `};
  ${({ dragColor }) => dragColor === 'uno' && css`
    background-color: ${dragColors[0]};
  `};
  ${({ dragColor }) => dragColor === 'due' && css`
    background-color: ${dragColors[1]};
  `};
  ${({ dragColor }) => dragColor === 'tre' && css`
    background-color: ${dragColors[2]};
  `};
  ${({ dragColor }) => dragColor === 'quattro' && css`
    background-color: ${dragColors[3]};
  `};
  ${({ dragColor }) => dragColor === 'cinque' && css`
    background-color: ${dragColors[4]};
  `};
`;

class Elemento extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onClickFx, inattivo, disabled, label, trovato, drag, dragDisabled, dragLabel, dragColor, giusto, sbagliato, inserito } = this.props;
    return (
      <BaseElemento
        inattivo={inattivo}
        disabled={disabled}
        trovato={trovato}
        drag={drag}
        dragDisabled={dragDisabled}
        giusto={giusto}
        sbagliato={sbagliato}
        inserito={inserito}
        onClick={onClickFx}
      >
        {drag &&
          <SubLabel
            disabled={disabled}
            dragDisabled={dragDisabled}
            dragColor={dragColor}
          >
            <span>{dragLabel}</span>
          </SubLabel>
        }
        <span>{label}</span>
      </BaseElemento>
    );
  }
}

Elemento.propTypes = {
  inattivo: PropTypes.bool,
  disabled: PropTypes.bool,
  drag: PropTypes.bool,
  dragLabel: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  dragColor: PropTypes.string,
  dragDisabled: PropTypes.bool,
  trovato: PropTypes.bool,
  giusto: PropTypes.bool,
  sbagliato: PropTypes.bool,
  inserito: PropTypes.bool,
  onClickFx: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default Elemento;
