/**
*
* CentralBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const FramedBox = styled(Div)`
  position: relative;
  width: 100%;
  padding: 95px 30px 100px;
  ${media.desktop`
    min-height: 480px;
    margin: 20px auto;
    background-color: ${(props) => props.unita ? props.theme.brand : colore.ui.contrast};
    border-radius: ${(props) => props.versione ? '3px' : '20px 20px 48px 48px'};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    ${(props) => props.unita && css`
      padding-bottom: 30px;
    `};
  `};
  ${(props) => props.unita && css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
    padding: 66px 30px 30px;
    color: ${colore.ui.contrast};
    text-align: center;
    background-color: ${props.theme.brand};
    h2 {
        padding: 0 30px 40px;
        ${media.lt667`
            padding: 0 20px 60px;
        `};
      }
    ${media.mobile`
      height: 100%;
      overflow: auto;
    `};
    ${media.lt480`
      padding: 66px 10px 30px;
    `};
    ${media.iphone45`
      justify-content: flex-start;
      h2 {
        padding: 10px 0 20px;
      }
    `};
  `};
  ${media.mobile`
    height: 100%;
  `};
  * {
    user-select: none;
  }
`;

FramedBox.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

class CentralBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <FramedBox
        unita={this.props.unita}
        versione={this.props.versione}
      >
        {this.props.children}
      </FramedBox>
    );
  }
}

CentralBox.propTypes = {
  unita: PropTypes.bool,
  versione: PropTypes.bool,
  children: PropTypes.any,
};

export default CentralBox;
