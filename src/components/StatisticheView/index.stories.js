import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes } from 'style/theme';
import { StatisticheView } from './index';

const themeOptions = {
  alatin: 'alatin',
  argonauta: 'argonauta',
  itaca: 'itaca',
  mytest: 'lyceum',
};

const mockProps = {
  isDocente: true,
  apriChiudiSezioniFx: () => { },
  selezionaUtenteFx: () => { },
  traduzione: 'traduzione',
  studentiVersione: [{
    id: 1111,
    key: 0,
    first_name: 'Sofia',
    last_name: 'Formica',
    voto: 8.75,
  }, {
    id: 335406,
    key: 0,
    first_name: 'Elisa',
    last_name: 'Passerotto',
    voto: 2,
  }, {
    id: 777,
    key: -1,
    first_name: 'Franco',
    last_name: 'Coccodrillo',
  }],
  openedSections: {},
  grafici: [{
    id: 1,
    media: 5.6,
    media_nazionale: 4.4,
    media_nazionale_campioni: 11,
    titolo: 'Titolo versione 1',
    scores: [{
      voto: 8.75,
      id: 1111,
    }, {
      voto: 8.75,
      id: 335380,
    }],
  }, {
    id: 2,
    media: 5.8,
    media_nazionale: 6.4,
    media_nazionale_campioni: 2,
    titolo: 'Titolo versione 2',
    scores: [{
      voto: 8.75,
      id: 1111,
    }, {
      voto: 2.75,
      id: 335380,
    }, {
      voto: 6.0625,
      id: 6666,
    }],
  }],
  utenteSelezionato: undefined,
  esercizi: {
    '1.0-1': {
      titolo: 'titolo esercizio',
      consegna: 'Consegna dell\'esercizio',
      soluzioneTestuale: 'Soluzione testuale <strong>con html</strong>',
    },
  },
  stepPks: ['1.0-1'],
  scores: [
    8.75,
    2.75,
  ],
  media: {
    '1.0-1': {
      risposte: [{
        corretta: false,
        studenti: [{
          id: 1111,
          nome: 'Sofia Formica',
        }],
        readable: 'readable risposta 1',
      }, {
        corretta: false,
        studenti: [{
          id: 335406,
          nome: 'Elisa Passerotto',
        }],
        readable: 'readable risposta 2',
      }],
      media: 0.8,
    },
  },
};

storiesOf('StatisticheView', module)
  .addDecorator(withKnobs)
  .addWithJSX('StatisticheView', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <StatisticheView
        {...{
          ...mockProps,
          isDocente: boolean('isDocente ', true),
          utenteSelezionato: {
            key: number('key utente selezionato (default 0)', 0),
            id: number('id utente selezionato (default 1111)', 1111),
          },
          openedSections: {
            traduzione: {
              blocco: boolean('Apri traduzione', true),
            },
            '1.0-1': {
              blocco: boolean('Apri testo primo esercizio', true),
              risposte: boolean('Apri risposte primo esercizio', true),
              studenti: {
                0: boolean('Apri primo blocco studenti', true),
                1: boolean('Apri secondo blocco studenti', true),
              },
            },
          },
        }}
        onPurgeVersione={() => { }}
      />
    </ThemeProvider>
  ), { skip: 1 });
