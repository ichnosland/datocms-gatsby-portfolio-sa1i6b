import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { alatin } from 'style/theme';

import EggButton, { WrapButton } from '../EggButton';

const product = 'itaca';
const active = true;

describe('<EggButton />', () => {
  it('should render a <WrapButton> tag', () => {
    const renderedComponent = shallow(<EggButton product={product} />);
    expect(renderedComponent.find(WrapButton).length).toEqual(1);
  });
  it('should render its css w/ props product', () => {
    const renderedComponent = shallow(<EggButton product={product} />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props active', () => {
    const renderedComponent = shallow(<EggButton product={product} active={active} />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ unexisting product menu', () => {
    const renderedComponent = shallow(<EggButton product={'notfound'} active={active} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<WrapButton />', () => {
  it('should render a <button>', () => {
    const renderedComponent = shallow(<WrapButton product={product} />);
    expect(renderedComponent.type()).toEqual('button');
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props product', () => {
    const renderedComponent = shallow(<WrapButton product={product} />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ ThemeProvider', () => {
    const renderedComponent = shallow(
      <ThemeProvider theme={alatin}>
        <WrapButton product={product} />
      </ThemeProvider>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props active', () => {
    const renderedComponent = shallow(
      <ThemeProvider theme={alatin}>
        <WrapButton product={product} active={active} />
      </ThemeProvider>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props theme', () => {
    const theme = {
      menu: {
        width: '24px',
        height: '50px',
      },
    };
    const renderedComponent = shallow(
      <WrapButton product={product} active={active} theme={theme} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
