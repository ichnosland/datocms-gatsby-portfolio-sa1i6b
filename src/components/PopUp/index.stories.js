import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, color } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import scrivi from 'images/infocard-icn_scrivi.png';
import gruppi from 'images/infocard-icn_gruppi.png';
import premium from 'images/infocard-icn_premium.png';
import blocchi from 'images/infocard-icn_blocchi.png';
import correzione from 'images/infocard-icn_correzione.png';
import checkmark from 'images/infocard-icn_checkmark.png';
import hourglass from 'images/infocard-icn_hourglass.png';
import surveydocenti from 'images/infocard-icn_survey-docenti.png';
import surveydownload from 'images/infocard-icn_survey-download.png';
import survey from 'images/infocard-icn_survey.png';
import { allThemes, themeOptions } from 'style/theme';
import PopUp from './index';

const imageList = {
  scrivi: {
    src: scrivi,
    width: '180px',
    height: '130px',
    alt: '',
  },
  gruppi: {
    src: gruppi,
    width: '180px',
    height: '130px',
    alt: '',
  },
  premium: {
    src: premium,
    width: '180px',
    height: '130px',
    alt: '',
  },
  blocchi: {
    src: blocchi,
    width: '180px',
    height: '130px',
    alt: '',
  },
  correzione: {
    src: correzione,
    width: '180px',
    height: '130px',
    alt: '',
  },
  checkmark: {
    src: checkmark,
    width: '180px',
    height: '130px',
    alt: '',
  },
  hourglass: {
    src: hourglass,
    width: '180px',
    height: '130px',
    alt: '',
  },
  surveydocenti: {
    src: surveydocenti,
    width: '180px',
    height: '130px',
    alt: '',
  },
  surveydownload: {
    src: surveydownload,
    width: '180px',
    height: '130px',
    alt: '',
  },
  survey: {
    src: survey,
    width: '180px',
    height: '130px',
    alt: '',
  },
};

storiesOf('PopUp', module)
  .addDecorator(withKnobs)
  .addWithJSX('PopUp', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <PopUp
          show={boolean('show', true)}
          bgcolor={color('bgcolor')}
          titolo={text('Titolo', 'Titolo del PopUp')}
          contenuto={text('contenuto', 'Stai assegnando una nuova verifica')}
          acceptButton={boolean('acceptButton', true)}
          closeButton={boolean('closeButton', true)}
        />
      </div>
    </ThemeProvider>
  ), {
    skip: 2,
  })
  .addWithJSX('PopUp w/ image', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <PopUp
          show
          image={imageList[select('image', Object.keys(imageList), 'scrivi')]}
          titolo="Titolo"
          contenuto={text('contenuto', 'Stai assegnando una nuova verifica')}
          closeButton={{ text: text('testo bottone', 'Ok') }}
        />
      </div>
    </ThemeProvider>
  ), {
    skip: 2,
  })
  .addWithJSX('PopUp w/ html', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <PopUp
          show
          titolo="Html con css"
          contenuto={`
            <p>Questo è un paragrafo senza stili particolari applicati. Tanto per gradire</p>
            <p>Questo è un altro, per rendersi conto.</p>
            <ul>
              <li>questa una UL</li>
              <li>con qualche voce</li>
              <li>per testare</li>
            </ul>
            <ul class="fake-table">
              <li>questa una UL con classe 'fake-table'</li>
              <li>con qualche voce</li>
              <li>per testare</li>
            </ul>
          `}
          closeButton={{ text: text('testo bottone', 'Ok') }}
        />
      </div>
    </ThemeProvider>
  ), {
    skip: 2,
  });
