/**
*
* CountBadge
*
*/

import styled, { css } from 'styled-components';

import FlexBox from 'components/FlexBox';
import { colore } from 'style/color';

export const CountBadge = styled(FlexBox)`
  display: inline-flex;
  position: relative;
  * {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      padding: 0 4px 0 6px;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding: 0 6px 0 4px;
    }
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:only-child {
      border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.countBadge};
      padding: 0 4px;
    }
  }
  top: ${(props) => props.top};
  left: ${(props) => props.left ? props.left : '6px'};
  right: ${(props) => props.right};
`;

CountBadge.defaultProps = {
  theme: {
    radius: {
      countBadge: '90%',
    },
  },
};

export const CountBadgeItem = styled(FlexBox)`
  color: #fff;
  min-width: 18px;
  height: 18px;
  max-height: 18px;
  font-size: 12px;
  text-align: center;
  border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.countBadge};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.notification};
  ${({ actioncolor }) => actioncolor && css`
    background-color: ${colore.actions[actioncolor]};
  `}
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

CountBadgeItem.defaultProps = {
  theme: {
    radius: {
      countBadge: '90%',
    },
  },
};
