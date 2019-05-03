/**
*
* Heading
*
*/

import styled, { css } from 'styled-components';

const HeaderStyle = css`
  color: ${(props) => props.color ? props.color : props.theme.brand};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  ${({ center }) => center && css`text-align: center;`}
  ${({ normal }) => normal && css`font-weight: normal;`}
`;

HeaderStyle.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const H1 = styled.h1`
  ${HeaderStyle}
`;

export const H2 = styled.h2`
  ${HeaderStyle}
`;

export const H3 = styled.h3`
  ${HeaderStyle}
`;

export const H4 = styled.h4`
  ${HeaderStyle}
  margin: ${(props) => props.margin ? props.margin : 'margin: 0'};
`;

export const HiddenH1 = styled.h1`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;
