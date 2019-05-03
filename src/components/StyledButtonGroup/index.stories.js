import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import { Button, ActionButton } from 'components/Button';
import StyledButtonGroup, { MiniButtonGroup, ExpandButtonGroup } from './index';

storiesOf('StyledButtonGroup', module)
  .addDecorator(withKnobs)
  .addWithJSX('SBG singolo children', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <StyledButtonGroup
        radius={number('radius', 0) ? `${number('radius', 0)}px` : 0}
      >
        <ActionButton>Singolo</ActionButton>
      </StyledButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('SBG doppio', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <StyledButtonGroup
        radius={text('radius', '0') ? `${text('radius', '0')}px` : '0'}
        bottomSpace={text('bottomSpace', '0') ? `${text('bottomSpace', '0')}px` : '0'}
      >
        <ActionButton>Primo</ActionButton>
        <ActionButton>Secondo</ActionButton>
      </StyledButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('SBG triplo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <StyledButtonGroup
        radius={text('radius', '0') ? `${text('radius', '0')}px` : '0'}
        bottomSpace={text('bottomSpace', '0') ? `${text('bottomSpace', '0')}px` : '0'}
      >
        <ActionButton>Primo</ActionButton>
        <ActionButton>Secondo</ActionButton>
        <ActionButton>Terzo</ActionButton>
      </StyledButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('SBG multiplo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <StyledButtonGroup
        bottomSpace={text('bottomSpace', '0') ? `${text('bottomSpace', '0')}px` : '0'}
      >
        <ActionButton>Primo</ActionButton>
        <ActionButton>Secondo</ActionButton>
        <ActionButton>Terzo</ActionButton>
        <ActionButton>Quarto</ActionButton>
        <ActionButton>Quinto</ActionButton>
        <ActionButton>Sesto...</ActionButton>
      </StyledButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('MiniButtonGroup singolo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <MiniButtonGroup
        radius={number('radius', 0) ? `${number('radius', 0)}px` : 0}
      >
        <Button>Singolo</Button>
      </MiniButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('MiniButtonGroup doppio', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <MiniButtonGroup
        radius={text('radius', '0') ? `${text('radius', '0')}px` : '0'}
        bottomSpace={text('bottomSpace', '0') ? `${text('bottomSpace', '0')}px` : '0'}
      >
        <Button>Primo</Button>
        <Button actioncolor="okay">Secondo</Button>
      </MiniButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('MiniButtonGroup triplo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <MiniButtonGroup
        radius={text('radius', '0') ? `${text('radius', '0')}px` : '0'}
        bottomSpace={text('bottomSpace', '0') ? `${text('bottomSpace', '0')}px` : '0'}
      >
        <Button>Primo</Button>
        <Button actioncolor="okay">Secondo</Button>
        <Button actioncolor="help">Terzo</Button>
      </MiniButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('ExpandButtonGroup triplo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ExpandButtonGroup
        justifyContent={text('justifyContent')}
        radius={text('radius', '0') ? `${text('radius', '0')}px` : '0'}
        bottomSpace={text('bottomSpace', '0') ? `${text('bottomSpace', '0')}px` : '0'}
      >
        <Button>Primo</Button>
        <Button actioncolor="okay">Secondo</Button>
        <Button actioncolor="help">Terzo</Button>
      </ExpandButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  });
