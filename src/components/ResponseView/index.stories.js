import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import { ResponseView } from './index';
import goodBg from './images/good.gif';
import badBg from './images/bad.gif';

storiesOf('ResponseView', module)
  .addDecorator(withKnobs)
  .addWithJSX('ResponseView', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ResponseView
        votoApprossimato={number('votoApprossimato', 7)}
        goodSrc={goodBg}
        badSrc={badBg}
        steps={boolean('steps', false)}
        lezioniCompletate={number('lezioniCompletate', 2)}
        lezioniTotali={number('lezioniTotali', 7)}
        resetFunction={() => { }}
        product="alatin"
      />
    </ThemeProvider>
  ), {
    skip: 1,
  });
