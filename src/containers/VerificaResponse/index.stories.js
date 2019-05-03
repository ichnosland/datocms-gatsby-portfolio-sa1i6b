import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import { VerificaResponseView } from './index';

storiesOf('VerificaResponseView', module)
  .addDecorator(withKnobs)
  .addWithJSX('VerificaResponseView', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <VerificaResponseView
        history={{ push: () => { } }}
        configuration={{
          homePage: '',
          product: 'alatin',
        }}
        verificaCaricata={{
          titolo: text('titolo', 'titolo'),
          consegnata: true,
          isLoaded: true,
          voto: number('voto', 7),
          backUrl: '/',
        }}
        onResetVerifica={() => { }}
      />
    </ThemeProvider>
  ), {
    skip: 1,
  });
