import React from 'react';
import { shallow } from 'enzyme';

import { Grid, GridItem } from 'components/Grid';
import { Icon } from 'components/Button';
import { FlexChild } from 'components/FlexBox';
import buttonicon from 'icons/buttons';

import ReportGrid, { FlexCell } from '../index';


const mockProps = {
  intestazioniColonna: [{
    field: 'campo3',
    type: 'string',
    label: 'Label campo 3',
    fieldsDisplay: [{ field: 'campo3' }, { field: 'campo4' }],
  }, {
    field: 'campo2',
    type: 'number',
    label: 'Label campo 2',
    fieldsDisplay: [{ field: 'campo2' }],
  }, {
    field: 'campo1',
    type: 'string',
    label: 'Label campo 1',
    fieldsDisplay: [{ field: 'campo1' }],
  }],
  filtriAttivi: {
    field: 'campo1',
    sort: 'asc',
    type: 'string',
  },
  sortingFunction: () => { },
  righe: [{
    key: 'key1',
    campo1: 'valore[1] campo1',
    campo2: 100,
    campo3: 'valore[1] campo3',
    campo4: '',
  }, {
    key: 'key2',
    campo1: 'valore[2] campo1',
    campo2: undefined,
    campo3: 'valore[2] campo3',
    campo4: 'valore[2] campo4',
  }, {
    key: 'key3',
    campo1: 'valore[3] campo1',
    campo2: 0,
    campo3: 'valore[3] campo3',
    campo4: 'valore[3] campo4',
  }],
};

describe('<ReportGrid/>', () => {
  it('dovrebbe visualizzare una griglia', () => {
    const renderedComponent = shallow(<ReportGrid {...mockProps} />);
    expect(renderedComponent.find(Grid).length).toEqual(1);
    expect(renderedComponent.find(GridItem).length).toEqual(12);
    expect(renderedComponent.find(FlexCell).length).toEqual(12);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('dovrebbe visualizzare una griglia vuota', () => {
    const props = {
      ...mockProps,
      intestazioniColonna: [],
    };

    const renderedComponent = shallow(<ReportGrid {...props} />);
    expect(renderedComponent.find(Grid).length).toEqual(1);
    expect(renderedComponent.find(GridItem).length).toEqual(0);
    expect(renderedComponent.find(FlexCell).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('dovrebbe visualizzare la props mono', () => {
    const props = {
      ...mockProps,
      mono: true,
    };

    const renderedComponent = shallow(<ReportGrid {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('le icone sono tutte asc', () => {
    const renderedComponent = shallow(<ReportGrid {...mockProps} />);
    expect(renderedComponent.find(GridItem).at(0).find(Icon).length).toBe(0);
    expect(renderedComponent.find(GridItem).at(1).find(Icon).length).toBe(0);
    expect(renderedComponent.find(GridItem).at(2).find(Icon).props())
      .toEqual({
        ...buttonicon.ascending,
        className: 'mediumUp',
        fill: ('rgb(178, 208, 223)'),
        theme: { brand: '#00BBEF' },
      });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('non ho icone se non ho una sortingFunction', () => {
    const props = {
      ...mockProps,
      sortingFunction: undefined,
    };
    const renderedComponent = shallow(<ReportGrid {...props} />);
    expect(renderedComponent.find(GridItem).at(0).find(Icon).length).toBe(0);
    expect(renderedComponent.find(GridItem).at(1).find(Icon).length).toBe(0);
    expect(renderedComponent.find(GridItem).at(2).find(Icon).length).toBe(0);
  });

  it('il terzo elemento ha icone desc', () => {
    const props = {
      ...mockProps,
      filtriAttivi: {
        ...mockProps.filtriAttivi,
        sort: 'desc',
      },
    };
    const renderedComponent = shallow(<ReportGrid {...props} />);
    expect(renderedComponent.find(GridItem).at(0).find(Icon).length).toBe(0);
    expect(renderedComponent.find(GridItem).at(1).find(Icon).length).toBe(0);
    expect(renderedComponent.find(GridItem).at(2).find(Icon).props())
      .toEqual({
        ...buttonicon.descending,
        className: 'mediumUp',
        fill: ('rgb(178, 208, 223)'),
        theme: { brand: '#00BBEF' },
      });
  });

  it('sortingFunction attiva', () => {
    const props = {
      ...mockProps,
      sortingFunction: jest.fn(),
    };

    const renderedComponent = shallow(<ReportGrid {...props} />);
    expect(props.sortingFunction).not.toHaveBeenCalled();

    // prima colonna
    renderedComponent.find(GridItem).at(0).simulate('click');
    expect(props.sortingFunction).toHaveBeenLastCalledWith(props.righe, {
      field: 'campo3',
      sort: 'asc',
      type: 'string',
    });

    // seconda colonna
    renderedComponent.find(GridItem).at(1).simulate('click');
    expect(props.sortingFunction).toHaveBeenLastCalledWith(props.righe, {
      field: 'campo2',
      sort: 'asc',
      type: 'number',
    });

    // terza colonna
    renderedComponent.find(GridItem).at(2).simulate('click');
    expect(props.sortingFunction).toHaveBeenLastCalledWith(props.righe, {
      field: 'campo1',
      sort: 'desc',
      type: 'string',
    });
  });

  it('sortingFunction inattiva', () => {
    const props = {
      ...mockProps,
      sortingFunction: undefined,
    };

    const renderedComponent = shallow(<ReportGrid {...props} />);
    expect(renderedComponent.find(GridItem).at(0).props().onClick).toEqual(null);
    expect(renderedComponent.find(GridItem).at(1).props().onClick).toEqual(null);
    expect(renderedComponent.find(GridItem).at(2).props().onClick).toEqual(null);
  });
});

describe('<FlexCell />', () => {
  it('should render a FlexChild', () => {
    const renderedComponent = shallow(<FlexCell />);
    expect(renderedComponent.find(FlexChild).length).toEqual(1);
  });

  it('should render its css w/ props primo', () => {
    const renderedComponent = shallow(<FlexCell primo />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
