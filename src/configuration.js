export const API_BASE_PATH = process.env.API_URL ?
  process.env.API_URL :
  'https://www.cloudschooling.it/';
export const APP_TESTING = process.env.TESTING ?
  process.env.TESTING : false;
export const APPLICATION = process.env.APPLICATION;
export const APP_VERSION = process.env.APP_VERSION;
export const APP_AUTH_TOKEN = process.env.TOKEN;
export const APP_NODE_ENV = process.env.NODE_ENV;
export const BASENAME = process.env.BASENAME;
export const MYTEST_PRODUCTS = [
  'mytestitaliano',
  'mytestmatematica',
  'myteststoriamedie',
  'myteststoriatriennio',
  'myteststoriabiennio',
  'mytest',
];
export const ZENDESK_TICKET_OPTIONS = {
  tecnico: {
    agent: 767746652,
    defaultTag: 'tecnico',
  },
  contenuto: {
    agent: 781872021,
    defaultTag: 'contenuto',
  },
  comunicazione: {
    agent: 767746652,
    defaultTag: 'comunicazione',
  },
};
export const ZENDESK_AGENT = 22;
export const ACADEMY_PRODUCTS = {
  21: 'Alatin Academy',
  24: 'Itaca Academy',
  25: 'Argonauta 1',
  26: 'Argonauta 2',
  33: 'Alatin Lyceum',
};

export const PAYPAL = {
  env: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
  locale: 'it_IT',
  currency: 'EUR',
  style: {
    color: 'gold',
    label: 'checkout',
    size: 'responsive',
    fundingicons: true,
    tagline: true,
  },
  client: {
    sandbox: 'AVol_NFSaqTRXxctR7AoFPY1_QNhx78dvFPhEul-f9_KJJLLCBHZzyglOwJ-ueZZjHVU3tWP5BJOBjCF',
    production: 'Af-XsMlYBYe5w4OgNp30JXRAQuZARRXy3hYvthX9ykcWfnLJkCPgF7_x4XqxhSV_tKo8aYV9B-XcpuR2',
  },
};

export const FACEBOOK = {
  appId: 476698685826665,
  language: 'it_IT',
  version: 3.1,
};

export const RAVEN_SETTINGS = {
  AlatinLyceum: {
    url: 'https://786633dd0912471d80c90ed4ee17e0f7@sentry.maieuticallabs.it/3',
  },
  LandingAlatin: {
    url: 'http://ec6fb5af9ebf4ae5ba8c1687567049ab@sentry.maieuticallabs.it/5',
  },
  Parallel: {
    url: 'http://612cd3192d9841a8af2627732d00b9cc@sentry.maieuticallabs.it/7',
  },
};

export const GOOGLE_ANALYTICS_SETTINGS = {
  AlatinAcademy: 'UA-63509796-1',
  Argonauta: 'UA-63509796-1', // stesso di alatin, volutamente
  LandingAlatin: 'UA-63509796-1',
  AlatinLyceum: 'UA-126662020-1',
  MyTest: 'UA-127226508-1',
  MyTestItaliano: 'UA-127226508-1',
  MyTestMatematica: 'UA-127226508-1',
  MyTestStoriaMedie: 'UA-127226508-1',
  MyTestStoriaBiennio: 'UA-127226508-1',
  MyTestStoriaTriennio: 'UA-127226508-1',
  FaiDaTest: 'UA-132403410-1',
  ItacaPapers: 'UA-133451543-1',
  ItacaAcademy: 'UA-108164059-1',
  LandingItaca: 'UA-108164059-1',
  AlatinPapers: 'UA-136032176-1',
};
