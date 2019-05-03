/**
*
* ToolBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ContainerStyle } from 'components/Container';
import FlexBox from 'components/FlexBox';
import media from 'style/mediainjector';

export const ToolBarWrap = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 20px;
  text-align: center;
  pointer-events: none;
  user-select:none;
  ${media.desktop`
    position: absolute;
  `}
  ${media.mobile`
    position: fixed;
    ${({ hideOnFocus }) => hideOnFocus && css`
      display: none;
    `}
  `}
  ${media.ipad`
    height: 160px;
  `}
`;

const ToolBarContainer = styled(FlexBox)`
  ${ContainerStyle}
  height: 60px;
  overflow: hidden;
  justify-content: space-between;
`;

class ToolBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children, className, hideOnFocus } = this.props;
    return (
      <ToolBarWrap
        className={className}
        hideOnFocus={hideOnFocus}
      >
        <ToolBarContainer>
          { children }
        </ToolBarContainer>
      </ToolBarWrap>
    );
  }
}

ToolBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  hideOnFocus: PropTypes.bool,
};

export default ToolBar;
