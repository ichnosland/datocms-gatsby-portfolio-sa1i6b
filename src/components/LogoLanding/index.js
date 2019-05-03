/**
*
* LogoLanding
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { APPLICATION } from 'configuration';

import { HiddenH1 } from 'components/Heading';
import Svg from 'components/Svg';
import logo from 'images/logos';

const Images = {
  LandingAlatin: 'alatin',
  LandingItaca: 'itaca',
};

export const LogoBox = styled.div`
  width: ${(props) => props.width ? props.width : '100%'};
  max-width: ${(props) => props.maxWidth ? props.maxWidth : '400px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
`;

class LogoLanding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      configuration,
      width,
      height,
      fill,
      maxWidth,
      margin,
      className,
    } = this.props;
    return (
      <LogoBox
        width={width}
        maxWidth={maxWidth}
        margin={margin}
        className={className}
      >
        <HiddenH1>
          {configuration.titoloApplicazione}
        </HiddenH1>
        {logo[Images[APPLICATION]] &&
          <Svg {...logo[Images[APPLICATION]]} fill={fill} height={height} />
        }
      </LogoBox>
    );
  }
}

LogoLanding.propTypes = {
  configuration: PropTypes.object.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  maxWidth: PropTypes.string,
  margin: PropTypes.string,
  className: PropTypes.string,
};

export default LogoLanding;
