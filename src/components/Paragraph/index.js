/**
*
* Paragraph
*
*/

import styled, { css } from 'styled-components';

import media from 'style/mediainjector';
import { colore } from 'style/color';

const Paragraph = styled.p`
  color: ${(props) => props.color ? props.color : 'inherit'};
  font-size: ${(props) => props.fontSize};
  text-align: ${(props) => props.align};
  text-transform: ${(props) => props.transform};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding ? props.padding : '0'};
  border: ${(props) => props.border ? props.border : 'none'};
  background-color: ${(props) => props.bgColor ? props.bgColor : 'transparent'};
  user-select: ${(props) => props.userSelect ? props.userSelect : 'auto'};
  a {
    color: ${(props) => props.theme.brand};
    &:hover {
      ${media.desktop`
        color: ${(props) => props.theme.darken};
      `}
    }
  }
  ${media.print`
    ${({ noPrint }) => noPrint && css`
        display:none;
    `}
  `}
`;

Paragraph.defaultProps = {
  theme: {
    brand: '#00BBEF',
    darken: '#1588AA',
  },
};

export const LegalInfo = styled(Paragraph)`
  color: ${(props) => props.color ? props.color : colore.ui.lightTxt};
  font-size: 12px;
  label {
    display:inline-block;
  }
  ${media.lt480`
    font-size: 10px;
  `}
`;

export const Separator = styled(Paragraph)`
  border-top: 1px solid ${(props) => props.theme.light};
  display: block;
  margin: ${(props) => props.margin ? props.margin : '24px auto'};
  height: 1px;
  position: relative;
  text-align: center;
  width: 100%;
  ${({ noPrint }) => noPrint && css`
      display:none;
  `}
  ${({ inverse }) => inverse && css`
    border-top: 1px solid ${colore.ui.contrast};
    span {
      color: ${colore.ui.contrast};
      background-color: ${(props) => props.theme.brand};
    }
  `}
`;

Separator.defaultProps = {
  theme: {
    brand: '#00BBEF',
    light: '#C9E4FF',
  },
};

export const SeparatorText = styled.span`
  color: ${(props) => props.color ? props.color : props.theme.light};
  display: inline-block;
  padding: 0.5em;
  position: relative;
  top: -1.1em;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.mainBg};
`;

Separator.defaultProps = {
  theme: {
    light: '#C9E4FF',
  },
};

export default Paragraph;
