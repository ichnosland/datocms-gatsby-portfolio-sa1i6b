/**
*
* Grid
*
*/

import styled, { css } from 'styled-components';

import Div from 'components/Div';
import Flexbox from 'components/FlexBox';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const GridStyle = css`
  display: grid;
  ${({ inline }) => inline && css`
    display: inline-grid;
  `};
  grid-template-columns: ${(props) => props.templateColumns ? props.templateColumns : 'auto'};
  grid-template-rows: ${(props) => props.templateRows ? props.templateRows : '1fr'};
  grid-column-gap: ${(props) => props.columnGap};
  grid-row-gap: ${(props) => props.rowGap};
  grid-gap: ${(props) => props.gridGap};
  justify-items: ${(props) => props.justifyItems};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  align-content: ${(props) => props.alignContent};
  ${({ list }) => list && css`
    grid-template-columns: ${(props) => props.templateColumns ? props.templateColumns : '1fr auto'};
  `}
`;

export const Grid = styled(Div)`
  ${GridStyle}
`;

Grid.DefaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const GridListItemStyle = css`
  border-bottom: 1px solid ${colore.ui.neutralBg};
  background-color: ${colore.ui.contrast};
  padding: 16px;
  ${({ header }) => header && css`
    color: ${(props) => props.theme.brand};
    font-weight: 400;
    border-bottom: 1px solid ${(props) => props.theme.brand};
    &:hover {
      background-color: ${colore.ui.neutralBg};
    }
    ${({ active }) => active && css`
      background-image:
      url(${(props) => props.theme.borderbg});
      background-repeat: repeat-x;
      background-position: bottom left;
      background-size: 4px;
    `}
  `}
  ${media.lt667`
    padding: 12px 8px;
  `}
`;

GridListItemStyle.DefaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const GridItem = styled(Flexbox)`
  ${({ list }) => list && css`
    ${GridListItemStyle}
  `}
  text-transform: ${(props) => props.textTransform};
`;

GridItem.DefaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};
