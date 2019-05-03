/**
*
* Separator
*
*/


import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FlexWrap from 'components/FlexBox';

export const SeparatorBg = styled.div`
  background-image: url('data:image/svg+xml;utf8,<svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg"><path fill="${(props) => props.fill ? props.fill : props.theme.light}" d="M0 0h4v4H0z" fill-rule="evenodd"/></svg>');
  background-size: 1px 1px;
  background-position: center;
  background-repeat: repeat-x;
  flex-grow: 1;
  align-self: stretch;
`;

export const SeparatorText = styled.span`
  color: ${(props) => props.color ? props.color : props.theme.light};
  display: inline-block;
  padding: 0.5em;
  position: relative;
`;

class Separator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { text, color } = this.props;
    return (
      <FlexWrap>
        <SeparatorBg fill={color} />
        <SeparatorText color={color}>{text}</SeparatorText>
        <SeparatorBg fill={color} />
      </FlexWrap>
    );
  }
}

Separator.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
};

export default Separator;
