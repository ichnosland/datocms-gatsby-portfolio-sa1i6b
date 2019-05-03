/**
*
* ZigZagBorder
*
*/
import styled from 'styled-components';

import { colore } from 'style/color';
import Div from 'components/Div';

const ZigZagBorder = styled(Div)`
  border: none;

  &:after {
    background: linear-gradient(-45deg, ${colore.landing.green} 8px, transparent 0), linear-gradient(45deg, ${colore.landing.green} 8px, transparent 0);
    background-position: left-bottom;
    background-repeat: repeat-x;
    background-size: 16px 16px;
    content: " ";
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 16px;
  }
`;

export default ZigZagBorder;
