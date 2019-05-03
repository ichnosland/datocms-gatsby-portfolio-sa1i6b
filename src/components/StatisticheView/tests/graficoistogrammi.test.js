import React from 'react';
import { shallow } from 'enzyme';
import { VerticalBarSeries } from 'react-vis';

import GraficoMedieCompito from '../GraficoIstogrammi';


const mockProps = {
  titoliGrafici: [{
    key: 1,
    titolo: 'titolo 1',
  }, {
    key: 2,
    titolo: 'titolo 2',
  }],
  mediaNazionale: [{
    y: 12,
    x: '#1',
    titolo: 'titolo 1',
  }, {
    y: 22,
    x: '#2',
    titolo: 'titolo 2',
  }],
  mediaClasse: [{
    y: 6,
    x: '#1',
    titolo: 'titolo 1',
  }, {
    y: 5,
    x: '#2',
    titolo: 'titolo 2',
  }],
  mediaStudente: [{
    y: 3,
    x: '#1',
    titolo: 'titolo 1',
  }, {
    y: 2,
    x: '#2',
    titolo: 'titolo 2',
  }],
  onDidascaliaSet: () => { },
  onDidascaliaReset: () => { },
  didascalia: {
    tipologiaGrafico: 'medieCompito',
    display: false,
    tipologia: 'tipologia',
    y: 1,
    x: '#1',
    titolo: 'titolo',
    campioni: 1,
  },
};

describe('<GraficoMedieCompito />', () => {
  it('Mostro la condizione iniziale', () => {
    const renderedComponent = shallow(
      <GraficoMedieCompito
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
      <GraficoMedieCompito
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
      <GraficoMedieCompito
        {...props}
      />
    );

    expect(props.onDidascaliaSet).not.toHaveBeenCalled();
    const instance = renderedComponent.instance();
    instance.setDidascalia({
      titolo: 'titolo',
      tipologia: 'tipologia',
      y: 2,
      x: 3,
      campioni: 4,
    });
    expect(props.onDidascaliaSet).toHaveBeenCalledWith({
      display: true,
      tipologiaGrafico: 'medieCompito',
      titolo: 'titolo',
      tipologia: 'tipologia',
      y: 2,
      x: 3,
      campioni: 4,
    });
  });


  it('VerticalBarSeries(0) onValueMouseOver deve chiamare onDidascaliaSet', () => {
    const props = {
      ...mockProps,
      onDidascaliaSet: jest.fn(),
    };
    const renderedComponent = shallow(
      <GraficoMedieCompito
        {...props}
      />
    );

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(instance, 'setDidascalia');

    renderedComponent.find(VerticalBarSeries).at(0).props().onValueMouseOver({
      titolo: 'titolo1',
    });
    expect(spy).toHaveBeenCalledWith({ titolo: 'titolo1' });

    renderedComponent.find(VerticalBarSeries).at(1).props().onValueMouseOver({
      titolo: 'titolo2',
    });
    expect(spy).toHaveBeenCalledWith({ titolo: 'titolo2' });

    renderedComponent.find(VerticalBarSeries).at(2).props().onValueMouseOver({
      titolo: 'titolo2',
    });
    expect(spy).toHaveBeenCalledWith({ titolo: 'titolo2' });
  });
});
