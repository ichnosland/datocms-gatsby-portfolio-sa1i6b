import { injectGlobal } from 'styled-components';

import media from 'style/mediainjector';
import { normalize } from 'style/normalize';
import { colore } from 'style/color';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${normalize}
  html {
    color: ${colore.ui.txt};
    background-color: ${colore.ui.mainBg};
    overflow-y: scroll;
    strong {
      font-weight: 700;
    }
  }
  html,
  body,
  #app {
    position: relative;
    height: 100%;
    ${media.print`
      background-color: white;
    `}
  }
  #app > div:first-of-type {
    position: relative;
    height: 100%;
  }
  body {
    font-family: 'Helvetica Neue', helvetica, arial, sans-serif;
    font-size: 1.8rem;
    ${media.lt667`
      font-size: 1.5rem;
    `}
    .AlatinLyceum,
    .AlatinAcademy,
    .ItacaAcademy,
    .itacaPapers,
    .alatinPapers,
    .landingAlatin,
    .landingItaca {
      font-family: proxima-nova, 'Helvetica Neue', helvetica, arial, sans-serif;
    }
    .myTest {
      font-family: neue-haas-grotesk-display, 'Helvetica Neue', helvetica, arial, sans-serif;
    }
    .AlatinAcademy,
    .ItacaAcademy {
      h1,h2, h3, h4 {
        font-family: 'Quicksand';
        font-weight: 400;
      }
    }
  }
  /* Utilities
   * NB Funzionano solo su html e styled-components
  */
  .smallOnly {
    @media (min-width: 668px) {
      display: none;
    }
  }
  .mobileOnly {
    @media (min-width: 1025px) {
      display: none;
    }
  }
  .mediumUp {
    @media (max-width: 667px) {
      display: none;
    }
  }
  .desktopOnly {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  .noSelect {
    user-select: none;
  }
  .noPrint {
    @media print {
      display: none;
    }
  }
  .onlyPrint {
    @media not print {
      display: none;
    }
  }
`;
