import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import AlertBar, { AlertWrap, BarContainer } from '../index';

const theme = {
  brand: '#00abe5',
};

describe('<AlertBar />', () => {
  it('should render a AlertWrap', () => {
    const renderedComponent = shallow(<AlertBar show />);
    expect(renderedComponent.find(AlertWrap).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(
      <AlertBar show theme={theme} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(
      <AlertBar show giusto />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato', () => {
    const renderedComponent = shallow(
      <AlertBar show sbagliato />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props aiuto', () => {
    const renderedComponent = shallow(
      <AlertBar show aiuto />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props show', () => {
    const renderedComponent = shallow(
      <AlertBar show={false} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props helpFx', () => {
    const renderedComponent = shallow(
      <AlertBar show helpFx={() => { }} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<AlertWrap />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(
      <AlertWrap show />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(
      <AlertWrap show theme={theme} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(
      <AlertWrap show giusto />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato', () => {
    const renderedComponent = shallow(
      <AlertWrap show sbagliato />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props aiuto', () => {
    const renderedComponent = shallow(
      <AlertWrap show aiuto />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props show', () => {
    const renderedComponent = shallow(
      <AlertWrap show={false} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props versione', () => {
    const renderedComponent = shallow(
      <AlertWrap show versione />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<BarContainer />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(
      <BarContainer />
    );
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props helpFx', () => {
    const renderedComponent = shallow(
      <BarContainer helpFx={() => { }} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
