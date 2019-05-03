import React from 'react';
import { shallow } from 'enzyme';

import {
  CardForm,
  FormElement,
  FormMessage,
} from '../index';

const theme = {
  radius: {
    general: '6px',
  },
};

describe('CardForm', () => {
  it('should render a form', () => {
    const renderedComponent = shallow(<CardForm />);
    expect(renderedComponent.find('form').length).toBe(1);
  });

  it('should render its css w/ props product', () => {
    const product = 'alatin';
    const renderedComponent = shallow(<CardForm product={product} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('FormElement', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<FormElement />);
    expect(renderedComponent.find('Div').length).toBe(1);
  });

  it('should render its css w/ props errore', () => {
    const renderedComponent = shallow(<FormElement errore />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '0';
    const renderedComponent = shallow(<FormElement margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<FormMessage />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<FormMessage />);
    expect(renderedComponent.type()).toEqual('span');
  });

  it('should render its css w/ props color', () => {
    const color = 'yellow';
    const renderedComponent = shallow(<FormMessage color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<FormMessage theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props landing', () => {
    const renderedComponent = shallow(<FormMessage landing />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
