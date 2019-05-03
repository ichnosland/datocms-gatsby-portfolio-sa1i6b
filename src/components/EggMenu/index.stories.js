import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import { ModalOverlay } from 'components/Modal';
import EggMenu from './index';

const nota = `
  Questa storia andrà sviluppata ulteriormente.\n
  Per ora non so come gestire in storybook il popolamento dinamico del menu.
`;

const history = createBrowserHistory();

storiesOf('EggMenu', module)
  .addDecorator(withKnobs)
  .add('EggMenu', withNotes(nota)(() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Router history={history}>
        <ModalOverlay show>
          <EggMenu
            product={select('product', themeOptions, 'alatin')}
            onClick={action('toggleEggMenu')}
            active={boolean('active', false)}
            vociMenu={[{
              url: '#',
              titolo: 'Voce 1',
              icona: 'roundFeedback',
              fill: '#000',
            }, {
              url: '#',
              titolo: 'Voce 2',
              icona: 'starCircle',
              fill: 'red',
            }, {
              url: '#',
              titolo: 'Voce 3',
              icona: 'info',
              fill: 'green',
            }, {
              url: '#',
              titolo: 'Voce 4',
              icona: 'classi',
              fill: 'blue',
            }, {
              url: '#',
              titolo: 'Voce 5',
              icona: 'profile',
              fill: 'blue',
            }]}
          />
        </ModalOverlay>
      </Router>
    </ThemeProvider>
  )));
