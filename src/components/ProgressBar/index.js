/**
*
* ProgressBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import media from 'style/mediainjector';
import { colore } from 'style/color';

const stepBg = '#1cff00';

export const ProgressBox = styled.div`
  background-color: ${(props) => props.steps ? colore.ui.neutralBg : 'rgb(216, 216, 216)'};
  position: ${(props) => props.steps ? 'relative' : 'absolute'};
  overflow: ${(props) => props.versione ? 'visible' : 'hidden'};
  z-index: 1;
  ${(props) => props.steps && css`
    width: 10px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 10px;
    border-width: 1px;
    border-style: solid;
    ${({ percentuale }) => percentuale === 0 ? css`
      border-color: ${colore.ui.darkBg};
    ` : css`
        border-color: ${stepBg};
    `};
    border-radius: 2px;
  `};
  ${(props) => props.lezione && media.desktop`
    height: 6px;
    width: 94%;
    left: 3%;
    top: -18px;
    border-radius: 9px;
  `};
  ${(props) => props.lezione && media.mobile`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
  `};
  ${(props) => props.versione && media.desktop`
    height: 2px;
    width: 100%;
    top: -12px;
    left: 0;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 0;
  `};
  ${(props) => props.versione && media.mobile`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.1);
  `};
`;

export const ProgressLine = styled.div`
  width: ${(props) => props.steps ? '10px' : `${props.percentuale}%`};
  height: ${(props) => props.steps ? `${props.percentuale}%` : '4px'};
  background-color: ${(props) => props.steps ? stepBg : colore.actions.okay};
  transition: all 2s;
  ${(props) => props.versione && css`
    top: -1px;
    position: relative;
    border-radius: 6px;
  `};
  ${(props) => props.lezione && media.desktop`
    height: 9px;
    border-radius: 9px 0 0 9px;
  `};
`;

class ProgressBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ProgressBox
        lezione={this.props.lezione}
        versione={this.props.versione}
        steps={this.props.steps}
        percentuale={this.props.percentuale}
      >
        <ProgressLine
          lezione={this.props.lezione}
          versione={this.props.versione}
          steps={this.props.steps}
          percentuale={this.props.percentuale}
        >
        </ProgressLine>
      </ProgressBox>
    );
  }
}

ProgressBar.propTypes = {
  lezione: PropTypes.bool,
  versione: PropTypes.bool,
  steps: PropTypes.bool,
  percentuale: PropTypes.number,
};

export default ProgressBar;
