/**
*
* HtmlStyles Lezioni e TestoIntroduttivo
*
*/

import { css } from 'styled-components';

import { colore } from 'style/color';
import { BasicTable, CommonTables } from 'style/tablesStyles';

export const HtmlStyles = css`
  width: 100%;
  h1, h2, h3, h4 {
    color: ${(props) => props.color ? props.color : props.theme.brand};
  }
  p {
    margin: 1em 0;
  }
  ul {
    padding-left: 24px;
    word-break: break-word;
    list-style: square;

    li {
      padding-bottom: 14px;
      word-break: inherit;

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
  .lesson-highlight {
    padding: 6px 20px;
    background-color: ${colore.ui.note};
    border-radius: 3px;
    margin-bottom: 16px;
  }

  .tip-tag {
    background-color: ${colore.ui.note};
    padding: 1px;
     -o-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  img {
    max-width: 100%;
  }
  ${BasicTable}
  ${CommonTables}
`;

HtmlStyles.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};
