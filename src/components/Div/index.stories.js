import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import Div from './index';


const nota = 'La props nobreak assegna \'page-break-inside: avoid;\' \n quella noPrint \'display:none;\' in stampa';

storiesOf('Div', module)
  .addDecorator(withKnobs)
  .addWithJSX('Div', withNotes(nota)(() => (
    <Div
      display={text('display', 'block')}
      position={text('position', 'relative')}
      width={text('width', 'auto')}
      maxWidth={text('maxWidth', '100%')}
      height={text('height', '')}
      color={color('color', 'inherit')}
      align={text('align (tex-align)', '')}
      float={text('float', 'none')}
      margin={text('margin', '0')}
      padding={text('padding', '0')}
      radius={text('radius', '')}
      bgColor={color('bgColor', 'transparent')}
      border={text('border', '')}
      borderwidth={text('borderwidth', '')}
      borderstyle={text('borderstyle', '')}
      bordercolor={color('bordercolor', '')}
      overflow={text('overflow', 'visible')}
      userSelect={text('userSelect', 'auto')}
      pointerEvents={text('pointerEvents', 'auto')}
      zindex={text('zindex', 'auto')}
      nobreak={boolean('nobreak', false)}
      noPrint={boolean('noPrint', true)}
    >
      <p>Ciao, sono all&apos;interno di un Div. Usa le props per personalizzarlo :)</p>
    </Div>
  )));
