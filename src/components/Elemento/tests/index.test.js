import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import Elemento, {
  BaseElemento,
  SubLabel,
} from '../index';

const label = 'myLabel';
const dragLabel = 'myDragLabel';

const theme = {
  brand: '#111111',
  light: '#333333',
  subtle: '#ffffff',
};

const dragColors = [
  '#f5ee97',
  '#d6f4a0',
  '#E0D5E3',
  '#ffd8bf',
  '#cde5ff',
];

describe('<Elemento />', () => {
  it('should render BaseElemento', () => {
    const renderedComponent = shallow(<Elemento label="ciao" />);
    expect(renderedComponent.find(BaseElemento).length).toEqual(1);
  });

  it('should render the props label', () => {
    const renderedComponent = shallow(<Elemento label={label} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the props dragLabel', () => {
    const renderedComponent = shallow(<Elemento label={label} dragLabel={dragLabel} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props inattivo', () => {
    const renderedComponent = shallow(<Elemento label={label} inattivo />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props disabled', () => {
    const renderedComponent = shallow(<Elemento label={label} disabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props drag', () => {
    const renderedComponent = shallow(<Elemento label={label} drag />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props dragColor', () => {
    const renderedComponent = shallow(<Elemento label={label} drag dragColor={dragColors[3]} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props dragDisabled', () => {
    const renderedComponent = shallow(<Elemento label={label} drag dragDisabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props trovato', () => {
    const renderedComponent = shallow(<Elemento label={label} drag trovato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props giusto', () => {
    const renderedComponent = shallow(<Elemento label={label} drag giusto />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props sbagliato', () => {
    const renderedComponent = shallow(<Elemento label={label} drag sbagliato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props inserito', () => {
    const renderedComponent = shallow(<Elemento label={label} inserito />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props onClickFx', () => {
    const renderedComponent = shallow(<Elemento label={label} onClickFx={() => {}} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<BaseElemento />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<BaseElemento />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render the exactLabel', () => {
    const renderedComponent = shallow(<BaseElemento label={label} />);
    expect(renderedComponent.prop('label')).toEqual('myLabel');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<BaseElemento theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inattivo', () => {
    const renderedComponent = shallow(<BaseElemento inattivo />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props disabled', () => {
    const renderedComponent = shallow(<BaseElemento disabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props trovato', () => {
    const renderedComponent = shallow(<BaseElemento trovato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props drag', () => {
    const renderedComponent = shallow(<BaseElemento drag />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragDisabled', () => {
    const renderedComponent = shallow(<BaseElemento drag dragDisabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(<BaseElemento giusto />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato', () => {
    const renderedComponent = shallow(<BaseElemento sbagliato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props drag + giusto', () => {
    const renderedComponent = shallow(<BaseElemento drag giusto />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props drag + sbagliato', () => {
    const renderedComponent = shallow(<BaseElemento drag sbagliato />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inserito', () => {
    const renderedComponent = shallow(<BaseElemento inserito />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SubLabel />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<SubLabel />);
    expect(renderedComponent.find('Div').length).toEqual(1);
  });

  it('should render its css w/ props disabled', () => {
    const renderedComponent = shallow(<SubLabel disabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragDisabled', () => {
    const renderedComponent = shallow(<SubLabel dragDisabled />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragColor uno', () => {
    const renderedComponent = shallow(<SubLabel dragColor="uno" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragColor due', () => {
    const renderedComponent = shallow(<SubLabel dragColor="due" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragColor tre', () => {
    const renderedComponent = shallow(<SubLabel dragColor="tre" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragColor quattro', () => {
    const renderedComponent = shallow(<SubLabel dragColor="quattro" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragColor cinque', () => {
    const renderedComponent = shallow(<SubLabel dragColor="cinque" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
