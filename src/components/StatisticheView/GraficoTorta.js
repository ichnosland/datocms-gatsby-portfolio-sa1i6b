
import React from 'react';
import PropTypes from 'prop-types';
import {
  makeVisFlexible,
  RadialChart,
  Hint,
} from 'react-vis';

import Div from 'components/Div';
import { colore } from 'style/color';
import {
  ChartBox,
  LegendaChartBox,
  Swatch,
  SwatchLabel,
} from './StatsElements';

export const FlexibleRadialChart = makeVisFlexible(RadialChart);

class GraficoMedieVotiClasse extends React.Component { // eslint-disable-line react/prefer-stateless-function
  setDidascalia = (data) => {
    const { onDidascaliaSet } = this.props;

    onDidascaliaSet({
      ...data,
      tipologiaGrafico: 'votiClasse',
      display: true,
      titolo: `${data.count} / ${data.totale}`,
      tipologia: data.tipologia,
      x: '',
      y: data.y,
    });
  }

  render() {
    const { mediaNazionale, onDidascaliaReset, didascalia } = this.props;
    const colorRange = mediaNazionale.map((media) => (media.colour));

    return (
      <ChartBox className="ChartBox torta">
        <LegendaChartBox>
          <div>
            <SwatchLabel>Punteggio 7 -10</SwatchLabel>
            <Swatch bgColor={colore.stats.pie.good} />
          </div>
          <div>
            <SwatchLabel>Punteggio 5 - 6,99</SwatchLabel>
            <Swatch bgColor={colore.stats.pie.medium} />
          </div>
          <div>
            <SwatchLabel>Punteggio 1 - 4,99</SwatchLabel>
            <Swatch bgColor={colore.stats.pie.bad} />
          </div>
        </LegendaChartBox>
        <Div width="250px" height="250px" margin="0 auto">
          <FlexibleRadialChart
            onValueMouseOver={(data) => this.setDidascalia(data)}
            onValueMouseOut={onDidascaliaReset}
            colorDomain={[2, 1, 0]}
            colorRange={colorRange}
            getAngle={/* istanbul ignore next */ (d) => d.count}
            data={mediaNazionale}
            animation
          >
            {didascalia.display && didascalia.tipologiaGrafico === 'votiClasse' && (
              <Hint
                value={didascalia}
                style={{
                  padding: '6px 10px',
                  fontSize: '14px',
                  color: '#fff',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '6px',
                }}
              >
                <div>
                  <p>{didascalia.tipologia}: {didascalia.titolo}</p>
                </div>
              </Hint>
            )}
          </FlexibleRadialChart>
        </Div>
      </ChartBox>
    );
  }
}

GraficoMedieVotiClasse.propTypes = {
  mediaNazionale: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    colour: PropTypes.string.isRequired,
  })),
  didascalia: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
    x: PropTypes.string.isRequired,
    titolo: PropTypes.string.isRequired,
  }).isRequired,
  onDidascaliaSet: PropTypes.func.isRequired,
  onDidascaliaReset: PropTypes.func.isRequired,
};

export default GraficoMedieVotiClasse;
