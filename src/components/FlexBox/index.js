/**
*
* FlexBox
*
*/
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import media from 'style/mediainjector';

export const FlexBox = styled(Div)`
  display: flex;
  flex-direction: ${(props) => props.direction ? props.direction : 'row'};
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'center'};
  align-items: ${(props) => props.alignItems ? props.alignItems : 'center'};
  align-content: ${(props) => props.alignContent ? props.alignContent : 'center'};
  flex-wrap: ${(props) => props.wrap ? props.wrap : 'nowrap'};
  ${media.print`
   ${({ noPrint }) => noPrint && css`
       display:none;
   `}
 `}
`;

export const FlexChild = styled(FlexBox)`
  order: ${(props) => props.order};
  flex-grow: ${(props) => props.flexGrow};
  flex-basis: ${(props) => props.flexBasis};
  align-self: ${(props) => props.alignSelf};
`;

export const FlexWrap = styled(FlexBox)`
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  height: 100%;
  ${media.desktop`
    &:before {
      content: '';
      display: block;
    }
  `}
  ${media.mobile`
    display: block;
  `}
`;

export default FlexBox;
