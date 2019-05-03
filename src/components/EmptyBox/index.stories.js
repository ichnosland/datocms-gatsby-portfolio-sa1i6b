import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import EmptyBox from './index';

const nota = `
  Per ora c'è solo la versione con il folder vuoto.\n
  Più avanti inseriremo altre immagini/opzioni e renderemo l'src del'img una props.\n
  Suggerisco anche di rinominare il comp in 'EmptyState', mi pare più esplicito.
`;

storiesOf('EmptyBox', module)
  .addDecorator(withKnobs)
  .add('EmptyBox', withNotes(nota)(() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <EmptyBox
        text={text('text', 'Testo informativo')}
      />
    </ThemeProvider>
  )));

