import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, color } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { reduxForm } from 'redux-form/immutable';
import { allThemes, themeOptions } from 'style/theme';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { ModalOverlay, ModalContent } from 'components/Modal';
import InputField from 'components/FormElements/Field';
import SelectField from 'components/FormElements/SelectField';
import { singleFieldRequired, atLeastNChars, singleFieldValidateEmail } from 'common/forms';
import { LandingFormView } from './index';

const store = configureStore({}, {});
const DecoratedForm = reduxForm({ form: 'testForm' })(LandingFormView);

storiesOf('LandingForm', module)
  .addDecorator(withKnobs)
  .addWithJSX('LandingForm', () => (
    <Provider store={store}>
      <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
        <ModalOverlay show>
          <ModalContent
            bgcolor={allThemes[select('theme', themeOptions, 'alatin')].brand}
            maxWidth="480px"
            formBox
          >
            <DecoratedForm
              show={boolean('show', true)}
              alatin={boolean('alatin', true)}
              privacy={boolean('privacy', true)}
              bgcolor={color('bgcolor')}
              formtitle={text('formtitle', 'Titolo del form')}
              feedback={{
                hasFeedback: boolean('hasFeedback', false),
                messaggio: text('messaggio', 'Messaggio di errore'),
                tipologia: text('tipologia', ''),
              }}
              handleClose={() => { }}
              formFields={[{
                id: 'nome',
                type: 'text',
                name: 'nome',
                label: 'Nome e cognome*',
                landing: true,
                validate: [atLeastNChars(3)],
                component: InputField,
              }, {
                id: 'email',
                type: 'text',
                name: 'email',
                label: 'Email*',
                landing: true,
                validate: [singleFieldValidateEmail],
                component: InputField,
              }, {
                id: 'indirizzoDiStudio',
                type: 'select',
                name: 'indirizzoDiStudio',
                label: 'Indirizzo di studio*',
                validate: [singleFieldRequired],
                opts: [{
                  label: 'Liceo classico',
                  id: 'classico',
                }, {
                  label: 'Liceo scientifico',
                  id: 'scientifico',
                }, {
                  label: 'Liceo linguistico',
                  id: 'linguistico',
                }, {
                  label: 'Liceo scienze umane',
                  id: 'scienze_umane',
                }, {
                  label: 'Scuola media',
                  id: 'scuola_media',
                }, {
                  label: 'Altro',
                  id: 'altro',
                }],
                component: SelectField,
              }]}
            />
          </ModalContent>
        </ModalOverlay>
      </ThemeProvider>
    </Provider>
  ));
