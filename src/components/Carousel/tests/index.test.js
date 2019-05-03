import React from 'react';
import { shallow } from 'enzyme';
import Swipeable from 'react-swipeable';

import Div from 'components/Div';
import Carousel, { Box } from '../index';
import { CarouselWrap, ArrowBox } from '../CarouselElements';

const slides = [
  <div key="item_0">Item 0</div>,
  <div key="item_1">Item 1</div>,
  <div key="item_2">Item 2</div>,
  <div key="item_3">Item 3</div>,
  <div key="item_4">Item 4</div>,
];

describe('<Carousel />', () => {
  it('should render a CarouselWrap', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    expect(renderedComponent.find(CarouselWrap).length).toBe(1);
  });

  it('should contain 2 ArrowBox', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    expect(renderedComponent.find(ArrowBox).length).toBe(2);
  });

  it('should render its style w/ props width', () => {
    const renderedComponent = shallow(
      <Carousel
        width="890px"
        slides={slides}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its style w/ props buttonWidth', () => {
    const renderedComponent = shallow(
      <Carousel
        buttonWidth="20px"
        slides={slides}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its style w/ props buttonHeight', () => {
    const renderedComponent = shallow(
      <Carousel
        buttonHeight="40px"
        slides={slides}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its left icon w/ props leftIcon', () => {
    const leftIcon = 'arrowBoldLeft';
    const renderedComponent = shallow(
      <Carousel
        buttonWidth="20px"
        slides={slides}
        leftIcon={leftIcon}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its left icon w/ props rightIcon', () => {
    const rightIcon = 'arrowBoldRight';
    const renderedComponent = shallow(
      <Carousel
        buttonWidth="20px"
        slides={slides}
        rightIcon={rightIcon}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('getOrder when no slides provided', () => {
    const renderedComponent = shallow(
      <Carousel />
    );
    const instance = renderedComponent.instance();
    expect(instance.getOrder(0)).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('getOrder when slides provided', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    expect(instance.getOrder(0)).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('getOrder with only one slide elem provided', () => {
    const renderedComponent = shallow(
      <Carousel slides={[slides[0]]} />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('nextSlide when no slides', () => {
    const renderedComponent = shallow(
      <Carousel />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'doSliding');
    instance.nextSlide();

    expect(spy).toHaveBeenCalledWith('next', 0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('nextSlide when position == 0', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'doSliding');
    instance.nextSlide();

    expect(spy).toHaveBeenCalledWith('next', 1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('nextSlide when position == 1', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    instance.setState({ position: 4 });
    const spy = jest.spyOn(instance, 'doSliding');
    instance.nextSlide();

    expect(spy).toHaveBeenCalledWith('next', 0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('prevSlide when position == 0 must push 4th element', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'doSliding');
    instance.prevSlide();

    expect(spy).toHaveBeenCalledWith('prev', 4);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('prevSlide when position == 1', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    instance.setState({ position: 1 });
    const spy = jest.spyOn(instance, 'doSliding');
    instance.prevSlide();

    expect(spy).toHaveBeenCalledWith('prev', 0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('handleSwipe next', () => {
    jest.mock('lodash/debounce', () => jest.fn((fn) => (fn)));
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spyNext = jest.spyOn(instance, 'nextSlide');
    const spyPrev = jest.spyOn(instance, 'prevSlide');
    instance.handleSwipe(true);
    expect(spyNext).toHaveBeenCalled();
    expect(spyPrev).not.toHaveBeenCalled();
  });

  it('handleSwipe prev', () => {
    jest.mock('lodash/debounce', () => jest.fn((fn) => (fn)));
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spyNext = jest.spyOn(instance, 'nextSlide');
    const spyPrev = jest.spyOn(instance, 'prevSlide');
    instance.handleSwipe();
    expect(spyNext).not.toHaveBeenCalled();
    expect(spyPrev).toHaveBeenCalled();
  });

  it('Swipeable right left', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'handleSwipe');
    expect(spy).not.toHaveBeenCalled();

    renderedComponent.find(Swipeable).props().onSwipingLeft();
    expect(spy).toHaveBeenLastCalledWith(true);

    renderedComponent.find(Swipeable).props().onSwipingRight();
    expect(spy).toHaveBeenLastCalledWith();
  });

  it('ArrowBox prev', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spyNext = jest.spyOn(instance, 'nextSlide');
    const spyPrev = jest.spyOn(instance, 'prevSlide');

    expect(spyNext).not.toHaveBeenCalled();
    expect(spyPrev).not.toHaveBeenCalled();

    renderedComponent.find(ArrowBox).at(0).simulate('click');
    expect(spyNext).not.toHaveBeenCalled();
    expect(spyPrev).toHaveBeenCalledWith();
  });

  it('ArrowBox next', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spyNext = jest.spyOn(instance, 'nextSlide');
    const spyPrev = jest.spyOn(instance, 'prevSlide');

    expect(spyNext).not.toHaveBeenCalled();
    expect(spyPrev).not.toHaveBeenCalled();

    renderedComponent.find(ArrowBox).at(1).simulate('click');
    expect(spyNext).toHaveBeenCalledWith();
    expect(spyPrev).not.toHaveBeenCalled();
  });

  it('doSliding', () => {
    jest.useFakeTimers();
    const CarouselMocked = require('../index').Carousel; // eslint-disable-line global-require
    const renderedComponent = shallow(
      <CarouselMocked
        slides={slides}
      />
    );

    expect(setTimeout).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    const spySetState = jest.spyOn(instance, 'setState');
    expect(setTimeout).toHaveBeenCalledTimes(0);

    instance.doSliding('next', 1);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(spySetState).toHaveBeenLastCalledWith({
      direction: 'next',
      position: 1,
      sliding: true,
    });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
    expect(renderedComponent).toMatchSnapshot();

    // setState deve essere chiamato alla fine con sliding: false
    jest.runAllTimers();
    expect(spySetState).toHaveBeenLastCalledWith({
      sliding: false,
    });
  });

  it('props.displayIndex > 0 should call setState', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} displayIndex={1} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setState');
    instance.componentDidMount();
    expect(spy).toHaveBeenCalledWith({
      position: 1,
    });
  });

  it('props.displayIndex > 0 should not call setState', () => {
    const renderedComponent = shallow(
      <Carousel slides={slides} />
    );
    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setState');
    instance.componentDidMount();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render its style w/ props hydeLeft', () => {
    const renderedComponent = shallow(
      <Carousel
        hydeLeft
        slides={slides}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its style w/ props hydeRight', () => {
    const renderedComponent = shallow(
      <Carousel
        hydeRight
        slides={slides}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its style w/ props iconSize', () => {
    const iconSize = '150px';
    const renderedComponent = shallow(
      <Carousel
        iconSize={iconSize}
        slides={slides}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Box />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <Box />
    );
    expect(renderedComponent.find(Div).length).toBe(1);
  });

  it('should render its style w/ props width', () => {
    const renderedComponent = shallow(
      <Box width="30px" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
