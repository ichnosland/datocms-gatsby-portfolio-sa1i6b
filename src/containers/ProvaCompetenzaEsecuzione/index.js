/**
 *
 * ProvaCompetenzaEsecuzione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import {
  provaCompetenzaRispostaSet,
  provaCompetenzaReset,
  provaCompetenzaRispostaPost,
  provaCompetenzaStepNext,
} from 'containers/ProvaCompetenza/actions';
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
import Container from 'components/Container';
import Page from 'components/Page';
import HtmlBlock from 'components/HtmlBlock';
import Spinner from 'components/Spinner';
import { API_BASE_PATH } from 'configuration';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

export const BloccoRiepilogo = styled(HtmlBlock)`
  user-select: none;
  padding: 20px;
  border-radius: ${(props) => props.radius ? props.radius : props.theme.radius.general};
`;

BloccoRiepilogo.defaultProps = {
  theme: {
    radius: {
      general: '6px',
    },
  },
};

export class ProvaCompetenzaEsecuzioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { contenutoProva, history, configuration, step: { isStepLoaded } } = this.props;
    if (!contenutoProva.isLoaded || !isStepLoaded) {
      history.push(configuration.homePage);
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
    const { contenutoProva, step, userAppData, risposta, onPostRisposta } = this.props;
    onPostRisposta({
      step,
      risposta,
      contenutoProva,
      helpRequest: true,
      isDocente: userAppData.docente,
      enableSuoni: userAppData.enableSuoni,
    });
  }

  proseguiAvanzamento = () => {
    const {
      contenutoProva,
      step,
      userAppData,
      risposta,
      onStepNext,
      history,
      dispatch,
      userAnagraphics,
      configuration,
    } = this.props;

    onStepNext({
      step,
      risposta,
      contenutoProva,
      isDocente: userAppData.docente,
      history,
      enableSuoni: userAppData.enableSuoni,
      dispatch,
      configuration,
      userAnagraphics,
      userAppData,
    });
  }

  submitRisposta = () => {
    const { contenutoProva, step, userAppData, risposta, onPostRisposta } = this.props;
    onPostRisposta({
      step,
      risposta,
      contenutoProva,
      helpRequest: false,
      isDocente: userAppData.docente,
      enableSuoni: userAppData.enableSuoni,
    });
  }

  toggleFocus = (enable) => {
    const { onRispostaSet } = this.props;
    onRispostaSet({ isFocusEnabled: enable });
  }

  helpButtonFunction = /* istanbul ignore next */ () => {
    const { onModalSetData, risposta, contenutoProva, step } = this.props;

    if (!risposta.mostraSoluzione && !risposta.mostraCorrezione) {
      return false;
    }

    let rispostaUtenteResponso = '';
    if (risposta.isHelpEnabled) {
      rispostaUtenteResponso = 'help';
    } else if (risposta.isCorrect) {
      rispostaUtenteResponso = 'corretta';
    } else if (!risposta.isCorrect) {
      rispostaUtenteResponso = 'sbagliata';
    }

    onModalSetData({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'esecuzione_prova_competenza',
            provenienzaReadable: `Esecuzione prova competenza step #${step.numeroProgressivoStep})`,
            titolo: contenutoProva.titolo,
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/esercizioacademy/${step.esercizi[0].esercizioId}/change`,
            consegna: (step.esercizi[0] || {}).titolo,
            testoSemplificato: cleanTesto(step.testi[0].testo_principale),
            elementi: getIdsElementiEsercizio(step),
            rispostaUtente: creaTestoReadable(
              risposta.rispostaSelezionata, step
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
      contenutoProva,
      spinner,
      step,
      risposta,
      onProvaCompetenzaReset,
      history,
      configuration,
      isModalBoxOpened,
    } = this.props;

    return (
      <FlexWrap>
        {spinner || !contenutoProva.isLoaded ?
          <Spinner /> :
          <EsecuzioneSteps
            key={`prova_competenza_step_${step.numeroProgressivoStep}`}
            toggleFocusFunction={this.toggleFocus}
            stepCaricato={step}
            funzioneSelezionaRisposta={(e) => this.selezionaRisposta(e)}
            stepTotali={contenutoProva.totaleDomande}
            stepEseguiti={step.numeroProgressivoStep}
            rispostaSelezionata={risposta.rispostaSelezionata}
            helpButtonFunction={this.helpButtonFunction}
            disableAutofocus={isModalBoxOpened}
            correzioneRisposta={{
              isCheckable: risposta.isCheckable,
              isChecked: risposta.isChecked,
              isPristine: risposta.isPristine,
              isCorrect: risposta.isCorrect,
              isInterfaceLocked: risposta.isInterfaceLocked,
              isHelpEnabled: risposta.isHelpEnabled,
              correzioneStep: risposta.correzioneStep,
              mostraSoluzione: risposta.mostraSoluzione,
              mostraCorrezione: risposta.mostraCorrezione,
              risposteInizializza: risposta.risposteInizializza,
              isFocusEnabled: risposta.isFocusEnabled,
            }}
            correzioneRispostaFx={
              risposta.isInterfaceLocked ?
                this.proseguiAvanzamento :
                /* istanbul ignore next */ this.submitRisposta
            }
            apriModalBox={onModalSetData}
            chiudiModalBox={onModalResetData}
            helpFunction={this.helpFunction}
            hasHelp={false}
            hasCorreggi={false}
            hasLessico={false}
            topBarParams={{
              closeBtn: {
                url: '#',
                enabled: true,
                onClickFunction: () => {
                  onProvaCompetenzaReset();
                  history.push(`/prova-competenza-preview/${contenutoProva.id}`);
                },
              },
              rightBtn: contenutoProva.testo ? {
                icon: 'version',
                onClickFunction: () => onModalSetData({
                  topbar: true,
                  titolo: 'Testo',
                  isPopup: false,
                  bgcolor: 'transparent',
                  contenuto: (
                    <Page full>
                      <Container>
                        <BloccoRiepilogo text={contenutoProva.testo} />
                      </Container>
                    </Page>
                  ),
                  show: true,
                }),
              } : undefined,
            }}
          />}
        <LogoPlatform
          product={configuration.product}
          execLogo
          margin="0 0 20px"
          desktopOnly
        />
      </FlexWrap>
    );
  }
}

ProvaCompetenzaEsecuzioneView.propTypes = {
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
  contenutoProva: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    inCorso: PropTypes.bool.isRequired,
    consegnata: PropTypes.bool.isRequired,
    ritirata: PropTypes.bool.isRequired,
    assegnata: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string.isRequired,
    testo: PropTypes.string.isRequired,
    prerequisito: PropTypes.string.isRequired,
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
  onProvaCompetenzaReset: PropTypes.func.isRequired,
  onPostRisposta: PropTypes.func.isRequired,
  onStepNext: PropTypes.func.isRequired,
  onRispostaSet: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  isModalBoxOpened: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  spinner: state.get('provaCompetenza').toJS().spinner,
  feedback: state.get('provaCompetenza').toJS().feedback,
  contenutoProva: state.get('provaCompetenza').toJS().contenuto,
  step: state.get('provaCompetenza').toJS().step,
  risposta: state.get('provaCompetenza').toJS().risposta,
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
      dispatch(provaCompetenzaRispostaSet(payload));
    },
    onProvaCompetenzaReset: () => {
      dispatch(provaCompetenzaReset());
    },
    onPostRisposta: (payload) => {
      dispatch(provaCompetenzaRispostaPost(payload));
    },
    onStepNext: (payload) => {
      dispatch(provaCompetenzaStepNext(payload));
    },
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ProvaCompetenzaEsecuzioneView);
