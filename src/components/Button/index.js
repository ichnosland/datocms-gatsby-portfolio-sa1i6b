/**
*
* Button
*
*/

import styled, { css } from 'styled-components';
import { lighten, darken, transparentize } from 'polished';
import media from 'style/mediainjector';
import { colore, transparent } from 'style/color';
import Svg from 'components/Svg';

export const ButtonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  font-family: ${(props) => props.theme.fonts.buttons.fontFamily};
  font-weight: ${(props) => props.theme.fonts.buttons.fontWeight};
  ${({ full }) => full && 'width: 100% !important;'};
  ${({ half }) => half && 'width: 50% !important;'};
  color: ${(props) => props.color ? props.color : colore.ui.contrast};
  text-align: center;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding ? props.padding : '0.4em  1.4em'};
  border: ${(props) => props.border ? props.border : '1px solid transparent'};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : props.theme.brand};
  border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.buttons};
  &:disabled {
    background-color: ${(props) => lighten(0.3, (props.bgcolor ? props.bgcolor : props.theme.brand))};
    color: ${(props) => transparentize(0.5, (props.color ? props.color : colore.ui.contrast))};
    pointer-events: none;
    svg {
        opacity: .3;
      }
  }
  ${({ round }) => round && css`
    padding: 0;
    width: ${(props) => props.width};
    height: ${(props) => props.width};
    border-radius: 100%;
  `}
  ${({ actioncolor }) => actioncolor && css`
    background-color: ${colore.actions[actioncolor]};
    &:disabled {
      background-color: ${lighten(0.3, colore.actions[actioncolor])};
      color: ${lighten(0.1, colore.actions[actioncolor])};
    }
  `}
  ${({ admin }) => admin && css`
    color: ${(props) => props.theme.brand};
    border: 1px solid ${colore.ui.neutralBg};
    background-color: ${colore.ui.contrast};
    &:disabled {
      background-color: ${darken(0.1, colore.ui.contrast)};
      color: ${(props) => lighten(0.4, props.theme.brand)};
    }
    &:active {
      background-color: ${darken(0.1, colore.ui.contrast)};
      border-color: ${darken(0.1, colore.ui.neutralBg)};
    }
  `}
  ${({ outline }) => outline && css`
    color: ${(props) => props.theme.brand};
    border: 1px solid ${(props) => props.theme.brand};
    background-color: ${colore.ui.contrast};
    &:disabled {
      background-color: ${darken(0.1, colore.ui.contrast)};
      color: ${(props) => lighten(0.4, props.theme.brand)};
    }
    &:active {
      background-color: ${darken(0.1, colore.ui.contrast)};
      border-color: ${darken(0.1, colore.ui.neutralBg)};
    }
    svg {
      fill: ${(props) => props.fill ? props.fill : props.theme.brand};
    }
  `}
  ${({ bone }) => bone && css`
    color: ${colore.ui.contrast};
    border: 2px solid ${colore.ui.contrast};
    background-color: ${transparent};
    &:hover,
    &:active {
      background-color: rgba(0,0,0,.1);
    }
  `}
  &:active,
  &:focus {
    outline: none;
  }
  ${(props) => props.standard && css`
    min-width: 180px;
    max-width: 320px;
  `};
  ${({ shadow }) => shadow && css`
    border: none;
    box-shadow: 0 0 4px 1px rgba(0,0,0,0.20);
  `}
  ${media.iphone45`
    ${({ standard }) => standard && 'min-width: 140px;'}
    padding: ${(props) => props.padding ? props.padding : '0.4em  0.6em;'};
    svg {
      margin: 0 6px 0 0;
    }
  `}
`;

export const Button = styled.button`
  ${ButtonStyle}
`;

Button.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      buttons: '6px',
    },
    fonts: {
      buttons: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
      },
    },
  },
  actioncolor: '',
};

export const SubmitButton = styled.input`
  ${ButtonStyle}
`;

SubmitButton.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      buttons: '6px',
    },
    fonts: {
      buttons: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
      },
    },
  },
  actioncolor: '',
};

export const ActionButtonStyle = css`
  font-size: 21px;
  padding: 21px 30px;
  background-color: ${(props) => props.bgcolor};
  border: ${(props) => props.border ? props.border : '2px solid white'};
  color: ${(props) => props.color ? props.color : colore.ui.contrast};
  font-weight: 600;
  ${({ shadow }) => shadow && css`
    border: none;
    box-shadow: 0 0 4px 1px rgba(0,0,0,0.20);
  `}
  ${({ sectionbutton }) => sectionbutton && css`
    min-width: 50%;
    font-size: 18px;
    padding: 14px 30px;
    ${media.lt667`
      width: 100%;
    `}
  ${media.lt480`
    font-size: 16px;
    `}
  `}
  &:disabled {
    background-color: ${(props) => lighten(0.3, (props.bgcolor ? props.bgcolor : colore.landing.green))};
    color: ${(props) => transparentize(0.5, (props.bgcolor ? props.bgcolor : colore.ui.contrast))};
  }
`;

export const ActionButton = styled(Button)`
  ${ActionButtonStyle};
`;

export const Icon = styled(Svg)`
  width: ${(props) => props.size ? props.size : '18px'};
  height: ${(props) => props.size ? props.size : '18px'};
  margin: ${(props) => props.margin};
  fill: ${(props) => props.fill ? props.fill : colore.ui.contrast};
  ${({ right }) => right && css`
    margin: 0 -6px 0 6px;
  `}
  ${({ left }) => left && css`
    margin: 0 6px 0 -6px;
  `}
  ${({ brandColor }) => brandColor && css`
    fill: ${(props) => props.theme.brand};
  `}
  &.mediumUp {
    @media (max-width: 667px) {
      display: none;
    }
  }
`;

Icon.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const NoStyleButton = css`
  appearance: none;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  &:active,
  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled.button`
  ${NoStyleButton}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${(props) => props.theme.brand};
  }
  ${(props) => props.fill && css`
    svg {
      fill: ${props.fill};
    }
  `}
  &.mediumUp {
    @media (max-width: 667px) {
      display: none;
    }
  }
`;

GhostButton.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const TextButton = styled.button`
  color: ${(props) => props.color ? props.color : props.theme.brand};
  appearance: none;
  border: none;
  background: none;
  &:active,
  &:focus {
    outline: none;
  }
  &:hover {
    ${media.desktop`
      color: ${(props) => props.theme.darken};
    `}
  }
`;

TextButton.defaultProps = {
  theme: {
    brand: '#00BBEF',
    darken: '#1588AA',
  },
};
