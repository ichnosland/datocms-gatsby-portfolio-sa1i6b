import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import TopBar from '../TopBar';
import { ContainerFlex } from '../Container';
import ProgressBar from '../ProgressBar';
import ToolBar from '../ToolBar';
import ToolBarButton from '../ToolBar/ToolBarButton';
import CentralBox from './index';

const history = createBrowserHistory();

storiesOf('CentralBox', module)
  .addDecorator(withKnobs)
  .add('CentralBox', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ContainerFlex height="100%">
        <CentralBox
          unita={boolean('unita', false)}
          versione={boolean('versione', false)}
        >
          {text('Text', 'Testo a caso :)')}
        </CentralBox>
      </ContainerFlex>
    </ThemeProvider>
  ))
  .add('CentralBox popolata', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ContainerFlex height="100%">
        <CentralBox
          versione={boolean('versione', false)}
        >
          <ProgressBar
            lezione
            percentuale={25}
          />
          <Router history={history}>
            <TopBar
              esecuzione
              noShadow
              box
              closeBtn={{
                url: '#',
                enabled: true,
              }}
              lesson={{
                url: '#',
                enabled: true,
              }}
              score="+ 120"
            />
          </Router>
          {text('Text', 'Testo a caso :)')}
          <ToolBar>
            <ToolBarButton
              full
              title="Controlla"
            />
          </ToolBar>
        </CentralBox>
      </ContainerFlex>
    </ThemeProvider>
  ));

