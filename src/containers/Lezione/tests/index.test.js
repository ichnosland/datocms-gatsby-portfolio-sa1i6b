import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import { H2 } from 'components/Heading';
import Spinner from 'components/Spinner';
import Div from 'components/Div';
import lezioneReducer from 'containers/Lezione/reducer';
import AlertBanner from 'components/AlertBanner';
import Lezione, { LezioneView, HtmlText } from '../index';
import Carosello from '../Carosello';


const store = configureStore({}, {});
const mockProps = {
  spinner: false,
  history: {
    push: () => { },
  },
  match: {
    params: {
      id: '444',
    },
  },
  error: {
    hasErrors: false,
    errorMessage: 'messaggio di errore',
  },
  testoData: {
    unitaId: 222,
    contenuto: [{
      content: `<p>I verbi latini della 1ª coniugazione sono caratterizzati dalla&nbsp;
    <span class="tip-tag">vocale tematica&nbsp;-<em>ā</em></span>.
    </p>`,
      key: 'html_0',
      type: 'html',
    },
    {
      carosello: 0,
      key: 'carosello_0_1',
      type: 'carosello',
    },
    {
      carosello: 1,
      key: 'carosello_1_2',
      type: 'carosello',
    },
    {
      carosello: 2,
      key: 'carosello_2_3',
      type: 'carosello',
    },
    {
      key: 'text_3',
      type: 'text',
      content: 'contenuto',
    }],
    pubblicata: true,
    tabelle: {
      0: [{
        key: 'tabella_1',
        righe: [{
          valore: 'laudari',
          label: 'presente',
        }],
        titolo: 'Infinito passivo',
      }, {
        key: 'tabella_2',
        righe: [{ valore: 'laudare', label: 'presente' }],
        titolo: 'Infinito attivo',
      }],
      1: [{
        key: 'tabella_3',
        righe: [
          { valore: '-o', label: '1<sup>a</sup> sing.' },
          { valore: '-s', label: '2<sup>a</sup> sing.' },
          { valore: '-t', label: '3<sup>a</sup> sing.' },
          { valore: '-mus', label: '1<sup>a</sup> plur.' },
          { valore: '-tis', label: '2<sup>a</sup> plur.' },
          { valore: '-nt', label: '3<sup>a</sup> plur.' },
        ],
        titolo: 'Indicativo presente attivo',
      }, {
        key: 'tabella_4',
        righe: [
          { valore: '-r', label: '1<sup>a</sup> sing.' },
          { valore: '-ris, -re', label: '2<sup>a</sup> sing.' },
          { valore: '-tur', label: '3<sup>a</sup> sing.' },
          { valore: '-mur', label: '1<sup>a</sup> plur.' },
          { valore: '-mini', label: '2<sup>a</sup> plur.' },
          { valore: '-ntur', label: '3<sup>a</sup> plur.' },
        ],
        titolo: 'Indicativo presente passivo',
      }],
    },
    titolo: 'Indicativo presente e infinito attivo e passivo 1ª coniugazione',
  },
  onDataFetch: jest.fn(),
};

describe('<LezioneView />', () => {
  it('testo il render quando vengono mostrati i contenuti', () => {
    const renderedComponent = shallow(
      <LezioneView {...mockProps} />
    );
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(H2).length).toBe(1);
    expect(renderedComponent.find(Carosello).length).toBe(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il render quando il caricamento è in corso', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <LezioneView {...props} />
    );
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(AlertBanner).length).toBe(0);
    expect(renderedComponent.find(H2).length).toBe(0);
    expect(renderedComponent.find(Carosello).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il render quando ho un messaggio di errore', () => {
    const props = {
      ...mockProps,
      error: {
        hasErrors: true,
        errorMessage: 'messaggio di errore',
      },
    };
    const renderedComponent = shallow(
      <LezioneView {...props} />
    );
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(0);
    expect(renderedComponent.find(Carosello).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo il render quando ho un messaggio di errore', () => {
    const props = {
      ...mockProps,
      error: {
        hasErrors: true,
        errorMessage: 'messaggio di errore',
      },
    };
    const renderedComponent = shallow(
      <LezioneView {...props} />
    );
    expect(renderedComponent.find(Page).length).toBe(1);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Container).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent.find(H2).length).toBe(0);
    expect(renderedComponent.find(Carosello).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo pulsante back dellla topbar se non è settato source', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <LezioneView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).props().closeBtn.onClickFunction();
    expect(props.history.push).toHaveBeenCalledWith('/unita-preview/222');
  });

  it('testo pulsante back dellla topbar se è settato source', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
      match: {
        ...mockProps.match,
        params: {
          ...mockProps.match.params,
          source: 'unita-esecuzione',
        },
      },
    };
    const renderedComponent = shallow(
      <LezioneView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(TopBar).props().closeBtn.onClickFunction();
    expect(props.history.push).toHaveBeenCalledWith('/unita-esecuzione');
  });
});


describe('<Lezione />', () => {
  const withLezioneReducer = injectReducer({ key: 'lezione', reducer: lezioneReducer });

  const ConfigurationWrapper = compose(
    withLezioneReducer,
    connect()
  )(Lezione);

  it('controllo le prop iniziali', () => {
    const renderedComponent = shallow(
      <ConfigurationWrapper
        history={mockProps.history}
        match={{ params: { id: '44' } }}
      />, { context: { store } }
    ).dive().dive().dive().dive().dive();
    const receivedProps = renderedComponent.instance().props;

    expect(receivedProps.spinner).toBe(true);
    expect(receivedProps.testoData).toEqual({
      titolo: '',
      contenuto: [],
      tabelle: [],
      pubblicata: false,
      unitaId: 0,
    });
    expect(receivedProps.error).toEqual({
      hasErrors: false,
      errorData: {},
      errorMessage: '',
    });
  });
});

describe('<HtmlText />', () => {
  it('should render an Div', () => {
    const renderedComponent = shallow(<HtmlText />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props color', () => {
    const color = 'cyan';
    const renderedComponent = shallow(<HtmlText color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: 'blue',
    };
    const renderedComponent = shallow(<HtmlText theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
