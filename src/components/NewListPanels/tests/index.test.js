import React from 'react';
import { shallow } from 'enzyme';

import FlexBox, { FlexChild } from 'components/FlexBox';
import ClearLink from 'components/ClearLink';
import {
  ListItem,
  ListLink,
  ListItemText,
  ListPanelHeader,
} from '../index';

const theme = {
  brand: '#000',
  pale: '#ccc',
  radius: {
    general: '6px',
  },
};

describe('<ListItem />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<ListItem theme={theme} />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props unit', () => {
    const renderedComponent = shallow(<ListItem unit theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props locked', () => {
    const renderedComponent = shallow(<ListItem locked theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props isSelected', () => {
    const renderedComponent = shallow(<ListItem isSelected theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<ListItem color={color} theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const bgColor = 'green';
    const renderedComponent = shallow(<ListItem bgColor={bgColor} theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props justifyContent', () => {
    const justifyContent = 'center';
    const renderedComponent = shallow(<ListItem justifyContent={justifyContent} theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props first', () => {
    const renderedComponent = shallow(<ListItem theme={theme} first />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ListItemText />', () => {
  it('should render a FlexChild', () => {
    const renderedComponent = shallow(<ListItemText />);
    expect(renderedComponent.find(FlexChild).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '60px';
    const renderedComponent = shallow(<ListItemText padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props unit', () => {
    const renderedComponent = shallow(<ListItemText unit />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props locked', () => {
    const renderedComponent = shallow(<ListItemText locked />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ListPanelHeader />', () => {
  it('should render a <h2> tag', () => {
    const renderedComponent = shallow(<ListPanelHeader />);
    expect(renderedComponent.type()).toEqual('h2');
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<ListPanelHeader theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props uppercase', () => {
    const renderedComponent = shallow(<ListPanelHeader uppercase />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ListLink />', () => {
  it('should render a ClearLink', () => {
    const renderedComponent = shallow(<ListLink to="/#" theme={theme} />);
    expect(renderedComponent.find(ClearLink).length).toEqual(1);
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<ListLink to="/#" color={color} theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props hoverBgColor', () => {
    const hoverBgColor = 'green';
    const renderedComponent = shallow(<ListLink to="/#" hoverBgColor={hoverBgColor} theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
