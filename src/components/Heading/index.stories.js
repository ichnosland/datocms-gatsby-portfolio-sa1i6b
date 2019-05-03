import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, color, number } from '@storybook/addon-knobs';
import 'global-styles';
import {
  H1,
  H2,
  HiddenH1,
  H3,
  H4,
} from './index';

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .addWithJSX('Overview', () => (
    <div>
      <H1
        color={color('color', '#333')}
        margin={number('margin', 0) ? `${number('margin', 0)}px` : 0}
        padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
        center={boolean('center', false)}
      >
        {text('Text', 'Heading 1 <H1>')}
      </H1>
      <H2
        color={color('color', '#333')}
        margin={number('margin', 0) ? `${number('margin', 0)}px` : 0}
        padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
        center={boolean('center', false)}
      >
        {text('Text', 'Heading 2 <H2>')}
      </H2>
      <H3
        color={color('color', '#333')}
        margin={number('margin', 0) ? `${number('margin', 0)}px` : 0}
        padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
        center={boolean('center', false)}
      >
        {text('Text', 'Heading 3 <H3>')}
      </H3>
      <H4
        color={color('color', '#333')}
        margin={number('margin', 0) ? `${number('margin', 0)}px` : 0}
        padding={number('padding', 0) ? `${number('padding', 0)}px` : 0}
        center={boolean('center', false)}
      >
        {text('Text', 'Heading 4 <H4>')}
      </H4>
    </div>
  ))
  .addWithJSX('HiddenH1', () => (
    <div>
      <HiddenH1>
        Testo invisibile
      </HiddenH1>
      <p>Come il titolo suggerisce il componente è invisibile :)<br /><small>(però il testo viene indicizzato lo stesso)</small></p>
    </div>
  ));
