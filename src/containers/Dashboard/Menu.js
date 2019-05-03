import React from 'react';
import ZendeskTicket from 'containers/ZendeskTicket';
import { APP_TESTING } from 'configuration';

import { colore } from 'style/color';

export const getZendeskURL = (product) => {
  switch (product) {
    case 'lyceum':
      return 'https://maieuticallabs.zendesk.com/hc/it/categories/360000803193-LYCEUM';
    case 'alatin':
      return 'https://maieuticallabs.zendesk.com/hc/it/categories/200541781-ALATIN';
    default: return false;
  }
};

export const getRealtaURL = (product) => {
  switch (product) {
    case 'lyceum':
      return 'https://lyceum.compitidirealta.it';

    default: return false;
  }
};

export const calculateMenuData = (props) => {
  const {
    configuration,
    isDocente,
    codiceDaSbloccare,
    onModalSetData,
  } = props;
  let menu = [];
  const zendeskUrl = getZendeskURL(configuration.product);
  const realtaUrl = getRealtaURL(configuration.product);

  switch (configuration.product) {
    case 'alatin':
    case 'itaca':
    case 'argonauta':
    case 'lyceum':
      menu = [!codiceDaSbloccare && !isDocente && {
        titolo: 'Classi',
        icona: 'classi',
        fill: '#0F7CFF',
        url: '/classi-studente',
      }, !codiceDaSbloccare && isDocente && {
        titolo: 'Classi',
        icona: 'classi',
        fill: '#0F7CFF',
        url: '/classi',
      }, {
        titolo: 'Profilo',
        icona: 'profile',
        url: '/profilo',
      }, codiceDaSbloccare && {
        titolo: 'Sblocca codice',
        icona: 'starCircle',
        fill: colore.ui.contrast,
        iconbg: colore.actions.action,
        url: '/sblocca',
      }, zendeskUrl && {
        titolo: 'FAQ',
        icona: 'info',
        fill: colore.actions.action,
        onOpen: /* istanbul ignore next */ () => window.open(zendeskUrl, '_blank'),
        show: true,
        disableClose: true,
        isPopup: false,
      }, {
        titolo: 'Assistenza',
        icona: 'roundFeedback',
        fill: colore.ui.feedback,
        onOpen: /* istanbul ignore next */ () => onModalSetData({
          contenuto: (
            <ZendeskTicket
              ticketData={{
                provenienza: 'dashboard',
              }}
            />
          ),
          show: true,
          disableClose: true,
          isPopup: false,
        }),
      }, realtaUrl && {
        titolo: 'Compiti di realtà',
        icona: 'realta',
        onOpen: /* istanbul ignore next */ () => window.open(realtaUrl, '_blank'),
        show: true,
        disableClose: true,
        isPopup: false,
      }, configuration.product === 'alatin' && isDocente && {
        titolo: 'Alatin Papers',
        icona: 'alatinPapersMenu',
        onOpen: /* istanbul ignore next */ () => window.open('https://alatin.it/papers/', '_blank'),
        show: true,
        disableClose: true,
        isPopup: false,
      }, configuration.product === 'itaca' && isDocente && {
        titolo: 'Itaca Papers',
        icona: 'itacaPapersMenu',
        onOpen: /* istanbul ignore next */ () => window.open('https://itaca.academy/papers/', '_blank'),
        show: true,
        disableClose: true,
        isPopup: false,
      }].filter((item) => (item));
      break;

    case 'parallel':
      menu = [{
        titolo: 'Profilo',
        icona: 'profile',
        url: '/profilo',
      }];
      break;

    case 'mytest':
      menu = [{
        titolo: 'Le tue verifiche',
        icona: 'mieVerifiche',
        url: '/le-tue-verifiche',
      }, {
        titolo: 'Aiuto',
        icona: 'squareFeedback',
        url: '/guida',
      }, {
        titolo: 'Profilo',
        icona: 'user',
        url: '/profilo',
      }];
      break;

    case 'mytestitaliano':
    case 'mytestmatematica':
    case 'myteststoriabiennio':
    case 'myteststoriatriennio':
    case 'myteststoriamedie':
      menu = [{
        titolo: 'Le tue verifiche',
        icona: 'mieVerifiche',
        url: '/le-tue-verifiche',
      }, {
        titolo: 'Aiuto',
        icona: 'squareFeedback',
        url: '/guida',
      }];
      break;

    case 'alatinpapers':
      menu = [{
        titolo: 'Le tue verifiche',
        icona: 'mieVerifiche',
        url: '/le-tue-verifiche',
      }, {
        titolo: 'Aiuto',
        icona: 'squareFeedback',
        url: '/guida',
      }];
      break;

    case 'itacapapers':
      menu = [{
        titolo: 'Le tue verifiche',
        icona: 'mieVerifiche',
        url: '/le-tue-verifiche',
      }, APP_TESTING && {
        titolo: 'Verifiche pronte',
        icona: 'dotList',
        url: '/verifiche-pronte',
      }, APP_TESTING && {
        titolo: 'Profilo',
        icona: 'user',
        url: '/profilo',
      }, {
        titolo: 'Aiuto',
        icona: 'squareFeedback',
        url: '/guida',
      }].filter((u) => (u));
      break;

    case 'faidatest':
      menu = [{
        titolo: 'Le tue verifiche',
        icona: 'mieVerifiche',
        url: '/le-tue-verifiche',
      }, {
        titolo: 'Aiuto',
        icona: 'squareFeedback',
        url: '/guida',
      }];
      break;

    default: break;
  }

  return menu;
};
