import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import { Grid, GridItem } from '../index';

const theme = {
  brand: '#00BBEF',
};

describe('<Grid />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<Grid />);
    expect(renderedComponent.find('Div').length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<Grid theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inline', () => {
    const renderedComponent = shallow(<Grid theme={theme} inline />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props templateColumns', () => {
    const templateColumns = '1fr 1fr 1fr';
    const renderedComponent = shallow(<Grid theme={theme} templateColumns={templateColumns} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props templateRows', () => {
    const templateRows = '1fr auto';
    const renderedComponent = shallow(<Grid theme={theme} templateRows={templateRows} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props list', () => {
    const renderedComponent = shallow(<Grid theme={theme} list />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props list & templateColumns', () => {
    const templateColumns = '1fr auto 150px';
    const renderedComponent = shallow(<Grid theme={theme} list templateColumns={templateColumns} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<GridItem />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<GridItem />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<GridItem theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props list', () => {
    const renderedComponent = shallow(<GridItem theme={theme} list />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props list + header', () => {
    const renderedComponent = shallow(<GridItem theme={theme} list header />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props textTransform', () => {
    const textTransform = 'uppercase';
    const renderedComponent = shallow(<GridItem theme={theme} textTransform={textTransform} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props list + header + active', () => {
    const renderedComponent = shallow(<GridItem theme={theme} list header active />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
