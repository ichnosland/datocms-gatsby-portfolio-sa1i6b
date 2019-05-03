import React from 'react';
import { shallow } from 'enzyme';

import { Link } from 'react-router-dom';
import { ButtonLink, ActionButtonLink } from '../index';

const theme = {
  brand: '#00abe5',
  light: 'rgb(109, 210, 240)',
  dark: 'rgb(0, 114, 205)',
  pale: 'rgb(199, 231, 245)',
  subtle: 'rgb(178, 208, 223)',
  fonts: {
    buttons: {
      fontFamily: 'Quicksand',
      fontWeight: '400',
    },
  },
  radius: {
    buttons: '50px',
  },
};

describe('<ButtonLink />', () => {
  it('should render a ClearLink', () => {
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" />);
    expect(renderedComponent.find(Link).length).toBe(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#">{children}</ButtonLink>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '30px';
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '40px';
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const border = '2px solid red';
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '30px';
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props standard', () => {
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" standard />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full', () => {
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" full />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props half', () => {
    const renderedComponent = shallow(<ButtonLink theme={theme} to="/#" half />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == okay', () => {
    const actioncolor = 'okay';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == help', () => {
    const actioncolor = 'help';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == error', () => {
    const actioncolor = 'error';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == action', () => {
    const actioncolor = 'action';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == escape', () => {
    const actioncolor = 'escape';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == hint', () => {
    const actioncolor = 'hint';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inactive', () => {
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" inactive />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inactive & bgcolor', () => {
    const bgcolor = 'cyan';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" inactive bgcolor={bgcolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inactive & color', () => {
    const color = 'brown';
    const renderedComponent = shallow(
      <ButtonLink theme={theme} to="/#" inactive color={color} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ActionButtonLink />', () => {
  it('should render a ButtonLink', () => {
    const renderedComponent = shallow(<ActionButtonLink to="/#" />);
    expect(renderedComponent.find(ButtonLink).length).toBe(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ActionButtonLink to="/#" id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <ActionButtonLink to="/#">{children}</ActionButtonLink>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<ActionButtonLink to="/#" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<ActionButtonLink to="/#" color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const color = 'yellow';
    const renderedComponent = shallow(<ActionButtonLink to="/#" bgcolor={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const myBorder = 'none';
    const renderedComponent = shallow(<ActionButtonLink to="/#" border={myBorder} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props center', () => {
    const Margin = 'none';
    const renderedComponent = shallow(<ActionButtonLink to="/#" center={Margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
