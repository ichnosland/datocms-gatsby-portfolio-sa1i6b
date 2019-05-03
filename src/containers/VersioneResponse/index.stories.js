import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import { VersioneResponseView } from './index';

storiesOf('VersioneResponseView', module)
  .addDecorator(withKnobs)
  .addWithJSX('VersioneResponseView', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <VersioneResponseView
        history={{ push: () => { } }}
        configuration={{
          homePage: '',
          product: 'alatin',
        }}
        versioneCaricata={{
          titolo: text('titolo', 'titolo'),
          isConsegnata: true,
        }}
        versioneAvanzamento={{
          votoFinale: number('votoFinale', 7),
        }}
        onPurgeVersione={() => { }}
      />
    </ThemeProvider>
  ), {
    skip: 1,
  });
