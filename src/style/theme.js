import { css } from 'styled-components';
import media from 'style/mediainjector';

const defaultFontsValues = {
  buttons: {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
  },
};

export const landingAlatin = {
  brand: '#00abe5',
  light: 'rgb(109, 210, 240)', // $light-color
  green: '#9bdd3e',
  orange: '#fe9d3e',
  grey: '#F2F2F2',
  dark: 'rgba(0, 133, 178, 1)',
  darken: 'rgb(9, 137, 183)',
  modalbg: 'rgba(0, 0, 0, 0.75)',
  fonts: defaultFontsValues,
  radius: {
    general: '6px',
    buttons: '100px',
  },
};

export const alatin = {
  brand: '#00abe5', // $brand-color
  light: 'rgb(109, 210, 240)', // $light-color
  dark: 'rgb(0, 114, 205)', // $dark-color
  darken: 'rgb(9, 137, 183)', // $darken-color
  pale: 'rgb(199, 231, 245)', // $pale-color
  subtle: 'rgb(178, 208, 223)', // $subtle-gray
  modalbg: 'rgba(0, 0, 0, 0.75)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACRJREFUOBFjZFj99D8DBYCJAr1graMGMDCMhsFoGIAyw8CnAwCilQKv3FML4AAAAABJRU5ErkJggg==',
  fonts: {
    buttons: {
      fontFamily: 'Quicksand',
      fontWeight: '400',
    },
  },
  radius: {
    general: '6px',
    buttons: '100px',
    searchBox: '100px',
    countBadge: '300px',
  },
  menu: {
    width: '64px',
    height: '76px',
    standby: 'eggAlatin',
    open: 'eggAlatinClose',
    itemBorder: 'none',
    itemWidth: '32px',
    itemHeight: '32px',
    linkRadius: '100px',
  },
  missionTag: {
    padding: '10px 0',
    left: '-30px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 48%;
    `,
    esecuzione: css`
      height: 50px;
    `,
  },
};

export const alatinpapers = {
  brand: '#00abe5', // $brand-color
  light: 'rgb(109, 210, 240)', // $light-color
  dark: 'rgb(0, 114, 205)', // $dark-color
  darken: 'rgb(9, 137, 183)', // $darken-color
  pale: 'rgb(199, 231, 245)', // $pale-color
  subtle: 'rgb(178, 208, 223)', // $subtle-gray
  modalbg: 'rgba(0, 0, 0, 0.75)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACRJREFUOBFjZFj99D8DBYCJAr1graMGMDCMhsFoGIAyw8CnAwCilQKv3FML4AAAAABJRU5ErkJggg==',
  fonts: defaultFontsValues,
  radius: {
    general: '6px',
    buttons: '100px',
    searchBox: '100px',
    countBadge: '90%',
  },
  menu: {
    width: '64px',
    height: '64px',
    standby: 'alatinPapersMenu',
    open: 'alatinPapersMenuClose',
    itemBorder: '1px solid #00abe5',
    itemWidth: '42px',
    itemHeight: '42px',
    linkRadius: '6px',
  },
  missionTag: {
    padding: '10px 0',
    left: '-30px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 58%;
      bottom: -12px;
    `,
  },
  topBarLogoLeft: {
    logo: 'alatinpapersSmall',
    style: css`
      width: 91px;
      margin-right: 16px;
      bottom: -3px;
      ${media.lt480`
        display: none;
      `}
    `,
  },
};

export const lyceum = {
  brand: '#0065ad',
  light: 'rgb(109, 210, 240)',
  dark: 'rgb(0, 114, 205)',
  darken: 'rgb(9, 137, 183)',
  pale: 'rgb(199, 231, 245)',
  subtle: 'rgb(178, 208, 223)',
  modalbg: 'rgba(0, 0, 0, 0.75)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAZa0Xl31tAAAAC0lEQVQI12MgEQAAADAAAWV61nwAAAAASUVORK5CYII=',
  fonts: defaultFontsValues,
  radius: {
    general: '6px',
    buttons: '100px',
    searchBox: '100px',
    countBadge: '90%',
  },
  menu: {
    width: '64px',
    height: '76px',
    standby: 'eggAlatin',
    open: 'eggAlatinClose',
    itemBorder: 'none',
    itemWidth: '32px',
    itemHeight: '32px',
    linkRadius: '100px',
  },
  missionTag: {
    padding: '10px 0',
    left: '-30px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 48%;
    `,
    esecuzione: css`
      height: 50px;
    `,
  },
};

export const argonauta = {
  brand: 'rgb(16, 174, 188)',
  light: 'rgb(18, 202, 195)',
  Dark: 'rgb(0, 109, 125)',
  darken: 'rgb(9, 137, 183)',
  pale: '#dffbf5',
  subtle: 'rgb(255, 163, 211)',
  modalbg: 'rgba(0, 0, 0, 0.75)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUQrrxJD/BqAAAAC0lEQVQI12MgEQAAADAAAWV61nwAAAAASUVORK5CYII=',
  fonts: defaultFontsValues,
  radius: {
    general: '6px',
    buttons: '100px',
    searchBox: '100px',
  },
  menu: {
    width: '64px',
    height: '64px',
    standby: 'circleArgonauta',
    open: 'circleArgonautaClose',
    itemBorder: 'none',
    itemWidth: '32px',
    itemHeight: '32px',
    linkRadius: '100px',
  },
  missionTag: {
    padding: '10px 0',
    left: '-30px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 78%;
    `,
    esecuzione: css`
      height: 30px;
    `,
  },
};

export const itaca = {
  brand: 'rgb(229, 0, 81)',
  light: 'rgb(255, 91, 113)',
  Dark: 'rgb(205, 19, 42)',
  darken: '#BA145E',
  pale: 'rgb(226, 170, 177)',
  subtle: 'rgb(167, 190, 192)',
  modalbg: 'rgba(0, 0, 0, 0.75)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEXlAFEUP07zAAAAC0lEQVQI12MgEQAAADAAAWV61nwAAAAASUVORK5CYII=',
  fonts: {
    buttons: {
      fontFamily: 'Quicksand',
      fontWeight: '400',
    },
  },
  radius: {
    general: '6px',
    buttons: '100px',
    searchBox: '100px',
    countBadge: '90%',
  },
  menu: {
    width: '64px',
    height: '64px',
    standby: 'circleItaca',
    open: 'circleItacaClose',
    itemBorder: 'none',
    itemWidth: '32px',
    itemHeight: '32px',
    linkRadius: '100px',
  },
  missionTag: {
    padding: '10px 0',
    left: '-30px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 78%;
    `,
    esecuzione: css`
      height: 30px;
    `,
  },
};

export const landingItaca = {
  brand: 'rgb(229, 0, 81)',
  light: 'rgb(255, 91, 113)',
  green: '#9bdd3e',
  orange: '#fe9d3e',
  grey: '#F2F2F2',
  dark: 'rgba(0, 133, 178, 1)',
  darken: 'rgb(9, 137, 183)',
  modalbg: 'rgba(0, 0, 0, 0.75)',
  fonts: defaultFontsValues,
  radius: {
    general: '6px',
    buttons: '12px',
  },
};

export const itacapapers = {
  brand: 'rgb(229, 0, 81)',
  light: 'rgb(255, 91, 113)',
  Dark: 'rgb(205, 19, 42)',
  darken: '#BA145E',
  pale: 'rgb(226, 170, 177)',
  subtle: 'rgb(167, 190, 192)',
  modalbg: 'rgba(0, 0, 0, 0.75)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEXlAFEUP07zAAAAC0lEQVQI12MgEQAAADAAAWV61nwAAAAASUVORK5CYII=',
  fonts: defaultFontsValues,
  radius: {
    general: '6px',
    buttons: '100px',
    searchBox: '100px',
  },
  menu: {
    width: '64px',
    height: '64px',
    standby: 'itacaPapersMenuClose',
    open: 'itacaPapersMenu',
    itemBorder: '1px solid rgb(229, 0, 81)',
    itemWidth: '42px',
    itemHeight: '42px',
    linkRadius: '6px',
  },
  missionTag: {
    padding: '10px 0',
    left: '-30px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 74%;
    `,
  },
  topBarLogoLeft: {
    logo: 'itacapapersSmall',
    style: css`
      width: 148px;
      margin-right: 16px;
      bottom: -3px;
      ${media.lt667`
        width: 99px;
        bottom: -2px;
      `}
      ${media.lt480`
        display: none;
      `}
    `,
  },
};

export const mytest = {
  brand: 'rgb(49, 81, 117)',
  light: '#39C5FF',
  Dark: 'rgb(75, 70, 160)',
  darken: 'rgb(9, 137, 183)',
  pale: 'rgb(0, 171, 229)',
  subtle: 'rgb(238, 228, 248)',
  modalbg: 'rgba(73, 114, 161, 0.8)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUxUXUBHFvbAAAAC0lEQVQI12MgEQAAADAAAWV61nwAAAAASUVORK5CYII=',
  fonts: defaultFontsValues,
  accents: {
    green: 'rgb(139, 232, 31)',
    yellow: 'rgb(255, 242, 0)',
    fucsia: 'rgb(255, 0, 207)',
  },
  radius: {
    general: '6px',
    buttons: '6px',
    searchBox: '100px',
  },
  menu: {
    width: '64px',
    height: '64px',
    standby: 'myTestMenu',
    open: 'myTestMenuClose',
    itemBorder: '2px solid rgb(49, 81, 117)',
    itemWidth: '42px',
    itemHeight: '42px',
    linkRadius: '6px',
  },
  missionTag: {
    padding: '16px 0',
    left: '-22px',
    top: '0',
  },
  topBarLogoLeft: {
    logo: 'mytestitaliano',
    style: css`
      margin-right: 20px;
      top:-2px;
      width:83px;
      min-width:83px;
      ${media.mobile`
      margin-right: 16px;
      `};
      ${media.lt667`
        min-width: 66px;
        max-width: 66px;
      `}
      ${media.lt480`
        display: none;
      `}
    `,
  },
  topBarLogoRight: {
    logo: 'lascuola',
    style: css`
      width:83px;
      margin-left: 20px;
      `,
  },
  logo: {
    loginForm: css`
      width: 42%;
    `,
  },
};

export const faidatest = {
  brand: 'rgb(219, 58, 54)',
  light: 'rgb(255, 91, 113)',
  Dark: '#9F211E',
  darken: '#9F211E',
  pale: 'rgb(226, 170, 177)',
  subtle: 'rgb(238, 228, 248)',
  modalbg: 'rgba(0, 0, 0, 0.6)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUxUXUBHFvbAAAAC0lEQVQI12MgEQAAADAAAWV61nwAAAAASUVORK5CYII=',
  fonts: defaultFontsValues,
  radius: {
    general: '9px',
    buttons: '9px',
    searchBox: '100px',
  },
  menu: {
    width: '64px',
    height: '64px',
    standby: 'faiDaTestMenu',
    open: 'faiDaTestMenuClose',
    itemBorder: '2px solid rgb(219, 58, 54)',
    itemWidth: '42px',
    itemHeight: '42px',
    linkRadius: '6px',
  },
  missionTag: {
    padding: '16px 0',
    left: '-22px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 84%;
      bottom: -8px;
    `,
  },
  topBarLogoLeft: {
    logo: 'faidatest',
    style: css`
      width: 150px;
      margin-right: 16px;
      bottom: -3px;
      ${media.lt480`
        display: none;
      `}
    `,
  },
  topBarLogoRight: {
    logo: 'loedannacombo',
    style: css`
      height: 46px;
      margin-left: 10px;
    `,
  },
};

// FIXME: a regime gestire lo style corretto per parallel
export const parallel = {
  brand: '#1EB28F',
  light: '#82EDBB',
  dark: '#386150',
  darken: '#3D3522',
  pale: '#A2C1B3',
  subtle: '#C0E8D0',
  modalbg: 'rgba(0, 0, 0, 0.75)',
  borderbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAZa0Xl31tAAAAC0lEQVQI12MgEQAAADAAAWV61nwAAAAASUVORK5CYII=',
  fonts: defaultFontsValues,
  radius: {
    general: '6px',
    buttons: '100px',
    searchBox: '100px',
    countBadge: '90%',
  },
  menu: {
    width: '64px',
    height: '76px',
    standby: 'eggAlatin',
    open: 'eggAlatinClose',
    itemBorder: 'none',
    itemWidth: '32px',
    itemHeight: '32px',
    linkRadius: '100px',
  },
  missionTag: {
    padding: '10px 0',
    left: '-30px',
    top: '0',
  },
  logo: {
    loginForm: css`
      width: 48%;
    `,
    esecuzione: css`
      height: 50px;
    `,
  },
};

export const allThemes = {
  alatin,
  landingAlatin,
  landingItaca,
  lyceum,
  parallel,
  argonauta,
  itaca,
  itacapapers,
  alatinpapers,
  mytest,
  mytestmatematica: mytest,
  mytestitaliano: mytest,
  myteststoriamedie: mytest,
  myteststoriabiennio: mytest,
  myteststoriatriennio: mytest,
  faidatest,
};

export const themeOptions = {
  alatin: 'alatin',
  landingAlatin: 'landingAlatin',
  landingItaca: 'landingItaca',
  argonauta: 'argonauta',
  itaca: 'itaca',
  mytest: 'mytest',
  lyceum: 'lyceum',
  parallel: 'parallel',
  itacapapers: 'itacapapers',
};
