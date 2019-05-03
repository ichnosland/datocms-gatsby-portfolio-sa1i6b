/**
*
* navigation
*
*/

export const navigation = {
  LandingAlatin: [{
    id: 1,
    direction: '/alatin-academy',
    title: 'Academy',
  }, {
    id: 2,
    direction: '/alatin-lyceum',
    title: 'Lyceum',
  }, {
    id: 3,
    direction: '/formazione',
    title: 'Formazione',
  }, {
    id: 4,
    direction: '/#prezzi',
    title: 'Prezzi',
  }, {
    id: 5,
    direction: '#',
    onOpen: () => window.open(
      'https://maieuticallabs.zendesk.com/hc/it/categories/200541781-ALATIN',
      '_blank'
    ),
    title: 'FAQ',
  }],
  LandingItaca: [{
    id: 1,
    direction: '/itaca-academy',
    title: 'Itaca',
  }, {
    id: 2,
    direction: '/formazione',
    title: 'Formazione',
  }, {
    id: 3,
    direction: '/#prezzi',
    title: 'Prezzi',
  }, {
    id: 4,
    direction: '#',
    onOpen: () => window.open(
      'https://maieuticallabs.zendesk.com/hc/it/categories/115000849365-ITACA',
      '_blank'
    ),
    title: 'FAQ',
  }],
};
