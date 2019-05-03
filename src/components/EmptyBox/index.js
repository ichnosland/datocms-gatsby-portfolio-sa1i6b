/**
*
* EmptyBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import folder from 'images/empty-folder.png';
import { colore } from 'style/color';

export const Folder = styled.img`
  width: 30%;
  padding: 40px 0;
`;

class EmptyBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Div color={colore.ui.lightTxt} align="center">
        <Folder src={folder} />
        <p>{this.props.text}</p>
      </Div>
    );
  }
}

EmptyBox.propTypes = {
  text: PropTypes.string,
};

export default EmptyBox;
