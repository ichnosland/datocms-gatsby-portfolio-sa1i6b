import { calculateMenuData } from '../Menu';

describe('<calculateMenuData />', () => {
  it('should return an empty array as default', () => {
    expect(calculateMenuData({
      configuration: {
        product: 'nonesiste',
      },
    })).toEqual([]);
  });

  it('should expected values on academy-ish disciplines', () => {
    const mockProps = {
      onModalSetData: () => { },
    };

    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'alatin',
      },
    }).length).toBe(4);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'itaca',
      },
    }).length).toBe(3);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'argonauta',
      },
    })).toEqual([{
      titolo: 'Classi',
      icona: 'classi',
      fill: '#0F7CFF',
      url: '/classi-studente',
    }, {
      icona: 'profile',
      titolo: 'Profilo',
      url: '/profilo',
    }, {
      fill: expect.any(String),
      icona: 'roundFeedback',
      titolo: 'Assistenza',
      onOpen: expect.any(Function),
    }]);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'parallel',
      },
    })).toEqual([{
      icona: 'profile',
      titolo: 'Profilo',
      url: '/profilo',
    }]);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'lyceum',
      },
    }).length).toBe(5);
  });

  it('should expected values on academy-ish disciplines and user is docente', () => {
    const mockProps = {
      onModalSetData: () => { },
      isDocente: true,
    };

    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'alatin',
      },
    }).length).toBe(5);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'itaca',
      },
    }).length).toBe(4);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'argonauta',
      },
    })).toEqual([{
      titolo: 'Classi',
      icona: 'classi',
      fill: '#0F7CFF',
      url: '/classi',
    }, {
      icona: 'profile',
      titolo: 'Profilo',
      url: '/profilo',
    }, {
      fill: expect.any(String),
      icona: 'roundFeedback',
      titolo: 'Assistenza',
      onOpen: expect.any(Function),
    }]);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'lyceum',
      },
    }).length).toBe(5);
  });

  it('should expected values on academy-ish disciplines when codiceDaSbloccare == true', () => {
    const mockProps = {
      onModalSetData: () => { },
      codiceDaSbloccare: true,
    };

    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'alatin',
      },
    }).length).toBe(4);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'itaca',
      },
    }).length).toBe(3);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'argonauta',
      },
    })).toEqual([{
      icona: 'profile',
      titolo: 'Profilo',
      url: '/profilo',
    }, {
      fill: expect.any(String),
      icona: 'starCircle',
      iconbg: expect.any(String),
      titolo: 'Sblocca codice',
      url: '/sblocca',
    }, {
      fill: expect.any(String),
      icona: 'roundFeedback',
      titolo: 'Assistenza',
      onOpen: expect.any(Function),
    }]);
    expect(calculateMenuData({
      ...mockProps,
      configuration: {
        product: 'lyceum',
      },
    }).length).toBe(5);
  });

  it('should expected values on mytest discipline', () => {
    const expectedMenu = [{
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

    expect(calculateMenuData({ configuration: { product: 'mytest' } })).toEqual(expectedMenu);
  });

  it('should expected values on itacapapers discipline', () => {
    const expectedMenu = [{
      titolo: 'Le tue verifiche',
      icona: 'mieVerifiche',
      url: '/le-tue-verifiche',
    }, {
      titolo: 'Aiuto',
      icona: 'squareFeedback',
      url: '/guida',
    }];

    expect(calculateMenuData({ configuration: { product: 'itacapapers' } })).toEqual(expectedMenu);
  });

  it('should expected values on alatinpapers discipline', () => {
    const expectedMenu = [{
      titolo: 'Le tue verifiche',
      icona: 'mieVerifiche',
      url: '/le-tue-verifiche',
    }, {
      titolo: 'Aiuto',
      icona: 'squareFeedback',
      url: '/guida',
    }];

    expect(calculateMenuData({ configuration: { product: 'alatinpapers' } })).toEqual(expectedMenu);
  });

  it('should expected values on faidatest discipline', () => {
    const expectedMenu = [{
      titolo: 'Le tue verifiche',
      icona: 'mieVerifiche',
      url: '/le-tue-verifiche',
    }, {
      titolo: 'Aiuto',
      icona: 'squareFeedback',
      url: '/guida',
    }];

    expect(calculateMenuData({ configuration: { product: 'faidatest' } })).toEqual(expectedMenu);
  });

  it('should expected values on other mytest-ish disciplines', () => {
    const expectedMenu = [{
      titolo: 'Le tue verifiche',
      icona: 'mieVerifiche',
      url: '/le-tue-verifiche',
    }, {
      titolo: 'Aiuto',
      icona: 'squareFeedback',
      url: '/guida',
    }];

    expect(calculateMenuData({ configuration: { product: 'mytestitaliano' } })).toEqual(expectedMenu);
    expect(calculateMenuData({ configuration: { product: 'mytestmatematica' } })).toEqual(expectedMenu);
    expect(calculateMenuData({ configuration: { product: 'myteststoriabiennio' } })).toEqual(expectedMenu);
    expect(calculateMenuData({ configuration: { product: 'myteststoriatriennio' } })).toEqual(expectedMenu);
    expect(calculateMenuData({ configuration: { product: 'myteststoriamedie' } })).toEqual(expectedMenu);
  });
});

describe('itacapapers on APP_TESTING === true', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  it('deve avere verifiche pronte', () => {
    process.env.TESTING = true;
    const expectedMenu = [{
      titolo: 'Le tue verifiche',
      icona: 'mieVerifiche',
      url: '/le-tue-verifiche',
    }, {
      titolo: 'Verifiche pronte',
      icona: 'dotList',
      url: '/verifiche-pronte',
    }, {
      titolo: 'Profilo',
      icona: 'user',
      url: '/profilo',
    }, {
      titolo: 'Aiuto',
      icona: 'squareFeedback',
      url: '/guida',
    }];

    const menu = require('containers/Dashboard/Menu'); // eslint-disable-line global-require
    expect(menu.calculateMenuData({
      configuration: { product: 'itacapapers' },
    })).toEqual(expectedMenu);
  });
});
