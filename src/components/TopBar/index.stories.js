import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes } from 'style/theme';
import TopBar from './index';

const themeOptions = {
  alatin: 'alatin',
  argonauta: 'argonauta',
  itaca: 'itaca',
  mytest: 'mytest',
  lyceum: 'lyceum',
};

const nota = `
  Questo componente andrà rifatto, per ora usiamo questa Story solo per poter visualizzare elementi collaterali tipo l'icona Premium, ecc.
`;

storiesOf('TopBar', module)
  .addDecorator(withKnobs)
  .add('TopBar', withNotes(nota)(() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <TopBar
        searchBox
        pinned={boolean('pinned', true)}
        premiumActive={boolean('premiumActive ', true)}
      />
    </ThemeProvider>
  )));
