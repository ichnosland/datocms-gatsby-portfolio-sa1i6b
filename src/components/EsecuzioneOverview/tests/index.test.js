import React from 'react';
import { shallow } from 'enzyme';

import { FlexBox } from 'components/FlexBox';
import AlertBanner from 'components/AlertBanner';
import { Button } from 'components/Button';
import EsecuzioneOverview from '../index';


const props = {
  totaleDomande: 12,
  tempoEsecuzione: 36,
  titolo: 'titolo',
  autore: 'autore',
  fonte: 'fonte',
  sottotitolo: 'sottotitolo',
  difficolta: 'difficolta',
  testo: 'testo',
  prerequisito: 'prerequisito',
  isDocente: true,
  inCorso: false,
  isConsegnata: false,
  assegnaFx: () => {},
  ritiraFx: () => {},
  visualizzaStatisticheFx: () => {},
  eseguiSimulaFx: () => {},
  isRitirata: false,
  isAssegnata: false,
  dataAssegnazione: '2010-02-03',
};

describe('<EsecuzioneOverview />', () => {
  it('mostra opzioni se isDocente == true e isRitirata == false e isAssegnata == false', () => {
    const mockProps = {
      ...props,
      eseguiSimulaFx: jest.fn(),
      assegnaFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(3);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: prova (docente)
    expect(mockProps.eseguiSimulaFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(false);
    renderedComponent.find(Button).at(0).props().onClick();
    expect(mockProps.eseguiSimulaFx).toHaveBeenCalled();

    // pulsante #2: assegnazione (docente)
    expect(mockProps.assegnaFx).not.toHaveBeenCalled();
    renderedComponent.find(Button).at(1).props().onClick();
    expect(mockProps.assegnaFx).toHaveBeenCalled();

    // pulsante #3: statistiche (docente) disabilitato
    expect(renderedComponent.find(Button).at(2).props().disabled).toBe(true);
  });

  it('non mostra pulsanti isDocente e !isRitirata e !isAssegnata e non ho le funzioni dichiarati', () => {
    const mockProps = {
      ...props,
      assegnaFx: undefined,
      ritiraFx: undefined,
      visualizzaStatisticheFx: undefined,
      eseguiSimulaFx: undefined,
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('mostra opzioni se isDocente == true e isRitirata == false e isAssegnata == true', () => {
    const mockProps = {
      ...props,
      isAssegnata: true,
      eseguiSimulaFx: jest.fn(),
      ritiraFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(3);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: prova (docente)
    expect(mockProps.eseguiSimulaFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(false);
    renderedComponent.find(Button).at(0).props().onClick();
    expect(mockProps.eseguiSimulaFx).toHaveBeenCalled();

    // pulsante #2: ritiro (docente)
    expect(mockProps.ritiraFx).not.toHaveBeenCalled();
    renderedComponent.find(Button).at(1).props().onClick();
    expect(mockProps.ritiraFx).toHaveBeenCalled();

    // pulsante #3: statistiche (docente) disabilitato
    expect(renderedComponent.find(Button).at(2).props().disabled).toBe(true);
  });

  it('mostra opzioni se isDocente == true e isRitirata == true e isAssegnata == true', () => {
    const mockProps = {
      ...props,
      isAssegnata: true,
      isRitirata: true,
      eseguiSimulaFx: jest.fn(),
      visualizzaStatisticheFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: prova (docente)
    expect(mockProps.eseguiSimulaFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(false);
    renderedComponent.find(Button).at(0).props().onClick();
    expect(mockProps.eseguiSimulaFx).toHaveBeenCalled();

    // pulsante #2: ritiro (docente)
    expect(mockProps.visualizzaStatisticheFx).not.toHaveBeenCalled();
    renderedComponent.find(Button).at(1).props().onClick();
    expect(mockProps.visualizzaStatisticheFx).toHaveBeenCalled();
  });

  it('non mostro pulsanti se isDocente e isRitirata e isAssegnata e isConsegnata e inCorso ma non ho settato le funzioni', () => {
    const mockProps = {
      ...props,
      isDocente: false,
      isAssegnata: true,
      assegnaFx: undefined,
      ritiraFx: undefined,
      visualizzaStatisticheFx: undefined,
      eseguiSimulaFx: undefined,
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('mostra opzioni se isDocente == false e isRitirata == false e isAssegnata == true e isConsegnata = false e inCorso = false', () => {
    const mockProps = {
      ...props,
      isDocente: false,
      isAssegnata: true,
      eseguiSimulaFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: esegui (studente)
    expect(mockProps.eseguiSimulaFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(false);
    expect(renderedComponent.find(Button).at(0).props().children[1]).toBe('Esegui');
    renderedComponent.find(Button).at(0).props().onClick();
    expect(mockProps.eseguiSimulaFx).toHaveBeenCalled();

    // pulsante #2: statistiche (studente)
    expect(renderedComponent.find(Button).at(1).props().disabled).toBe(true);
  });

  it('mostra opzioni se isDocente == false e isRitirata == false e isAssegnata == true e isConsegnata = false e inCorso = true', () => {
    const mockProps = {
      ...props,
      isDocente: false,
      isAssegnata: true,
      inCorso: true,
      eseguiSimulaFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: riprendi (studente)
    expect(mockProps.eseguiSimulaFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(false);
    expect(renderedComponent.find(Button).at(0).props().children[1]).toBe('Riprendi');
    renderedComponent.find(Button).at(0).props().onClick();
    expect(mockProps.eseguiSimulaFx).toHaveBeenCalled();

    // pulsante #2: statistiche (studente)
    expect(renderedComponent.find(Button).at(1).props().disabled).toBe(true);
  });

  it('mostra opzioni se isDocente == false e isRitirata == true e isAssegnata == true e isConsegnata = false', () => {
    const mockProps = {
      ...props,
      isDocente: false,
      isRitirata: true,
      isAssegnata: true,
      visualizzaStatisticheFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: esegui (studente)
    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(true);

    // pulsante #2: statistiche (studente)
    expect(mockProps.visualizzaStatisticheFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(Button).at(1).props().disabled).toBe(false);
    renderedComponent.find(Button).at(1).props().onClick();
    expect(mockProps.visualizzaStatisticheFx).toHaveBeenCalled();
  });

  it('mostra opzioni se isDocente == false e isRitirata == true e isAssegnata == true e isConsegnata = true', () => {
    const mockProps = {
      ...props,
      isDocente: false,
      isRitirata: true,
      isConsegnata: true,
      isAssegnata: true,
      visualizzaStatisticheFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: esegui (studente)
    expect(renderedComponent.find(Button).at(0).props().disabled).toBe(true);

    // pulsante #2: statistiche (studente)
    expect(mockProps.visualizzaStatisticheFx).not.toHaveBeenCalled();
    expect(renderedComponent.find(Button).at(1).props().disabled).toBe(false);
    renderedComponent.find(Button).at(1).props().onClick();
    expect(mockProps.visualizzaStatisticheFx).toHaveBeenCalled();
  });

  it('mostra AlertBanner se isDocente == false e isRitirata == false e isAssegnata == true e isConsegnata = true', () => {
    const mockProps = {
      ...props,
      isDocente: false,
      isRitirata: false,
      isConsegnata: true,
      isAssegnata: true,
      visualizzaStatisticheFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(AlertBanner).length).toBe(2);
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('mostra opzioni se isDocente == true e previewFx è settata', () => {
    const mockProps = {
      ...props,
      assegnaFx: undefined,
      ritiraFx: undefined,
      visualizzaStatisticheFx: undefined,
      eseguiSimulaFx: undefined,
      previewFx: jest.fn(),
    };
    const renderedComponent = shallow(
      <EsecuzioneOverview {...mockProps} />
    );
    expect(renderedComponent.find(FlexBox).length).toBe(2);
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();

    // pulsante #1: preview
    expect(mockProps.previewFx).not.toHaveBeenCalled();
    renderedComponent.find(Button).at(0).simulate('click');
    expect(mockProps.previewFx).toHaveBeenCalled();
  });
});
