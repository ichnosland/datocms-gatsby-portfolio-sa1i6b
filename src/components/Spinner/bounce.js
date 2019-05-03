import styled, { css, keyframes } from 'styled-components';

import { colore } from 'style/color';
import media from 'style/mediainjector';

export const delay = (turn = 0.0) => ` -${turn * 0.16}s`;

const bounce = keyframes`
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

export const dimension = (size) => {
  switch (size) {
    case 'small':
      return '10px';
    case 'huge':
      return '30px';
    default:
      return '18px';
  }
};

export const Bounce = styled.div`
  width: ${(props) => dimension(props.size)};
  height: ${(props) => dimension(props.size)};
  background-color: ${(props) => props.bgColor ? props.bgColor : props.theme.brand};
  ${({ inverse }) => inverse && css`background-color: ${colore.ui.contrast};`}
  ${media.mobile`
    ${(props) => props.ringo && css`
      background-color: ${colore.ui.contrast};
    `};
  `};
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.number ? delay(props.number) : 0};
`;

Bounce.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};
