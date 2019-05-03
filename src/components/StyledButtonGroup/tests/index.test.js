import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import { Button } from 'components/Button';
import StyledButtonGroup, { MiniButtonGroup, ExpandButtonGroup } from '../index';


describe('<StyledButtonGroup />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<StyledButtonGroup />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<StyledButtonGroup id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its children content', () => {
    const children = '<button>ciao</button>';
    const renderedComponent = shallow(
      <StyledButtonGroup>{children}</StyledButtonGroup>
    );
    expect(renderedComponent.contains(children)).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '100px';
    const renderedComponent = shallow(<StyledButtonGroup radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bottomSpace', () => {
    const bottomSpace = '100px';
    const renderedComponent = shallow(
      <StyledButtonGroup bottomSpace={bottomSpace} >
        <Button>Uno</Button>
        <Button>Due</Button>
        <Button>Tre</Button>
        <Button>Quattro</Button>
      </StyledButtonGroup>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<MiniButtonGroup />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<MiniButtonGroup />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<MiniButtonGroup id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its children content', () => {
    const children = '<button>ciao</button>';
    const renderedComponent = shallow(
      <MiniButtonGroup>{children}</MiniButtonGroup>
    );
    expect(renderedComponent.contains(children)).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '100px';
    const renderedComponent = shallow(<MiniButtonGroup radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ExpandButtonGroup />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<ExpandButtonGroup />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ExpandButtonGroup id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its children content', () => {
    const children = '<button>ciao</button>';
    const renderedComponent = shallow(
      <ExpandButtonGroup>{children}</ExpandButtonGroup>
    );
    expect(renderedComponent.contains(children)).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props justifyContent', () => {
    const justifyContent = 'space-between';
    const renderedComponent = shallow(<ExpandButtonGroup justifyContent={justifyContent} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '100px';
    const renderedComponent = shallow(<ExpandButtonGroup radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
