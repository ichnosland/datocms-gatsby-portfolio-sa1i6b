import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import ContentEditable from './index';
import EditableSpan from './EditableSpan';

storiesOf('ContentEditable', module)
  .addDecorator(withKnobs)
  .add('ContentEditable', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ContentEditable
        label={text('label', 'Testo placeholder')}
        width={text('width', 'larghezza in px')}
        mustBeNumeric={boolean('mustBeNumeric', false)}
        giusto={boolean('giusto', false)}
        sbagliato={boolean('sbagliato', false)}
        content={text('content (value)', '')}
      />
    </ThemeProvider>
  ))
  .add('EditableSpan', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <p>
        <span>Un po&apos; di testo tanto per gradire</span>
        &nbsp;
        <EditableSpan
          width={text('width', '')}
          maxWidth={text('width', '')}
          single={boolean('single', false)}
          empty={boolean('empty', true)}
          giusto={boolean('giusto', false)}
          sbagliato={boolean('sbagliato', false)}
        />
        &nbsp;
        <span>e vedere che effetto fa su più righe</span>
        &nbsp;
        <EditableSpan
          width={text('width', '')}
          maxWidth={text('width', '')}
          single={boolean('single', false)}
          empty={boolean('empty', true)}
          giusto={boolean('giusto', false)}
          sbagliato={boolean('sbagliato', false)}
        />
        &nbsp;
        <span>come spesso capita.</span>
      </p>
    </ThemeProvider>
  ));

