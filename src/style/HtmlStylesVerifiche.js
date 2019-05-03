/**
*
* HtmlStyles
*
*/

import { css } from 'styled-components';

import { colore } from 'style/color';
import { BasicTable } from 'style/tablesStyles';

export const HtmlStyles = css`
  .segnaposto-admin {
    display: none;
  }
  .consegna {
    &__titolo {
      display: block;
      padding-bottom: 20px;
      font-weight: 600;
    }
    &__contenuto {
      color: #000;
    }
  }
  .opzioni {
    margin-top: 10px;
    padding: 10px;
    background-color: rgba(96, 141, 212, 0.1);
    border: 1px solid rgba(35, 56, 89, .1);
    border-radius: 2px;
    &__titolo {
      display: block;
      padding-bottom: 10px;
    }
    &__contenuto {
      color: #000;
      display: inline-block;
      font-style: italic;
      padding-left: 6px;
      .radiocheck-wrap{
        display: flex;
        align-items: center;
        padding: 4px 0;
      }
    }
    .radio,
    .checkbox {
      align-self: flex-start;
      margin-right: 10px;
      padding-top:3px;
      &:after {
        content: "";
        display: block;
        width: 14px;
        height: 14px;
        border: 1px solid ${(props) => props.theme.brand};
        background: white;
      }
    }
    .checkbox:after {
      border-radius: 2px;
    }
    .radio:after {
      border-radius: 100px;
    }
    @media print {
      background: none;
    }
  }
  .consegna__contenuto--esercizio{
    margin-top: 20px;
  }
  .completa{
    line-height: 2em;
    &:after {
      color: ${(props) => props.theme.light};
      content: "........................................";
      font-weight: 400;
    }
    &.full--width {
      display: block;
      height: 0;
      border-bottom: 1px dashed ${(props) => props.theme.light};
      margin: 2em 0;
      &:after {
        content: "";
      }
      &:last-child {
        margin-bottom: 1em;
      }
    }
  }
  .mytestitaliano .contesto {
    border-bottom: 1px dotted;
  }
  .consegna__blocchi {
    margin-top: 10px;
    .consegna__blocchi-blocco {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 4px;
      padding: 0 4px;
      border-radius: 2px;
      span {
        padding: 4px 0;
      }
      &.analizza {
        border: 1px solid rgba(0, 0, 0, .4);
        .segnaposto {
          border-bottom: 1px dashed rgba(0, 0, 0, .4);
        }
      }
    }
  }
  p {
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  img {
    max-width: 100%;
  }
  ${BasicTable};
  .numero-esercizio {
    float: right;
    background-color: ${colore.ui.darkBg};
    color: ${colore.ui.contrast};
    padding: 3px 6px;
    border-radius: 3px;
    text-align: right;
  }
  .editor {
    border: 1px dashed rgb(251, 91, 111);
  }
  .MathJax {
    font-size: 0.9em;
  }
`;

HtmlStyles.defaultProps = {
  theme: {
    brand: '#00BBEF',
    light: '#C9E4FF',
  },
};
