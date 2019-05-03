/**
*
* ToolBarButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Button } from 'components/Button';
import { colore } from 'style/color';
import media from 'style/mediainjector';
import Svg from 'components/Svg';
import icon from 'icons/globals';

export const round = css`
  width: 60px;
  padding: 0;
  border-radius: 100%;
`;

export const ToolBarBtn = styled(Button)`
  color: ${colore.ui.lightTxt};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-size: 2.4rem;
  ${media.lt667`
    font-size: 1.8rem;
  `}
  padding: 0;
  background-color: #ececec;
  pointer-events: auto;
  ${media.mobile`
    background-color: ${colore.ui.lightBg};
  `}
  ${({ enabled }) => enabled && css`
    color: ${colore.ui.contrast};
    background-color: ${colore.actions.okay};
    ${media.mobile`
      background-color: ${colore.actions.okay};
    `}
  `};
  ${({ hide }) => hide && css`
    display:none;
  `};
  ${({ help }) => help && css`
    ${round};
    background-color: ${colore.actions.help};
    ${media.mobile`
      background-color: ${colore.actions.help};
    `}
  `};
  ${({ skip }) => skip && css`
    ${round};
    background-color: ${colore.actions.action};
    ${media.mobile`
      background-color: ${colore.actions.action};
    `}
  `};
  ${({ check }) => check && css`
    ${round};
  `};
  ${({ full }) => full && css`
    width: 100%;
    padding: 0 20px;
    ${({ enabled }) => enabled && css`
      justify-content: space-between;
      &::before {
        content: "";
        display: inline;
      }
    `};
  `};
`;

const RightCareticon = styled(Svg)`
  position: relative;
  width: 15px;
  height: 28px;
  fill: ${colore.ui.contrast};
  justify-self: flex-end;
`;

class ToolBarButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { enabled, full, help, skip, check, title, hide, className, onClickFx, refData } = this.props;
    const fullButton = (full && [
      title && <span key="toolbarbutton_title">{title}</span>,
      enabled && <RightCareticon {...icon.caretRight} key="toolbarbutton_caretIcon" />,
    ]);
    return (
      <ToolBarBtn
        className={className}
        help={help}
        skip={skip}
        innerRef={refData}
        hide={hide}
        enabled={enabled}
        full={full}
        check={check}
        onClick={onClickFx}
      >
        {help && <Svg {...icon.help} fill={colore.ui.contrast} />}
        {skip && <Svg {...icon.skip} fill={colore.ui.contrast} />}
        {check && <Svg {...icon.check} fill={colore.ui.contrast} />}
        {fullButton}
      </ToolBarBtn>
    );
  }
}

ToolBarButton.propTypes = {
  enabled: PropTypes.bool,
  full: PropTypes.bool,
  help: PropTypes.bool,
  skip: PropTypes.bool,
  check: PropTypes.bool,
  hide: PropTypes.bool,
  refData: PropTypes.object,
  title: PropTypes.string,
  className: PropTypes.string,
  onClickFx: PropTypes.func,
};

export default ToolBarButton;
