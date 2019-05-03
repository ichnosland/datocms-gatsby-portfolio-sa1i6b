/**
*
* Text
*
*/

import styled, { css } from 'styled-components';

import { clearLinkStyle } from 'components/ClearLink';
import { colore } from 'style/color';


export const BrandTxt = styled.span`
  color: ${(props) => props.theme.brand};
`;

export const ColorTxt = styled.span`
  color: ${(props) => props.color};
`;

export const Lessico = styled.span`
  padding-bottom: 1px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAGCAYAAADOic7aAAAAIUlEQVQYlWNkwAE2XHj4H5t4gIE8IzZxJlwGkQpGDSIMAGtUBAzpFrfHAAAAAElFTkSuQmCC') repeat-x bottom left;
  background-size: 6px 2px;
`;

export const Contesto = styled.span`
  color: ${colore.ui.contesto};
  ${({ lessico }) => lessico && css`
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAGCAYAAADOic7aAAAAIUlEQVQYlWNkwAH+zGX4j02cJZmBEZs4Ey6DSAWjBhEGANV2Awy7TPctAAAAAElFTkSuQmCC') repeat-x bottom left;
    background-size: 6px 2px;
  `}
`;

export const ClearAnchor = styled.a`
  ${clearLinkStyle}
`;
