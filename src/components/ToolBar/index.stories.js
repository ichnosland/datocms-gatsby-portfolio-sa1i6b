import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import ToolBar from 'components/ToolBar';
import ToolBarButton from 'components/ToolBar/ToolBarButton';
import CentralBox from 'components/CentralBox';

storiesOf('ToolBar', module)
  .addDecorator(withKnobs)
  .addWithJSX('Esecuzione', () => (
    <ThemeProvider
      theme={allThemes[select('theme', themeOptions, 'alatin')]}
    >
      <CentralBox>
        <p><strong>Nota bene:</strong> il <em>ToolBarButton</em> dell&apos;esecuzione standard deve avere la props <strong><em>full</em></strong></p>
        <ToolBar>
          <ToolBarButton
            full
            title={text('Title', 'Testo ToolBar')}
            enabled={boolean('enabled', false)}
          />
        </ToolBar>
      </CentralBox>
    </ThemeProvider>
  ), {
    skip: 2,
  });

storiesOf('ToolBar', module)
  .addDecorator(withKnobs)
  .addWithJSX('Versione', () => (
    <ThemeProvider
      theme={allThemes[select('theme', themeOptions, 'alatin')]}
    >
      <CentralBox versione >
        {boolean('full', false) ?
          <ToolBar>
            <ToolBarButton help hide />
            <ToolBarButton
              enabled
              full
              title="Continua"
            />
          </ToolBar>
          :
          <ToolBar>
            <ToolBarButton help />
            <ToolBarButton
              check
              enabled={boolean('enabled', false)}
            />
          </ToolBar>
        }
      </CentralBox>
    </ThemeProvider>
  ), {
    skip: 2,
  });

storiesOf('ToolBar', module)
  .addDecorator(withKnobs)
  .addWithJSX('Verifica', () => (
    <ThemeProvider
      theme={allThemes[select('theme', themeOptions, 'alatin')]}
    >
      <CentralBox versione >
        <ToolBar>
          <ToolBarButton skip />
          <ToolBarButton
            check
            enabled={boolean('enabled', false)}
          />
        </ToolBar>
      </CentralBox>
    </ThemeProvider>
  ), {
    skip: 2,
  });
