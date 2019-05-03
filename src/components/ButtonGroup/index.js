/**
*
* ButtonGroup
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import media from 'style/mediainjector';
import FlexBox from 'components/FlexBox';
import { ButtonStyle, Icon } from 'components/Button';
import icon from 'icons/buttons';
import { colore } from 'style/color';

export const Group = styled(FlexBox)`
  text-align: center;
  margin: ${(props) => props.margin ? props.margin : '0 auto'};
  ${(props) => props.full && css`
    width: 100%;
  `}
  ${(props) => props.tabs && css`
     border-bottom: 2px solid ${props.theme.brand};
  `}
`;

Group.defaultProps = {
  theme: {
    brand: '#00BBEF',
    fonts: {
      buttons: {
        fontFamily: 'Quicksand',
        fontWeight: '400',
      },
    },
  },
};

export function active(activebgColor, activeColor) {
  return css`
    background-color: ${activebgColor || ((props) => props.theme.brand)};
    color: ${activeColor || colore.ui.contrast};
  `;
}

export const InnerButton = styled.button`
  ${ButtonStyle}
  position: relative;
  margin-left: -1px;
  color: ${(props) => props.color ? props.color : props.theme.brand};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  &:disabled {
    background-color: ${(props) => darken(0.1, (props.bgcolor ? props.bgcolor : colore.ui.contrast))};
    color: ${(props) => darken(0.2, (props.bgcolor ? props.bgcolor : colore.ui.contrast))};
    svg {
      fill: ${(props) => darken(0.2, (props.bgcolor ? props.bgcolor : colore.ui.contrast))};
    }
  }
  border: ${(props) => props.border ? props.border : '1px solid rgb(231, 236, 236)'};
  border-radius: 0;
  svg {
    fill: ${(props) => props.color ? props.color : props.theme.brand};
  }
  ${(props) => props.attivo && css`
    position:relative;
    svg {
      fill: ${colore.ui.contrast};
    }
  `}
  ${(props) => props.full && css`
    flex-grow: 1;
  `}
  ${(props) => props.attivo && active(props.activebgColor, props.activeColor)};
  &:first-child {
    border-radius: ${(props) => props.theme.radius.buttons} 0 0 ${(props) => props.theme.radius.buttons};
  }
  &:last-child {
    border-radius: 0 ${(props) => props.theme.radius.buttons} ${(props) => props.theme.radius.buttons} 0;
  }
  &:first-child:last-child {
    border-radius: ${(props) => props.theme.radius.buttons};
  }
  ${(props) => props.tabs && css`
    margin: 0 1px;
    border-bottom: none;
    border-radius: ${props.theme.radius.general} ${props.theme.radius.general} 0 0};
    &:first-child {
      border-radius: ${props.theme.radius.general} ${props.theme.radius.general} 0 0};
      margin-left: 0;
      margin-right: 1px;
    }
    &:last-child {
      border-radius: ${props.theme.radius.general} ${props.theme.radius.general} 0 0};
      margin-left: 1px;
      margin-right: 0;
    }
  `}
  &:active {
    ${(props) => active(props.activebgColor, props.activeColor)};
    svg {
      fill: ${colore.ui.contrast}
    }
  }
  ${media.lt667`
    padding: 0.4em  0.8em;
    ${({ hideOnMobile }) => hideOnMobile && 'display: none;'};
  `}
  ${media.iphone45`
    padding: 0.4em  0.6em;
  `}
`;

InnerButton.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      buttons: '6px',
    },
  },
};

class ButtonGroup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      margin,
      buttons,
      half,
      full,
      color,
      bgcolor,
      border,
      activebgColor,
      activeColor,
      theme,
      tabs,
    } = this.props;
    return (
      <Group
        margin={margin}
        full={full}
        tabs={tabs}
        noPrint
      >
        {buttons.map((button) => (
          <InnerButton
            key={button.id}
            attivo={button.attivo}
            onClick={button.onClickFunction}
            half={half}
            full={full}
            color={color}
            bgcolor={bgcolor}
            border={border}
            activebgColor={activebgColor}
            activeColor={activeColor}
            theme={theme}
            hideOnMobile={button.hideOnMobile}
            disabled={button.disabled}
            tabs={tabs}
          >
            {(button.icona || []).length > 0 && <Icon {...icon[button.icona]} left />}
            {button.label}
          </InnerButton>
        ))}
      </Group>
    );
  }
}

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      onClickFunction: PropTypes.func,
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      attivo: PropTypes.bool,
    })
  ).isRequired,
  half: PropTypes.bool,
  full: PropTypes.bool,
  tabs: PropTypes.bool,
  color: PropTypes.string,
  margin: PropTypes.string,
  bgcolor: PropTypes.string,
  border: PropTypes.string,
  activebgColor: PropTypes.string,
  activeColor: PropTypes.string,
  theme: PropTypes.object,
};

export default ButtonGroup;
