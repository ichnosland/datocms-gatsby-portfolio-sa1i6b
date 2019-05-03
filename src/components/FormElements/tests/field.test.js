import React from 'react';
import { shallow } from 'enzyme';
import Spinner from 'components/Spinner';
import Field, { Input } from '../Field';
import { FormMessage } from '../index';

const props = {
  input: {},
  label: 'placeholder',
  type: 'text',
  meta: {},
};
const theme = {
  brand: '#111111',
  light: '#333333',
  subtle: '#ffffff',
  radius: {
    searchBox: '80px',
    general: '6px',
  },
};

describe('<Field /> ', () => {
  it('should render an Input', () => {
    const renderedComponent = shallow(<Field {...props} />);
    expect(renderedComponent.find(Input).length).toEqual(1);
  });

  it('should render the placeholder', () => {
    const renderedComponent = shallow(<Field {...props} />);
    expect(renderedComponent.find(Input).prop('placeholder')).toBe(props.label);
  });

  it('should render the error', () => {
    const rendered = {
      ...props,
      meta: {
        touched: true,
        error: 'un errore',
      },
    };
    const error = <FormMessage>{rendered.meta.error}</FormMessage>;
    const renderedComponent = shallow(<Field {...rendered} />);
    expect(renderedComponent.contains(error)).toBe(true);
  });

  it('should render the Spinner', () => {
    const rendered = {
      ...props,
      meta: {
        asyncValidating: true,
      },
    };
    const renderedComponent = shallow(<Field {...rendered} />);
    expect(renderedComponent.contains(<Spinner size="small" />)).toBe(true);
  });

  it('should render its css w/ props note', () => {
    const renderedComponent = shallow(<Field {...props} note />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props align', () => {
    const align = 'right';
    const renderedComponent = shallow(<Field {...props} align={align} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Input />', () => {
  it('should render a <input> tag', () => {
    const renderedComponent = shallow(<Input />);
    expect(renderedComponent.type()).toEqual('input');
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<Input theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props note', () => {
    const renderedComponent = shallow(<Input note />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props align', () => {
    const align = 'center';
    const renderedComponent = shallow(<Input align={align} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props landing', () => {
    const renderedComponent = shallow(<Input landing />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

