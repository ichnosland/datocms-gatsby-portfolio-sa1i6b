/**
*
* StyledButtonGroup
*
*/

import media from 'style/mediainjector';
import FlexBox from 'components/FlexBox';
import styled from 'styled-components';

export const StyledButtonGroup = styled(FlexBox)`
  position: relative;
  ${media.lt667`
    display: block;
    width: 100%;
  `}
  * {
    ${media.gt667`
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:first-child:not(:only-child) {
        border-right-width: 0;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &:not(:first-child):not(:last-child) {
        border-right-width: 0;
        border-radius: 0;
      }
      &:only-child {
        border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.buttons};
      }
    `}
    ${media.lt667`
      display: block;
      width: 100%;
      margin-bottom: ${(props) => props.bottomSpace};
      &:last-child {
        margin-bottom: 0;
      }
    `}
  }
`;

StyledButtonGroup.defaultProps = {
  theme: {
    radius: {
      buttons: '6px',
    },
  },
};

export const MiniButtonGroup = styled(FlexBox)`
  position: relative;
  * {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:first-child:not(:only-child) {
      border-right-width: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:not(:first-child):not(:last-child) {
      border-right-width: 0;
      border-radius: 0;
    }
    &:only-child {
      border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.buttons};
    }
  }
`;

MiniButtonGroup.defaultProps = {
  theme: {
    radius: {
      buttons: '6px',
    },
  },
};

export const ExpandButtonGroup = styled(FlexBox)`
  position: relative;
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'space-around'};
  ${media.lt667`
    justify-content: center;
    * {
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:first-child:not(:only-child) {
        border-right-width: 0;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &:not(:first-child):not(:last-child) {
        border-right-width: 0;
        border-radius: 0;
      }
      &:only-child {
        border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.buttons};
      }
    }
  `}
`;

ExpandButtonGroup.defaultProps = {
  theme: {
    radius: {
      buttons: '6px',
    },
  },
};

export default StyledButtonGroup;
