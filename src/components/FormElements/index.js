/**
*
* FormElements
*
*/

import styled, { css } from 'styled-components';

import Section from 'components/Section';
import Div from 'components/Div';
import { Button, Icon } from 'components/Button';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const BasicInputStyle = css`
  display: block;
  box-sizing: border-box;
  color: ${(props) => props.theme.brand};
  width: 100%;
  text-align: ${(props) => props.align ? props.align : 'left'};
  appearance: none;
  padding: 6px 13px;
  border: 1px solid ${(props) => props.theme.light};
  background-color: ${colore.ui.contrast};
  ${({ note }) => note && css`
    color: ${colore.ui.txt};
    background-color: ${colore.ui.note};
    border-color: ${colore.ui.noteBorder};
  `}
  &::placeholder {
    position: relative;
    color: ${(props) => props.theme.subtle};
    ${({ note }) => note && css`
      color: ${colore.ui.noteBorder};
    `}
    opacity: 1;
    overflow: visible;
  }
  &:active,
  &:focus {
    outline: none;
  }
`;

BasicInputStyle.defaultProps = {
  theme: {
    brand: '#00BBEF',
    subtle: '#B4E1FF',
    light: '#C9E4FF',
    radius: {
      searchBox: '100px',
    },
  },
};

export const FormSection = styled(Section)`
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  &::before {
    content: "";
    display: inline;
  }
`;

export const CardForm = styled.form`
  width: 280px;
  margin: 0 auto;
  text-align: center;
  ${media.lt480`
    width: 240px;
  `}
`;

export const FormElement = styled(Div)`
  position: relative;
  margin: ${(props) => props.margin ? props.margin : '0 auto 18px'};
  ${(props) => props.errore && css`
    margin-bottom: 9px;
  }`
}`;


export const FormMessage = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 15px;
  color: ${(props) => props.color ? props.color : colore.actions.error};
  padding: 6px 9px;
  margin-top: 9px;
  border: 1px solid ${colore.ui.neutralBg};
  background-color: ${colore.ui.contrast};
  border-radius: ${(props) => props.theme.radius.general};
  ${(props) => props.landing && css`
    font-size: smaller;
    padding: 2px 12px;
    border-radius: 60px;
    margin-bottom: 3px;
    box-shadow: 0 0 4px 1px rgba(0,0,0,0.20);
  `}
`;

FormMessage.defaultProps = {
  theme: {
    radius: {
      general: '6px',
    },
  },
};

export const FacebookButton = styled(Button)`
  background-color: ${colore.social.facebook};
  border-radius: 3px;
`;

export const FacebookIcon = styled(Icon)`
  top: -2px;
  fill: #fff;
`;
