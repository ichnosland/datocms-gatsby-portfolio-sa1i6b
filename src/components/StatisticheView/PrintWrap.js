/**
 *
 * PrintWrap
 *
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import media from 'style/mediainjector';

export const OnlyPrint = styled(Div)`
  display: none;
  ${media.print`
    display: block;
  `}
`;

export default class PrintWrap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { childrenvisible, children } = this.props;
    return childrenvisible ?
      children :
      <OnlyPrint>
        {children}
      </OnlyPrint>;
  }
}

PrintWrap.propTypes = {
  childrenvisible: PropTypes.bool.isRequired,
  children: PropTypes.any,
};
