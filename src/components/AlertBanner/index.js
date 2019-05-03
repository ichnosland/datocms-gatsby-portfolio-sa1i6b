/**
*
* AlertBanner
*
*/

import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import FlexBox from 'components/FlexBox';
import media from 'style/mediainjector';
import { colore } from 'style/color';

export const BannerStyle = css`
  ${({ tag }) => tag && css`display: inline-flex;`};
  color: ${(props) => props.color ? props.color : colore.ui.txt};
  text-align: center;
  margin: ${(props) => props.margin ? props.margin : '0'};
  border: ${(props) => props.border ? `1px solid ${props.theme.brand}` : `1px solid ${colore.ui.neutralBg}`};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  ${({ actioncolor }) => actioncolor && css`
    border: 1px solid ${colore.actions[actioncolor]};
    background-color: ${lighten(0.4, colore.actions[actioncolor])};
    color: ${darken(0.2, colore.actions[actioncolor])};
    svg {
      fill: ${darken(0.2, colore.actions[actioncolor])};
    }
  `}
  ${({ shadow }) => shadow && css`
    border: none;
    box-shadow: 0 0 4px 1px rgba(0,0,0,0.20);
  `}
  border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.general};
  &:active,
  &:focus {
    outline: none;
  }
`;

export const AlertBanner = styled(FlexBox)`
  ${BannerStyle}
  padding: ${(props) => props.padding ? props.padding : '0.6em  1.6em'};
  svg {
    fill: ${({ color, actioncolor }) => {
    if (color) return color;
    if (actioncolor) return actioncolor;

    return colore.ui.txt;
  }};
  }
`;

AlertBanner.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      general: '6px',
    },
  },
  actioncolor: '',
};

export const InfoBanner = styled(AlertBanner)`
  padding: ${(props) => props.padding ? props.padding : '0.6em  1em'};
  ${media.lt667`
    flex-direction: column;
    svg {
      margin: 10px 0;
    }
  `}
  ${media.iphone45`
    padding: ${(props) => props.padding ? props.padding : '0.6em'};
  `}
`;

InfoBanner.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      general: '6px',
    },
  },
  actioncolor: '',
};

export const IconBanner = styled(FlexBox)`
  ${BannerStyle}
  align-self: stretch;
  align-items: center;
  padding: ${(props) => props.padding ? props.padding : '9px 16px'};
  div {
    margin-right: 12px;
    align-items: center;
    &:last-child {
      margin-right: 0;
    }
  }
  ${media.iphone45`
    padding: ${(props) => props.padding ? props.padding : '7px 12px'};
  `}
`;

IconBanner.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      general: '6px',
    },
  },
  actioncolor: '',
};

export default AlertBanner;
