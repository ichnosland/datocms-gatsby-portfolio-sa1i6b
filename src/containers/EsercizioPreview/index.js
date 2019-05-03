/**
 *
 * EsercizioPreviewEsecuzione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { checkIsRispostaSelezionata } from 'common/esercizi';
import { calcolaSezioniAperteStatistiche } from 'common/statistiche';
import { FlexWrap } from 'components/FlexBox';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import reducer from './reducer';
import saga from './saga';
import {
  esercizioPreviewRispostaSet,
  esercizioPreviewRispostaPost,
  esercizioPreviewStepNext,
  esercizioPreviewStepInitialize,
  esercizioPreviewContenutoSet,
} from './actions';
import EsecuzionePreviewStep from './EsecuzionePreviewStep';
import EsecuzionePreviewStatistiche from './EsecuzionePreviewStatistiche';


export class EsercizioPreviewEsecuzioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      match: { params: { esercizioId } },
      onEsercizioPreviewStepInizialize,
      configuration: { parseMultimedia },
    } = this.props;

    onEsercizioPreviewStepInizialize(parseInt(esercizioId, 10), !!parseMultimedia);
  }

  selezionaRisposta = (data) => {
    const { onRispostaSet, step } = this.props;

    onRispostaSet({
      rispostaSelezionata: data,
      isCheckable: checkIsRispostaSelezionata(data, step),
    });
  }

  helpFunction = () => {
    const { contenutoEsercizio, step, userAppData, risposta, onPostRisposta } = this.props;
    onPostRisposta({
      step,
      risposta,
      contenutoEsercizio,
      helpRequest: true,
      enableSuoni: userAppData.enableSuoni,
    });
  }

  proseguiAvanzamento = () => {
    const {
      contenutoEsercizio,
      step,
      userAppData,
      risposta,
      onStepNext,
    } = this.props;

    onStepNext({
      step,
      risposta,
      contenutoEsercizio,
      enableSuoni: userAppData.enableSuoni,
    });
  }

  submitRisposta = () => {
    const { contenutoEsercizio, step, userAppData, risposta, onPostRisposta } = this.props;
    onPostRisposta({
      step,
      risposta,
      contenutoEsercizio,
      helpRequest: false,
      enableSuoni: userAppData.enableSuoni,
    });
  }

  toggleFocus = (enable) => {
    const { onRispostaSet } = this.props;
    onRispostaSet({ isFocusEnabled: enable });
  }

  apriChiudiSezioni = (key, blocco = true, risposte = false, studenti = {}) => {
    const { onOpenedSectionsSet, contenutoEsercizio: { openedSections } } = this.props;
    onOpenedSectionsSet(calcolaSezioniAperteStatistiche(
      key, blocco, risposte, studenti, openedSections
    ));
  }

  render() {
    const {
      onModalSetData,
      onModalResetData,
      contenutoEsercizio,
      spinner,
      step,
      risposta,
      configuration,
      isModalBoxOpened,
      feedback,
      match: { params: { prerequisitoId } },
    } = this.props;

    return [
      !feedback.hasFeedback && contenutoEsercizio.consegnata && !spinner && contenutoEsercizio.isLoaded && (
        <EsecuzionePreviewStatistiche
          key="esecuzione_statistiche"
          backUrl={configuration.homePage}
          isErroriComuni={!!prerequisitoId}
          configuration={configuration}
          contenutoEsercizio={contenutoEsercizio}
          apriChiudiSezioniFx={this.apriChiudiSezioni}
        />
      ),
      !feedback.hasFeedback && spinner && <FlexWrap key="spinner"><Spinner /> </FlexWrap>,
      feedback.hasFeedback && !spinner && (
        <AlertBanner
          key="esecuzione_feedback"
          actioncolor={feedback.tipologia}
        >
          {feedback.messaggio}
        </AlertBanner>
      ),
      !feedback.hasFeedback && !spinner && !contenutoEsercizio.consegnata && contenutoEsercizio.isLoaded && (
        <EsecuzionePreviewStep
          backUrl={configuration.homePage}
          key="esecuzione_preview"
          toggleFocusFunction={this.toggleFocus}
          step={step}
          selezioneRispostaFx={(e) => this.selezionaRisposta(e)}
          totaleDomande={contenutoEsercizio.totaleDomande}
          stepEseguiti={step.numeroProgressivoStep}
          risposta={risposta}
          disableAutofocus={isModalBoxOpened}
          correzioneRispostaFx={
            risposta.isInterfaceLocked ?
              this.proseguiAvanzamento :
              /* istanbul ignore next */
              this.submitRisposta
          }
          apriModalBoxFx={onModalSetData}
          chiudiModalBoxFx={onModalResetData}
          helpFunction={this.helpFunction}
          configuration={configuration}
        />
      ),
    ];
  }
}

EsercizioPreviewEsecuzioneView.propTypes = {
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    parseMultimedia: PropTypes.bool,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  step: PropTypes.shape({
    testi: PropTypes.array.isRequired,
    esercizi: PropTypes.array.isRequired,
    isStepLoaded: PropTypes.bool.isRequired,
    numeroProgressivoStep: PropTypes.number.isRequired,
  }).isRequired,
  contenutoEsercizio: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    inCorso: PropTypes.bool.isRequired,
    consegnata: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string.isRequired,
    totaleDomande: PropTypes.number.isRequired,
    voto: PropTypes.number.isRequired,
    risposteFornite: PropTypes.object.isRequired,
    stepCaricato: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
  }).isRequired,
  risposta: PropTypes.shape({
    rispostaSelezionata: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    isCheckable: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    isPristine: PropTypes.bool.isRequired,
    isInterfaceLocked: PropTypes.bool.isRequired,
    correzioneStep: PropTypes.shape({
      corrette: PropTypes.array.isRequired,
      sbagliate: PropTypes.array.isRequired,
      soluzione: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]),
    }).isRequired,
    mostraSoluzione: PropTypes.bool.isRequired,
    mostraCorrezione: PropTypes.bool.isRequired,
    isHelpEnabled: PropTypes.bool.isRequired,
  }).isRequired,
  spinner: PropTypes.bool.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalResetData: PropTypes.func.isRequired,
  onPostRisposta: PropTypes.func.isRequired,
  onStepNext: PropTypes.func.isRequired,
  onRispostaSet: PropTypes.func.isRequired,
  isModalBoxOpened: PropTypes.bool.isRequired,
  onEsercizioPreviewStepInizialize: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  spinner: state.get('esercizioPreview').toJS().spinner,
  feedback: state.get('esercizioPreview').toJS().feedback,
  contenutoEsercizio: state.get('esercizioPreview').toJS().contenuto,
  step: state.get('esercizioPreview').toJS().step,
  risposta: state.get('esercizioPreview').toJS().risposta,
  isModalBoxOpened: state.get('modalBox').toJS().show,
});

function mapDispatchToProps(dispatch) {
  return {
    onEsercizioPreviewStepInizialize: (id, parseMultimedia) => {
      dispatch(esercizioPreviewStepInitialize(id, parseMultimedia));
    },
    onOpenedSectionsSet: (payload) => {
      dispatch(esercizioPreviewContenutoSet({
        openedSections: payload,
      }));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalResetData: () => {
      dispatch(modalSetEmptyData());
    },
    onRispostaSet: (payload) => {
      dispatch(esercizioPreviewRispostaSet(payload));
    },
    onPostRisposta: (payload) => {
      dispatch(esercizioPreviewRispostaPost(payload));
    },
    onStepNext: (payload) => {
      dispatch(esercizioPreviewStepNext(payload));
    },
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withEsercizioPreviewReducer = injectReducer({ key: 'esercizioPreview', reducer });
const withEsercizioPreviewSaga = injectSaga({ key: 'esercizioPreview', saga });

export default compose(
  withEsercizioPreviewReducer,
  withEsercizioPreviewSaga,
  withConnect,
)(EsercizioPreviewEsecuzioneView);
