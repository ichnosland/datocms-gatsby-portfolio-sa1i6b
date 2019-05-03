/**
*
* Select
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import FlexBox from 'components/FlexBox';
import Svg from 'components/Svg';
import icon from 'icons/globals';
import media from 'style/mediainjector';
import { colore } from 'style/color';

export const SelectChevron = styled(FlexBox)`
  width: 28px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
  svg {
    fill: ${(props) => props.arrowColor ? props.arrowColor : colore.ui.contrast};
  }
`;

const borderStyle = css`
  border-top: none;
  border-right: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
`;

export const SelectBox = styled.div`
  position: relative;
  flex-shrink: 0;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  ${({ border }) => !border && borderStyle};
  background-color: ${(props) => props.bgColor ? props.bgColor : props.theme.darken};
  border-radius: ${(props) => props.radius ? props.radius : '3px'};
`;

SelectBox.defaultProps = {
  theme: {
    darken: '#1588AA',
  },
};

export const SelectMenu = styled.select`
  appearance: none;
  display: block;
  width: 100%;
  color: ${(props) => props.color ? props.color : colore.ui.contrast};
  border: none;
  background: none;
  option {
    color: ${(props) => props.optioncolor ? props.optioncolor : colore.ui.darkTxt};
  }
  padding: 0.389em 28px 0.389em 16px;
  &:focus {
    outline: none;
    }
  ${media.lt480`
    padding-left: 9px;
  `}
`;

class Select extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      margin,
      padding,
      radius,
      bgColor,
      border,
      onChangeFunction,
      color,
      optioncolor,
      arrowColor,
      selectItems,
      selectedKey,
    } = this.props;
    return (
      <SelectBox
        bgColor={bgColor}
        margin={margin}
        padding={padding}
        radius={radius}
        border={border}
      >
        <SelectMenu color={color} optioncolor={optioncolor} onChange={(e) => onChangeFunction(e)} value={selectedKey}>
          {selectItems.map(
            (item) => (
              <option
                key={item.key}
                value={item.key}
              >
                {item.name}
              </option>
            )
          )}
        </SelectMenu>
        <SelectChevron arrowColor={arrowColor} >
          <Svg {...icon.chevronDown} />
        </SelectChevron>
      </SelectBox>
    );
  }
}

Select.propTypes = {
  selectItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  margin: PropTypes.string,
  padding: PropTypes.string,
  radius: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  optioncolor: PropTypes.string,
  arrowColor: PropTypes.string,
  onChangeFunction: PropTypes.func,
};

export default Select;
