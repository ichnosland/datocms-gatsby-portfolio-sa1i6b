describe('getImagesByProduct', () => {
  process.env.BASENAME = '/basename/';
  const getImagesByProduct = require('../images').getImagesByProduct; // eslint-disable-line global-require
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  it('default', () => {
    expect(getImagesByProduct('prodotto')).toEqual({
      dashboard: '/basename/help_dashboard.png',
      argomento: '/basename/help_argomento.png',
      selezione: '/basename/help_selezione.png',
      salvataggio: '/basename/help_salvataggio.png',
      stampa: '/basename/help_stampa.png',
      menu: '/basename/help_menu.png',
      tueverifiche: '/basename/help_tueverifiche.png',
    });
  });

  it('mytestmatematica', () => {
    expect(getImagesByProduct('mytestmatematica')).toEqual({
      dashboard: '/basename/help_matematica_dashboard.png',
      argomento: '/basename/help_matematica_argomento.png',
      selezione: '/basename/help_matematica_selezione.png',
      salvataggio: '/basename/help_matematica_salvataggio.png',
      stampa: '/basename/help_matematica_stampa.png',
      menu: '/basename/help_matematica_menu.png',
      tueverifiche: '/basename/help_matematica_tueverifiche.png',
    });
  });

  it('mytestitaliano', () => {
    expect(getImagesByProduct('mytestitaliano')).toEqual({
      dashboard: '/basename/help_italiano_dashboard.png',
      argomento: '/basename/help_italiano_argomento.png',
      selezione: '/basename/help_italiano_selezione.png',
      salvataggio: '/basename/help_italiano_salvataggio.png',
      stampa: '/basename/help_italiano_stampa.png',
      menu: '/basename/help_italiano_menu.png',
      tueverifiche: '/basename/help_italiano_tueverifiche.png',
    });
  });

  it('myteststoriamedie', () => {
    expect(getImagesByProduct('myteststoriamedie')).toEqual({
      dashboard: '/basename/help_storia_dashboard.png',
      argomento: '/basename/help_storia_argomento.png',
      selezione: '/basename/help_storia_selezione.png',
      salvataggio: '/basename/help_storia_salvataggio.png',
      stampa: '/basename/help_storia_stampa.png',
      menu: '/basename/help_storia_menu.png',
      tueverifiche: '/basename/help_storia_tueverifiche.png',
    });
  });

  it('myteststoriabiennio', () => {
    expect(getImagesByProduct('myteststoriabiennio')).toEqual({
      dashboard: '/basename/help_storia_dashboard.png',
      argomento: '/basename/help_storia_argomento.png',
      selezione: '/basename/help_storia_selezione.png',
      salvataggio: '/basename/help_storia_salvataggio.png',
      stampa: '/basename/help_storia_stampa.png',
      menu: '/basename/help_storia_menu.png',
      tueverifiche: '/basename/help_storia_tueverifiche.png',
    });
  });


  it('myteststoriatriennio', () => {
    expect(getImagesByProduct('myteststoriatriennio')).toEqual({
      dashboard: '/basename/help_storia_dashboard.png',
      argomento: '/basename/help_storia_argomento.png',
      selezione: '/basename/help_storia_selezione.png',
      salvataggio: '/basename/help_storia_salvataggio.png',
      stampa: '/basename/help_storia_stampa.png',
      menu: '/basename/help_storia_menu.png',
      tueverifiche: '/basename/help_storia_tueverifiche.png',
    });
  });
});
