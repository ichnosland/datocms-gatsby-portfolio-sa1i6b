/**
*
* CarouselElements
*
*/

import styled, { css } from 'styled-components';

import Div from 'components/Div';
import { NoStyleButton } from 'components/Button';

export const CarouselWrap = styled(Div)`
  width:  ${(props) => {
    if (props.buttonWidth) return `calc(100% - (${props.buttonWidth} * 2))`;
    return '100%';
  }};
  margin: 0 auto;
  overflow: hidden;
`;

export const CarouselContainer = styled(Div)`
  display: flex;
  margin: 0 auto;
  transition: ${(props) => props.sliding ? 'none' : 'transform 0.5s ease'};
  transform: ${({ sliding, noTransforms, direction }) => {
    if (!noTransforms && !sliding) return 'translateX(calc(-100%))';
    if (!noTransforms && direction === 'prev') return 'translateX(calc(2 * (-100%)))';
    if (!noTransforms) return 'translateX(0%)';

    return '';
  }};
`;

export const CarouselSlide = styled(Div)`
  flex: 1 0 100%;
  width: 100%;
  order: ${(props) => props.order};
`;

export const ArrowBox = styled.button`
  ${NoStyleButton}
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  width: ${(props) => props.width ? props.width : '40px'};
  height: ${(props) => props.height ? props.height : '100%'};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  ${({ sx }) => sx && css`
    left: 0;
  `}
  ${({ dx }) => dx && css`
    right: 0;
  `}
  ${({ hidden }) => hidden && css`
    display: none;
  `}
`;
