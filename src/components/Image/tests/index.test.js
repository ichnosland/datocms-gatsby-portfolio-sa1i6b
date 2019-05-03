import React from 'react';
import { shallow } from 'enzyme';

import SrcImage from 'images/empty-folder.png';
import Image, { ImageShell } from '../index';

const alt = 'Testo alternativo';

describe('<Image />', () => {
  it('should render ImageShell tag', () => {
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} />);
    expect(renderedComponent.find(ImageShell).length).toEqual(1);
  });

  it('should render its css w/ props display', () => {
    const display = 'block';
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} display={display} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} border="1px dotted red" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props width', () => {
    const width = '32px';
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} width={width} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props maxWidth', () => {
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} maxWidth="100px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} height="16px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '20px';
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} margin="0 auto" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props responsive', () => {
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} responsive />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props noPrint', () => {
    const renderedComponent = shallow(<Image src={SrcImage} alt={alt} noPrint />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ImageShell />', () => {
  it('should render a <img> tag', () => {
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} />);
    expect(renderedComponent.type()).toEqual('img');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props display', () => {
    const display = 'block';
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} display={display} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} border="1px dotted red" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props width', () => {
    const width = '32px';
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} width={width} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props maxWidth', () => {
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} maxWidth="100px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} height="16px" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '20px';
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} margin="0 auto" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render w/ props responsive', () => {
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} responsive />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render w/ props noPrint', () => {
    const renderedComponent = shallow(<ImageShell src={SrcImage} alt={alt} noPrint />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
