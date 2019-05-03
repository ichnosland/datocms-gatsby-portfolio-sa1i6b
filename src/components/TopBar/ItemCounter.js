/**
*
* ItemCounter
*
*/

import styled, { css } from 'styled-components';

import Div from 'components/Div';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const ItemCounter = styled(Div)`
  margin-right: 0.5em;
  margin-left: -0.5em;
  padding: ${(props) => props.padding ? props.padding : '0 0.5em'};
  color: ${colore.ui.groupLabelTxt};
  background-color: ${colore.ui.contrast};
  border-radius: ${(props) => props.theme.radius.buttons};
  ${media.desktop`
    padding: 2px 12px;
  `}
  ${({ hidden }) => hidden && css`
    display: none;
  `}
  ${media.iphone4`
    margin-left: 0;
  `}
`;

ItemCounter.defaultProps = {
  theme: {
    radius: {
      buttons: '3px',
    },
  },
};

export default ItemCounter;
