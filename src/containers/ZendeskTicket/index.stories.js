import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import 'global-styles';

import { allThemes, themeOptions } from 'style/theme';
import { ZendeskTicketView } from './index';


const mockConfiguration = {
  product: 'product',
  hasPremium: true,
  disciplinaId: 123,
  homePage: '/homepage',
};
const store = configureStore({}, {});
const mockProps = {
  configuration: mockConfiguration,
  userAnagraphics: {
    email: 'pippo.pluto@maieuticallabs.it',
    first_name: 'Pippo',
    last_name: 'Pluto',
  },
  feedback: {
    hasFeedback: false,
    tipologia: 'okay',
    messaggio: 'Questo è un messaggio di feedback',
  },
  onModalEmptyData: () => { },
  onZendeskDataPost: () => { },
  ticketData: {},
  feedbackFormData: {},
};


storiesOf('ZendeskTicketView', module)
  .addDecorator(withKnobs)
  .addWithJSX('ZendeskTicketView', () => (
    <Provider store={store}>
      <ThemeProvider
        theme={allThemes[select('theme', themeOptions, 'alatin')]}
      >
        <ZendeskTicketView
          {...{
            ...mockProps,
            userAppData: {
              docente: boolean('docente', true),
            },
            userAuthentication: {
              logged: boolean('logged', true),
            },
            spinner: boolean('spinner', false),
            feedback: {
              ...mockProps.feedback,
              hasFeedback: boolean('feedback', true),
              tipologia: text('tipologia messaggio feedback', 'okay'),
            },
          }}
        />
      </ThemeProvider>
    </Provider>
  ), { skip: 1 });
