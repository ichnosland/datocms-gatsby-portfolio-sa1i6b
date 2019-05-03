/**
*
* Carousel / Indicator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Div from 'components/Div';

export const IdicatorWrap = styled(Div)`
  position: absolute;
  bottom: ${(props) => props.distance ? props.distance : '-40px'};
  ${({ hidden }) => hidden && css`
    display: none;
  `}
  width: 100%;
  text-align: center;
`;

export const Pip = styled.span`
  background: rgba(255, 255, 255, 0.3);
  width: 5px;
  height: 5px;
  ${({ isCurrent }) => isCurrent && css`
    background: #fff;
    width: 7px;
    height: 7px;
  `};
  margin-right: 15px;
  border-radius: 100%;
  display: inline-block;
  transition: background 0.5s ease;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export default class Indicator extends React.PureComponent {
  render() {
    const { length, position, hidden } = this.props;
    return (
      <IdicatorWrap hidden={hidden}>
        {
          Array.from({ length }, (_, i) =>
            (<Pip
              key={i}
              isCurrent={i === position}
            />))
        }
      </IdicatorWrap>
    );
  }
}

Indicator.propTypes = {
  length: PropTypes.number,
  position: PropTypes.number,
  hidden: PropTypes.bool,
};
