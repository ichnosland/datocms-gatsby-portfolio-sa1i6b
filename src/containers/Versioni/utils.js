import {
  createStepFromEsercizi,
  calcolaSoluzioni,
  cleanTesto,
} from 'common/esercizi';

/**
 * Dato in input l'array con i periodi della versione, restituisce
 * un oggetto contenente gli ID dei singoli periodi e un oggetto in cui,
 * per ogni id di ogni periodo, l'array con gli step associati
 *
 * @param {array} periodi della versione
 * @returns {object} oggetto con chiave periodiIds e stepPerPeriodi
 * dove periodiIds è un array contenente le chiavi dei periodi incompleti
 * e stepPerPeriodi è un oggetto con chiave la pk del periodo e come
 * valore l'array delle pk degli step ancora da eseguire
 * {
 *  periodiIds: [pk1, pk2, pk3]
 *  stepPerPeriodi: {
 *    [pkPeriodo1]: [pkStep1, pkStep2, pkStep3]
 *    [pkPeriodo2]: [pkStep1, pkStep2, pkStep3]
 *  }
 * }
 */
export const calcolaStrutturaStep = (periodi) => (
  periodi.reduce((acc, singoloPeriodo) => {
    acc.periodiIds.push(singoloPeriodo.periodo_id);
    acc.stepPerPeriodi[singoloPeriodo.periodo_id] = singoloPeriodo.periodo.map(
      (step) => (step.id)
    );
    return acc;
  }, { periodiIds: [], stepPerPeriodi: {} })
);

/**
 * Dati in input l'array dei periodi e la matrice di esecuzione
 * con le risposte fornite dall'utente, calcola quali sono i
 * periodi e gli step ancora da risolvere.
 *
 * @param {array} periodi della versione
 * @param {object} matriceEsecuzione risposte fornite dall'utente
 * @returns {object} oggetto con chiave periodiIncompletiPks e stepPerPeriodi
 * dove periodiIncompletiPks è un array contenente le chiavi dei periodi incompleti
 * e stepPerPeriodi è un oggetto con chiave la pk del periodo e come
 * valore l'array delle pk degli step ancora da eseguire
 * {
 *  periodiIncompletiPks: [pk1, pk2, pk3]
 *  stepDaEseguire: {
 *    [pkPeriodo1]: [pkStep1, pkStep2, pkStep3]
 *    [pkPeriodo2]: [pkStep1, pkStep2, pkStep3]
 *  }
 * }
 */
export const calcolaPeriodiDaEseguire = (periodi = [], risposteFornite = {}) => {
  const strutturaStep = calcolaStrutturaStep(periodi);
  return strutturaStep.periodiIds.reduce((acc, periodoId) => {
    strutturaStep.stepPerPeriodi[periodoId].forEach((stepId) => {
      if (!risposteFornite[periodoId] || !risposteFornite[periodoId][stepId]) {
        acc.periodiIncompletiPks = [...new Set([...acc.periodiIncompletiPks, periodoId])];
        if (!acc.stepDaEseguire[periodoId]) {
          acc.stepDaEseguire[periodoId] = [];
        }
        acc.stepDaEseguire[periodoId] = [...new Set([...acc.stepDaEseguire[periodoId], stepId])];
      }
    });
    return acc;
  }, { periodiIncompletiPks: [], stepDaEseguire: {} });
};

/**
 * Dati in input l'elenco delle pk degli step da tenere e l'elenco degli step
 * che compongono un periodo, restituisce l'array con gli step da eseguire
 *
 * @param {array} pksStepDaEseguire elenco delle pk degli step da eseguire
 * @param {array} stepsPeriodo elenco degli step presenti nel periodo
 */
export const calcolaContenutoPeriodoDaEseguire = (pksStepDaEseguire, stepsPeriodo) => (
  stepsPeriodo.filter((step) => (pksStepDaEseguire.indexOf(step.id) > -1))
);

/**
 * Dato in input un array con i periodi, ricava il testo
 * da tradurre della versione usando come testo buono da mostrare
 * per ogni periodo, il campo 'testo_principale' del primo elemento
 * del primo step. Questo per richiesta della redazione.
 *
 * @param {array} periodi periodi della versione
 */
export const calcolaTestoIntroduttivoPeriodi = (periodi) => (
  periodi.map((periodo, key) => ({
    testoDaTradurre: cleanTesto(
      periodo.periodo[0].elementi[0].testo_principale,
      'leavepunct'
    ).replace(/_/g, ' '),
    idPeriodo: periodo.periodo_id,
    keyPeriodo: key,
  }))
);

/**
 * Prende in input l'array degli step di un singolo periodo della
 * versione e lo trasforma in un array di periodi in cui gli esercizi
 * vengono esaminati e suddivisi in elementi di testo / esercizi
 * Questo perché in un esercizio posso avere, almeno in via teorica
 * più elementi di testo, e se presumo che la tipologia sia portata
 * sempre dall'elemento con chiave [1], potrei avere errori nell'analisi
 * dei dati
 * Questo mi serve anche per unificare la struttura dei singoli
 * esercizi da dare in pasto all'esecuzione
 *
 * @param {array} arrayStepDaConvertire elenco degli step da convertire
 */
export const versionePeriodoToSteps = (arrayStepDaConvertire) => (
  arrayStepDaConvertire.periodo.map((singoloPeriodo) => ({
    periodoId: arrayStepDaConvertire.periodo_id,
    id: singoloPeriodo.id,
    ...createStepFromEsercizi(singoloPeriodo.elementi)[0],
  }))
);

/**
 * Calcola il testo della traduzione fornita dall'utente. Per convenzione
 * assemblo la traduzione fornite alle risposte di tipo O e di tipo U.
 * Per accordo con la redazione uso solo il tipo O e il tipo U.
 * Se l'utente ha fornito a quella domanda una risposta sbagliata, utilizzo
 * il testo di default
 *
 * Per convenzione decisa con la redazione uso le domande di tipo U o O per
 * riassemblare il testo tradotto dall'utente
 *
 * @param {object} contenutoPeriodo contiene l'oggetto con i dati del periodo da analizzare
 * @param {object} contenutoPeriodo.periodo contiene l'array dei singoli step del periodo
 * @param {object} rispostaUtente oggetto contenente le risposte dell'utente
 * @returns {string} HTML con traduzione fornita dallo studente
 */
export const calcolaTraduzioneUtentePeriodo = (contenutoPeriodo, rispostaUtente = {}) => (
  contenutoPeriodo.periodo.filter((singoloStep) => (
    ['U', 'O'].indexOf(singoloStep.esercizi[0].tipo) > -1
  )).reduce((acc, singoloStep) => {
    const soluzioneStep = calcolaSoluzioni(singoloStep.testi, singoloStep.esercizi, 1)[0];

    switch (singoloStep.esercizi[0].tipo) {
      case 'U':
        singoloStep.esercizi.forEach((esercizio, key) => {
          if (esercizio.testo_principale_pre) {
            acc.push(esercizio.testo_principale_pre);
          }

          if ((rispostaUtente[singoloStep.id] || {}).stato === 'C') {
            acc.push(`<span class="corrected">${rispostaUtente[singoloStep.id].answer[key]}</span>`);
          } else {
            acc.push(`<span class="suggested">${soluzioneStep[key][0]}</span>`);
          }

          if (esercizio.testo_principale_post) {
            acc.push(esercizio.testo_principale_post);
          }
        });
        break;
      case 'O':
        if ((rispostaUtente[singoloStep.id] || {}).stato === 'C') {
          acc.push(`<span class="corrected">${rispostaUtente[singoloStep.id].readable}</span>`);
        } else {
          acc.push(`<span class="suggested">${soluzioneStep}</span>`);
        }
        break;
      /* istanbul ignore next */
      default: break;
    }
    return acc;
  }, []).join(' '));
