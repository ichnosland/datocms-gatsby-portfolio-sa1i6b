import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, color, text } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import Paragraph, { LegalInfo, Separator, SeparatorText } from './index';
import NewSeparator from './Separator';

storiesOf('Paragraph', module)
  .addDecorator(withKnobs)
  .addWithJSX('Paragraph', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <Paragraph
          fontSize={text('fontSize ')}
          color={color('color ')}
          align={text('align ', 'left')}
          transform={text('transform')}
          padding={text('padding')}
          margin={text('margin')}
          border={text('border')}
          bgColor={color('bgColor ')}
          userSelect={text('userSelect')}
          noPrint={boolean('noPrint', false)}
        >
          Ciao, io sonon un paragrafo :)
        </Paragraph>
      </div>
    </ThemeProvider>
  ))
  .addWithJSX('LegalInfo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <LegalInfo>
        Testo per le piccole informazioni in calce (tipo login, ecc), eredita tutte le props di Paragraph.
      </LegalInfo>
    </ThemeProvider>
  ))
  .addWithJSX('Separator', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Separator
        inverse={boolean('inverse', false)}
        noPrint={boolean('noPrint', false)}
      >
        <SeparatorText
          color={color('color ')}
          bgcolor={color('bgcolor ')}
        >
          Separatore
        </SeparatorText>
      </Separator>
    </ThemeProvider>
  ))
  .addWithJSX('NewSeparator', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <NewSeparator
        text={text('text ', 'O')}
        color={color('color ')}
      />
    </ThemeProvider>
  ));
