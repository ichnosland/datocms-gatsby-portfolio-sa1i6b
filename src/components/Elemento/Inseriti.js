/**
*
* Inseriti
*
*/

import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const Inseriti = styled.div`
  min-height: 34px;
  padding: 10px;
  margin: 20px auto;
  background-color: ${colore.ui.contrast};
  border-radius: 3px;
  ${media.desktop`
    min-height: 41px;
    border: 1px solid ${transparentize(0.5, colore.ui.darkBg)};
    ${({ giusto }) => giusto && css`
      border: 2px solid ${colore.actions.okay};
    `};
    ${({ sbagliato }) => sbagliato && css`
      border: 2px solid ${colore.actions.error};
    `};
  `};
  ${({ giusto }) => giusto && css`
    border: 2px solid ${colore.actions.okay};
  `};
  ${({ sbagliato }) => sbagliato && css`
    border: 2px solid ${colore.actions.error};
  `};
`;
