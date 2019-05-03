export const calcolaDownload = (props) => {
  const { configuration: { product, disciplinaId }, isDocente } = props;
  let downloads = [];

  switch (product) {
    case 'lyceum':
      downloads = [isDocente && {
        titolo: 'Guida docente',
        slug: 'guida-docente-lyceum',
      }].filter((item) => (item));
      break;

    case 'alatin':
      downloads = isDocente ? [{
        titolo: 'Quadro delle competenze e valutazione',
        slug: 'quadro-delle-competenze-e-valutazione',
      }, {
        titolo: 'Memorandum docente',
        slug: 'memorandum-docente-alatin',
      }, {
        titolo: 'Griglia di valutazione',
        slug: 'griglia-di-valutazione-alatin',
      }, {
        titolo: 'Guida docente',
        slug: 'guida-docente-lyceum',
      }, {
        titolo: 'Soluzioni verba conserta',
        slug: 'soluzioni-verba-conserta',
      }] : [];
      break;

    case 'itaca':
      downloads = isDocente ? [{
        titolo: 'Documento 1_Memorandum',
        slug: 'memorandum-docente-itaca',
      }, {
        titolo: 'Documento 2_Griglia di valutazione',
        slug: 'griglia-di-valutazione-itaca',
      }] : [];
      break;

    case 'argonauta':
      downloads = [
        isDocente && disciplinaId === 25 && {
          titolo: 'Soluzioni argonauta 1',
          slug: 'soluzioni-argonauta-1',
        },
        isDocente && disciplinaId === 26 && {
          titolo: 'Soluzioni argonauta 2',
          slug: 'soluzioni-argonauta-2',
        }].filter((item) => (item));
      break;

    default: break;
  }

  return downloads.sort(/* istanbul ignore next */(a, b) => {
    const titoloA = a.titolo.toUpperCase();
    const titoloB = b.titolo.toUpperCase();
    if (titoloA < titoloB) {
      return -1;
    }
    if (titoloA > titoloB) {
      return 1;
    }

    return 0;
  });
};
