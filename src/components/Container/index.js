/**
*
* Container
*
*/

import styled, { css } from 'styled-components';

import media from 'style/mediainjector';
import Div from 'components/Div';
import FlexBox from 'components/FlexBox';

export const ContainerStyle = css`
  position: relative;
  width: 100%;
  margin: ${(props) => props.margin ? props.margin : '0 auto'};
  ${media.desktop`
    max-width: ${(props) => props.maxWidth ? props.maxWidth : '860px'};
  `}
`;

const Container = styled(Div)`
  ${ContainerStyle}
`;

export const ActionBox = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  background-image: url(${(props) => props.src});
  ${(props) => props.src && css`
    background-size: ${props.bgSize};
    background-position: ${props.bgPosition};
    background-repeat: ${props.bgRepeat ? props.bgRepeat : 'no-repeat'};
  `}
  padding-bottom: 60px;
  ${media.mobile`
    padding-left: 20px;
    padding-right: 20px;
  `}
  ${media.lt667`
    flex-direction: column;
    background-position: ${(props) => props.bgPositionMobile ? props.bgPositionMobile : props.bgPosition};
    max-height:740px;
    padding-left: 40px;
    padding-right: 40px;
  `}
  ${media.lt480`
    padding-left: 20px;
    padding-right: 20px;
  `}
`;

export const ContainerFlex = styled(FlexBox)`
  ${ContainerStyle}
`;

export default Container;
