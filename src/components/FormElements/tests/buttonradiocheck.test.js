import React from 'react';
import { shallow } from 'enzyme';

import ButtonRadioCheck, { ButtonRadioCheckLabel } from '../ButtonRadioCheck';

const type = 'radio';
const input = {
  checked: true,
};

describe('<ButtonRadioCheck />', () => {
  it('should render a ButtonRadioCheckLabel', () => {
    const renderedComponent = shallow(<ButtonRadioCheck type={type} input={input} />);
    expect(renderedComponent.find(ButtonRadioCheckLabel).length).toEqual(1);
  });

  it('should render its css w/ props type', () => {
    const renderedComponent = shallow(<ButtonRadioCheck type={type} input={input} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its label w/ props label', () => {
    const label = 'Etichetta';
    const renderedComponent = shallow(<ButtonRadioCheck type={type} input={input} label={label} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});


describe('<ButtonRadioCheckLabel />', () => {
  it('should render a <label> tag', () => {
    const renderedComponent = shallow(<ButtonRadioCheckLabel />);
    expect(renderedComponent.type()).toEqual('label');
  });

  it('should render its css w/ props checked', () => {
    const checked = true;
    const renderedComponent = shallow(<ButtonRadioCheckLabel checked={checked} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ theme', () => {
    const theme = {
      brand: '#00BBEF',
      pale: 'rgb(199, 231, 245)',
      radius: {
        general: '6px',
      },
    };
    const renderedComponent = shallow(<ButtonRadioCheckLabel type={type} theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
