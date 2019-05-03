/**
*
* Spinner
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import { Bounce } from './bounce';

const SpinnerWrap = styled(Div)`
  margin-top: 100px;
  text-align: center;
`;

class Spinner extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { number, bgColor, size, ringo } = this.props;
    const bounces = [...Array(number).keys()].reverse();

    return (
      <SpinnerWrap>
        {bounces.map(
          (n) => <Bounce key={n} number={n} bgColor={bgColor} size={size} ringo={ringo} />
        )}
      </SpinnerWrap>
    );
  }
}

Spinner.propTypes = {
  number: PropTypes.number,
  bgColor: PropTypes.string,
  size: PropTypes.string,
  ringo: PropTypes.bool,
};

Spinner.defaultProps = {
  number: 3,
};

export default Spinner;
