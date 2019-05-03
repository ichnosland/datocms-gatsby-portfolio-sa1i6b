/**
*
* images
*
*/

import { BASENAME } from 'configuration';

const getImagesFromSubpath = (prefix) => ({
  dashboard: `${BASENAME}help_${prefix}dashboard.png`,
  argomento: `${BASENAME}help_${prefix}argomento.png`,
  selezione: `${BASENAME}help_${prefix}selezione.png`,
  salvataggio: `${BASENAME}help_${prefix}salvataggio.png`,
  stampa: `${BASENAME}help_${prefix}stampa.png`,
  menu: `${BASENAME}help_${prefix}menu.png`,
  tueverifiche: `${BASENAME}help_${prefix}tueverifiche.png`,
});

export const getImagesByProduct = (product) => {
  switch (product) {
    default:
      return getImagesFromSubpath('');
    case 'mytestmatematica':
      return getImagesFromSubpath('matematica_');
    case 'mytestitaliano':
      return getImagesFromSubpath('italiano_');
    case 'myteststoriamedie':
      return getImagesFromSubpath('storia_');
    case 'myteststoriabiennio':
      return getImagesFromSubpath('storia_');
    case 'myteststoriatriennio':
      return getImagesFromSubpath('storia_');
  }
};
