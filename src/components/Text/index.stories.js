import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import {
  BrandTxt,
  Lessico,
  Contesto,
} from './index';

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .addWithJSX('Text', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <p>Questo è <BrandTxt>BrandTxt</BrandTxt>.</p>
        <p>Questo è <Lessico>Lessico</Lessico>.</p>
        <p>Questo è <Contesto>Contesto</Contesto> che può avere a sua volta la props <Contesto lessico={boolean('lessico', true)}>lessico</Contesto> per la sottolineatura.</p>
      </div>
    </ThemeProvider>
  ));
