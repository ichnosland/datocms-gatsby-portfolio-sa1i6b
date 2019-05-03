/**
*
* Page
*
*/

import media from 'style/mediainjector';
import Div from 'components/Div';
import styled, { css } from 'styled-components';

const Page = styled(Div)`
  position: relative;
  padding: 94px 20px 30px;
  ${media.lt480`
    padding: 84px 16px 30px;
  `}
  ${({ full }) => full && css`
    width: 100vw;
    height: 100%;
    overflow-y: auto;
  `}
  ${media.print`
    padding: 20px;
  `}
`;

export default Page;
