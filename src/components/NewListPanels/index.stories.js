import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, color, number } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import 'global-styles';
import { allThemes, themeOptions } from 'style/theme';
import ContentEditable from 'components/ContentEditable';
import { ListItem, ListLink, ListItemText, ListPanelHeader } from './index';
import ListSideBox from './ListSideBox';
import HtmlInjector from './HtmlInjector';

const history = createBrowserHistory();

storiesOf('NewListPanels', module)
  .addDecorator(withKnobs)
  .addWithJSX('ListItem', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <div>
          <ListItem
            bgColor={color('bgColor ')}
            first={boolean('first', true)}
          >
            <ListItemText>{text('testo', 'ListItem')}</ListItemText>
            {boolean('lesson', false) &&
              <ListSideBox lesson />
            }
          </ListItem>
          <ListItem
            bgColor={color('bgColor ')}
          >
            <ListItemText>{text('testo 2', 'ListItem 2')}</ListItemText>
          </ListItem>
          <ListItem
            bgColor={color('bgColor ')}
            isSelected={boolean('isSelected ', true)}
          >
            <ListItemText>{text('testo 3', 'ListItem 3')}</ListItemText>
            <ListSideBox
              studenti={number('studenti', 0)}
            />
          </ListItem>
          <ListItem
            bgColor={color('bgColor ')}
          >
            <ListItemText>{text('testo 4', 'ListItem 4')}</ListItemText>
            <ListSideBox
              txt="ciao"
            />
          </ListItem>
        </div>
        <div>
          {boolean('mostra un header', false) && <ListPanelHeader>Panel header</ListPanelHeader>}
          <ListItem>
            <ListItemText
              unit
            >
              {text('testo', 'ListItem unit')}
            </ListItemText>
            <ListSideBox
              unit
              assigned={boolean('assigned', true)}
              retired={boolean('retired', false)}
              percentuale={number('percentuale', 0)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              unit
              locked={boolean('locked', true)}
            >
              {text('testo 2', 'ListItem unit locked')}
            </ListItemText>
            <ListSideBox
              unit
              locked={boolean('locked', true)}
            />
          </ListItem>
        </div>
        <div>
          <ListItem>
            <ListItemText>ListItem singolo</ListItemText>
          </ListItem>
        </div>
        <div>
          <ListItem>
            <ListItemText>ListItem radio</ListItemText>
            <ListSideBox radio />
          </ListItem>
          <ListItem>
            <ListItemText>ListItem checkbox</ListItemText>
            <ListSideBox checkbox />
          </ListItem>
        </div>
      </div>
    </ThemeProvider>
  ), {
    skip: 2,
  })
  .addWithJSX('ListItem verifiche', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <div>
        <ListItem>
          <ListItemText>ListItem</ListItemText>
          {boolean('posizione ', false) &&
            <ListItemText>
              <ContentEditable
                width="60px"
                mustBeNumeric
              />
            </ListItemText>
          }
        </ListItem>
        {boolean('con html', false) &&
          <HtmlInjector
            text={text('text ', 'testo html')}
            align={text('align ', 'left')}
            note={boolean('note ', false)}
          />
        }
        {boolean('solution ', false) &&
          <HtmlInjector
            solution
            text={text('Testo solution', 'Testo soluzione')}
          >
            {text}
          </HtmlInjector>
        }
        {boolean('con footer ', false) &&
          <ListItem>
            <ListItemText>
              22 esercizi
            </ListItemText>
            <ListItemText>
              42/98/00
            </ListItemText>
          </ListItem>
        }
      </div>
    </ThemeProvider>
  ), {
    skip: 1,
  })
  .addWithJSX('ListLink', () => (
    <ThemeProvider theme={allThemes[select('theme', themeOptions, 'alatin')]}>
      <Router history={history}>
        <div>
          <div>
            <ListLink
              to="/#"
              first={boolean('first', true)}
            >
              <ListItemText>ListItem Link Singolo</ListItemText>
            </ListLink>
          </div>
          <div>
            <ListLink
              to="/#"
              first={boolean('first', true)}
            >
              <ListItemText>ListItem Link</ListItemText>
            </ListLink>
            <ListLink to="/#">
              <ListItemText>ListItem Link</ListItemText>
            </ListLink>
            <ListLink to="/#">
              <ListItemText>ListItem Link</ListItemText>
            </ListLink>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  ), {
    skip: 1,
  });
