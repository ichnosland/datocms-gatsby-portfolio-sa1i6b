/**
 *
 * VerificaEsecuzione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  verificaRispostaSet,
  verificaReset,
  verificaRispostaPost,
} from 'containers/Verifica/actions';
import ZendeskTicket from 'containers/ZendeskTicket';
import {
  checkIsRispostaSelezionata,
  cleanTesto,
  getIdsElementiEsercizio,
  creaTestoReadable,
  rappresentaSoluzioneTestuale,
  calcolaSoluzioni,
} from 'common/esercizi';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import { FlexWrap } from 'components/FlexBox';
import LogoPlatform from 'components/LogoPlatform';
import Spinner from 'components/Spinner';
import { API_BASE_PATH } from 'configuration';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

export class VerificaEsecuzioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      history: { push },
      configuration,
      step,
    } = this.props;

    if (!step.isStepLoaded) {
      push(configuration.homePage);
    }
  }

  selezionaRisposta = (data) => {
    const { onRispostaSet, step } = this.props;

    onRispostaSet({
      rispostaSelezionata: data,
      isCheckable: checkIsRispostaSelezionata(data, step),
    });
  }

  skipFunction = () => {
    const {
      dispatch,
      contenutoVerifica,
      step,
      userAnagraphics,
      userAppData,
      risposta,
      onPostRisposta,
      configuration,
      history: { push: historyPush },
    } = this.props;

    onPostRisposta({
      step,
      risposta,
      contenutoVerifica,
      isSaltata: true,
      isDocente: userAppData.docente,
      enableSuoni: userAppData.enableSuoni,
      productName: configuration.product,
      userHints: userAppData.hints,
      userId: userAnagraphics.id,
      dispatch,
      historyPush,
    });
  }

  submitRisposta = () => {
    const {
      dispatch,
      contenutoVerifica,
      step,
      userAnagraphics,
      userAppData,
      risposta,
      onPostRisposta,
      configuration,
      history: { push: historyPush },
    } = this.props;

    onPostRisposta({
      step,
      risposta,
      contenutoVerifica,
      isSaltata: false,
      isDocente: userAppData.docente,
      enableSuoni: userAppData.enableSuoni,
      productName: configuration.product,
      userHints: userAppData.hints,
      userId: userAnagraphics.id,
      dispatch,
      historyPush,
    });
  }

  toggleFocus = (enable) => {
    const { onRispostaSet } = this.props;
    onRispostaSet({ isFocusEnabled: enable });
  }

  helpButtonFunction = () => {
    const { onModalSetData, risposta, contenutoVerifica, step, userAppData: { docente: isDocente } } = this.props;

    onModalSetData({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'esecuzione_verifica',
            provenienzaReadable: `Esecuzione verifica step #${step.numeroProgressivoStep}`,
            titolo: isDocente ?
              `Esecuzione verifica prova (unità pk: ${contenutoVerifica.unitaSelezionate.join(', ')})` :
              `Esecuzione verifica #${contenutoVerifica.id}`,
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/esercizioacademy/${step.esercizi[0].esercizioId}/change`,
            consegna: (step.esercizi[0] || /* istanbul ignore next */ {}).titolo,
            testoSemplificato: cleanTesto(step.testi[0].testo_principale),
            elementi: getIdsElementiEsercizio(step),
            rispostaUtente: creaTestoReadable(
              risposta.rispostaSelezionata, step
            ),
            rispostaUtenteResponso: 'non applicabile',
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
  }

  render() {
    const {
      onModalSetData,
      onModalResetData,
      contenutoVerifica: { totaleStep, backUrl },
      spinner,
      step,
      risposta,
      onVerificaReset,
      history,
      configuration,
      isModalBoxOpened,
    } = this.props;

    return (
      <FlexWrap>
        {
          spinner || !step.isStepLoaded ?
            <Spinner /> :
            <EsecuzioneSteps
              key={`esecuzione_verifica_${step.numeroProgressivoStep}`}
              toggleFocusFunction={this.toggleFocus}
              stepCaricato={step}
              funzioneSelezionaRisposta={(e) => this.selezionaRisposta(e)}
              stepTotali={totaleStep}
              stepEseguiti={step.numeroProgressivoStep}
              rispostaSelezionata={risposta.rispostaSelezionata}
              disableAutofocus={isModalBoxOpened}
              correzioneRisposta={{
                isPristine: true,
                isCheckable: risposta.isCheckable,
                isChecked: false,
                isCorrect: false,
                isInterfaceLocked: false,
                isHelpEnabled: false,
                mostraSoluzione: false,
                mostraCorrezione: false,
                isFocusEnabled: risposta.isFocusEnabled,
              }}
              correzioneRispostaFx={this.submitRisposta}
              apriModalBox={onModalSetData}
              chiudiModalBox={onModalResetData}
              skipFunction={this.skipFunction}
              hasSkip
              hasHelp={false}
              hasCorreggi={false}
              hasLessico={false}
              topBarParams={{
                rightBtn: {
                  icon: 'topBarFeedback',
                  onClickFunction: this.helpButtonFunction,
                },
                closeBtn: {
                  url: '#',
                  enabled: true,
                  onClickFunction: () => {
                    onVerificaReset();
                    history.push(backUrl);
                  },
                },
              }}
            />
        }
        <LogoPlatform
          product={configuration.product}
          execLogo
          margin="0 0 20px"
          desktopOnly
        />
      </FlexWrap >
    );
  }
}

VerificaEsecuzioneView.propTypes = {
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  step: PropTypes.shape({
    testi: PropTypes.array.isRequired,
    esercizi: PropTypes.array.isRequired,
    isStepLoaded: PropTypes.bool.isRequired,
    numeroProgressivoStep: PropTypes.number.isRequired,
  }).isRequired,
  contenutoVerifica: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    risposteFornite: PropTypes.object.isRequired,
    stepCaricato: PropTypes.number.isRequired,
    unitaSelezionate: PropTypes.array.isRequired,
    soloLatino: PropTypes.bool.isRequired,
    steps: PropTypes.array.isRequired,
    stepRiaccodati: PropTypes.array.isRequired,
    id: PropTypes.number,
    totaleStep: PropTypes.number.isRequired,
    livelloId: PropTypes.number.isRequired,
  }).isRequired,
  risposta: PropTypes.shape({
    rispostaSelezionata: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    isCheckable: PropTypes.bool.isRequired,
    isFocusEnabled: PropTypes.bool.isRequired,
  }).isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  spinner: PropTypes.bool.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalResetData: PropTypes.func.isRequired,
  onVerificaReset: PropTypes.func.isRequired,
  onPostRisposta: PropTypes.func.isRequired,
  onRispostaSet: PropTypes.func.isRequired,
  isModalBoxOpened: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  spinner: state.get('verifiche').toJS().spinner,
  feedback: state.get('verifiche').toJS().feedback,
  contenutoVerifica: state.get('verifiche').toJS().contenuto,
  step: state.get('verifiche').toJS().step,
  risposta: state.get('verifiche').toJS().risposta,
  isModalBoxOpened: state.get('modalBox').toJS().show,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalResetData: () => {
      dispatch(modalSetEmptyData());
    },
    onRispostaSet: (payload) => {
      dispatch(verificaRispostaSet(payload));
    },
    onVerificaReset: () => {
      dispatch(verificaReset());
    },
    onPostRisposta: (payload) => {
      dispatch(verificaRispostaPost(payload));
    },
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(VerificaEsecuzioneView);
