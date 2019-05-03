/**
*
* Svg
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SvgWrap = styled.svg`
  display: inline-block;
  fill: ${(props) => props.fill ? props.fill : props.theme.brand};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-width: ${(props) => props.minWidth ? props.minWidth : props.width};
  min-height: ${(props) => props.minHeight ? props.minHeight : props.height};
`;

SvgWrap.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

class Svg extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { viewBox, width, height, minWidth, minHeight, fill, className, path } = this.props;
    return (
      <SvgWrap
        viewBox={viewBox}
        width={width}
        height={height}
        minWidth={minWidth}
        minHeight={minHeight}
        fill={fill}
        className={className}
      >
        {path}
      </SvgWrap>
    );
  }
}

Svg.propTypes = {
  viewBox: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  minHeight: PropTypes.string,
  fill: PropTypes.any,
  path: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Svg;
