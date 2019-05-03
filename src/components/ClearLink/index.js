/**
*
* ClearLink
*
*/

import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const clearLinkStyle = css`
  color: inherit;
  display: inherit;
  text-decoration: inherit;
`;

export const ClearLink = styled(Link)`
  ${clearLinkStyle}
`;

export default ClearLink;
