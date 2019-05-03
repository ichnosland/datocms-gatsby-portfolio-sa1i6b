import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import Select, { SelectBox, SelectMenu, SelectChevron } from '../index';

const theme = [{
  darken: '#ff0000',
}];

describe('<Select />', () => {
  it('should count Select options', () => {
    const items = [{
      key: 10,
      name: 'Nome 1',
    }, {
      key: 20,
      name: 'Nome 2',
    }];
    const renderedComponent = shallow(
      <Select selectItems={items} />
    );
    expect(renderedComponent.find('option').length).toBe(items.length);
  });

  it('should call onChangeFunction on Select change', () => {
    const mockParams = {
      onChangeFunction: jest.fn(),
      selectItems: [{
        key: 10,
        name: 'titolo',
      }],
    };
    const renderedComponent = shallow(
      <Select {...mockParams} />
    );
    renderedComponent.find(SelectMenu).simulate('change', { data: 123 });
    expect(mockParams.onChangeFunction).toHaveBeenCalledWith({ data: 123 });
  });
});

describe('<SelectBox />', () => {
  it('should render a div tag', () => {
    const renderedComponent = shallow(<SelectBox />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<SelectBox theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const bgColor = '#000';
    const renderedComponent = shallow(<SelectBox bgColor={bgColor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '20px';
    const renderedComponent = shallow(<SelectBox margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '200px';
    const renderedComponent = shallow(<SelectBox padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '30px';
    const renderedComponent = shallow(<SelectBox radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const border = '3px dotted red';
    const renderedComponent = shallow(<SelectBox border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SelectMenu />', () => {
  it('should render a <select> tag', () => {
    const renderedComponent = shallow(<SelectMenu />);
    expect(renderedComponent.type()).toEqual('select');
  });

  it('should render its css w/ props color', () => {
    const color = 'yellow';
    const renderedComponent = shallow(<SelectMenu color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props optioncolor', () => {
    const optioncolor = 'red';
    const renderedComponent = shallow(<SelectMenu optioncolor={optioncolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const bgColor = 'red';
    const renderedComponent = shallow(<SelectMenu bgColor={bgColor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SelectChevron />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<SelectChevron />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props arrowColor', () => {
    const arrowColor = 'green';
    const renderedComponent = shallow(<SelectChevron arrowColor={arrowColor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
