import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import TabelleList from './index';

const tabelle = {
  tabelle: [{
    intestazione: 'intestazione tabella uno',
    righe: [
      [{
        titolo: 'titolo riga 1 colonna 1',
      }, {
        titolo: 'titolo riga 1 colonna 2',
      }],
      [{
        titolo: 'titolo riga 2 colonna 1',
      }, {
        titolo: 'titolo riga 2 colonna 2',
      }],
    ],
  }, {
    intestazione: 'intestazione tabella due',
    righe: [
      [{
        titolo: 'titolo riga 1 colonna 1',
      }, {
        titolo: 'titolo riga 1 colonna 2',
      }],
    ],
  }],
};

storiesOf('TabelleList', module)
  .addDecorator(withKnobs)
  .add('TabelleList', (() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <TabelleList
        {...tabelle}
        margin={text('margin', '0 0 16px')}
        radius={text('radius', '6px')}
      />
    </ThemeProvider>
  )));
