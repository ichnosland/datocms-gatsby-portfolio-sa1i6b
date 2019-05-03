/*
 *
 * MissionTag
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { colore } from 'style/color';

export const MissionTagBox = styled(FlexBox)`
  width: 25px;
  height: 100%;
  position: absolute;
  left: ${(props) => props.theme.missionTag.left};
  top: ${(props) => props.theme.missionTag.top};
  text-align: center;
  flex-direction: column;
  flex: 1 auto;
  justify-content: center;
  ${({ searchActive }) => searchActive && css`
    display: none;
  `}
`;

MissionTagBox.defaultProps = {
  theme: {
    missionTag: {
      left: '6px',
      top: '10px',
    },
  },
};

export const MissionTagNumber = styled(Div)`
  color: ${(props) => props.color ? props.color : colore.ui.contrast};
  display: inline-block;
  width: 22px;
  margin: 0 auto;
  padding: ${(props) => props.theme.missionTag.padding};
  text-align: center;
  font-weight: 700;
  background-color: ${(props) => props.bgColor ? props.bgColor : props.theme.brand};
  font-size: 11px;
  border-radius: 3px;
`;

MissionTagNumber.defaultProps = {
  theme: {
    brand: '#00BBEF',
    missionTag: {
      padding: '20px',
      top: '10px',
    },
  },
};

class MissionTag extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      number,
      color,
      bgColor,
      searchActive,
    } = this.props;
    return (
      <MissionTagBox
        searchActive={searchActive}
      >
        <MissionTagNumber
          color={color}
          bgColor={bgColor}
        >
          {number}
        </MissionTagNumber>
      </MissionTagBox>
    );
  }
}

MissionTag.propTypes = {
  number: PropTypes.number.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  searchActive: PropTypes.bool,
};

export default MissionTag;
