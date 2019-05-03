import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import ReportGrid from './index';

const mockProps = {
  intestazioniColonna: [{
    field: 'campo1',
    type: 'string',
    label: 'Label campo 1',
    fieldsDisplay: [{ field: 'campo1' }],
  }, {
    field: 'campo2',
    type: 'number',
    label: 'Label campo 2',
    fieldsDisplay: [{ field: 'campo2' }],
  }, {
    field: 'campo3',
    type: 'string',
    label: 'Label campo 3',
    fieldsDisplay: [{ field: 'campo3' }, { field: 'campo4' }],
  }],
  righe: [{
    key: 'key1',
    campo1: 'valore[1] campo1',
    campo2: 100,
    campo3: 'valore[1] campo3',
    campo4: '',
  }, {
    key: 'key2',
    campo1: 'valore[2] campo1',
    campo2: 200,
    campo3: 'valore[2] campo3',
    campo4: 'valore[2] campo4',
  }, {
    key: 'key3',
    campo1: 'valore[3] campo1',
    campo2: 300,
    campo3: 'valore[3] campo3',
    campo4: 'valore[3] campo4',
  }],
};

storiesOf('ReportGrid', module)
  .addDecorator(withKnobs)
  .add('ReportGrid', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <ReportGrid
        {...mockProps}
        filtriAttivi={{
          filtriAttivi: {
            field: text('field', 'campo1'),
            sort: text('sort', 'desc'),
            type: 'string',
          },
        }}
        righe={[
          ...mockProps.righe, {
            key: text('key', 'key4'),
            campo1: text('valore[4] campo1', 'valore[4] campo1'),
            campo2: text('valore[4] campo2', 'valore[4] campo2'),
            campo3: text('valore[4] campo3', 'valore[4] campo3'),
            campo4: text('valore[4] campo4', 'valore[4] campo4'),
          }]
        }
      />
    </ThemeProvider>
  ));
