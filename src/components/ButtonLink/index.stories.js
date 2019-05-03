import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, boolean, select, color, number } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import { actionColorOptions } from 'style/color';
import buttonicon from 'icons/buttons';
import { Icon } from 'components/Button';
import { ButtonLink, ActionButtonLink } from './index';

const history = createBrowserHistory();

const icona = Object.keys(buttonicon).map((icn) => (icn));

const nota = 'Per le icone si applica quanto annotato su Button';

storiesOf('ButtonLink', module)
  .addDecorator(withKnobs)
  .addWithJSX('ButtonLink', withNotes(nota)(() => (
    <Router history={history}>
      <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
        <ButtonLink
          to={text('to (required)', '/#')}
          standard={number('standard', 0)}
          actioncolor={select('actioncolor', actionColorOptions)}
          full={number('full', 0)}
          half={number('half', 0)}
          disabled={boolean('disabled', false)}
          color={color('color ')}
          bgcolor={color('bgcolor')}
          margin={number('margin', 0) ? `${number('margin', 0)}px` : 0}
          padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
          border={text('border', '')}
          radius={number('radius', 0) ? `${number('radius', 0)}px` : 0}
        >
          {boolean('con icona', false) &&
            <Icon {...buttonicon[select('icona', icona, 'cancel')]} left />
          }
          {text('Text', 'ButtonLink')}
        </ButtonLink>
      </ThemeProvider>
    </Router>
  )), {
    skip: 2,
  })
  .addWithJSX('ActionButtonLink', () => (
    <Router history={history}>
      <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
        <ActionButtonLink
          to={text('to (required)', '/#')}
          center={number('center', 0)}
          color={color('color ')}
          bgcolor={color('bgcolor', '')}
          padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
          border={text('border', '')}
          radius={number('radius', 0) ? `${number('radius', 0)}px` : 0}
          disabled={boolean('disabled', false)}
        >
          {text('Text', 'ActionButtonLink')}
        </ActionButtonLink>
      </ThemeProvider>
    </Router >
  ), {
    skip: 1,
  });
