import React from 'react';
import { shallow } from 'enzyme';

import { Table } from 'components/Tables';
import TabelleList, { ModalTable } from '../index';

const theme = {
  brand: '#00abe5',
};

const props = {
  tabelle: [{
    intestazione: 'intestazione tabella uno',
    righe: [
      [{
        titolo: 'titolo riga 1 colonna 1',
      }, {
        titolo: 'titolo riga 1 colonna 2',
      }],
    ],
  }, {
    intestazione: 'intestazione tabella due',
    righe: [
      [{
        titolo: 'titolo riga 1 colonna 1',
      }, {
        titolo: 'titolo riga 1 colonna 2',
      }],
    ],
  }],
};

describe('<TabelleList />', () => {
  it('dichiaro una tabella completa', () => {
    const renderedComponent = shallow(
      <TabelleList {...props} />
    );
    expect(renderedComponent.find(ModalTable).length).toBe(2);
    expect(renderedComponent.find('thead').length).toBe(2);
    expect(renderedComponent.find('tbody').length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('dichiaro una tabella senza intestazione', () => {
    const mockProp = {
      ...props,
      tabelle: [{
        ...props.tabelle[0],
        intestazione: undefined,
      }],
    };
    const renderedComponent = shallow(
      <TabelleList {...mockProp} />
    );
    expect(renderedComponent.find('TabelleList__ModalTable').length).toBe(1);
    expect(renderedComponent.find('thead').length).toBe(0);
    expect(renderedComponent.find('tbody').length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '30px auto';
    const renderedComponent = shallow(<TabelleList {...props} margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ModalTable />', () => {
  it('should render a Table', () => {
    const renderedComponent = shallow(<ModalTable />);
    expect(renderedComponent.find(Table).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<ModalTable theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<ModalTable bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props userSelect', () => {
    const userSelect = 'auto';
    const renderedComponent = shallow(<ModalTable userSelect={userSelect} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
