/**
*
* SlideToggle
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { colore } from 'style/color';

export const ToggleSlider = styled(Div)`
    width: 52px;
    height: 26px;
    cursor: pointer;
    user-select: none;
    background: ${colore.ui.darkBg};
    border-radius: 2em;
    padding: 2px;
    transition: all .4s ease;
    &:after{
      position: relative;
      display: block;
      content: "";
      width: 22px;
      height: 22px;
      left: 0;
      border-radius: 50%;
      background: ${colore.ui.contrast};
      transition: all .2s ease;
    }
    ${({ check }) => check && css`
      background-color: ${(props) => props.bgcolor ? props.bgcolor : props.theme.brand};
      &:after {
        left: 26px;
      }
  `};
`;

ToggleSlider.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

class SlideToggle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { check, bgcolor, onClickFunction } = this.props;

    return (
      <FlexBox>
        <ToggleSlider
          check={check}
          onClick={onClickFunction}
          bgcolor={bgcolor}
        />
      </FlexBox>
    );
  }
}

SlideToggle.propTypes = {
  bgcolor: PropTypes.string,
  check: PropTypes.bool,
  onClickFunction: PropTypes.func,
};

export default SlideToggle;
