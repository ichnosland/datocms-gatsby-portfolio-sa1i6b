import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import { CarouselWrap, CarouselSlide, CarouselContainer, ArrowBox } from '../CarouselElements';

describe('<CarouselWrap />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <CarouselWrap />
    );
    expect(renderedComponent.find(Div).length).toBe(1);
  });

  it('should calc its width 100% minus double the props buttonWidth', () => {
    const buttonWidth = '10px';
    const renderedComponent = shallow(
      <CarouselWrap buttonWidth={buttonWidth} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CarouselSlide />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <CarouselSlide />
    );
    expect(renderedComponent.find(Div).length).toBe(1);
  });
});

describe('<CarouselContainer />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <CarouselContainer />
    );
    expect(renderedComponent.find(Div).length).toBe(1);
  });

  it('should render its css w/ props flexGrow', () => {
    const flexGrow = '0';
    const renderedComponent = shallow(
      <CarouselContainer flexGrow={flexGrow} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its childrens css w/ props next', () => {
    const renderedComponent = shallow(
      <CarouselContainer next>
        <table>
          <tr><td>table</td></tr>
        </table>
      </CarouselContainer>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its childrens css w/ props prev', () => {
    const renderedComponent = shallow(
      <CarouselContainer prev>
        <div>
          <p>Ciao</p>
        </div>
      </CarouselContainer>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should it should animate onwards if props sliding is true', () => {
    const renderedComponent = shallow(
      <CarouselContainer sliding>
        <div>
          <p>Ciao</p>
        </div>
      </CarouselContainer>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should it should animate backwards if props props sliding is true and direction === "prev"', () => {
    const direction = 'prev';
    const renderedComponent = shallow(
      <CarouselContainer sliding direction={direction}>
        <div>
          <p>Ciao</p>
        </div>
      </CarouselContainer>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should do not animate if noTransform === true', () => {
    const renderedComponent = shallow(
      <CarouselContainer noTransforms>
        <div>
          <p>Ciao</p>
        </div>
      </CarouselContainer>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ArrowBox />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(
      <ArrowBox />
    );
    expect(renderedComponent.find('button').length).toBe(1);
  });

  it('should render its css w/ props sx', () => {
    const renderedComponent = shallow(
      <ArrowBox sx />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dx', () => {
    const renderedComponent = shallow(
      <ArrowBox dx />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props width', () => {
    const width = '80px';
    const renderedComponent = shallow(
      <ArrowBox width={width} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const height = '300px';
    const renderedComponent = shallow(
      <ArrowBox height={height} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props height', () => {
    const renderedComponent = shallow(
      <ArrowBox hidden />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
