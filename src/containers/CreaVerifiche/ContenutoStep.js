/*
 *
 * ContenutoStep
 *
 */

import { optionsLabels } from 'common/esercizi';

const ContenutoStep = (step) => (
  `<div>
    <div class="consegna">
      ${step.titolo ? `<span class="consegna__titolo">${step.titolo}</span>` : ''}
      ${step.tipo !== 'G' ? `<div class="consegna__contenuto">${step.consegna}</div>` : ''}
      ${step.tipo === 'G' ? `
      ${step.consegna && `<div class="consegna__contenuto">${step.consegna}</div>`}
      <div class="consegna__blocchi">${step.soluzioni[0].map((soluzione) => (`
        <div class="consegna__blocchi-blocco${soluzione.daAnalizzare ? ' analizza' : ''}">
          <span class="segnaposto">&nbsp;</span>
          <span>${soluzione.parola}</span>
        </div>`)).join('')}
      </div>` : ''}
    </div>
    ${step.opzioni.length > 0 ? `
    <div class="opzioni">
      <div class="opzioni__contenuto">${step.opzioni.map((opzione, opzioneKey) => {
    switch (step.tipo) {
      case 'M':
        return `<div class="opzioni__contenuto-opzione">
            <div class="radiocheck-wrap"><span class="radio"><span class="segnaposto-admin">◯ </span></span><span>${opzione}</span></div>
        </div>`;
      case 'N':
        return `<div class="opzioni__contenuto-opzione">
          <div class="radiocheck-wrap"><span class="checkbox"><span class="segnaposto-admin">▢ </span></span><span>${opzione}</span></div>
        </div>`;
      default:
        return `<div class="opzioni__contenuto-opzione">
          <span>${optionsLabels[opzioneKey]} </span><span>${opzione}</span>
        </div>`;
    }
  }).join('')}</div>
    </div>` : ''}
  </div>`);

export default ContenutoStep;
