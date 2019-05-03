import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import TopBar from 'components/TopBar';
import { ContainerFlex } from 'components/Container';
import CentralBox from 'components/CentralBox';
import ProgressBar from 'components/ProgressBar';
import ToolBar from 'components/ToolBar';
import ToolBarButton from 'components/ToolBar/ToolBarButton';
import AlertBar from './index';

const history = createBrowserHistory();

storiesOf('AlertBar', module)
  .addDecorator(withKnobs)
  .add('AlertBar', () => (
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
          <AlertBar
            show={boolean('show', true)}
            giusto={boolean('giusto', true)}
            sbagliato={boolean('sbagliato', false)}
            aiuto={boolean('aiuto', false)}
            versione={boolean('versione', false)}
            helpFx={boolean('helpFx', true)}
          />
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

