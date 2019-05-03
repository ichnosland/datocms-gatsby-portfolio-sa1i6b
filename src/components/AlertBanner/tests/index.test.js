import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import AlertBanner, { InfoBanner, IconBanner } from '../index';

describe('<AlertBanner />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<AlertBanner />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<AlertBanner id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <AlertBanner>{children}</AlertBanner>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<AlertBanner />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props tag', () => {
    const renderedComponent = shallow(<AlertBanner tag />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<AlertBanner color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '40px';
    const renderedComponent = shallow(<AlertBanner padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const border = '2px solid red';
    const renderedComponent = shallow(<AlertBanner border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props shadow', () => {
    const renderedComponent = shallow(<AlertBanner shadow />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<AlertBanner bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == okay', () => {
    const actioncolor = 'okay';
    const renderedComponent = shallow(
      <AlertBanner actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == help', () => {
    const actioncolor = 'help';
    const renderedComponent = shallow(
      <AlertBanner actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == error', () => {
    const actioncolor = 'error';
    const renderedComponent = shallow(
      <AlertBanner actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == action', () => {
    const actioncolor = 'action';
    const renderedComponent = shallow(
      <AlertBanner actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == escape', () => {
    const actioncolor = 'escape';
    const renderedComponent = shallow(
      <AlertBanner actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == hint', () => {
    const actioncolor = 'hint';
    const renderedComponent = shallow(
      <AlertBanner actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '30px';
    const renderedComponent = shallow(<AlertBanner radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '30px';
    const renderedComponent = shallow(<AlertBanner margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });


  it('should render its css w/ props theme', () => {
    const theme = {
      brand: '#00abe5',
      light: 'rgb(109, 210, 240)',
      dark: 'rgb(0, 114, 205)',
      pale: 'rgb(199, 231, 245)',
      subtle: 'rgb(178, 208, 223)',
      radius: {
        buttons: '50px',
      },
    };
    const renderedComponent = shallow(<AlertBanner border theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<InfoBanner />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<InfoBanner />);
    expect(renderedComponent.find(AlertBanner).length).toEqual(1);
  });
  it('should render its css w/ props padding', () => {
    const padding = '500px';
    const renderedComponent = shallow(<InfoBanner padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<IconBanner />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<IconBanner />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });
  it('should render its css w/ props padding', () => {
    const padding = '300px';
    const renderedComponent = shallow(<IconBanner padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
