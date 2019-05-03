/**
 *
 * UnitaErroriComuniEsecuzione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  checkIsRispostaSelezionata,
  cleanTesto,
  getIdsElementiEsercizio,
  creaTestoReadable,
  rappresentaSoluzioneTestuale,
  calcolaSoluzioni,
} from 'common/esercizi';
import ZendeskTicket from 'containers/ZendeskTicket';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import ResponseView from 'components/ResponseView';
import { API_BASE_PATH } from 'configuration';


import goodBg from './images/good.gif';
import reducer from './reducer';
import saga from './saga';
import {
  unitaErroriComuniRispostaSet,
  unitaErroriComuniRispostaPost,
  unitaErroriComuniStepNext,
  unitaErroriComuniReset,
} from './actions';
import UnitaErroriComuniStep from './UnitaErroriComuniStep';


export class UnitaErroriComuniEsecuzioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      match: { params: { unitaId } },
      history: { push },
      contenutoEsercizio: { isLoaded },
    } = this.props;

    if (!isLoaded) {
      push(`/unita-andamento/${unitaId}`);
    }
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

  helpButtonFunction = /* istanbul ignore next */ () => {
    const {
      onModalSetData,
      risposta: { isCorrect, isHelpEnabled, rispostaSelezionata, mostraSoluzione, mostraCorrezione },
      step,
      match: { params: { unitaId } },
      corsoSelezionato: { pk: corsoId },
    } = this.props;

    if (!mostraSoluzione && !mostraCorrezione) {
      return false;
    }

    let rispostaUtenteResponso = '';
    if (isHelpEnabled) {
      rispostaUtenteResponso = 'help';
    } else if (isCorrect) {
      rispostaUtenteResponso = 'corretta';
    } else if (!isCorrect) {
      rispostaUtenteResponso = 'sbagliata';
    }

    onModalSetData({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'esecuzione_errori_comuni',
            provenienzaReadable: `Esecuzione errori comuni step #${step.numeroProgressivoStep})`,
            titolo: `Errori comuni unità #${unitaId} corso #${corsoId}`,
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/esercizioacademy/${step.esercizi[0].esercizioId}/change`,
            consegna: (step.esercizi[0] || {}).titolo,
            testoSemplificato: cleanTesto(step.testi[0].testo_principale),
            elementi: getIdsElementiEsercizio(step),
            rispostaUtente: creaTestoReadable(
              rispostaSelezionata, step
            ),
            rispostaUtenteResponso,
            rispostePossibili: rappresentaSoluzioneTestuale(
              calcolaSoluzioni(step.testi, step.esercizi),
              step.esercizi[0].tipo,
              ' | '
            ),
          }}
        />
      ),
      show: true,
      disableClose: true,
      isPopup: false,
    });

    return true;
  }

  render() {
    const {
      onModalSetData,
      onModalResetData,
      contenutoEsercizio,
      step,
      risposta,
      configuration,
      isModalBoxOpened,
      match: { params: { unitaId } },
      onUnitaErroriComuniReset,
      history: { push },
    } = this.props;

    return [
      contenutoEsercizio.consegnata && (
        <ResponseView
          key="response_view"
          votoApprossimato={10}
          goodSrc={goodBg}
          nascondiVoto
          resetFunction={() => {
            onUnitaErroriComuniReset();
            push(`/unita-andamento/${unitaId}`);
          }}
          titolo="Hai completato gli errori comuni"
          product={configuration.product}
        />
      ),
      !contenutoEsercizio.consegnata && (
        <UnitaErroriComuniStep
          backUrl={`/unita-andamento/${unitaId}`}
          key="esecuzione_preview"
          toggleFocusFunction={this.toggleFocus}
          step={step}
          selezioneRispostaFx={(e) => this.selezionaRisposta(e)}
          totaleDomande={contenutoEsercizio.totaleDomande}
          stepEseguiti={step.numeroProgressivoStep}
          risposta={risposta}
          helpButtonFunction={this.helpButtonFunction}
          disableAutofocus={isModalBoxOpened}
          correzioneRispostaFx={
            risposta.isInterfaceLocked ?
              this.proseguiAvanzamento :
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

UnitaErroriComuniEsecuzioneView.propTypes = {
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
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
    unitaId: PropTypes.number.isRequired,
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
  onModalSetData: PropTypes.func.isRequired,
  onModalResetData: PropTypes.func.isRequired,
  onPostRisposta: PropTypes.func.isRequired,
  onStepNext: PropTypes.func.isRequired,
  onRispostaSet: PropTypes.func.isRequired,
  isModalBoxOpened: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  contenutoEsercizio: state.get('unitaErroriComuni').toJS().contenuto,
  step: state.get('unitaErroriComuni').toJS().step,
  risposta: state.get('unitaErroriComuni').toJS().risposta,
  isModalBoxOpened: state.get('modalBox').toJS().show,
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
});

function mapDispatchToProps(dispatch) {
  return {
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalResetData: () => {
      dispatch(modalSetEmptyData());
    },
    onRispostaSet: (payload) => {
      dispatch(unitaErroriComuniRispostaSet(payload));
    },
    onPostRisposta: (payload) => {
      dispatch(unitaErroriComuniRispostaPost(payload));
    },
    onStepNext: (payload) => {
      dispatch(unitaErroriComuniStepNext(payload));
    },
    onUnitaErroriComuniReset: () => {
      dispatch(unitaErroriComuniReset());
    },
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withUnitaErroriComuniReducer = injectReducer({ key: 'unitaErroriComuni', reducer });
const withUnitaErroriComuniSaga = injectSaga({ key: 'unitaErroriComuni', saga });

export default compose(
  withUnitaErroriComuniReducer,
  withUnitaErroriComuniSaga,
  withConnect,
)(UnitaErroriComuniEsecuzioneView);
