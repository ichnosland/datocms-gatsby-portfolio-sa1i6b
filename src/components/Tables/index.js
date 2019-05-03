/*
 *
 * Tables
 *
 */

import styled, { css } from 'styled-components';

import media from 'style/mediainjector';
import { colore } from 'style/color';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-width: 1px;
  border-style: solid;
  background-color: ${(props) => props.bgcolor};
  ${media.lt480`
    font-size: 12px;
  `}
  ${({ fixed }) => fixed && css`
    width: 100%;
    table-layout: fixed;
  `}
  ${({ pricing }) => pricing && css`
    color: white;
    border-color: white;
  `}
  ${({ neutral }) => neutral && css`
    border-color: ${colore.landing.dark};
    td {
      vertical-align: top;
      padding: 16px;
      ${media.lt667`
        padding: 12px;
        ul {
          padding: 10px;
        }
      `}
    }
  `}
  strong {
    font-weight: 700;
  }
`;

export const Tr = styled.tr`
  border-top: ${(props) => props.Bt ? props.Bt : 'none'};
  border-right: ${(props) => props.Br ? props.Br : 'none'};
  border-left: ${(props) => props.Bl ? props.Bl : 'none'};
  border-bottom: ${(props) => props.Bb ? props.Bb : 'none'};
  ${({ fullBg }) => fullBg && css`
    background-color: ${(props) => props.Bg ? props.Bg : 'white'};
    color: ${(props) => props.color ? props.color : '#0085b2'};
  `}
`;

export const Td = styled.td`
  padding: 14px 5px;
  overflow:hidden;
  word-break:normal;
  background-color: ${(props) => props.bgcolor};
  border-top: ${(props) => props.Bt ? props.Bt : 'none'};
  border-right: ${(props) => props.Br ? props.Br : 'none'};
  border-left: ${(props) => props.Bl ? props.Bl : 'none'};
  border-bottom: ${(props) => props.Bb ? props.Bb : 'none'};
`;

export const NoteTd = styled(Td)`
  padding: 6px 5px;
  font-size: 14px;
`;
