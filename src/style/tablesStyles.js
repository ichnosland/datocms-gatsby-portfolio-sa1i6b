/**
*
* tablesStyles
*
*/

import { css } from 'styled-components';

import { colore } from 'style/color';

export const BasicTable = css`
  table {
    border-collapse: collapse;
    border-spacing: 0;
    th {
      background: ${colore.ui.neutralBg};
    }
    td,
    th {
      padding: 0.62em;
      border: 1px solid ${colore.ui.neutralBg};
      vertical-align: middle;
    }
  }
`;

export const CommonTables = css`
/* Tabelle generiche */
  .common-table-wrap {
    width: 100%;
    min-width: 100%;
    overflow-x: auto;
    border: 1px solid ${colore.ui.darkBg};
    background-color: ${colore.ui.contrast};
  }
  .common-table {
    width: 100% !important;
    border: 1px solid ${colore.ui.darkBg};
    th {
      color: $darker-text-color;
      font-weight: 400;
      border: 1px solid ${colore.ui.darkBg};

      font-size: 21px;
      padding: 9px 12px;
    }
    td {
      padding: 9px 12px;
      border: 1px solid ${colore.ui.darkBg};
    }
    p {
      margin: 6px 0;
    }
  }
`;
