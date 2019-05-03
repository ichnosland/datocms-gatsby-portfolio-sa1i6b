import React from 'react';
import { shallow } from 'enzyme';

import ListPanel from 'components/ListPanel';
import Dashboard from '../index';


describe('<Dashboard />', () => {
  it('should render a ListPanel into a Dashboard', () => {
    const livelli = [{
      id: 1,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 10,
        unita: [{
          id: 1001,
          locked: false,
          nome: 'Unita 1',
        }, {
          id: 1002,
          locked: false,
          nome: 'Unita 2',
        }],
      }],
    }];
    const renderedComponent = shallow(
      <Dashboard
        livelli={livelli}
        isMytest={false}
      />
    );
    expect(renderedComponent.find(ListPanel).length).toEqual(1);
    expect(renderedComponent.find('div > p').length).toEqual(0);
  });

  it('should show a feedback message if livelli list is empty', () => {
    const livelli = [];
    const renderedComponent = shallow(
      <Dashboard
        livelli={livelli}
        isMytest={false}
      />
    );
    expect(renderedComponent.find(ListPanel).length).toEqual(0);
    expect(renderedComponent.find('div > p').length).toEqual(1);
  });
});
