import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import { CountBadge, CountBadgeItem } from '../index';

describe('<CountBadge />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<CountBadge />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<CountBadge id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its children content', () => {
    const children = '<CountBadgeItem>1</CountBadgeItem>';
    const renderedComponent = shallow(
      <CountBadge>{children}</CountBadge>
    );
    expect(renderedComponent.contains(children)).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '100px';
    const renderedComponent = shallow(<CountBadge radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props top', () => {
    const top = '-10px';
    const renderedComponent = shallow(<CountBadge top={top} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props left', () => {
    const left = '20px';
    const renderedComponent = shallow(<CountBadge left={left} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props right', () => {
    const right = '20px';
    const renderedComponent = shallow(<CountBadge right={right} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      radius: {
        countBadge: '90%',
      },
    };
    const renderedComponent = shallow(<CountBadge theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CountBadgeItem />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<CountBadgeItem />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<CountBadgeItem id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<CountBadgeItem bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '100px';
    const renderedComponent = shallow(<CountBadgeItem radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });


  it('should render its css w/ props actioncolor == okay', () => {
    const actioncolor = 'okay';
    const renderedComponent = shallow(
      <CountBadgeItem actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == help', () => {
    const actioncolor = 'help';
    const renderedComponent = shallow(
      <CountBadgeItem actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == error', () => {
    const actioncolor = 'error';
    const renderedComponent = shallow(
      <CountBadgeItem actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == action', () => {
    const actioncolor = 'action';
    const renderedComponent = shallow(
      <CountBadgeItem actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == escape', () => {
    const actioncolor = 'escape';
    const renderedComponent = shallow(
      <CountBadgeItem actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == hint', () => {
    const actioncolor = 'hint';
    const renderedComponent = shallow(
      <CountBadgeItem actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      radius: {
        countBadge: '100%',
      },
    };
    const renderedComponent = shallow(<CountBadgeItem theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
