import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, color, boolean } from '@storybook/addon-knobs';
import styled, { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import icon from 'icons/globals';
import Div from 'components/Div';
import Carousel from './index';

const icona = Object.keys(icon).map((icn) => (icn));

const Item = styled(Div)`
  text-align: center;
  padding: 50px;
  color: white;
`;

storiesOf('Carousel', module)
  .addDecorator(withKnobs)
  .addWithJSX('Carousel', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Div Height={text('width', '420px')}>
        <h2>Carosello</h2>
        <Carousel
          buttonWidth={text('buttonWidth', '40px')}
          buttonHeight={text('buttonHeight')}
          leftIcon={select('leftIcon', icona, 'caretLeft')}
          rightIcon={select('rightIcon', icona, 'caretRight')}
          iconSize={text('iconSize', '32px')}
          iconFill={color('iconFill', '')}
          hydeLeft={boolean('hydeLeft', false)}
          hydeRight={boolean('hydeRight', false)}
          noIndicator={boolean('noIndicator', false)}
          slides={[
            <Item key="item_0" bgColor="darkorange">Item 0</Item>,
            <Item key="item_1" bgColor="grey">Item 1</Item>,
            <Item key="item_2" bgColor="blue">Item 2</Item>,
            <Item key="item_3" bgColor="red">Item 3</Item>,
            <Item key="item_4" bgColor="green">Item 4</Item>,
          ]}
        />
      </Div>
    </ThemeProvider>
  ));
