import React from 'react';
import { shallow } from 'enzyme';

import Paragraph, { LegalInfo, Separator, SeparatorText } from '../index';

const theme = {
  brand: '#00BBEF',
  darken: '#1588AA',
};

describe('<Paragraph />', () => {
  it('should render a <p> tag', () => {
    const renderedComponent = shallow(<Paragraph />);
    expect(renderedComponent.type()).toEqual('p');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Paragraph id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its css w/ props color', () => {
    const renderedComponent = shallow(<Paragraph color="ffcc00" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props align', () => {
    const renderedComponent = shallow(<Paragraph align="center" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props transform', () => {
    const renderedComponent = shallow(<Paragraph transform="uppercase" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fontSize', () => {
    const fontSize = '32px';
    const renderedComponent = shallow(<Paragraph fontSize={fontSize} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const renderedComponent = shallow(<Paragraph margin="0 auto" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '20px';
    const renderedComponent = shallow(<Paragraph padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const renderedComponent = shallow(<Paragraph border="2px solid red" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const renderedComponent = shallow(<Paragraph bgColor="yellow" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props userSelect', () => {
    const renderedComponent = shallow(<Paragraph userSelect="none" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props noPrint', () => {
    const renderedComponent = shallow(<Paragraph noPrint />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(
      <Paragraph theme={theme} >
        <a href="/#">Ciao</a>
      </Paragraph>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<LegalInfo />', () => {
  it('should render a Paragraph', () => {
    const renderedComponent = shallow(<LegalInfo />);
    expect(renderedComponent.find(Paragraph).length).toEqual(1);
  });

  it('should render its css w/ props color', () => {
    const renderedComponent = shallow(<LegalInfo color="red" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Separator />', () => {
  it('should render a Paragraph', () => {
    const renderedComponent = shallow(<Separator />);
    expect(renderedComponent.find(Paragraph).length).toEqual(1);
  });

  it('should render its css w/ props noPrint', () => {
    const renderedComponent = shallow(<Separator noPrint />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inverse', () => {
    const renderedComponent = shallow(<Separator inverse />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '0 auto';
    const renderedComponent = shallow(<Separator margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SeparatorText />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(<SeparatorText />);
    expect(renderedComponent.type()).toEqual('span');
  });

  it('should render its css w/ props color', () => {
    const color = 'yellow';
    const renderedComponent = shallow(<SeparatorText color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'blue';
    const renderedComponent = shallow(<SeparatorText bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
