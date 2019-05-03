/**
*
* Div
*
*/

import styled, { css } from 'styled-components';
import media from 'style/mediainjector';

const Div = styled.div`
  display: ${(props) => props.display ? props.display : 'block'};
  position: ${(props) => props.position ? props.position : 'relative'};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth ? props.maxWidth : '100%'};
  height: ${(props) => props.height};
  color: ${(props) => props.color ? props.color : 'inherit'};
  text-align: ${(props) => props.align};
  float: ${(props) => props.float ? props.float : 'none'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  padding: ${(props) => props.padding ? props.padding : '0'};
  border: ${(props) => props.border ? props.border : 'none'};
  border-width: ${(props) => props.borderwidth};
  border-style: ${(props) => props.borderstyle};
  border-color: ${(props) => props.bordercolor};
  background-color: ${(props) => props.bgColor ? props.bgColor : 'transparent'};
  border-radius: ${(props) => props.radius};
  overflow: ${(props) => props.overflow ? props.overflow : 'visible'};
  user-select: ${(props) => props.userSelect};
  pointer-events: ${(props) => props.pointerEvents};
  z-index: ${(props) => props.zindex};
  ${(props) => props.nobreak && css`
    page-break-inside: avoid;
  `}
  ${media.print`
    ${({ noPrint }) => noPrint && css`
        display:none;
    `}
  `}
`;

export default Div;
