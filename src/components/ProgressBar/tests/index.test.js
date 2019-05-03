import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar, {
  ProgressLine,
  ProgressBox,
} from '../index';

const percentuale = 2;
const steps = true;

describe('<ProgressBar/>', () => {
  it('should render a <ProgressBox> tag', () => {
    const renderedComponent = shallow(<ProgressBar />);
    expect(renderedComponent.find(ProgressBox).length).toEqual(1);
  });

  it('should render its css w/ props lezione', () => {
    const lezione = true;
    const renderedComponent = shallow(<ProgressBar lezione={lezione} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props versione', () => {
    const versione = true;
    const renderedComponent = shallow(<ProgressBar versione={versione} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props steps', () => {
    const renderedComponent = shallow(<ProgressBar steps={steps} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ProgressBox />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<ProgressBox />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ props steps', () => {
    const renderedComponent = shallow(<ProgressBox steps />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props percentuale={0}', () => {
    const renderedComponent = shallow(<ProgressBox steps percentuale={0} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props lezione', () => {
    const renderedComponent = shallow(<ProgressBox lezione />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props versione', () => {
    const renderedComponent = shallow(<ProgressBox versione />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ProgressLine />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<ProgressLine />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css w/ props percentuale', () => {
    const renderedComponent = shallow(<ProgressLine percentuale={percentuale} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props steps', () => {
    const renderedComponent = shallow(<ProgressLine steps />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props lezione', () => {
    const renderedComponent = shallow(<ProgressLine lezione />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props versione', () => {
    const renderedComponent = shallow(<ProgressLine versione />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
