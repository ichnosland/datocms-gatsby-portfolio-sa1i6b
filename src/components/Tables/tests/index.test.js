import React from 'react';
import { shallow } from 'enzyme';

import { Table, Tr, Td } from '../index';

describe('<Table />', () => {
  it('should render a <table> tag', () => {
    const renderedComponent = shallow(<Table />);
    expect(renderedComponent.type()).toEqual('table');
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<Table bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fixed', () => {
    const renderedComponent = shallow(<Table fixed />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props neutral', () => {
    const renderedComponent = shallow(<Table neutral />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props pricing', () => {
    const renderedComponent = shallow(<Table pricing />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Tr />', () => {
  it('should render a <tr> tag', () => {
    const renderedComponent = shallow(<Tr />);
    expect(renderedComponent.type()).toEqual('tr');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Tr id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <Tr>{children}</Tr>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css w/ props Br', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Tr Br={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props Bl', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Tr Bl={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props Bt', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Tr Bt={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props Bb', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Tr Bb={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fullBg w/o further props', () => {
    const renderedComponent = shallow(<Tr fullBg />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fullBg & Bg & color', () => {
    const color = 'yellow';
    const Bg = 'red';
    const renderedComponent = shallow(<Tr fullBg Bg={Bg} color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Td />', () => {
  it('should render a <td> tag', () => {
    const renderedComponent = shallow(<Td />);
    expect(renderedComponent.type()).toEqual('td');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Td id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <Td>{children}</Td>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css w/ props bgcolor', () => {
    const color = '1px solid red';
    const renderedComponent = shallow(<Td bgcolor={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props Br', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Td Br={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props Bl', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Td Bl={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props Bt', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Td Bt={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props Bb', () => {
    const color = '1px solid blue';
    const renderedComponent = shallow(<Td Bb={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
