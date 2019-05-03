import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'configureStore';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';

import reducerCurryer from 'common/applications/reducer';
import TopBar from 'components/TopBar';
import EsecuzioneOverview from 'components/EsecuzioneOverview';
import Spinner from 'components/Spinner';
import { AlertBanner } from 'components/AlertBanner';
import provaParallelReducer, {
  defaultProvaParallelFeedback,
  defaultProvaParallelOverview,
  defaultProvaParallelStep,
} from 'containers/ProvaParallel/reducer';
import { provaParallelOverviewFetch } from 'containers/ProvaParallel/actions';
import ProvaParallelOverview, { ProvaParallelOvervewView } from '../index';


const configuration = {
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
  overview: {
    isLoaded: true,
    consegnata: false,
    id: 123,
    titolo: 'titolo',
    sottotitolo: 'sottotitolo',
    testo: 'testo',
    totaleDomande: 12,
  },
  onProvaParallelOverviewFetch: () => { },
};

describe('<ProvaParallelOvervewView />', () => {
  it('visualizza il componente per assegnata = false, ritirata = false', () => {
    const renderedComponent = shallow(
      <ProvaParallelOvervewView {...mockProps} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(TopBar).props().backNav.url).toBe('/homepage');
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve chiamare onProvaParallelOverviewFetch al mount', () => {
    const props = {
      ...mockProps,
      onProvaParallelOverviewFetch: jest.fn(),
    };
    const spyMount = jest.spyOn(ProvaParallelOvervewView.prototype, 'componentDidMount');
    shallow(<ProvaParallelOvervewView {...props} />);

    expect(props.onProvaParallelOverviewFetch).toHaveBeenCalledWith(123);
    expect(spyMount).toHaveBeenCalledTimes(1);
    expect(props.onProvaParallelOverviewFetch).toHaveBeenCalledTimes(1);
    spyMount.mockRestore();
  });


  it('visualizza il componente per spinner = true', () => {
    const props = {
      ...mockProps,
      spinner: true,
    };
    const renderedComponent = shallow(
      <ProvaParallelOvervewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(1);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(0);
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
      <ProvaParallelOvervewView {...props} />
    );
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(Spinner).length).toBe(0);
    expect(renderedComponent.find(EsecuzioneOverview).length).toBe(0);
    expect(renderedComponent.find(AlertBanner).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('controllo che eseguiFunction chiami history.push', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(<ProvaParallelOvervewView {...props} />);
    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).dive().find('Button').at(0).simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/prova-parallel-esecuzione/123');
  });

  it('controllo che previewFunction chiami history.push', () => {
    const props = {
      ...mockProps,
      history: {
        push: jest.fn(),
      },
    };
    const renderedComponent = shallow(<ProvaParallelOvervewView {...props} />);
    expect(props.history.push).not.toHaveBeenCalled();
    renderedComponent.find(EsecuzioneOverview).dive().find('Button').at(1).simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/prova-parallel-preview/123');
  });
});

describe('<ProvaParallelOverview />', () => {
  const withReducerConfiguration = injectReducer({ key: 'configuration', reducer: reducerCurryer(configuration) });
  const withReducerProvaParallel = injectReducer({ key: 'provaParallel', reducer: provaParallelReducer });

  const ConfigurationWrapper = compose(
    withReducerConfiguration,
    withReducerProvaParallel,
    connect()
  )(ProvaParallelOverview);

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

    expect(receivedProps.configuration).toEqual(configuration);
    expect(receivedProps.step).toEqual(defaultProvaParallelStep.toJS());
    expect(receivedProps.spinner).toBe(false);
    expect(receivedProps.feedback).toEqual(defaultProvaParallelFeedback.toJS());
    expect(receivedProps.overview).toEqual(defaultProvaParallelOverview.toJS());
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

    receivedProps.onProvaParallelOverviewFetch(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      provaParallelOverviewFetch(1)
    );
  });
});
