import React from 'react';
import { shallow } from 'enzyme';

import RadioCheck,
{
  RadioCheckLabel,
  FakeRadioCheck,
} from '../RadioCheck';

const type = 'radio';
const checkbox = 'checkbox';
const radio = 'radio';
const theme = {
  brand: '#111111',
};

describe('<RadioCheck />', () => {
  it('should render a RadioCheckLabel', () => {
    const renderedComponent = shallow(<RadioCheck type={type} />);
    expect(renderedComponent.find(RadioCheckLabel).length).toEqual(1);
  });

  it('should render its css w/ props type === radio if !hasImage', () => {
    const renderedComponent = shallow(<RadioCheck type={radio} hasImage={false} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === checkbox if !hasImage', () => {
    const renderedComponent = shallow(<RadioCheck type={checkbox} hasImage={false} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === radio && hasImage', () => {
    const renderedComponent = shallow(<RadioCheck type={radio} hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === checkbox && hasImage', () => {
    const renderedComponent = shallow(<RadioCheck type={checkbox} hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props checked', () => {
    const renderedComponent = shallow(<RadioCheck type={type} checked />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(<RadioCheck type={type} giusto />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato', () => {
    const renderedComponent = shallow(<RadioCheck type={type} sbagliato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its label w/ props label', () => {
    const label = 'Etichetta';
    const renderedComponent = shallow(<RadioCheck type={type} label={label} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its label w/ props hasImage', () => {
    const renderedComponent = shallow(<RadioCheck type={type} hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<RadioCheckLabel />', () => {
  it('should render a <label> tag', () => {
    const renderedComponent = shallow(<RadioCheckLabel />);
    expect(renderedComponent.type()).toEqual('label');
  });

  it('should render its css w/ props type === radio && !hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={radio} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === checkbox && !hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={checkbox} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === radio && hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={radio} hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === checkbox && hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={checkbox} hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props checked && !hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={type} checked />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props checked && hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={type} checked hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto && !hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={type} giusto />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato && !hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={type} sbagliato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto && hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={type} giusto hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato && hasImage', () => {
    const renderedComponent = shallow(<RadioCheckLabel type={type} sbagliato hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<RadioCheckLabel type={type} bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<FakeRadioCheck />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<FakeRadioCheck />);
    expect(renderedComponent.type()).toEqual('span');
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<FakeRadioCheck checked theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === radio', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={radio} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props type === checkbox', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={checkbox} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props checked', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={type} checked />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={type} giusto />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={type} sbagliato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props hasImage', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={type} hasImage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should be checked w/ props readOnly', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={type} readonly />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should be checked w/ onChangeFunction', () => {
    const renderedComponent = shallow(<FakeRadioCheck type={type} onChangeFunction={() => { }} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
