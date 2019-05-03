/*
 *
 * CreaVerifiche
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Div from 'components/Div';
import { H1 } from 'components/Heading';
import CreaVerificheList from 'components/CreaVerificheList';
import { MYTEST_PRODUCTS } from 'configuration';
import {
  creaverificheVerificaEserciziFetch,
  creaverificheVerificaEsercizioPreviewFetch,
  creaverificheVerificaEsercizioAdd,
  creaverificheVerificaEsercizioRemove,
  creaverificheVerificaSet,
  creaverificheVerificaPost,
} from './actions';
import ContenutoStep from './ContenutoStep';

export class CreaVerificheView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      openedSolutions: {},
    };
  }

  componentDidMount() {
    const { match, history, location = { params: {} } } = this.props;
    const { params = {
      titoloUnita: undefined,
      locationParams: undefined,
      titoloMissione: undefined,
    } } = location;

    if (match.path === '/previewesercizio/:esercizioId') {
      this.props.fetchEserciziPreview(match.params.esercizioId);
    } else if (!params.titoloUnita || !params.titoloLivello || !params.titoloMissione) {
      history.push('/');
    } else {
      this.props.fetchEserciziUnita(match.params.prerequisito);
    }
  }

  showOnlySelectedSteps = (applyFilter = false) => {
    const { unitaSteps, verifica } = this.props;
    if (!applyFilter) {
      return unitaSteps;
    }
    return verifica.eserciziSelezionati;
  }

  toggleSoluzione = (key) => {
    this.setState({
      openedSolutions: {
        ...this.state.openedSolutions,
        [key]: !this.state.openedSolutions[key],
      },
    });
  }

  render = () => {
    const {
      verifica,
      spinner,
      addEsercizio,
      removeEsercizio,
      messaggioErrore,
      history,
      unitaSteps,
      configuration,
      match: { path },
    } = this.props;

    const {
      titoloUnita,
      titoloMissione,
      titoloLivello,
    } = ((this.props.location || {}).params || {});

    const { openedSolutions } = this.state;
    const keyEserciziSelezionati = verifica.eserciziSelezionati.map(
      (esercizio) => (esercizio.key)
    );

    const topBarProps = {
      noShadow: true,
      pinned: true,
      closeBtn: {
        url: '/',
        enabled: true,
      },
    };

    if (!messaggioErrore) {
      topBarProps.button = {
        actioncolor: 'okay',
        label: verifica.key > -1 ? 'Aggiungi a verifica' : 'Crea verifica',
        onClick: () => history.push('/modificaverifica'),
        disabled: keyEserciziSelezionati.length === 0,
        itemCount: verifica.eserciziSelezionati.length.toString(),
      };
    }

    return (
      <Page>
        <TopBar
          {...topBarProps}
        />
        <Container>
          {spinner && <Spinner />}
          {!spinner && (
            <Div>
              <H1>{titoloUnita}</H1>
              {messaggioErrore && <p>{messaggioErrore}</p>}
              <CreaVerificheList
                buttonText={
                  `${unitaSteps.length} ${unitaSteps.length === 1 ? 'Esercizio' : 'Esercizi'}`
                }
                itemsList={
                  unitaSteps.map((step) => {
                    const isStepSelected = (keyEserciziSelezionati.indexOf(step.key) > -1);

                    return {
                      key: `step_panel_${step.key}`,
                      elementi: [{
                        id: `step_titolo_${step.key}`,
                        nome: [titoloLivello, titoloUnita].filter((n) => (n)).join(' - '),
                        text: `<div class="${[
                          configuration.product,
                          MYTEST_PRODUCTS.indexOf(configuration.product) > -1 ? 'mytest' : '',
                        ].join(' ')}">${ContenutoStep(step)}</div>`,
                        isHtml: true,
                        hasLatex: path === '/previewesercizio/:esercizioId' || configuration.hasLatex || false,
                        solution: openedSolutions[step.key] ? step.soluzioneTestuale : '',
                        isSelected: isStepSelected,
                      }],
                      pulsanti: [{
                        id: `step_button_vedi_${step.key}`,
                        label: 'Soluzione',
                        icona: openedSolutions[step.key] ? 'hide' : 'eye',
                        onClickFunction: () => this.toggleSoluzione(step.key),
                      }, {
                        id: `step_button_edit_${step.key}`,
                        label: isStepSelected ? 'Rimuovi' : 'Aggiungi',
                        icona: isStepSelected ? 'minus' : 'plus',
                        onClickFunction: isStepSelected ?
                          () => removeEsercizio(step) :
                          () => addEsercizio({
                            ...step,
                            titoloUnita,
                            titoloMissione,
                            titoloLivello,
                            consegnaHTML: ContenutoStep(step),
                          }),
                      }],
                    };
                  })
                }
              />
            </Div>
          )}
        </Container>
      </Page>
    );
  }
}

CreaVerificheView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      prerequisito: PropTypes.string,
      esercizioId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    params: PropTypes.shape({
      titoloUnita: PropTypes.string,
      titoloLivello: PropTypes.string,
      titoloMissione: PropTypes.string,
    }),
  }),
  fetchEserciziUnita: PropTypes.func.isRequired,
  unitaSteps: PropTypes.array.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  verifica: PropTypes.shape({
    eserciziSelezionati: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        idEsercizio: PropTypes.number.isRequired,
        idsElementi: PropTypes.array.isRequired,
      })
    ).isRequired,
    titolo: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    anteprimaStampa: PropTypes.bool.isRequired,
  }).isRequired,
  verificaCreazioneFormData: PropTypes.object,
  setVerificaData: PropTypes.func.isRequired,
  messaggioErrore: PropTypes.string.isRequired,
  creaVerificaPost: PropTypes.func.isRequired,
  addEsercizio: PropTypes.func.isRequired,
  removeEsercizio: PropTypes.func.isRequired,
  configuration: PropTypes.object.isRequired,
  fetchEserciziPreview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  spinner: state.get('CreaVerifiche').toJS().spinner,
  unitaSteps: state.get('CreaVerifiche').toJS().steps,
  verifica: state.get('CreaVerifiche').toJS().verifica,
  messaggioErrore: state.get('CreaVerifiche').toJS().messaggioErrore,
  verificaCreazioneFormData: state.get('form').get('creaVerifica'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEserciziUnita: (prerequisito) => {
    dispatch(creaverificheVerificaEserciziFetch(prerequisito));
  },
  fetchEserciziPreview: (esercizioId) => {
    dispatch(creaverificheVerificaEsercizioPreviewFetch(esercizioId));
  },
  setVerificaData: (payload) => {
    dispatch(creaverificheVerificaSet(payload));
  },
  addEsercizio: (step) => {
    dispatch(creaverificheVerificaEsercizioAdd(step));
  },
  removeEsercizio: (step) => {
    dispatch(creaverificheVerificaEsercizioRemove(step));
  },
  creaVerificaPost: (payload) => {
    dispatch(creaverificheVerificaPost(payload));
  },
});

const CreaVerificheConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const CreaVerificheComposed = compose(
  CreaVerificheConnect
)(CreaVerificheView);

export default CreaVerificheComposed;
