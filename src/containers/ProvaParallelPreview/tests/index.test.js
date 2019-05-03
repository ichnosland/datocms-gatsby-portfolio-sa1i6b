import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import { AlertBanner } from 'components/AlertBanner';
import provaParallelReducer, {
  defaultProvaParallelFeedback,
  defaultProvaParallelPreview,
  defaultProvaParallelStep,
} from 'containers/ProvaParallel/reducer';
import { provaParallelPreviewFetch } from 'containers/ProvaParallel/actions';
import { ListPanelHeader } from 'components/NewListPanels';
import HtmlInjector from 'components/NewListPanels/HtmlInjector';

import ProvaParallelPreview, { ProvaParallelPreviewView } from '../index';


const configuration = {
  product: 'lyceum',
  hasPremium: true,
  disciplinaId: 777,
  homePage: '/homepage',
};

const mockProps = {
  spinner: false,
  dispatch: () => { },
  match: {
    params: {
      id: '123',
    },
  },
  configuration,
  history: {
    push: () => { },
  },
  feedback: {
    hasFeedback: false,
    tipologia: '',
    messaggio: '',
  },
  preview: {
    isLoaded: true,
    id: 123,
    titolo: 'titolo',
    steps: [{
      key: '01_02.100',
      soluzioneTestuale: 'soluzione testuale',
      consegna: 'consegna',
      opzioni: ['opzione 1', 'opzione 2', 'opzione 3'],
      soluzioni: [['opzione 1']],
      tipo: 'M',
      titolo: 'titolo',
    }, {
      key: '03_04.200',
      soluzioneTestuale: 'soluzione testuale 2',
      consegna: 'consegna 2',
      opzioni: ['opzione 1', 'opzione 2', 'opzione 3'],
      soluzioni: [['opzione 1', 'opzione 2']],
      tipo: 'N',
      titolo: 'titolo 2',
    }],
  },
  onProvaParallelPreviewFetch: () => { },
};

describe('<ProvaParallelPreviewView />', () => {
  it('visualizza il componente per assegnata = false, ritirata = false', () => {
    const renderedComponent = shallow(
      <ProvaParallelPreviewView {...mockProps} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/prova-parallel/123');
    expect(renderedComponent.find(ListPanelHeader).length).toBe(1);
    expect(renderedComponent.find(HtmlInjector).length).toBe(4);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve chiamare onProvaParallelPreviewFetch 2 volte (di cui una al mount) se corsoSelezionato.pk cambia', () => {
    const props = {
      ...mockProps,
      onProvaParallelPreviewFetch: jest.fn(),
    };
    const spyMount = jest.spyOn(ProvaParallelPreviewView.prototype, 'componentDidMount');
    shallow(<ProvaParallelPreviewView {...props} />);

    expect(props.onProvaParallelPreviewFetch).toHaveBeenCalledWith(123);
    expect(spyMount).toHaveBeenCalledTimes(1);
    spyMount.mockRestore();
  });

  it('visualizza il componente per spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ProvaParallelPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(0);
    expect(renderedComponent.find(HtmlInjector).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizza il componente per feedback.hasFeedback = true', () => {
    const props = {
      ...mockProps,
      feedback: {
        hasFeedback: true,
        tipologia: 'tipologia',
        messaggio: 'messaggio',
      },
    };
    const renderedComponent = shallow(
      <ProvaParallelPreviewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(ListPanelHeader).length).toBe(0);
    expect(renderedComponent.find(HtmlInjector).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ProvaParallelPreview />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerProvaParallel = injectReducer({ key: 'provaParallel', reducer: provaParallelReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerProvaParallel,
    connect()
  )(ProvaParallelPreview);

  it('le props iniziali devono essere settate correttamente', () => {
    const store = configureStore({}, {});
    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store },
      }
    ).dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    expect(receivedProps.step).toEqual(defaultProvaParallelStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultProvaParallelFeedback.toJS());
    expect(receivedProps.preview).toEqual(defaultProvaParallelPreview.toJS());
  });

  it('testo il corretto funzionemento delle funzioni del mapDispatchToProps', () => {
    const mockStore = configureStore({}, {});
    mockStore.dispatch = jest.fn();

    const renderedComponent = shallow(
      <ConfigurationWrapper
        match={{ params: { id: '123' } }}
        history={{ push: () => { } }}
      />, {
        context: { store: mockStore },
      }
    ).dive().dive().dive().dive();

    const instance = renderedComponent.instance();
    const receivedProps = instance.props;

    receivedProps.onProvaParallelPreviewFetch(123);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaParallelPreviewFetch(123)
    );
  });
});
