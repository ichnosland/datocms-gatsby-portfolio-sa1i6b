/**
*
* EggMenuItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import ClearLink from 'components/ClearLink';
import Svg from 'components/Svg';
import { colore } from 'style/color';

const labelsPaddingVertical = '4px';
const labelsPaddingHorizontal = '10px';
const labelsFontSize = '16px';
const labelHoverOff = '0.5s';

export const EggItem = styled(Div)`
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: ${colore.ui.contrast};
  overflow: visible;
`;

export const EggLink = styled(ClearLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1px;
  left: -2px;
  width: ${(props) => props.theme.menu.itemWidth};
  height: ${(props) => props.theme.menu.itemHeight};
  border: ${(props) => props.theme.menu.itemBorder ? props.theme.menu.itemBorder : 'none'};
  background-color: ${(props) => props.iconbg ? props.iconbg : colore.ui.contrast};
  outline: none;
  padding: 0;
  border-radius: ${(props) => props.theme.menu.linkRadius};
  box-shadow: 0 1px 2px rgba(0,0,0,.3);
  -webkit-user-drag: none;
  svg {
    fill: ${(props) => props.fill ? props.theme.brand : props.fill};
    max-width: 32px;
    max-height: 32px;
  }
`;

EggLink.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      buttons: '6px',
    },
    menu: {
      itemBorder: 'none',
      itemWidth: '32px',
      itemHeight: '32px',
    },
  },
};

export const EggLinkLabel = styled.span`
  display: block;
  position: absolute;
  top: 3%;
  right: 45px;
  box-shadow: 0 1px 2px rgba(0,0,0,.3);
  background-color: ${colore.ui.contrast};
  padding-top: ${labelsPaddingVertical};
  padding-bottom: ${labelsPaddingVertical};
  padding-left: ${labelsPaddingHorizontal};
  padding-right: ${labelsPaddingHorizontal};
  border-radius: 6px;
  pointer-events: none;
  margin-top: - (${labelsPaddingVertical} + ${labelsFontSize} / 2);
  transition: all ${labelHoverOff};
`;

export default class EggMenuItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { url, titolo, icona, iconbg, fill, onOpen } = this.props;
    return (
      <EggItem>
        {(url || onOpen) &&
          <EggLink
            to={url || '#'}
            onClick={onOpen}
            iconbg={iconbg}
          >
            <Svg {...icona} fill={fill} />
            <EggLinkLabel>{titolo}</EggLinkLabel>
          </EggLink>
        }
      </EggItem>
    );
  }
}

EggMenuItem.propTypes = {
  url: PropTypes.string,
  titolo: PropTypes.string.isRequired,
  icona: PropTypes.object.isRequired,
  iconbg: PropTypes.string,
  fill: PropTypes.string,
  onOpen: PropTypes.func,
};
