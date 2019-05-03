import React from 'react';
import PropTypes from 'prop-types';

import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint,
} from 'react-vis';
import 'react-vis/dist/style.css';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { colore } from 'style/color';
import {
  ChartBox,
  LegendaChartBox,
  Swatch,
  SwatchLabel,
} from './StatsElements';

class GraficoMedieCompito extends React.Component { // eslint-disable-line react/prefer-stateless-function
  setDidascalia = (data) => {
    const { onDidascaliaSet } = this.props;

    onDidascaliaSet({
      tipologiaGrafico: 'medieCompito',
      display: true,
      titolo: data.titolo,
      tipologia: data.tipologia,
      y: data.y,
      x: data.x,
      campioni: data.campioni,
    });
  }

  render() {
    const {
      mediaNazionale,
      mediaClasse,
      mediaStudente,
      titoliGrafici,
      didascalia,
      onDidascaliaReset,
    } = this.props;

    return (
      <ChartBox legenda className="ChartBox istogrammi">
        <LegendaChartBox>
          <div>
            <SwatchLabel>Media di classe</SwatchLabel>
            <Swatch bgColor={colore.stats.medie.classe} />
          </div>
          <div>
            <SwatchLabel>Media nazionale</SwatchLabel>
            <Swatch bgColor={colore.stats.medie.nazionale} />
          </div>
          {mediaStudente.length > 0 &&
            <div>
              <SwatchLabel>Punteggio studente</SwatchLabel>
              <Swatch bgColor={colore.stats.medie.studente} />
            </div>
          }
        </LegendaChartBox>
        <Div width="100%" height="300px" className="grafico">
          <FlexibleXYPlot
            yDomain={[0, 10]}
            xType="ordinal"
            colorType="literal"
            animation
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            {didascalia.display && didascalia.tipologiaGrafico === 'medieCompito' && (
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
                  <p>{didascalia.titolo}</p>
                  <p>{didascalia.tipologia}: {didascalia.y}</p>
                  {didascalia.campioni && <p>Numero di campioni: {didascalia.campioni}</p>}
                </div>
              </Hint>
            )}
            <VerticalBarSeries
              onValueMouseOver={(data) => this.setDidascalia(data)}
              onValueMouseOut={onDidascaliaReset}
              data={mediaClasse}
            />
            <VerticalBarSeries
              onValueMouseOver={(data) => this.setDidascalia(data)}
              onValueMouseOut={onDidascaliaReset}
              data={mediaNazionale}
            />
            {mediaStudente.length > 0 && <VerticalBarSeries
              onValueMouseOver={(data) => this.setDidascalia(data)}
              onValueMouseOut={onDidascaliaReset}
              data={mediaStudente}
            />}
          </FlexibleXYPlot>
        </Div>
        <FlexBox justifyContent="space-between" className="titoli-grafico">
          {titoliGrafici.length > 0 && (
            <Div padding="0 30px 10px">{titoliGrafici.map((item) => (
              <SwatchLabel key={`titolo_grafico_${item.key}`}>{item.key}. {item.titolo}</SwatchLabel>
            ))}
            </Div>
          )}
        </FlexBox>
      </ChartBox>
    );
  }
}

GraficoMedieCompito.propTypes = {
  titoliGrafici: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      titolo: PropTypes.string.isRequired,
    }).isRequired,
  ),
  mediaNazionale: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
  })),
  mediaClasse: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
  })),
  mediaStudente: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
  })),
  didascalia: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
    x: PropTypes.string.isRequired,
    titolo: PropTypes.string.isRequired,
    campioni: PropTypes.number,
  }).isRequired,
  onDidascaliaSet: PropTypes.func.isRequired,
  onDidascaliaReset: PropTypes.func.isRequired,
};

export default GraficoMedieCompito;
