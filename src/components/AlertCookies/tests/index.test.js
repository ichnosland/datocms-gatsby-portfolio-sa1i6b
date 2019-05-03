import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import { Button } from 'components/Button';
import AlertCookies, { AlertCookiesWrap, CookiesBanner } from '../index';

describe('<AlertCookies />', () => {
  it('should render a AlertCookiesWrap', () => {
    const renderedComponent = shallow(<AlertCookies show />);
    expect(renderedComponent.find(AlertCookiesWrap).length).toEqual(1);
  });

  it('should test onClickFunction', () => {
    const onClickFx = jest.fn();
    const renderedComponent = shallow(
      <AlertCookies onClickFunction={onClickFx} show />
    );
    expect(onClickFx).not.toHaveBeenCalled();
    renderedComponent.find(Button).simulate('click');
    expect(onClickFx).toHaveBeenCalled();
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<AlertCookiesWrap />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<AlertCookiesWrap />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });
  it('should not render if show != true', () => {
    const show = false;
    const renderedComponent = shallow(<AlertCookiesWrap show={show} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CookiesBanner />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<CookiesBanner />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });
  it('should render its css w/ props color', () => {
    const color = '#ffcc00';
    const renderedComponent = shallow(<CookiesBanner color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props border', () => {
    const border = '3px dotted green';
    const renderedComponent = shallow(<CookiesBanner border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<CookiesBanner bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
