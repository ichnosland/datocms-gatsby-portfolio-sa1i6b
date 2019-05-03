/**
*
* Image
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import media from 'style/mediainjector';

export const ImageShell = styled.img`
  display: ${(props) => props.display};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  ${({ responsive }) => responsive && css`
    display: block;
    width: 100%;
    max-width: 100%;
  `}
  ${media.print`
    ${({ noPrint }) => noPrint && css`
        display: none;
    `}
  `}
`;

class Image extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      display,
      border,
      width,
      maxWidth,
      height,
      padding,
      margin,
      responsive,
      noPrint,
      src,
      alt,
      className,
    } = this.props;
    return (
      <ImageShell
        display={display}
        border={border}
        width={width}
        maxWidth={maxWidth}
        height={height}
        padding={padding}
        margin={margin}
        responsive={responsive}
        noPrint={noPrint}
        alt={alt}
        src={src}
        className={className}
      />
    );
  }
}

Image.propTypes = {
  display: PropTypes.string,
  border: PropTypes.string,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  responsive: PropTypes.bool,
  noPrint: PropTypes.bool,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;
