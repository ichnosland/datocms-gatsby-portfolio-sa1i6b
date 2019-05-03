import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, color, number } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import { actionColorOptions } from 'style/color';
import Div from 'components/Div';
import buttonicon from 'icons/buttons';
import { Button, ActionButton, TextButton, Icon, GhostButton } from './index';
import nota from './nota.md';

const icona = Object.keys(buttonicon).map((icn) => (icn));

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addWithJSX('Button', withNotes(nota)(() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Div>
        <Button
          onClick={action('clicked')}
          standard={boolean('standard', false)}
          actioncolor={select('actioncolor', actionColorOptions)}
          full={boolean('full', false)}
          half={boolean('half', false)}
          admin={boolean('admin', false)}
          outline={boolean('outline', false)}
          bone={boolean('bone', false)}
          shadow={boolean('shadow', false)}
          disabled={boolean('disabled', false)}
          color={color('color', 'white')}
          bgcolor={color('bgcolor')}
          margin={number('margin', 0) ? `${number('margin', 0)}px` : 0}
          padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
          border={text('border', '')}
          radius={number('radius', 0) ? `${number('radius', 0)}px` : 0}
        >
          {boolean('con icona', false) &&
            <Icon {...buttonicon[select('icona', icona, 'cancel')]} left />
          }
          {text('Text', 'Button')}
        </Button>
      </Div>
    </ThemeProvider>
  )), {
    skip: 2,
  })
  .addWithJSX('ActionButton', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ActionButton
        onClick={action('clicked')}
        center={boolean('center', false)}
        color={color('color', 'white')}
        bgcolor={color('bgcolor', '')}
        padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
        border={text('border', '')}
        radius={number('radius', 0) ? `${number('radius', 0)}px` : 0}
        disabled={boolean('disabled', false)}
        shadow={boolean('shadow', false)}
      >
        {text('Text', 'ActionButton')}
      </ActionButton>
    </ThemeProvider>
  ))
  .addWithJSX('TextButton', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <TextButton
        onClick={action('clicked')}
        color={color('color ')}
      >
        {text('Text', 'TextButton')}
      </TextButton>
    </ThemeProvider>
  ))
  .addWithJSX('GhostButton', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Div>
        <GhostButton
          margin={number('margin', 0) ? `${number('margin', 0)}px` : 0}
          padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
          fill={color('color')}
        >
          <Icon {...buttonicon[select('icona', icona, 'cancel')]} />
        </GhostButton>
      </Div>
    </ThemeProvider>
  ), {
    skip: 2,
  })
  .addWithJSX('Button round', withNotes(nota)(() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Div>
        <Button
          onClick={action('clicked')}
          round={boolean('round', true)}
          width={text('width', '32px')}
        >
          <Icon {...buttonicon[select('icona', icona, 'sound')]} />
        </Button>
      </Div>
    </ThemeProvider>
  )), {
    skip: 2,
  });
