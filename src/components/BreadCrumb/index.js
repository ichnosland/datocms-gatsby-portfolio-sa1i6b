/**
*
* BreadCrumb
*
*/

import styled, { css } from 'styled-components';

import Div from 'components/Div';
import media from 'style/mediainjector';
import { colore } from 'style/color';

export const BreadCrumb = styled(Div)`
  color: ${(props) => props.color};
  position: relative;
  display: ${(props) => props.display ? props.display : 'inline-block'};
  text-align: center;
  border: ${(props) => props.border ? props.border : `1px solid ${colore.ui.neutralBg}`};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.general};
  ${media.print`
   ${({ noPrint }) => noPrint && css`
       display:none;
   `}
 `}
`;

export const Crumb = styled(Div)`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  padding: 0.4em 1.4em 0.4em 0.8em;
  &:first-child {
    padding-left: 1.2em;
    &:after {
      content: "⟩";
      position: absolute;
      right: 0;
    }
  }
  &:not(:first-child):not(:last-child) {
    &:after {
      content: "⟩";
      position: absolute;
      right: 0;
    }
  }
  &:only-child {
    &:after {
      content: "";
      position: relative;
    }
  }
`;

BreadCrumb.defaultProps = {
  theme: {
    radius: {
      general: '6px',
    },
  },
};

export default BreadCrumb;
