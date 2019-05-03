/**
*
* EggButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import Svg from 'components/Svg';
import menuIcon from 'icons/menuIcons';
import { allThemes } from 'style/theme';

const rotate180 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const rotate0 = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const WrapButton = styled.button`
  position: relative;
  width: ${(props) => props.theme.menu.width};
  height: ${(props) => props.theme.menu.height};
  padding: 0;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.4));
  overflow: visible;
  z-index: 19;
  ${({ active }) => active ? css`
    svg {
      animation: ${rotate180} 0.2s linear 1;
    }
  ` : css`
    svg {
      animation: ${rotate0} 0.2s linear 1;
      }
  `};
`;

WrapButton.defaultProps = {
  theme: {
    menu: {
      width: '64px',
      height: '64px',
    },
  },
};


export default class EggButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { active, product } = this.props;
    return (
      <WrapButton
        product={product}
        active={active}
      >
        {(allThemes[product] || {}).menu && (active
          ? <Svg {...menuIcon[allThemes[product].menu.open]} />
          : <Svg {...menuIcon[allThemes[product].menu.standby]} />
        )}
      </WrapButton>
    );
  }
}

EggButton.propTypes = {
  product: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
