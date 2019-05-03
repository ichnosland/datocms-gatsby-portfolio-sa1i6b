/**
*
* ListSideBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';

import Svg from 'components/Svg';
import { FlexChild } from 'components/FlexBox';
import ProgressBar from 'components/ProgressBar';
import media from 'style/mediainjector';
import icon from 'icons/globals';
import { colore } from 'style/color';

export const RightCareticon = styled(Svg)`
  margin-left: 9px;
`;

export const Usericon = styled(Svg)`
  margin-right: 6px;
`;

export const Lessonicon = styled(Svg)`
  display: block;
  outline: 1px solid ${(props) => darken(0.15, props.theme.pale)};
  outline-offset: 3px;
  border-radius: 3px;
  fill: ${(props) => darken(0.25, props.theme.pale)};
`;

Lessonicon.defaultProps = {
  theme: {
    pale: '#999',
  },
};

export const SideBox = styled(FlexChild)`
  padding: 0 16px;
  input {
    margin-left: 10px;
  }
`;

const SideBoxTxt = styled(FlexChild)`
  font-size: 14px;
  color: ${colore.ui.lightTxt};
  position: relative;
  padding: 6px 9px;
  border: 1px solid ${colore.ui.darkBg};
  border-radius: 3px;
  ${media.lt480`
      font-size: 12px;
  `}
`;

class ListSideBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      locked,
      assigned,
      retired,
      percentuale,
      checkbox,
      radio,
      studenti,
      txt,
      lesson,
      checkBoxFunction,
      isChecked,
    } = this.props;
    return (
      <SideBox>
        {locked &&
          <Svg {...icon.lock} fill={colore.ui.darkBg} />
        }
        {assigned && !retired &&
          <Svg {...icon.bell} fill={colore.actions.help} />
        }
        {retired &&
          <Svg {...icon.bellRemove} fill={colore.ui.darkBg} />
        }
        {percentuale >= 0 &&
          <ProgressBar
            steps
            percentuale={percentuale}
          />
        }
        {checkbox && <input type="checkbox" onChange={/* istanbul ignore next */ () => { }} onClick={checkBoxFunction} checked={isChecked}></input>}
        {radio && <input type="radio" onChange={/* istanbul ignore next */ () => { }} onClick={checkBoxFunction} checked={isChecked}></input>}
        {studenti >= 0 &&
          <SideBoxTxt>
            <Usericon {...icon.smallUser} fill={colore.ui.neutralBg} />
            {studenti}
            <RightCareticon {...icon.caretRight} />
          </SideBoxTxt>
        }
        {txt &&
          <SideBoxTxt>{txt}</SideBoxTxt>
        }
        {lesson &&
          <Lessonicon {...icon.lesson} />
        }
      </SideBox>
    );
  }
}

ListSideBox.propTypes = {
  lesson: PropTypes.bool,
  locked: PropTypes.bool,
  assigned: PropTypes.bool,
  retired: PropTypes.bool,
  checkbox: PropTypes.bool,
  radio: PropTypes.bool,
  studenti: PropTypes.number,
  percentuale: PropTypes.number,
  txt: PropTypes.string,
  checkBoxFunction: PropTypes.func,
};

export default ListSideBox;
