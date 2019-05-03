import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import Elemento from './index';
import { Inseriti } from './Inseriti';

const dragColors = [
  'uno',
  'due',
  'tre',
  'quattro',
  'cinque',
];

const nota = `
  La props 'disabled' si limita a togliere il pointer-events.\n
  Il componente sembra un blocco ma in realtà è un FlexBox. È probabile che in futuro diventi inline-flexbox.
`;

storiesOf('Elemento', module)
  .addDecorator(withKnobs)
  .add('Elemento', withNotes(nota)(() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Elemento
        dragColor={select('dragColor', dragColors, 'uno')}
        drag={boolean('drag', false)}
        dragDisabled={boolean('dragDisabled', false)}
        label={text('label', 'Testo elemento')}
        dragLabel={text('dragLabel', 'Testo etichetta')}
        inattivo={boolean('inattivo', false)}
        trovato={boolean('trovato', false)}
        giusto={boolean('giusto', false)}
        sbagliato={boolean('sbagliato', false)}
        inserito={boolean('inserito', false)}
        disabled={boolean('disabled', false)}
      />
    </ThemeProvider>
  )))
  .add('Elemento Inserito', () => (
    <Inseriti
      giusto={boolean('giusto', false)}
      sbagliato={boolean('sbagliato', false)}
    >
      <Elemento
        inserito
        label="elemento inserito"
      />
    </Inseriti>
  ));
