import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, color } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import SlideToggle from './index';

storiesOf('SlideToggle', module)
  .addDecorator(withKnobs)
  .addWithJSX('SlideToggle', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <SlideToggle
          check={boolean('check', false)}
          bgcolor={color('bgcolor ')}
        />
      </div>
    </ThemeProvider>
  ));
