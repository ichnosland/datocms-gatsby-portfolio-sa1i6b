/**
*
* InputRadioCheck
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RadioCheckLabel, FakeRadioCheck } from './RadioCheck';

export const RadioCheckInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -1;
`;

class InputRadioCheck extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { label, type, id, input, bgcolor } = this.props;

    return (
      <RadioCheckLabel
        type={type}
        checked={input.checked}
        htmlFor={id}
        bgcolor={bgcolor}
      >
        <RadioCheckInput
          {...input}
          type={type}
          id={id}
        />
        <FakeRadioCheck type={type} checked={input.checked} />
        {label}
      </RadioCheckLabel>
    );
  }
}

InputRadioCheck.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  input: PropTypes.object,
  bgcolor: PropTypes.string,
};

export default InputRadioCheck;
