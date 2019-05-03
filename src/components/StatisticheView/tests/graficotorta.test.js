import React from 'react';
import { shallow } from 'enzyme';
// import { RadialChart } from 'react-vis';

import GraficoMedieVotiClasse, { FlexibleRadialChart } from '../GraficoTorta';


const mockProps = {
  mediaNazionale: [{
    count: 12,
    title: 'titolo',
    colour: '#fff',
  }, {
    count: 5,
    title: 'titolo 2',
    colour: '#ff0',
  }, {
    count: 0,
    title: 'titolo 2',
    colour: '#00e',
  }],
  onDidascaliaSet: () => { },
  onDidascaliaReset: () => { },
  didascalia: {
    tipologiaGrafico: 'votiClasse',
    display: false,
    tipologia: 'tipologia',
    y: 1,
    x: '#1',
    titolo: 'titolo',
    campioni: 1,
  },
};

describe('<GraficoMedieVotiClasse />', () => {
  it('Mostro la condizione iniziale', () => {
    const renderedComponent = shallow(
      <GraficoMedieVotiClasse
        {...mockProps}
      />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('Mostro la condizione se hint è visibile', () => {
    const props = {
      ...mockProps,
      didascalia: {
        ...mockProps.didascalia,
        display: true,
      },
    };
    const renderedComponent = shallow(
      <GraficoMedieVotiClasse
        {...props}
      />
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('setDidascalia deve chiamare onDidascaliaSet', () => {
    const props = {
      ...mockProps,
      onDidascaliaSet: jest.fn(),
    };
    const renderedComponent = shallow(
      <GraficoMedieVotiClasse
        {...props}
      />
    );

    expect(props.onDidascaliaSet).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.setDidascalia({
      title: 'titolo',
      tipologia: 'tipologia',
      y: 2,
      totale: 10,
      count: 4,
    });
    expect(props.onDidascaliaSet).toHaveBeenCalledWith({
      display: true,
      tipologiaGrafico: 'votiClasse',
      title: 'titolo',
      titolo: '4 / 10',
      tipologia: 'tipologia',
      y: 2,
      totale: 10,
      count: 4,
      x: '',
    });
  });


  it('VerticalBarSeries(0) onValueMouseOver deve chiamare onDidascaliaSet', () => {
    const props = {
      ...mockProps,
      onDidascaliaSet: jest.fn(),
    };
    const renderedComponent = shallow(
      <GraficoMedieVotiClasse
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setDidascalia');

    renderedComponent.find(FlexibleRadialChart).at(0).props().onValueMouseOver({
      titolo: 'titolo1',
    });
    expect(spy).toHaveBeenCalledWith({ titolo: 'titolo1' });
  });
});
