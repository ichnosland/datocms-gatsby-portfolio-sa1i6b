/**
*
* SelectField
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/Svg';
import icon from 'icons/globals';
import { SelectBox, SelectChevron, SelectMenu } from 'components/Select';
import Spinner from 'components/Spinner';
import { FormMessage } from './index';


class SelectField extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      input,
      children,
      meta: { asyncValidating, touched, error },
      margin,
      padding,
      radius,
      bgColor,
      color,
      optioncolor,
      border,
      arrowColor,
      className,
    } = this.props;
    return ([
      touched && error && <FormMessage landing key="select_message">{error}</FormMessage>,
      <SelectBox
        key="select_box"
        margin={margin}
        padding={padding}
        radius={radius}
        bgColor={bgColor}
        color={color}
        border={border}
        className={className}
      >
        <SelectMenu
          color={color}
          optioncolor={optioncolor}
          {...input}
        >
          {children}
        </SelectMenu>
        <SelectChevron arrowColor={arrowColor}>
          <Svg {...icon.chevronDown} />
        </SelectChevron>
      </SelectBox>,
      asyncValidating && <Spinner size="small" key="select_spinner" />,
    ]);
  }
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  input: PropTypes.object,
  margin: PropTypes.string,
  padding: PropTypes.string,
  radius: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  optioncolor: PropTypes.string,
  border: PropTypes.string,
  arrowColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  meta: PropTypes.object,
};

export default SelectField;
