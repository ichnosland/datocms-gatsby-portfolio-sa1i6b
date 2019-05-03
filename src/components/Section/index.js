/**
*
* Section
*
*/

import styled, { css } from 'styled-components';

import media from 'style/mediainjector';
import nuvole from './images/nuvole.png';

export const Section = styled.section`
  background-color: ${(props) => props.bgColor ? props.bgColor : 'transparent'};
  width: 100%;
  height: ${(props) => props.height ? props.height : 'auto'};
  display: flex;
  justify-content: ${(props) => props.justify ? props.justify : 'center'};
  align-items: center;
  flex-direction: ${(props) => props.direction ? props.direction : 'row'};
  position: relative;
  padding: ${(props) => props.padding ? props.padding : '50px'};
  ${(props) => {
    const padding = `padding: ${props.paddingmobile || '30px 20px'};`;
    return media.lt480([padding]);
  }}
  ${({ full }) => full && css`
    height: 100%;
    flex-direction: ${(props) => props.direction ? props.direction : 'column'};
    ${(props) => props.flextop && css`
      justify-content: space-between;
      &:before {
        content: '';
        display: block;
      }
    `};
    ${(props) => props.flexbottom && css`
      justify-content: space-between;
      &:after {
        content: '';
        display: block;
      }
    `};
  `};
  ${(props) => props.esecuzione && media.mobile`
    justify-content: flex-start;
    padding: 0;
    `};
  ${(props) => props.first && css`
    padding-top: 156px;
    ${media.lt667`
      padding-top: 76px;
      `}
    `};
  `;

export const SkySection = styled.section`
  position: relative;
  min-height: 530px;
  padding-top: 126px;
  margin-bottom: -5px;
  background-image: url(${nuvole}), linear-gradient(0deg, rgba(255,255,255,0.00) 33%, rgba(0,171,229,0.65) 100%);
  background-size: 1078px 139px, 100%;
  background-repeat:  no-repeat, no-repeat;
  background-position: center 30%, center;
  ${media.lt667`
    padding-top: 76px;
    background-image: url(${nuvole}), linear-gradient(0deg, rgba(255,255,255,0.00) 33%, rgba(0,171,229,0.15) 100%);
  `}
  `;

export const FirstSection = styled.section`
  position: relative;
  min-height: ${(props) => props.minHeight};
  padding-top: 126px;
  ${media.lt667`
    padding-top: 76px;
  `}
`;

export default Section;
