/**
*
* Carousel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import { throttle } from 'lodash';
import styled from 'styled-components';

import Div from 'components/Div';
import Svg from 'components/Svg';
import icon from 'icons/globals';
import {
  CarouselWrap,
  CarouselSlide,
  CarouselContainer,
  ArrowBox,
} from './CarouselElements';
import Indicator from './Indicator';

export const Box = styled(Div)`
  position: relative;
  width: ${(props) => props.width ? props.width : '100%'};
  max-width: ${(props) => props.maxWidth};
  margin: 0 auto;
`;

export class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      sliding: false,
      direction: undefined,
    };
  }

  componentDidMount() {
    const { displayIndex } = this.props;

    if (displayIndex > 0) {
      this.setState({
        position: displayIndex,
      });
    }
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { slides } = this.props;
    const numItems = slides.length || 1;
    return ((numItems + 1) - position + itemIndex) % numItems;
  }

  doSliding = (direction, position) => {
    this.setState({
      sliding: true,
      direction,
      position,
    });
    setTimeout(() => {
      this.setState({
        sliding: false,
      });
    }, 50);
  }

  nextSlide = () => {
    const { position } = this.state;
    const { slides } = this.props;
    const numItems = slides.length || 1;
    this.doSliding('next', position === numItems - 1 ? 0 : position + 1);
  }

  prevSlide = () => {
    const { position } = this.state;
    const { slides } = this.props;
    const numItems = slides.length;
    this.doSliding('prev', position === 0 ? numItems - 1 : position - 1);
  }

  handleSwipe = throttle((isNext) => {
    if (isNext) {
      this.nextSlide();
    } else {
      this.prevSlide();
    }
  }, 500, { trailing: false })

  render() {
    const {
      slides,
      width,
      maxWidth,
      buttonWidth,
      buttonHeight,
      leftIcon,
      rightIcon,
      iconFill,
      iconSize,
      hydeLeft,
      hydeRight,
      noIndicator,
    } = this.props;
    const { sliding, direction, position } = this.state;
    return (
      <Swipeable
        onSwipingLeft={() => this.handleSwipe(true)}
        onSwipingRight={() => this.handleSwipe()}
      >
        <Box width={width} maxWidth={maxWidth}>
          <ArrowBox
            width={buttonWidth}
            height={buttonHeight}
            sx={1}
            hidden={hydeLeft || slides.length <= 1}
            onClick={() => this.prevSlide()}
          >
            {leftIcon ?
              <Svg {...icon[leftIcon]} fill={iconFill} width={iconSize} height={iconSize} />
              :
              <Svg {...icon.caretLeft} fill={iconFill} width={iconSize} height={iconSize} />
            }
          </ArrowBox>
          <CarouselWrap buttonWidth={buttonWidth}>
            <CarouselContainer
              sliding={sliding}
              direction={direction}
              position={position}
              noTransforms={slides.length === 1}
            >
              {slides.map((slide, index) => (
                <CarouselSlide
                  key={slide.key}
                  order={this.getOrder(index)}
                >
                  {slide}
                </CarouselSlide>
              ))}
            </CarouselContainer>
          </CarouselWrap>
          <ArrowBox
            width={buttonWidth}
            height={buttonHeight}
            dx={1}
            hidden={hydeRight || slides.length <= 1}
            onClick={() => this.nextSlide()}
          >
            {rightIcon ?
              <Svg {...icon[rightIcon]} fill={iconFill} width={iconSize} height={iconSize} />
              :
              <Svg {...icon.caretRight} fill={iconFill} width={iconSize} height={iconSize} />
            }
          </ArrowBox>
          <Indicator
            length={slides.length}
            position={position}
            hidden={noIndicator || slides.length <= 1}
          />
        </Box>
      </Swipeable>
    );
  }
}

Carousel.defaultProps = {
  slides: [],
};

Carousel.propTypes = {
  slides: PropTypes.node,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  buttonWidth: PropTypes.string,
  buttonHeight: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  iconFill: PropTypes.string,
  iconSize: PropTypes.string,
  hydeLeft: PropTypes.bool,
  hydeRight: PropTypes.bool,
  noIndicator: PropTypes.bool,
};

export default Carousel;
