/**
 * Versioni utils
 */

import {
  calcolaStrutturaStep,
  calcolaPeriodiDaEseguire,
  calcolaContenutoPeriodoDaEseguire,
  calcolaTestoIntroduttivoPeriodi,
  versionePeriodoToSteps,
  calcolaTraduzioneUtentePeriodo,
} from '../utils';

const mockPeriodiVersione = [{
  periodo: [{
    elementi: [{
      id: 61214,
      titolo: null,
      tipo: false,
      form: null,
      html: '<span lessico=\'Postquam\' idx=\'0\' testo=\'testo\' show-modal=\'setModal()\' tables=\'updateTables(input)\'>Postquam</span> <span lessico=\'Galli\' idx=\'1\' testo=\'testo\' show-modal=\'setModal()\' tables=\'updateTables(input)\'>Galli</span>',
      esercizioId: 79228,
      italiano: false,
      testo_principale: 'Postquam Galli a Cornelio Dolabella consule pulsi erant, Tarentinis bellum indictum est, quia legatos Romanorum offenderant.',
      testo_principale_pre: '',
      testo_principale_post: '',
    }, {
      id: 61215,
      titolo: 'Analizza il periodo',
      tipo: 'G',
      form: null,
      html: null,
      esercizioId: 79228,
      italiano: false,
      testo_principale: '0 1 2 3 4 5 6 7',
      testo_principale_pre: '',
      testo_principale_post: '',
    }],
    id: 0,
  }],
  periodo_id: 1.0,
}, {
  periodo: [{
    elementi: [{
      id: 61254,
      titolo: null,
      tipo: false,
      form: null,
      html: '<span lessico=\'Contra\' idx=\'0\' testo=\'testo\' show-modal=\'setModal()\' tables=\'updateTables(input)\'>Contra</span>',
      traduci: [],
      esercizioId: 79236,
      italiano: false,
      testo_principale: 'Contra Romanos Tarentini auxilium a Pyrrho, Epiri rege, petiverunt.',
      testo_principale_pre: '',
      testo_principale_post: '',
    }, {
      id: 61255,
      titolo: 'Trova il predicato',
      tipo: 'I',
      form: [8],
      html: null,
      esercizioId: 79236,
      italiano: false,
      testo_principale: '8',
      testo_principale_pre: '',
      testo_principale_post: '',
    }],
    id: 0,
  }, {
    elementi: [{
      id: 61270,
      titolo: null,
      tipo: false,
      form: null,
      html: '<strong>testo in html</strong>',
      esercizioId: 79236,
      italiano: false,
      testo_principale: 'Contra Romanos Tarentini<span class=\'contesto\'> auxilium</span> a Pyrrho, <span class=\'contesto\'>Epiri rege</span>, <span class=\'contesto\'>petiverunt</span>.',
      testo_principale_pre: '',
      testo_principale_post: '',
      risposta_1: '',
      risposta_2: '',
      risposta_3: '',
      risposta_4: '',
      distrattore_1: '',
      distrattore_2: '',
      distrattore_3: '',
      distrattore_4: '',
      parole_gia_ricostruite: '',
      continua: false,
      focus: true,
      ignora_lessico: false,
      etichetta_1: '',
      etichetta_2: '',
      etichetta_3: '',
      etichetta_4: '',
      etichetta_5: '',
    }, {
      id: 61271,
      titolo: 'Traduci',
      tipo: 'U',
      html: null,
      esercizioId: 79236,
      italiano: false,
      testo_principale: 'chiesero aiuto | aiuto chiesero | chiesero un aiuto | un aiuto chiesero | hanno chiesto aiuto | aiuto hanno chiesto | hanno chiesto un aiuto | un aiuto hanno chiesto | hanno chiesto l\'aiuto | l\'aiuto hanno chiesto | l\'aiuto chiesero | chiesero l\'aiuto | domandarono aiuto | domandarono un aiuto | un aiuto domandarono | hanno domandato aiuto | aiuto hanno domandato | hanno domandato un aiuto | un aiuto hanno domandato | hanno domandato l\'aiuto | l\'aiuto hanno domandato | l\'aiuto domandarono | domandarono l\'aiuto',
      testo_principale_pre: 'Contro i Romani i Tarentini',
      testo_principale_post: 'a Pirro,',
      risposta_1: 'contro i Romani i Tarantini chiesero aiuto a Pirro re dell\'Epiro',
      risposta_2: 'chiesero aiuto a Pirro re dell\'Epiro contro i Romani i Tarantini',
      risposta_3: 'contro i Romani a Pirro re dell\'Epiro chiesero aiuto i Tarantini',
      risposta_4: 'i Tarantini a Pirro re dell\'Epiro chiesero aiuto contro i Romani',
      distrattore_1: 'in di chiese ai',
      distrattore_2: '',
      distrattore_3: '',
      distrattore_4: '',
      parole_gia_ricostruite: '',
      continua: true,
      focus: false,
      ignora_lessico: false,
      etichetta_1: '',
      etichetta_2: '',
      etichetta_3: '',
      etichetta_4: '',
      etichetta_5: '',
    }, {
      id: 64559,
      titolo: null,
      tipo: 'U',
      html: null,
      traduci: [],
      inputLessicale: [],
      esercizioId: 79236,
      italiano: false,
      testo_principale: 're dell\'Epiro | il re dell\'Epiro | il re d\'Epiro | re d\'Epiro',
      testo_principale_pre: '',
      testo_principale_post: ', ',
      risposta_1: '',
      risposta_2: '',
      risposta_3: '',
      risposta_4: '',
      distrattore_1: '',
      distrattore_2: '',
      distrattore_3: '',
      distrattore_4: '',
      parole_gia_ricostruite: '',
      continua: true,
      focus: false,
      ignora_lessico: false,
      etichetta_1: '',
      etichetta_2: '',
      etichetta_3: '',
      etichetta_4: '',
      etichetta_5: '',
    }, {
      id: 645595,
      titolo: null,
      tipo: 'U',
      html: null,
      traduci: [],
      inputLessicale: [],
      esercizioId: 79236,
      italiano: false,
      testo_principale: 'prova',
      testo_principale_pre: 'testo prima',
      testo_principale_post: '',
      risposta_1: '',
      risposta_2: '',
      risposta_3: '',
      risposta_4: '',
      distrattore_1: '',
      distrattore_2: '',
      distrattore_3: '',
      distrattore_4: '',
      parole_gia_ricostruite: '',
      continua: false,
      focus: false,
      ignora_lessico: false,
      etichetta_1: '',
      etichetta_2: '',
      etichetta_3: '',
      etichetta_4: '',
      etichetta_5: '',
    }],
    id: 1,
  }, {
    elementi: [{
      id: 61282,
      titolo: null,
      tipo: false,
      form: null,
      html: 'testo consegna html',
      esercizioId: 79239,
      italiano: false,
      testo_principale: 'Contra Pyrrhum missus est Valerius Laevinus consul.',
      testo_principale_pre: '',
      testo_principale_post: '',
      risposta_1: '',
      risposta_2: '',
      risposta_3: '',
      risposta_4: '',
      distrattore_1: '',
      distrattore_2: '',
      distrattore_3: '',
      distrattore_4: '',
      parole_gia_ricostruite: '',
      continua: false,
      focus: true,
      ignora_lessico: false,
      etichetta_1: '',
      etichetta_2: '',
      etichetta_3: '',
      etichetta_4: '',
      etichetta_5: '',
    }, {
      id: 61283,
      titolo: 'Traduci',
      tipo: 'O',
      form: null,
      html: null,
      esercizioId: 79239,
      italiano: false,
      testo_principale: '__TRADUCI_SEMPLICE__',
      testo_principale_pre: '',
      testo_principale_post: '',
      risposta_1: 'contro Pirro fu mandato il console Valerio Levino',
      risposta_2: '',
      risposta_3: '',
      risposta_4: '',
      distrattore_1: '\u00e8 mandarono mand\u00f2 da dal',
      distrattore_2: '',
      distrattore_3: '',
      distrattore_4: '',
      parole_gia_ricostruite: '',
      continua: false,
      focus: false,
      ignora_lessico: false,
      etichetta_1: '',
      etichetta_2: '',
      etichetta_3: '',
      etichetta_4: '',
      etichetta_5: '',
    }],
    id: 2,
  }],
  periodo_id: '2.0',
}];

const mockRisposteFornite = {
  '2.0': {
    1: {
      id: 1,
      corretta: true,
      answer: ['risposta1', 'risposta2'],
      readable: 'readable',
      stato: 'C',
    },
    2: {
      id: 2,
      corretta: true,
      answer: ['risposta1', 'risposta2'],
      readable: 'readable',
      stato: 'C',
    },
  },
};

describe('calcolaStrutturaStep', () => {
  it('restituisce l\'output della funzione', () => {
    expect(calcolaStrutturaStep(mockPeriodiVersione)).toEqual({
      periodiIds: [1, '2.0'],
      stepPerPeriodi: {
        1: [0],
        '2.0': [0, 1, 2],
      },
    });
  });
});

describe('calcolaPeriodiDaEseguire', () => {
  it('restituisce l\'output della funzione', () => {
    expect(calcolaPeriodiDaEseguire(
      mockPeriodiVersione, mockRisposteFornite
    )).toEqual({
      periodiIncompletiPks: [1, '2.0'],
      stepDaEseguire: { 1: [0], '2.0': [0] },
    });
  });

  it('restituisce l\'output della funzione se non specifico i periodi e le risposte', () => {
    expect(calcolaPeriodiDaEseguire()).toEqual({
      periodiIncompletiPks: [],
      stepDaEseguire: {},
    });
  });

  it('restituisce l\'output della funzione se non specifico i valori degli step dei periodi eseguiti', () => {
    expect(calcolaPeriodiDaEseguire(
      mockPeriodiVersione, { '2.0': {} }
    )).toEqual({
      periodiIncompletiPks: [1, '2.0'],
      stepDaEseguire: { 1: [0], '2.0': [0, 1, 2] },
    });
  });

  it('restituisce l\'output della funzione se non specifico i valori di uno step eseguito', () => {
    expect(calcolaPeriodiDaEseguire(
      mockPeriodiVersione, { '2.0': { 1: {} } }
    )).toEqual({
      periodiIncompletiPks: [1, '2.0'],
      stepDaEseguire: { 1: [0], '2.0': [0, 2] },
    });
  });
});

describe('calcolaContenutoPeriodoDaEseguire', () => {
  it('restituisce l\'output della funzione', () => {
    expect(calcolaContenutoPeriodoDaEseguire(
      [0], mockPeriodiVersione[0].periodo
    )).toEqual([mockPeriodiVersione[0].periodo[0]]);
  });
});

describe('calcolaTestoIntroduttivoPeriodi', () => {
  it('restituisce l\'output della funzione', () => {
    expect(calcolaTestoIntroduttivoPeriodi(mockPeriodiVersione)).toEqual([{
      idPeriodo: 1,
      keyPeriodo: 0,
      testoDaTradurre: 'Postquam Galli a Cornelio Dolabella consule pulsi erant, Tarentinis bellum indictum est, quia legatos Romanorum offenderant.',
    }, {
      idPeriodo: '2.0',
      keyPeriodo: 1,
      testoDaTradurre: 'Contra Romanos Tarentini auxilium a Pyrrho, Epiri rege, petiverunt.',
    }]);
  });
});

describe('versionePeriodoToSteps', () => {
  it('restituisce l\'output della funzione', () => {
    expect(versionePeriodoToSteps(
      mockPeriodiVersione[0]
    )).toEqual([{
      esercizi: [mockPeriodiVersione[0].periodo[0].elementi[1]],
      testi: [{
        ...mockPeriodiVersione[0].periodo[0].elementi[0],
        html: undefined,
        testoConsegna: [{
          content: 'Postquam',
          type: 'text',
          id: 'text_0',
        }, {
          content: ' ',
          type: 'text',
          id: 'text_1',
        }, {
          content: 'Galli',
          type: 'text',
          id: 'text_2',
        }],
      }],
      id: 0,
      periodoId: 1,
    }]);
  });
});

describe('calcolaTraduzioneUtentePeriodo', () => {
  it('restituisce l\'output della funzione', () => {
    expect(calcolaTraduzioneUtentePeriodo(
      {
        periodo: versionePeriodoToSteps(mockPeriodiVersione[1]),
      },
      mockRisposteFornite['2.0'],
    )).toEqual('Contro i Romani i Tarentini <span class="corrected">risposta1</span> a Pirro, <span class="corrected">risposta2</span> ,  testo prima <span class="corrected">undefined</span> <span class="corrected">readable</span>');
  });

  it('restituisce l\'output della funzione se non specifico le risposte fornite dall\'utente', () => {
    expect(calcolaTraduzioneUtentePeriodo({
      periodo: versionePeriodoToSteps(mockPeriodiVersione[1]),
    })).toEqual('Contro i Romani i Tarentini <span class="suggested">chiesero aiuto</span> a Pirro, <span class="suggested">re dell\'Epiro</span> ,  testo prima <span class="suggested">prova</span> <span class="suggested">contro Pirro fu mandato il console Valerio Levino</span>');
  });

  it('restituisce l\'output della funzione se non ho step di tipo U e O', () => {
    expect(calcolaTraduzioneUtentePeriodo({
      periodo: versionePeriodoToSteps(mockPeriodiVersione[0]),
    })).toEqual('');
  });
});
