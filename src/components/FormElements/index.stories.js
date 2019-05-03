import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import TopBar from 'components/TopBar';
import Flexbox from 'components/FlexBox';
import ProgressBar from 'components/ProgressBar';
import ToolBar from 'components/ToolBar';
import ToolBarButton from 'components/ToolBar/ToolBarButton';
import CentralBox from 'components/CentralBox';
import RadioCheck from './RadioCheck';

const history = createBrowserHistory();
const typeOptions = [
  'radio',
  'checkbox',
];

storiesOf('RadioCheck', module)
  .addDecorator(withKnobs)
  .add('RadioCheck', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Flexbox height="100%">
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
          <p>{text('Text', 'Testo a caso :)')}</p>
          <RadioCheck
            label={text('label', 'Non sono più un input')}
            type={select('type', typeOptions, 'radio')}
            checked={boolean('checked', false)}
            sbagliato={boolean('sbagliato', false)}
            giusto={boolean('giusto', false)}
          />
          <ToolBar>
            <ToolBarButton
              full
              title="Controlla"
            />
          </ToolBar>
        </CentralBox>
      </Flexbox>
    </ThemeProvider>
  ));

