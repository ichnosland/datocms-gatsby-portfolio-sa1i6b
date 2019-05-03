/**
*
* LandingMenuBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { APPLICATION } from 'configuration';
import { HashLink as Link } from 'react-router-hash-link';

import { ContainerFlex } from 'components/Container';
import LogoLanding from 'components/LogoLanding';
import ClearLink from 'components/ClearLink';
import { IconBtn } from 'components/TopBar';
import Svg from 'components/Svg';
import icon from 'icons/globals';
import { colore } from 'style/color';
import media from 'style/mediainjector';
import { navigation } from './navigation';

export const MenuBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : 'rgba(255, 255, 255, 0.95)'};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 8;
  ${media.gt667`
    ${({ start }) => start > 0 && css`
      height: 96px;
      box-shadow: none;
    `}
  `}
  ${media.lt667`
    ${({ openNav }) => openNav && css`
      background: none;
      overflow: visible;
    `}
  `}
  transition: all 0.5s;
  * {
  transition: all 0.5s;
  }
`;

export const LandingMenu = styled(ContainerFlex)`
  height: 100%;
  color: ${(props) => props.color ? props.color : props.theme.brand};
  justify-content: space-between;
  ${media.mobile`
    padding: 0 20px;
  `}
  ${media.lt667`
    overflow: visible;
    nav {
      display: none;
    }
    ${({ openNav }) => openNav && css`
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 60px 20px;
      flex-direction: column;
      justify-content: space-around;
      background-color: rgba(255, 255, 255, 0.95);
      nav {
        display:block;
        a {
          display: block;
          margin: 40px auto;
          font-size: 21px;
          text-align: center;
          padding: 6px 22px;
          ${media.iphone45`
            margin: 14px auto;
          `}
        }
      }
    `}
  `}
`;

export const BarMenuItem = styled(Link)`
  color: ${(props) => props.color ? props.color : props.theme.brand};
  font-size: 18px;
  display: inline-block;
  text-decoration: none;
  padding: 2px 12px 3px;
  margin: 0 2px;
  &:hover{
    background-color: ${colore.ui.mainBg};
    border-radius: 100px;
  }
  &:last-child {
    margin-right: 0;
  }
  ${({ active }) => active && css`
    color: #fff;
    background-color: ${(props) => props.theme.brand};
    border-radius: 100px;
    pointer-events: none;
  `}
`;

BarMenuItem.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

const MobileNavBtn = styled(IconBtn)`
  ${media.gt667`
    display: none;
  `}
`;

const logoStyle = {
  LandingItaca: {
    height: '28px',
    svg: {
      display: 'block',
      height: '28px',
    },
    start: {
      height: '48px',
      svg: {
        height: '48px',
      },
    },
  },
  LandingAlatin: {
    height: '32px',
    svg: {
      display: 'block',
      height: '32px',
    },
    start: {
      height: '62px',
      svg: {
        height: '62px',
      },
    },
  },
};

export const Logo = styled(LogoLanding)`
  ${logoStyle[APPLICATION]}
  ${({ start }) => start && css`
    ${media.gt667`
      ${logoStyle[APPLICATION].start}
    `}
  `}
`;

class LandingMenuBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      bgcolor,
      start,
      configuration,
      openNav,
      toggleNavFunction,
      loadedPath,
    } = this.props;
    return (
      <MenuBar bgcolor={bgcolor} start={start} openNav={openNav}>
        <LandingMenu className="LandingMenu" openNav={openNav}>
          <ClearLink to="/" onClick={() => toggleNavFunction(false)}>
            <Logo configuration={configuration} start={start} />
          </ClearLink>
          <nav>
            {(navigation[APPLICATION] || []).map((post) => (
              <BarMenuItem
                key={post.id}
                to={post.direction}
                active={loadedPath === post.direction ? 1 : 0}
                onClick={() => {
                  if (post.onOpen) {
                    post.onOpen();
                  }
                  toggleNavFunction(false);
                }}
              >
                {post.title}
              </BarMenuItem>
            ))}
          </nav>

          <MobileNavBtn
            esecuzione
            onClick={() => toggleNavFunction(!openNav)}
          >
            {openNav ?
              <Svg {...icon.close} />
              :
              <Svg {...icon.hamburger} />
            }
          </MobileNavBtn>
        </LandingMenu>
      </MenuBar>
    );
  }
}

LandingMenuBar.propTypes = {
  openNav: PropTypes.bool,
  toggleNavFunction: PropTypes.func.isRequired,
  configuration: PropTypes.object.isRequired,
  bgcolor: PropTypes.string,
  start: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  loadedPath: PropTypes.string.isRequired,
};

export default LandingMenuBar;
