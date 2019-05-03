/**
*
* Bar
*
*/

import styled, { css } from 'styled-components';

import media from 'style/mediainjector';
import { colore } from 'style/color';

const BarShadow = '0 6px 0 rgba(0,0,0,.1)';
const searchShadow = '0 4px 8px rgba(0,0,0,.3)';

export const Bar = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  color: ${(props) => props.color ? props.color : colore.ui.contrast};
  width: 100%;
  height: 56px;
  padding: 0 20px;
  background-color: ${(props) => props.bgColor ? props.bgColor : props.theme.brand};
  box-shadow: ${(props) => props.noShadow ? 'none' : BarShadow};
  z-index: 8;
  transition: all 0.5s;
  ${({ pinned }) => pinned && css`
    position: fixed;
    left: 0;
    top: 0;
  `};
  ${({ searchActive }) => searchActive && css`
    background-color: ${colore.ui.mainBg};
    box-shadow: ${searchShadow};
  `};
  ${(props) => props.box && css`
    background-color: transparent;
    ${media.mobile`
      padding-top: 20px;
    `}
  `};
  ${media.print`
    display:none;
  `}
`;

Bar.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export default Bar;
