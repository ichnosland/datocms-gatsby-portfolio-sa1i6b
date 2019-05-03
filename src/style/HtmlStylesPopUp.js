/**
*
* HtmlStyles PopUp
*
*/

import { css } from 'styled-components';

// import { colore } from 'style/color';
import { BasicTable, CommonTables } from 'style/tablesStyles';

export const HtmlStylesPopUp = css`
  ul {
    text-align: left;
    &.fake-table {
      list-style: none;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0;
      border-radius: 6px;
      li {
        padding: 9px 14px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        &:last-child {
          border: none;
        }
      }
    }
  }
  ${BasicTable}
  ${CommonTables}
`;

export default HtmlStylesPopUp;
