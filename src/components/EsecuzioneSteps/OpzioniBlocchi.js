/**
*
* OpzioniBlocchi
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FlexBox, { FlexChild } from 'components/FlexBox';
import Div from 'components/Div';
import media from 'style/mediainjector';
import { colore } from 'style/color';

const dragColor = [
  '#f5ee97',
  '#d6f4a0',
  '#E0D5E3',
  '#ffd8bf',
  '#cde5ff',
];

const TagOpzioniBlocchi = styled(Div)`
  padding: 10px 10px 20px;
  ${media.lt667`
    padding-bottom: 10px;
  `}
`;

export const WrapOpzioniBlocchi = styled(FlexBox)`
  position: fixed;
  width: 90%;
  height: 90%;
  left: 5%;
  top: 5%;
  flex-direction: column;
  padding: 20px;
  background-color: ${colore.ui.contrast};
  border-radius: ${(props) => props.theme.radius.general};
  ${media.lt667`
    padding: 10px;
  `}
`;

WrapOpzioniBlocchi.defaultProps = {
  theme: {
    radius: {
      general: '6px',
    },
  },
};

export const OpzioneBlocchi = styled(FlexChild)`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  background-color: ${(props) => props.dragColor ? props.dragColor : 'rgba(0, 0, 0, 0.1)'};
  border-radius: ${(props) => props.theme.radius.general};
  flex: 1 auto;
  flex-grow: 1;
  &:last-child {
    margin-bottom: 0;
  }
  ${media.lt667`
    margin-bottom: 10px;
  `}
`;

OpzioneBlocchi.defaultProps = {
  theme: {
    radius: {
      general: '6px',
    },
  },
};

class OpzioniBlocchi extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { titolo, opzioni, selectFunction, indiceBlocco } = this.props;

    return (
      <WrapOpzioniBlocchi>
        <TagOpzioniBlocchi>
          {titolo}
        </TagOpzioniBlocchi>
        {opzioni.map((opzione) => (
          <OpzioneBlocchi
            key={`blocco_${indiceBlocco}_${opzione.indiceEtichetta}`}
            dragColor={dragColor[opzione.indiceEtichetta - 1]}
            onClick={() => selectFunction({
              [indiceBlocco]: {
                labelOpzione: opzione.etichetta,
                indiceLabel: opzione.indiceEtichetta,
              },
            })}
          >
            {opzione.etichettaComposita}
          </OpzioneBlocchi>
        ))}
      </WrapOpzioniBlocchi>
    );
  }
}

OpzioniBlocchi.propTypes = {
  titolo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  opzioni: PropTypes.arrayOf(
    PropTypes.shape({
      etichetta: PropTypes.string.isRequired,
      etichettaComposita: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
      ]).isRequired,
      indiceEtichetta: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectFunction: PropTypes.func.isRequired,
  indiceBlocco: PropTypes.number.isRequired,
};

export default OpzioniBlocchi;
