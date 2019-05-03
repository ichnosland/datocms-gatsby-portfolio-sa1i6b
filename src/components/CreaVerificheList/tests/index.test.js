import React from 'react';
import { shallow } from 'enzyme';

import ListPanel from 'components/ListPanel';
import { Button } from 'components/Button';
import { FlexChild } from 'components/FlexBox';
import CreaVerificheList, { InfoTag } from '../index';

describe('<CreaVerificheList />', () => {
  const itemsList = [{
    key: 1,
    elementi: [{
      id: 1,
      nome: 'contenuto voce 1',
    }, {
      id: 2,
      nome: 'contenuto voce 2',
    }],
  }];
  it('should render one ListPanel when no button is provided', () => {
    const renderedComponent = shallow(
      <CreaVerificheList
        itemsList={itemsList}
      />
    );
    expect(renderedComponent.find(ListPanel).length).toBe(1);
    expect(renderedComponent.find('div').length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(0);
  });
  it('should render one ListPanel when button is provided', () => {
    const renderedComponent = shallow(
      <CreaVerificheList
        itemsList={itemsList}
        buttonText="Testo del pulsante"
      />
    );
    expect(renderedComponent.find(ListPanel).length).toBe(1);
    expect(renderedComponent.find('div').length).toBe(1);
    expect(renderedComponent.find(InfoTag).length).toBe(1);
  });
  it('should not render ListPanel when item count is zero', () => {
    const renderedComponent = shallow(
      <CreaVerificheList
        itemsList={[]}
      />
    );
    expect(renderedComponent.find(ListPanel).length).toBe(0);
    expect(renderedComponent.find('div').length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(0);
  });
});

describe('<InfoTag />', () => {
  it('should render a FlexChild', () => {
    const renderedComponent = shallow(<InfoTag />);
    expect(renderedComponent.find(FlexChild).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
