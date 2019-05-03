/**
*
* NewListPanels
*
*/

import styled, { css } from 'styled-components';
import { darken } from 'polished';

import media from 'style/mediainjector';
import { colore } from 'style/color';
import FlexBox, { FlexChild } from 'components/FlexBox';
import ClearLink from 'components/ClearLink';

export const ListItemStyle = css`
  position:relative;
  color: ${(props) => props.color ? props.color : colore.ui.darkTxt};
  border-bottom: 1px solid ${colore.ui.neutralBg};
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'space-between'};
  background-color: ${(props) => props.bgColor ? props.bgColor : colore.ui.contrast};
  user-drag: none;
  overflow: hidden;
  &:first-child,
  &:first-of-type {
    border-top-left-radius: ${(props) => props.theme.radius.general};
    border-top-right-radius: ${(props) => props.theme.radius.general};
  }
  &:last-child {
    border-bottom: none;
    margin-bottom: 10px;
    border-bottom-left-radius: ${(props) => props.theme.radius.general};
    border-bottom-right-radius: ${(props) => props.theme.radius.general};
  }
  ${media.print`
    border:none;
  `}
  ${({ first }) => first && css`
    background-color: ${(props) => props.theme.pale};
    border-bottom-color: ${(props) => props.theme.pale && darken(0.05, props.theme.pale)};
  `};
`;

ListItemStyle.defaultProps = {
  theme: {
    pale: '#999',
    radius: {
      general: '6px',
    },
  },
};

export const ItemTextStyle = css`
  color: ${(props) => props.color};
  padding: ${(props) => props.unit ? '16px' : '22px 16px'};
`;

export const ListItem = styled(FlexBox)`
  ${ListItemStyle};
  &:after{
    ${({ isSelected }) => isSelected && css`
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 30px 30px 0;
      border-color: transparent ${colore.actions.okay} transparent transparent;
    `}
  }
`;

ListItem.defaultProps = {
  theme: {
    pale: '#999',
    radius: {
      general: '6px',
    },
  },
};

export const ListLink = styled(ClearLink)`
  display: flex;
  ${ListItemStyle};
  &:hover {
    ${media.gt667`
      color: ${(props) => props.color ? props.color : props.theme.brand};
    `}
  }
  &:active {
    background-color: ${(props) => props.hoverBgColor ? props.hoverBgColor : darken(0.1, colore.ui.contrast)};
  }
`;

ListLink.defaultProps = {
  theme: {
    brand: '#00BBEF',
    pale: '#999',
    radius: {
      general: '6px',
    },
  },
};

export const ListItemText = styled(FlexChild)`
  ${ItemTextStyle};
  ${(props) => props.locked && css`
    color: ${colore.ui.darkBg};
    cursor: default;
    pointer-events: none;
  `};
`;

export const ListPanelHeader = styled.h2`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 40px 0 20px;
  color: ${(props) => props.theme.brand};
  font-weight: normal;
  text-align: center;
  ${(props) => props.uppercase && css`
    text-transform: uppercase;
  `}
`;

ListPanelHeader.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const LeftBox = styled(FlexBox)`
  left: -16px;
  height: 100%;
  span {
    display: block;
    border-right: 1px solid ${colore.ui.neutralBg};
  }
`;
