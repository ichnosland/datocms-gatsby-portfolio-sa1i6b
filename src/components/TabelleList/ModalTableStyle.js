/**
*
* ModalTableStyle
*
*/

import { transparentize } from 'polished';
import { css } from 'styled-components';

import { colore } from 'style/color';

export const ModalTableStyle = css`
  color: ${colore.ui.txt};
  text-align: left;
  border-spacing: 0;
  border: none;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  user-select: ${(props) => props.userSelect};
  th {
    color: ${colore.ui.contrast};
    font-weight: 400;
    padding: 9px 12px;
    background-color: ${(props) => props.theme.brand};
  }
  td {
    padding: 9px 12px;
    overflow:hidden;
    word-break:normal;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${(props) => props.theme.brand && transparentize(0.8, props.theme.brand)};
    &:nth-child(odd) {
      width: 6rem;
      color: ${(props) => props.theme.brand};
      background-color:  ${(props) => props.theme.brand && transparentize(0.9, props.theme.brand)};
      border-right-width: 1px;
      border-right-style: solid;
      border-right-color:  ${(props) => props.theme.brand && transparentize(0.8, props.theme.brand)};
      text-align: center;
    }
    &:nth-child(even) {
      background: ${colore.ui.contrast};
    }
  }
  tr {
    &:last-child {
      td{
        &:first-child {
          border-bottom: none;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
`;

ModalTableStyle.DefaultProps = {
  theme: {
    brand: 'mediumseagreen',
  },
};
