import React from 'react';
import { shallow } from 'enzyme';

import { RadioCheckLabel } from '../RadioCheck';

import InputRadioCheck, { RadioCheckInput } from '../InputRadioCheck';

const type = 'radio';
const name = 'myInputComponent';
const input = {
  checked: true,
};

describe('<InputRadioCheck />', () => {
  it('should render a RadioCheckLabel', () => {
    const renderedComponent = shallow(<InputRadioCheck type={type} input={input} />);
    expect(renderedComponent.find(RadioCheckLabel).length).toEqual(1);
  });

  it('should render its css w/ props type', () => {
    const renderedComponent = shallow(<InputRadioCheck type={type} input={input} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props name', () => {
    const renderedComponent = shallow(<InputRadioCheck type={type} input={input} name={name} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props checked', () => {
    const renderedComponent = shallow(<InputRadioCheck type={type} input={input} checked />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its label w/ props label', () => {
    const label = 'Etichetta';
    const renderedComponent = shallow(<InputRadioCheck type={type} input={input} label={label} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'green';
    const renderedComponent = shallow(<InputRadioCheck type={type} input={input} bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<RadioCheckInput />', () => {
  it('should render a <input> tag', () => {
    const renderedComponent = shallow(<RadioCheckInput type={type} />);
    expect(renderedComponent.type()).toEqual('input');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its type w/ props type', () => {
    const renderedComponent = shallow(<RadioCheckInput type={type} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its type w/ props name', () => {
    const renderedComponent = shallow(<RadioCheckInput type={type} name={name} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should be checked w/ props checked', () => {
    const renderedComponent = shallow(<RadioCheckInput type={type} checked={input.checked} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
