import React from 'react';
import { shallow } from 'enzyme';

import { H1, HiddenH1, H2, H3, H4 } from '../index';

describe('<H1 />', () => {
  it('should render an <h1> tag', () => {
    const renderedComponent = shallow(<H1 />);
    expect(renderedComponent.type()).toEqual('h1');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<H1 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H1>{children}</H1>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<H1 />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<H1 color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '100px';
    const renderedComponent = shallow(<H1 margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '32px';
    const renderedComponent = shallow(<H1 padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props center', () => {
    const renderedComponent = shallow(<H1 center />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props normal', () => {
    const renderedComponent = shallow(<H1 normal />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = { brand: '#00BBEF' };
    const renderedComponent = shallow(<H1 theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<HiddenH1 />', () => {
  it('should render an <h1> tag', () => {
    const renderedComponent = shallow(<HiddenH1 />);
    expect(renderedComponent.type()).toEqual('h1');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<HiddenH1 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <HiddenH1>{children}</HiddenH1>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<HiddenH1 />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<H2 />', () => {
  it('should render an <h2> tag', () => {
    const renderedComponent = shallow(<H2 />);
    expect(renderedComponent.type()).toEqual('h2');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<H2 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H2>{children}</H2>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<H2 />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<H2 color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props opacity', () => {
    const opacity = '0.6';
    const renderedComponent = shallow(<H2 opacity={opacity} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '100px';
    const renderedComponent = shallow(<H2 margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '50px';
    const renderedComponent = shallow(<H2 padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props center', () => {
    const renderedComponent = shallow(<H2 center />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props normal', () => {
    const renderedComponent = shallow(<H2 normal />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<H3 />', () => {
  it('should render an <h3> tag', () => {
    const renderedComponent = shallow(<H3 />);
    expect(renderedComponent.type()).toEqual('h3');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<H3 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H3>{children}</H3>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<H3 />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<H3 color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props opacity', () => {
    const opacity = '0.7';
    const renderedComponent = shallow(<H3 opacity={opacity} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '100px';
    const renderedComponent = shallow(<H3 margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '70px';
    const renderedComponent = shallow(<H3 padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props center', () => {
    const renderedComponent = shallow(<H3 center />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props normal', () => {
    const renderedComponent = shallow(<H3 normal />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<H4 />', () => {
  it('should render an <H4> tag', () => {
    const renderedComponent = shallow(<H4 />);
    expect(renderedComponent.type()).toEqual('h4');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<H4 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H4>{children}</H4>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<H4 />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<H4 color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props opacity', () => {
    const opacity = '0.7';
    const renderedComponent = shallow(<H4 opacity={opacity} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '100px';
    const renderedComponent = shallow(<H4 margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '30px';
    const renderedComponent = shallow(<H4 padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props center', () => {
    const renderedComponent = shallow(<H4 center />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props normal', () => {
    const renderedComponent = shallow(<H4 normal />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
