import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import { Button } from 'components/Button';
import { CountBadge, CountBadgeItem } from './index';

storiesOf('CountBadge', module)
  .addDecorator(withKnobs)
  .addWithJSX('CountBadge singolo children', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <CountBadge
        radius={text('radius', null)}
      >
        <CountBadgeItem>
          {text('numero singolo', '1')}
        </CountBadgeItem>
      </CountBadge>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('CountBadge doppio', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <CountBadge>
        <CountBadgeItem actioncolor="escape">1</CountBadgeItem>
        <CountBadgeItem actioncolor="okay">10</CountBadgeItem>
      </CountBadge>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('CountBadge triplo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <CountBadge>
        <CountBadgeItem>1</CountBadgeItem>
        <CountBadgeItem>3</CountBadgeItem>
        <CountBadgeItem>6</CountBadgeItem>
      </CountBadge>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('CountBadge Inserito', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Button admin>
        <span>Button</span>
        <CountBadge
          top={text('top', '-9px')}
          left={text('left', '6px')}
          right={text('right', '0')}
        >
          <CountBadgeItem>9</CountBadgeItem>
        </CountBadge>
      </Button>
    </ThemeProvider>
  ), {
    skip: 1,
  });
