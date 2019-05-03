/**
*
* EggMenu
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import styled, { css, keyframes } from 'styled-components';

import Div from 'components/Div';
import icon from 'icons/globals';
import EggMenuItem from './EggMenuItem';
import EggButton from './EggButton';

const fromBottom = keyframes`
  from {
    transform: translateY(250px);
  }
  to {
    transform: translateY(0);
  }
`;

export const EggShell = styled(Div)`
  margin: 25px;
  position: fixed;
  white-space: nowrap;
  padding-left: 0;
  list-style: none;
  right: 0;
  bottom: 0;
  animation: ${fromBottom} 0.5s 1;
  z-index: 17;
`;

export const EggUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: visible;
`;

const toTop = (props) => keyframes`
  from {
    top: 0;
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(-${props.stacco}px);
    opacity: 1;
  }
`;

export const EggLi = styled.li`
  display: block;
  position: absolute;
  right: 15px;
  width: 32px;
  height: 32px;
  opacity: 0;
  z-index: 17;
  ${({ active, animate }) => active && animate && css`
    animation: ${toTop} 0.3s 1 forwards;
  `}
  ${({ active, animate }) => !active && animate && css`
    animation: ${toTop} 0.5s 1 reverse;
  `};
`;

export default class EggMenu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { toggleEggMenu, className, active, animate, product, vociMenu } = this.props;
    return (
      <EggShell
        className={className}
        onClick={() => {
          if (!animate) {
            toggleEggMenu(active ? 'chiudi' : 'apri');
          } else {
            toggleEggMenu('');
          }
        }}
      >
        <EggUl
          numero={vociMenu.key}
        >
          {vociMenu.map((item, key) => (
            <EggLi
              key={uniqueId()}
              stacco={(key + 1) * 55}
              active={active}
              animate={animate}
            >
              <EggMenuItem
                url={item.url}
                titolo={item.titolo}
                icona={icon[item.icona]}
                iconbg={item.iconbg}
                fill={item.fill}
                onOpen={item.onOpen}
              />
            </EggLi>
          ))}
        </EggUl>
        <EggButton
          product={product}
          active={active}
        />
      </EggShell>
    );
  }
}

EggMenu.propTypes = {
  product: PropTypes.string.isRequired,
  active: PropTypes.bool,
  animate: PropTypes.bool,
  vociMenu: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      titolo: PropTypes.string.isRequired,
      icona: PropTypes.string.isRequired,
      fill: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
  toggleEggMenu: PropTypes.func,
};
