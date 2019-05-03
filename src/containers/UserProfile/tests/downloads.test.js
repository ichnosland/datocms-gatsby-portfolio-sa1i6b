import { calcolaDownload } from '../downloads';

describe('calcolaDownload', () => {
  it('restituisce i download ogni progetto per utente docente lyceum', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'lyceum',
      },
      isDocente: true,
    })).toEqual([{
      titolo: 'Guida docente',
      slug: 'guida-docente-lyceum',
    }]);
  });

  it('restituisce i download ogni progetto per utente studente lyceum', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'lyceum',
      },
      isDocente: false,
    })).toEqual([]);
  });

  it('restituisce i download ogni progetto per utente docente alatin', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'alatin',
      },
      isDocente: true,
    })).toEqual([{
      titolo: 'Griglia di valutazione',
      slug: 'griglia-di-valutazione-alatin',
    }, {
      titolo: 'Guida docente',
      slug: 'guida-docente-lyceum',
    }, {
      titolo: 'Memorandum docente',
      slug: 'memorandum-docente-alatin',
    }, {
      titolo: 'Quadro delle competenze e valutazione',
      slug: 'quadro-delle-competenze-e-valutazione',
    }, {
      titolo: 'Soluzioni verba conserta',
      slug: 'soluzioni-verba-conserta',
    }]);
  });

  it('restituisce i download ogni progetto per utente studente alatin', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'alatin',
      },
      isDocente: false,
    })).toEqual([]);
  });

  it('restituisce i download ogni progetto per utente docente itaca', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'itaca',
      },
      isDocente: true,
    })).toEqual([{
      titolo: 'Documento 1_Memorandum',
      slug: 'memorandum-docente-itaca',
    }, {
      titolo: 'Documento 2_Griglia di valutazione',
      slug: 'griglia-di-valutazione-itaca',
    }]);
  });

  it('restituisce i download ogni progetto per utente studente itaca', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'itaca',
      },
      isDocente: false,
    })).toEqual([]);
  });

  it('restituisce i download ogni progetto per utente docente argonauta con disciplina 25', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'argonauta',
        disciplinaId: 25,
      },
      isDocente: true,
    })).toEqual([{
      titolo: 'Soluzioni argonauta 1',
      slug: 'soluzioni-argonauta-1',
    }]);
  });

  it('restituisce i download ogni progetto per utente docente argonauta con disciplina 26', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'argonauta',
        disciplinaId: 26,
      },
      isDocente: true,
    })).toEqual([{
      titolo: 'Soluzioni argonauta 2',
      slug: 'soluzioni-argonauta-2',
    }]);
  });

  it('restituisce i download ogni progetto per utente studente argonauta', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'argonauta',
      },
      isDocente: false,
    })).toEqual([]);
  });

  it('restituisce i download ogni progetto per altro progetto', () => {
    expect(calcolaDownload({
      configuration: {
        product: 'product',
      },
      isDocente: false,
    })).toEqual([]);
  });
});
