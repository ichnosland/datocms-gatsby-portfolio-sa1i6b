/**
*
* Scores
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const ScoresWrap = styled(Div)`
  display: inline-block;
  padding: 0 8px;
  color: ${(props) => props.theme.brand};
  background-color: ${colore.ui.contrast};
  border: 1px solid ${colore.ui.neutralBg};
  border-radius: ${(props) => props.theme.radius.buttons};
  ${media.desktop`
    padding: 2px 12px;
  `}
`;

ScoresWrap.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      buttons: '3px',
    },
  },
};

class Scores extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ScoresWrap>
        {this.props.score}
      </ScoresWrap>
    );
  }
}

Scores.propTypes = {
  score: PropTypes.string.isRequired,
};

export default Scores;
