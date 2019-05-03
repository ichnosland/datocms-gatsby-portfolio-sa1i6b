import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, color } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import BreadCrumb, { Crumb } from './index';

storiesOf('BreadCrumb', module)
  .addDecorator(withKnobs)
  .addWithJSX('BreadCrumb singolo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <BreadCrumb
        padding={text('padding', '')}
        bgcolor={color('bgcolor', '')}
        color={color('color', '')}
        radius={text('radius', '')}
      >
        <Crumb>Singolo</Crumb>
      </BreadCrumb>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('BreadCrumb doppio', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <BreadCrumb
        padding={text('padding', '')}
        bgcolor={color('bgcolor', '')}
        color={color('color', '')}
        radius={text('radius', '')}
      >
        <Crumb>Primo</Crumb>
        <Crumb>Secondo</Crumb>
      </BreadCrumb>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('BreadCrumb triplo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <BreadCrumb
        padding={text('padding', '')}
        bgcolor={color('bgcolor', '')}
        color={color('color', '')}
        radius={text('radius', '')}
      >
        <Crumb>Primo</Crumb>
        <Crumb>Secondo</Crumb>
        <Crumb>Terzo</Crumb>
      </BreadCrumb>
    </ThemeProvider>
  ), {
    skip: 1,
  });
