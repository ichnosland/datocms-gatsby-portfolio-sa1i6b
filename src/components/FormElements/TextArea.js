/**
*
* TextArea
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Spinner from 'components/Spinner';
import FlexBox from 'components/FlexBox';
import { BasicInputStyle, FormMessage } from './index';

export const Textarea = styled.textarea`
  display: block;
  ${BasicInputStyle};
  text-align: left;
  ${(props) => props.landing && css`
    order: 2;
    margin-bottom: 18px;
    min-height: 200px;
    resize: none;
    appearance: none;
    background-image: none;
    border: none;
    border-radius: 3px;
    &::placeholder {
      position: relative;
      color: rgba(0, 0, 0, 0.3);
      opacity:1;
      overflow: visible;
    }
  `}
`;

class TextArea extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { landing, input, label, meta: { asyncValidating, touched, error } } = this.props;
    return (
      <FlexBox direction="column">
        <Textarea {...input} placeholder={label} landing={landing} />
        {asyncValidating && <Spinner size="small" />}
        {touched && error && <FormMessage landing={landing}>{error}</FormMessage>}
      </FlexBox>
    );
  }
}

TextArea.propTypes = {
  landing: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default TextArea;
