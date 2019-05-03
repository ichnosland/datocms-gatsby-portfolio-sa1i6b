/**
*
* RespImg
*
*/

import styled from 'styled-components';

import media from 'style/mediainjector';

export const RespImg = styled.img`
  width: 100%;
  max-width: ${(props) => props.maxWidth ? props.maxWidth : '100%'};
`;

const imgMargin = '30px auto';
const imgBorder = '3px solid #D9D9D9';

export const DesktopImage = styled(RespImg)`
  display: block;
  margin: ${(props) => props.margin ? props.margin : imgMargin};
  border: ${(props) => props.border ? props.border : imgBorder};
  ${media.lt768`
    display:none;
  `}
`;

export const MobileImage = styled(RespImg)`
  display: block;
  margin: ${(props) => props.margin ? props.margin : imgMargin};
  border: ${(props) => props.border ? props.border : imgBorder};
  ${media.gt768`
    display:none;
  `}
`;

export default RespImg;
