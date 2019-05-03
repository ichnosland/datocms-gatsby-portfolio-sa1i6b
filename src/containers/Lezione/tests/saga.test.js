import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import {
  lezioneSpinnerSet,
  lezioneErrorReset,
  lezioneErrorSet,
  lezioneDataSet,
} from '../actions';
import { LEZIONE_DATA_FETCH, LEZIONE_URI_DATA_FETCH } from '../constants';
import { sagaFetchLezione, lezioneWatch } from '../saga';


/* eslint-disable redux-saga/yield-effects */
describe('sagaFetchLezione saga', () => {
  const fetchTestoCall = call(
    axios.get,
    `${API_BASE_PATH}${LEZIONE_URI_DATA_FETCH}123`
  );
  const mockResponseData = {
    titolo: 'Indicativo presente e infinito attivo e passivo 1ª coniugazione',
    unita: 333,
    html: {
      tabelle: {
        0: [{
          righe: [{
            valore: 'laudari',
            label: 'presente',
          }],
          titolo: 'Infinito passivo',
        }, {
          righe: [{ valore: 'laudare', label: 'presente' }],
          titolo: 'Infinito attivo',
        }],
        1: [{
          righe: [
            { valore: '-o', label: '1<sup>a</sup> sing.' },
            { valore: '-s', label: '2<sup>a</sup> sing.' },
            { valore: '-t', label: '3<sup>a</sup> sing.' },
            { valore: '-mus', label: '1<sup>a</sup> plur.' },
            { valore: '-tis', label: '2<sup>a</sup> plur.' },
            { valore: '-nt', label: '3<sup>a</sup> plur.' },
          ],
          titolo: 'Indicativo presente attivo',
        }, {
          righe: [
            { valore: '-r', label: '1<sup>a</sup> sing.' },
            { valore: '-ris, -re', label: '2<sup>a</sup> sing.' },
            { valore: '-tur', label: '3<sup>a</sup> sing.' },
            { valore: '-mur', label: '1<sup>a</sup> plur.' },
            { valore: '-mini', label: '2<sup>a</sup> plur.' },
            { valore: '-ntur', label: '3<sup>a</sup> plur.' },
          ],
          titolo: 'Indicativo presente passivo',
        }],
      },
      testo:
        `<p>I verbi latini della 1&ordf; coniugazione sono caratterizzati dalla&nbsp;
        <span class='tip-tag'>vocale tematica&nbsp;-<em>ā</em></span>.
        <div carousel lista='{{ lezione.html.tabelle[0].length }}'>
          <div class='carousel'>
            <div ng-show='$index == on' table='table' class='lesson-table-wrap slide' ng-repeat='table in lezione.html.tabelle[0]'>{{ table }}</div>
          </div>
        </div>
        <div carousel lista='{{ lezione.html.tabelle[1].length }}'>
        <div class='carousel'>
          <div ng-show='$index == on' table='table' class='lesson-table-wrap slide' ng-repeat='table in lezione.html.tabelle[1]'>{{ table }}</div>
        </div>
      </div>
        </p>`,
    },
    pubblicata: true,
  };

  it('testa il corretto funzionamento quando il fetch dei dati ha successo e il contenuto è pubblicato', () => {
    const gen = sagaFetchLezione({ idLezione: 123 });

    expect(gen.next().value).toEqual(put(
      lezioneSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      lezioneErrorReset()
    ));

    expect(gen.next().value).toEqual(fetchTestoCall);

    expect(gen.next({ data: mockResponseData }).value).toEqual(put(
      lezioneDataSet({
        unitaId: 333,
        contenuto: [{
          content: `<p>I verbi latini della 1ª coniugazione sono caratterizzati dalla&nbsp;
        <span class="tip-tag">vocale tematica&nbsp;-<em>ā</em></span>.
        </p>`,
          key: 'html_0',
          type: 'html',
        },
        {
          carosello: 0,
          key: 'carosello_0_1',
          type: 'carosello',
        },
        {
          content: `
        `,
          type: 'text',
        },
        {
          carosello: 1,
          key: 'carosello_1_3',
          type: 'carosello',
        },
        {
          content: `
        `,
          type: 'text',
        },
        {
          content: '<p></p>',
          key: 'html_5',
          type: 'html',
        }],
        pubblicata: true,
        tabelle: mockResponseData.html.tabelle,
        titolo: mockResponseData.titolo,
      })
    ));

    expect(gen.next().value).toEqual(put(
      lezioneSpinnerSet(false)
    ));
  });

  it('testa il corretto funzionamento quando il fetch dei dati ha successo e il contenuto NON è pubblicato', () => {
    const gen = sagaFetchLezione({ idLezione: 123 });

    gen.next();
    gen.next();
    gen.next();

    expect(gen.next({ data: { ...mockResponseData, pubblicata: false } }).value).toEqual(put(
      lezioneErrorSet(
        true,
        'Per questa unità non è prevista una scheda specifica'
      )
    ));

    expect(gen.next().value).toEqual(put(
      lezioneSpinnerSet(false)
    ));
  });

  it('testa il corretto funzionamento quando il fetch dei dati dà errore', () => {
    const gen = sagaFetchLezione({ idLezione: 123 });

    expect(gen.next().value).toEqual(put(
      lezioneSpinnerSet(true)
    ));

    expect(gen.next().value).toEqual(put(
      lezioneErrorReset()
    ));

    expect(gen.next().value).toEqual(fetchTestoCall);

    expect(gen.next().value).toEqual(put(
      lezioneErrorSet(
        true,
        'Impossibile leggere la lezione associata a questa unità'
      )
    ));

    expect(gen.next().value).toEqual(put(
      lezioneSpinnerSet(false)
    ));
  });
});

describe('lezioneWatch saga', () => {
  it('must call lezioneWatch functions', () => {
    const gen = lezioneWatch();

    expect(gen.next().value).toEqual(takeEvery(
      LEZIONE_DATA_FETCH,
      sagaFetchLezione,
    ));
  });
});
