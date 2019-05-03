import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { allThemes, themeOptions } from 'style/theme';
import Div from 'components/Div';
import { Grid, GridItem } from './index';

storiesOf('Grid', module)
  .addDecorator(withKnobs)
  .addWithJSX('Grid', () => (
    <Div width="100%" height="800px" bgColor="white" border="1px dashed rgba(0, 0, 0, 0.1)" >
      <Grid
        templateColumns={text('templateColumns', '')}
        templateRows={text('templateRows', '')}
        columnGap={text('columnGap', '')}
        rowGap={text('rowGap', '')}
        gridGap={text('gridGap', '')}
        justifyItems={text('justifyItems', '')}
        alignItems={text('alignItems', 'center')}
        justifyContent={text('justifyContent', '')}
        alignContent={text('alignContent', '')}
        inline={boolean('inline', false)}
      >
        <GridItem bgColor="rgba(0, 0, 0, 0.2)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.1)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.2)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.1)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.2)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.1)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.2)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.1)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.2)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.1)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.2)">GridItem</GridItem>
        <GridItem bgColor="rgba(0, 0, 0, 0.1)">GridItem</GridItem>
      </Grid>
    </Div>
  ))
  .addWithJSX('Grid list semplice', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Grid list>
        <GridItem
          list={boolean('list', true)}
          header
          active
        >
          GridItem
        </GridItem>
        <GridItem list header>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list>GridItem</GridItem>
      </Grid>
    </ThemeProvider>
  ))
  .addWithJSX('GridItem list', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <GridItem
        list={boolean('list', true)}
        header={boolean('header', false)}
        active={boolean('active', false)}
      >
        GridItem
      </GridItem>
    </ThemeProvider>
  ))
  .addWithJSX('Grid list 3 col auto', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Grid
        list
        templateColumns="auto auto auto"
      >
        <GridItem
          list
          header
          active
        >
          GridItem
        </GridItem>
        <GridItem
          list
          header
          justifyContent="center"
        >
          GridItem
        </GridItem>
        <GridItem
          list
          header
          justifyContent="center"
        >
          GridItem
        </GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list justifyContent="center">
          GridItem
        </GridItem>
        <GridItem list justifyContent="center">
          GridItem
        </GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list justifyContent="center">
          GridItem
        </GridItem>
        <GridItem list justifyContent="center">
          GridItem
        </GridItem>
        <GridItem list>GridItem</GridItem>
        <GridItem list justifyContent="center">
          GridItem
        </GridItem>
        <GridItem list justifyContent="center">
          GridItem
        </GridItem>
      </Grid>
    </ThemeProvider>
  ));
