import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, color } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import { actionColorOptions } from 'style/color';
import Div from 'components/Div';
import { Icon } from 'components/Button';
import buttonicon from 'icons/buttons';
import FlexBox from 'components/FlexBox';
import AlertBanner, { InfoBanner } from './index';

const icona = Object.keys(buttonicon).map((icn) => (icn));

const nota = `
  La props 'border' qui è boolean ma viene sovrascritta da actioncolor.
`;

storiesOf('AlertBanner', module)
  .addDecorator(withKnobs)
  .add('AlertBanner', withNotes(nota)(() => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <AlertBanner
        onClick={action('clicked')}
        actioncolor={select('actioncolor', actionColorOptions)}
        tag={boolean('tag', false)}
        color={color('color ')}
        bgcolor={color('bgcolor ')}
        margin={text('margin ')}
        padding={text('padding ')}
        border={boolean('border ', false)}
        shadow={boolean('shadow ', false)}
        radius={text('radius ')}
      >
        {boolean('con icona', false) &&
          <Icon {...buttonicon[select('icona', icona, 'cancel')]} left />
        }
        {text('Text', 'AlertBanner')}
      </AlertBanner>
    </ThemeProvider>
  )))
  .add('Alert ritiro', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <AlertBanner
        actioncolor="action"
        tag
      >
        <Icon {...buttonicon.hourglass} left />
        <span> &nbsp;Versione in fase di valutazione</span>
      </AlertBanner>
    </ThemeProvider>
  ))
  .add('InfoBanner', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Div>
        <InfoBanner
          onClick={action('clicked')}
          actioncolor={select('actioncolor', actionColorOptions)}
          tag={boolean('tag', false)}
          color={color('color ')}
          bgcolor={color('bgcolor ')}
          margin={text('margin ')}
          padding={text('padding ')}
          border={boolean('border ', false)}
          radius={text('radius ')}
        >
          <span>Testo</span>
        </InfoBanner>
        <FlexBox maxWidth="480px" margin="60px auto 0" alignItems="stretch">
          <InfoBanner
            onClick={action('clicked')}
            actioncolor={select('actioncolor', actionColorOptions)}
            tag={boolean('tag', false)}
            color={color('color ')}
            bgcolor={color('bgcolor ')}
            margin={text('margin ')}
            padding={text('padding ')}
            border={boolean('border ', false)}
            radius={text('radius ')}
          >
            <span>Testo più lungo</span>
          </InfoBanner>
          <InfoBanner
            onClick={action('clicked')}
            actioncolor={select('actioncolor', actionColorOptions)}
            tag={boolean('tag', false)}
            color={color('color ')}
            bgcolor={color('bgcolor ')}
            margin={text('margin ')}
            padding={text('padding ')}
            border={boolean('border ', false)}
            radius={text('radius ')}
          >
            <span>Tempo stimato esecuzione: 30&apos;</span>
          </InfoBanner>
          <InfoBanner
            onClick={action('clicked')}
            actioncolor={select('actioncolor', actionColorOptions)}
            tag={boolean('tag', false)}
            color={color('color ')}
            bgcolor={color('bgcolor ')}
            margin={text('margin ')}
            padding={text('padding ')}
            border={boolean('border ', false)}
            radius={text('radius ')}
          >
            <span>Data assegnazione: 30/12/2018</span>
          </InfoBanner>
        </FlexBox>
      </Div>
    </ThemeProvider>
  ));
