/**
*
* LogoPlatform
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colore } from 'style/color';
import Div from 'components/Div';
import Svg from 'components/Svg';
import logo from 'images/logos';
import media from 'style/mediainjector';

export const WrapLogoDiv = styled(Div)`
  width: ${(props) => props.width ? props.width : '100%'};
  max-width: ${(props) => props.maxWidth ? props.maxWidth : '100%'};
  margin: ${(props) => props.margin ? props.margin : '0 auto'};
  text-align: center;
  svg {
    ${(props) => props.execLogo && props.theme.logo.esecuzione};
  }
  ${({ inverse }) => inverse && css`
    svg {
      fill: ${colore.ui.contrast};
    }
  `};
  ${({ desktopOnly }) => desktopOnly && css`
    ${media.mobile`
      display: none;
    `}
  `};
  ${(props) => props.formLogo && props.theme.logo.loginForm};
`;

WrapLogoDiv.defaultProps = {
  theme: {
    brand: '#00BBEF',
    logo: {
      loginForm: css`
        width: 48%;
    `,
      esecuzione: css`
        height: 50px;
    `,
    },
  },
};

class LogoPlatform extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      className,
      width,
      height,
      maxWidth,
      margin,
      inverse,
      product,
      formLogo,
      execLogo,
      fill,
      desktopOnly,
    } = this.props;
    return (
      <WrapLogoDiv
        className={className}
        width={width}
        maxWidth={maxWidth}
        margin={margin}
        inverse={inverse}
        product={product}
        formLogo={formLogo}
        execLogo={execLogo}
        desktopOnly={desktopOnly}
      >
        <Svg {...logo[product]} fill={fill} height={height} />
      </WrapLogoDiv>
    );
  }
}

LogoPlatform.propTypes = {
  className: PropTypes.string,
  product: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  fill: PropTypes.string,
  inverse: PropTypes.bool,
  formLogo: PropTypes.bool,
  execLogo: PropTypes.bool,
  desktopOnly: PropTypes.bool,
};

export default LogoPlatform;
