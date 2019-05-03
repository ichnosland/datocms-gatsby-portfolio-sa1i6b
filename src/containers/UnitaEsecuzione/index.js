/**
 *
 * UnitaEsecuzione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import {
  unitaRispostaSet,
  unitaReset,
  unitaRispostaPost,
  unitaStepNext,
} from 'containers/Unita/actions';
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
import HtmlBlock from 'components/HtmlBlock';
import Spinner from 'components/Spinner';
import { API_BASE_PATH } from 'configuration';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

export const BloccoRiepilogo = styled(HtmlBlock)`
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

export class UnitaEsecuzioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { contenutoUnita, history, configuration } = this.props;
    if (!contenutoUnita.isLoaded) {
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

  proseguiAvanzamento = () => {
    const {
      contenutoUnita: { consegnata, lezioni, difficolta },
      step: { nextStep },
      userAppData: { hints: userHints, enableSuoni, docente: isDocente },
      risposta,
      onStepNext,
      history: { push },
      dispatch,
      userAnagraphics: { id: userId, studenteAcademy },
      configuration: { product: productName },
    } = this.props;

    onStepNext({
      nextStep,
      risposta,
      isConsegnata: consegnata,
      historyPush: push,
      enableSuoni,
      dispatch,
      productName,
      userId,
      userHints,
      isDocente,
      studenteAcademy,
      lezioni,
      difficolta,
    });
  }

  submitRisposta = () => {
    const {
      step,
      contenutoUnita,
      userAppData: { docente: isDocente, enableSuoni },
      risposta,
      onPostRisposta,
      configuration: { disciplinaId },
      userAnagraphics: { studenteAcademy },
    } = this.props;

    onPostRisposta({
      step,
      contenutoUnita,
      risposta,
      isDocente,
      enableSuoni,
      disciplinaId,
      studenteAcademy,
    });
  }

  toggleFocus = (enable) => {
    const { onRispostaSet } = this.props;
    onRispostaSet({ isFocusEnabled: enable });
  }

  helpButtonFunction = /* istanbul ignore next */ () => {
    const { onModalSetData, risposta, contenutoUnita, step } = this.props;

    if (!risposta.mostraSoluzione && !risposta.mostraCorrezione) {
      return false;
    }

    onModalSetData({
      contenuto: (
        <ZendeskTicket
          ticketData={{
            provenienza: 'esecuzione_unita',
            provenienzaReadable: `Esecuzione unità step #${step.stepId})`,
            titolo: contenutoUnita.titolo,
            adminUrl: `${API_BASE_PATH}admin/cicero_academy/esercizioacademy/${step.esercizi[0].esercizioId}/change`,
            consegna: (step.esercizi[0] || {}).titolo,
            testoSemplificato: cleanTesto(step.testi[0].testo_principale),
            elementi: getIdsElementiEsercizio(step),
            rispostaUtente: creaTestoReadable(
              risposta.rispostaSelezionata, step
            ),
            rispostaUtenteResponso: risposta.isCorrect ? 'corretta' : 'sbagliata',
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
      contenutoUnita: { id, totaleDomande, isLoaded, lezione },
      spinner,
      step,
      risposta,
      onUnitaReset,
      history,
      configuration,
      isModalBoxOpened,
      userAppData: { docente },
      userAnagraphics: { studenteAcademy: { punti } },
    } = this.props;

    return (
      <FlexWrap>
        {spinner || !isLoaded ?
          <Spinner /> :
          <EsecuzioneSteps
            key={`esecuzione_unita_step_${step.stepId}_${risposta.isInterfaceLocked ? 1 : 0}`}
            toggleFocusFunction={this.toggleFocus}
            stepCaricato={step}
            funzioneSelezionaRisposta={(e) => this.selezionaRisposta(e)}
            stepTotali={totaleDomande}
            stepEseguiti={step.numeroStepCompletati}
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
                this.submitRisposta
            }
            apriModalBox={onModalSetData}
            chiudiModalBox={onModalResetData}
            hasHelp={false}
            hasCorreggi={false}
            hasLessico
            topBarParams={{
              score: !docente ? `+ ${punti}` : '',
              closeBtn: {
                url: '#',
                enabled: true,
                onClickFunction: () => {
                  onUnitaReset();
                  history.push(`/unita-preview/${id}`);
                },
              },
              rightBtn: {
                enabled: true,
                icon: 'lesson',
                url: `/lezione/${lezione}/unita-esecuzione`,
              },
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

UnitaEsecuzioneView.propTypes = {
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
    stepId: PropTypes.number.isRequired,
    numeroStepCompletati: PropTypes.number.isRequired,
  }).isRequired,
  contenutoUnita: PropTypes.shape({
    difficolta: PropTypes.string.isRequired,
    consegnata: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    lezione: PropTypes.number.isRequired,
    lezioni: PropTypes.shape({
      totale: PropTypes.number,
      completate: PropTypes.number,
      data: PropTypes.shape({
        inCorso: PropTypes.bool,
        completata: PropTypes.bool,
        sbloccata: PropTypes.bool,
      }),
    }),
    assegnata: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string.isRequired,
    prerequisito: PropTypes.number.isRequired,
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
  onUnitaReset: PropTypes.func.isRequired,
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
  spinner: state.get('unita').toJS().spinner,
  feedback: state.get('unita').toJS().feedback,
  contenutoUnita: state.get('unita').toJS().contenuto,
  step: state.get('unita').toJS().step,
  risposta: state.get('unita').toJS().risposta,
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
      dispatch(unitaRispostaSet(payload));
    },
    onUnitaReset: () => {
      dispatch(unitaReset());
    },
    onPostRisposta: (payload) => {
      dispatch(unitaRispostaPost(payload));
    },
    onStepNext: (payload) => {
      dispatch(unitaStepNext(payload));
    },
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(UnitaEsecuzioneView);
