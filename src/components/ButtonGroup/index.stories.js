import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, color } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import ButtonGroup from './index';

storiesOf('ButtonGroup', module)
  .addDecorator(withKnobs)
  .addWithJSX('ButtonGroup', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ButtonGroup
        onClick={action('clicked')}
        half={boolean('half', false)}
        full={boolean('full', false)}
        color={color('colore', '')}
        activeColor={color('activeColor', 'white')}
        margin={text('margin', '0') ? `${text('margin', '0')}px` : '0'}
        bgcolor={color('bgcolor', '')}
        activebgColor={color('activebgColor', '')}
        border={text('border', '')}
        buttons={[{
          id: 1,
          label: `${text('Text1', 'ButtonGroup 1')}`,
          attivo: true,
        }, {
          id: 2,
          label: `${text('Text2', 'ButtonGroup 2')}`,
        }]}
      >
      </ButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
    showFunctions: false,
  })
  .addWithJSX('ButtonGroup multiplo', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ButtonGroup
        onClick={action('clicked')}
        color={color('color', '')}
        full={boolean('full', false)}
        half={boolean('half', false)}
        activeColor={color('activeColor', 'white')}
        margin={text('margin', '0') ? `${text('margin', '0')}px` : '0'}
        bgcolor={color('bgcolor', '')}
        activebgColor={color('activebgColor', '')}
        border={text('border', '')}
        buttons={[{
          id: 1,
          label: `${text('Text1', 'ButtonGroup 1')}`,
          attivo: true,
        }, {
          id: 2,
          label: `${text('Text2', 'ButtonGroup 2')}`,
        }, {
          id: 3,
          label: `${text('Text3', 'ButtonGroup 3')}`,
        }, {
          id: 4,
          label: `${text('Text4', 'ButtonGroup 4')}`,
        }]}
      >
      </ButtonGroup>
    </ThemeProvider>
  ), {
    skip: 1,
  });
