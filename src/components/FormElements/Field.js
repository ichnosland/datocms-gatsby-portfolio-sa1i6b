/**
*
* Field
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colore } from 'style/color';
import FlexBox from 'components/FlexBox';
import Spinner from 'components/Spinner';
import { BasicInputStyle, FormMessage } from './index';

export const Input = styled.input`
  ${BasicInputStyle};
  &[type="search"] {
    box-sizing: border-box;
    text-align: left;
    border-radius: ${(props) => props.theme.radius.searchBox};
    background-color: ${colore.ui.contrast};
  }
  ${(props) => props.landing && css`
    order: 2;
    margin-bottom: 12px;
    width: 100%;
    appearance: none;
    background-color: white;
    background-image: none;
    padding: 6px 13px 6px 13px;
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

Input.defaultProps = {
  theme: {
    brand: '#00BBEF',
    subtle: '#B4E1FF',
    light: '#C9E4FF',
    radius: {
      searchBox: '100px',
    },
  },
};

class Field extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { input, note, align, label, type, meta: { asyncValidating, touched, error }, landing } = this.props;
    return (
      <FlexBox direction="column">
        <Input
          {...input}
          placeholder={label}
          type={type}
          note={note}
          align={align}
          landing={landing}
        />
        {asyncValidating && <Spinner size="small" />}
        {touched && error && <FormMessage landing={landing}>{error}</FormMessage>}
      </FlexBox>
    );
  }
}

Input.defaultProps = {
  theme: {
    radius: {
      searchBox: '100px',
    },
  },
};

Field.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  note: PropTypes.bool,
  landing: PropTypes.bool,
  align: PropTypes.string,
};

export default Field;
