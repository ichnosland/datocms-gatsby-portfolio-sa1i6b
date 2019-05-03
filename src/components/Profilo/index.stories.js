import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, number, array } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import Profilo from './index';

const label = 'Allegati';
const defaultValue = [{ titolo: 'Allegato' }];
const allegati = array(label, defaultValue);
const history = createBrowserHistory();

storiesOf('Profilo', module)
  .addDecorator(withKnobs)
  .add('Profilo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Router history={history}>
        <Profilo
          toggleSuoniFx={() => {}}
          logoutFunction={() => {}}
          docente={boolean('docente', true)}
          whatsapp={boolean('whatsapp', false)}
          sound={boolean('Sound active', true)}
          premiumActive={boolean('premiumActive', false)}
          nome={text('nome', 'Nome Cognome')}
          email={text('email', 'email@acme.com')}
          scadenza={text('scadenza', '10/01/2021')}
          punti={number('punti', 134)}
          downloadDisponibili={allegati}
        />
      </Router>
    </ThemeProvider>
  ));
