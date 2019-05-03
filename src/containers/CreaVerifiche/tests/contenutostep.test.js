/*
 *
 * ContenutoStep test
 *
 */

import ContenutoStep from '../ContenutoStep';

const mockStep = {
  opzioni: [
    'opzione 1',
    'opzione 2',
    'opzione 3',
  ],
  consegna: 'Testo della consegna',
  tipo: 'M',
  titolo: 'Titolo dello step',
  keyStep: '100_1001.1002',
};
const regex = /(\r?\n|\r|\\|\s{2,})/gm;

describe('<ContenutoStep />', () => {
  it('should render its content when options.length > 0 and tipo = M', () => {
    const contenutoStep = ContenutoStep(mockStep);

    expect(contenutoStep.replace(regex, '')).toBe(`<div>
      <div class="consegna">
        <span class="consegna__titolo">${mockStep.titolo}</span>
        <div class="consegna__contenuto">${mockStep.consegna}</div>
      </div>
      <div class="opzioni">
        <div class="opzioni__contenuto">
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="radio"><span class="segnaposto-admin">◯ </span></span><span>${mockStep.opzioni[0]}</span></div></div>
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="radio"><span class="segnaposto-admin">◯ </span></span><span>${mockStep.opzioni[1]}</span></div></div>
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="radio"><span class="segnaposto-admin">◯ </span></span><span>${mockStep.opzioni[2]}</span></div></div>
        </div>
      </div>
    </div>`.replace(regex, ''));
  });

  it('should render its content when options.length > 0 and tipo = N', () => {
    const contenutoStep = ContenutoStep({ ...mockStep, tipo: 'N' });

    expect(contenutoStep.replace(regex, '')).toBe(`<div>
      <div class="consegna">
        <span class="consegna__titolo">${mockStep.titolo}</span>
        <div class="consegna__contenuto">${mockStep.consegna}</div>
      </div>
      <div class="opzioni">
        <div class="opzioni__contenuto">
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="checkbox"><span class="segnaposto-admin">▢ </span></span><span>${mockStep.opzioni[0]}</span></div></div>
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="checkbox"><span class="segnaposto-admin">▢ </span></span><span>${mockStep.opzioni[1]}</span></div></div>
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="checkbox"><span class="segnaposto-admin">▢ </span></span><span>${mockStep.opzioni[2]}</span></div></div>
        </div>
      </div>
    </div>`.replace(regex, ''));
  });

  it('should not render its title when empty', () => {
    const contenutoStep = ContenutoStep({ ...mockStep, titolo: undefined });

    expect(contenutoStep.replace(regex, '')).toBe(`<div>
      <div class="consegna">
        <div class="consegna__contenuto">${mockStep.consegna}</div>
      </div>
      <div class="opzioni">
        <div class="opzioni__contenuto">
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="radio"><span class="segnaposto-admin">◯ </span></span><span>${mockStep.opzioni[0]}</span></div></div>
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="radio"><span class="segnaposto-admin">◯ </span></span><span>${mockStep.opzioni[1]}</span></div></div>
          <div class="opzioni__contenuto-opzione"><div class="radiocheck-wrap"><span class="radio"><span class="segnaposto-admin">◯ </span></span><span>${mockStep.opzioni[2]}</span></div></div>
        </div>
      </div>
    </div>`.replace(regex, ''));
  });

  it('should render its content when options.length > 0 and tipo = G', () => {
    const contenutoStep = ContenutoStep({
      ...mockStep,
      tipo: 'G',
      soluzioni: [[{
        parola: 'parola 1',
        daAnalizzare: true,
      }, {
        parola: 'parola 1',
        daAnalizzare: false,
      }]],
    });

    expect(contenutoStep.replace(regex, '')).toBe(`<div>
      <div class="consegna">
        <span class="consegna__titolo">${mockStep.titolo}</span>
        <div class="consegna__contenuto">${mockStep.consegna}</div>
        <div class="consegna__blocchi">
          <div class="consegna__blocchi-blocco analizza">
            <span class="segnaposto">&nbsp;</span>
            <span>parola 1</span>
          </div>
          <div class="consegna__blocchi-blocco">
            <span class="segnaposto">&nbsp;</span>
            <span>parola 1</span>
          </div>
        </div>
      </div>
      <div class="opzioni">
        <div class="opzioni__contenuto">
          <div class="opzioni__contenuto-opzione"><span>A) </span><span>${mockStep.opzioni[0]}</span></div>
          <div class="opzioni__contenuto-opzione"><span>B) </span><span>${mockStep.opzioni[1]}</span></div>
          <div class="opzioni__contenuto-opzione"><span>C) </span><span>${mockStep.opzioni[2]}</span></div>
        </div>
      </div>
    </div>`.replace(regex, ''));
  });

  it('should render its content when options.length > 0 and tipo default', () => {
    const contenutoStep = ContenutoStep({ ...mockStep, tipo: 'I' });
    expect(contenutoStep.replace(regex, '')).toBe(`<div>
      <div class="consegna">
        <span class="consegna__titolo">${mockStep.titolo}</span>
        <div class="consegna__contenuto">${mockStep.consegna}</div>
      </div>
      <div class="opzioni">
        <div class="opzioni__contenuto">
          <div class="opzioni__contenuto-opzione"><span>A) </span><span>${mockStep.opzioni[0]}</span></div>
          <div class="opzioni__contenuto-opzione"><span>B) </span><span>${mockStep.opzioni[1]}</span></div>
          <div class="opzioni__contenuto-opzione"><span>C) </span><span>${mockStep.opzioni[2]}</span></div>
        </div>
      </div>
    </div>`.replace(regex, ''));
  });

  it('should render its content when options.length === 0', () => {
    const contenutoStep = ContenutoStep({ ...mockStep, opzioni: [] });

    expect(contenutoStep.replace(regex, '')).toEqual(`<div>
      <div class="consegna">
        <span class="consegna__titolo">${mockStep.titolo}</span>
        <div class="consegna__contenuto">${mockStep.consegna}</div>
      </div>
    </div>`.replace(regex, ''));
  });
});
