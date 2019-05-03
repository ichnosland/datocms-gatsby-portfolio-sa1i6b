/**
 *
 * Carosello
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import TabelleList from 'components/TabelleList';
import Carousel from 'components/Carousel';

export default class CaroselloView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { tabelle } = this.props;
    return (
      <Carousel
        buttonWidth="40px"
        iconSize="32px"
        noIndicator
        slides={
          tabelle.map((tabella) => (
            <TabelleList
              key={`carosello_risposte_${tabella.key}`}
              tabelle={[{
                intestazione: tabella.titolo,
                righe: tabella.righe.map((r) => (
                  [{ titolo: r.label }, { titolo: r.valore }]
                )),
              }]}
            />
          ))
        }
      />
    );
  }
}

CaroselloView.propTypes = {
  tabelle: PropTypes.arrayOf(
    PropTypes.shape({
      titolo: PropTypes.string.isRequired,
      righe: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          valore: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
        })
      ).isRequired,
    }),
  ).isRequired,
};
