import React from 'react';
import { shallow } from 'enzyme';

import TopBar from 'components/TopBar';
import Page from 'components/Page';

import StatisticheView from 'components/StatisticheView';
import EsecuzionePreviewStatistiche from '../EsecuzionePreviewStatistiche';


const mockConfiguration = {
  product: 'product',
  blocco: true,
  disciplinaId: 123,
  homePage: '/homepage',
};

const mockProps = {
  backUrl: '/back-url',
  configuration: mockConfiguration,
  contenutoEsercizio: {
    openedSections: {},
    totaleDomande: 3,
    risposteFornite: {
      1: {
        corretta: true,
        readable: 'risposta 1',
      },
      2: {
        corretta: false,
        readable: 'risposta 2',
      },
    },
    id: 555,
    voto: 3,
    steps: [{
      id: 1,
      esercizi: [{ titolo: 'titolo 1' }],
    }, {
      id: 2,
      esercizi: [{ titolo: 'titolo 2' }],
    }, {
      id: 3,
      esercizi: [{ titolo: 'titolo 3' }],
    }],
  },
  apriChiudiSezioniFx: () => { },
};

describe('<EsecuzionePreviewStatistiche />', () => {
  it('visualizza dati', () => {
    const renderedComponent = shallow(
      <EsecuzionePreviewStatistiche {...mockProps} />
    );
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza dati when isErroriComuni === true e ho un titolo consegna su esercizi', () => {
    const props = {
      ...mockProps,
      isErroriComuni: true,
    };
    const renderedComponent = shallow(
      <EsecuzionePreviewStatistiche {...props} />
    );
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent.find(StatisticheView).props().esercizi).toEqual({
      1: {
        soluzioneTestuale: '',
        stepData: {
          esercizi: [{ titolo: 'titolo 1' }],
          id: 1,
        },
        titolo: 'titolo 1',
      },
      2: {
        soluzioneTestuale: '',
        stepData: {
          esercizi: [{ titolo: 'titolo 2' }],
          id: 2,
        },
        titolo: 'titolo 2',
      },
      3: {
        soluzioneTestuale: '',
        stepData: {
          esercizi: [{ titolo: 'titolo 3' }],
          id: 3,
        },
        titolo: 'titolo 3',
      },
    });
    expect(renderedComponent).toMatchSnapshot();
  });


  it('visualizza dati when isErroriComuni === true e ho un titolo consegna su testi', () => {
    const props = {
      ...mockProps,
      isErroriComuni: true,
    };

    // imposto un titolo sugli esercizi
    props.contenutoEsercizio.steps[0].esercizi[0].titolo = undefined;
    props.contenutoEsercizio.steps[1].esercizi[0].titolo = undefined;
    props.contenutoEsercizio.steps[2].esercizi[0].titolo = undefined;

    // imposto un titolo sui testi
    props.contenutoEsercizio.steps[0].testi = [{ titolo: 'titolo fallback 1' }];
    props.contenutoEsercizio.steps[1].testi = [{ titolo: 'titolo fallback 2' }];
    props.contenutoEsercizio.steps[2].testi = [{ titolo: 'titolo fallback 3' }];


    const renderedComponent = shallow(
      <EsecuzionePreviewStatistiche {...props} />
    );
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(StatisticheView).length).toBe(1);
    expect(renderedComponent.find(StatisticheView).props().esercizi).toEqual({
      1: {
        soluzioneTestuale: '',
        stepData: {
          esercizi: [{ titolo: undefined }],
          testi: [{ titolo: 'titolo fallback 1' }],
          id: 1,
        },
        titolo: 'titolo fallback 1',
      },
      2: {
        soluzioneTestuale: '',
        stepData: {
          esercizi: [{ titolo: undefined }],
          testi: [{ titolo: 'titolo fallback 2' }],
          id: 2,
        },
        titolo: 'titolo fallback 2',
      },
      3: {
        soluzioneTestuale: '',
        stepData: {
          esercizi: [{ titolo: undefined }],
          testi: [{ titolo: 'titolo fallback 3' }],
          id: 3,
        },
        titolo: 'titolo fallback 3',
      },
    });
    expect(renderedComponent).toMatchSnapshot();
  });
});
