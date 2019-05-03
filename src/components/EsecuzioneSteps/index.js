/**
*
* EsecuzioneSteps
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import Container from 'components/Container';
import CentralBox from 'components/CentralBox';
import ProgressBar from 'components/ProgressBar';
import TopBar from 'components/TopBar';
import AlertBar from 'components/AlertBar';
import ToolBar from 'components/ToolBar';
import ToolBarButton from 'components/ToolBar/ToolBarButton';
import Step from './Step';

class EsecuzioneSteps extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.toolBarButtonInvio = React.createRef();
  }

  componentDidMount() {
    this.checkFocusButtonRisposta();
  }

  componentDidUpdate() {
    this.checkFocusButtonRisposta();
  }

  checkFocusButtonRisposta = () => {
    const {
      correzioneRisposta: { isCheckable, mostraSoluzione, mostraCorrezione },
      stepCaricato = { esercizi: [] },
    } = this.props;
    const isScrivi = ['U', 'P'].indexOf((stepCaricato.esercizi[0] || {}).tipo) > -1;

    if ((isCheckable && !isScrivi) || mostraSoluzione || mostraCorrezione) {
      this.enableFocusButtonRisposta();
    }
  }

  enableFocusButtonRisposta = /* istanbul ignore next */ () => {
    const { disableAutofocus } = this.props;

    if (disableAutofocus || !((this.toolBarButtonInvio || {}).current || {}).focus) {
      return false;
    }

    this.toolBarButtonInvio.current.focus();
    return true;
  }

  calcolaPercentuale = () => {
    const { stepTotali, stepEseguiti } = this.props;
    if (stepTotali > 0 && stepEseguiti > -1) {
      return Math.round((stepEseguiti / stepTotali) * 100);
    }
    return -1;
  }
  render() {
    const {
      stepCaricato,
      topBarParams,
      hasLessico,
      funzioneSelezionaRisposta,
      rispostaSelezionata,
      apriModalBox,
      chiudiModalBox,
      hasHelp,
      hasSkip,
      correzioneRisposta,
      correzioneRisposta: {
        isChecked,
        isCorrect,
        isHelpEnabled,
        mostraSoluzione,
        isCheckable,
        mostraCorrezione,
        isFocusEnabled,
      },
      correzioneRispostaFx,
      helpFunction,
      skipFunction,
      hasCorreggi,
      helpButtonFunction,
      disableAutofocus,
      toggleFocusFunction,
      isVersione,
      audioSettings,
    } = this.props;

    const percentualeSvolgimento = this.calcolaPercentuale();
    let titleButton = 'Continua';
    if (hasCorreggi) {
      if (isChecked && !isCorrect && !isHelpEnabled) {
        titleButton = 'Riprova';
      }
    } else if (!isChecked) {
      titleButton = 'Controlla';
    }

    const toolbarDefaultButtonInvia = {
      enabled: isCheckable || mostraSoluzione,
      full: !hasSkip && (!hasHelp || isChecked),
      check: hasSkip || (hasHelp && !isChecked),
      title: titleButton,
      onClickFx: isCheckable || mostraSoluzione ?
        correzioneRispostaFx : null,
      refData: this.toolBarButtonInvio,
    };

    return (
      <Container>
        <CentralBox
          versione={isVersione}
        >
          {percentualeSvolgimento > -1 &&
            <ProgressBar 
              lezione={!isVersione}
              versione={isVersione}
              percentuale={percentualeSvolgimento}
            />
          }
          <TopBar
            box
            esecuzione
            noShadow
            {...topBarParams}
          />
          <AlertBar
            versione={isVersione}
            giusto={!isHelpEnabled && isCorrect}
            sbagliato={!isHelpEnabled && !isCorrect}
            aiuto={isHelpEnabled}
            show={mostraCorrezione || mostraSoluzione}
            helpFx={helpButtonFunction}
          />
          <Step
            step={stepCaricato}
            hasLessico={hasLessico}
            funzioneSelezionaRisposta={funzioneSelezionaRisposta}
            rispostaSelezionata={rispostaSelezionata}
            apriModalBox={apriModalBox}
            chiudiModalBox={chiudiModalBox}
            hasHelp={hasHelp}
            hasSkip={hasSkip}
            hasCorreggi={hasCorreggi}
            correzioneRisposta={correzioneRisposta}
            correzioneRispostaFx={correzioneRispostaFx}
            helpFunction={helpFunction}
            skipFunction={skipFunction}
            disableAutofocus={disableAutofocus}
            enableFocusButtonRisposta={this.enableFocusButtonRisposta}
            toggleFocusFunction={toggleFocusFunction}
            audioSettings={audioSettings}
          />
          <ToolBar hideOnFocus={!(mostraCorrezione || mostraSoluzione) && isFocusEnabled}>
            {hasHelp && !isChecked && <ToolBarButton
              help
              onClickFx={helpFunction}
            />}
            {hasSkip && <ToolBarButton
              skip
              onClickFx={skipFunction}
            />}
            <ToolBarButton {...toolbarDefaultButtonInvia} />
          </ToolBar>
        </CentralBox>
      </Container>
    );
  }
}

EsecuzioneSteps.propTypes = {
  stepCaricato: PropTypes.shape({
    esercizi: PropTypes.array.isRequired,
    testi: PropTypes.array.isRequired,
  }),
  riaccodaSbagliate: PropTypes.func,
  rieseguiSbagliate: PropTypes.func,
  mostraCorrezione: PropTypes.func,
  funzioneSalta: PropTypes.func,
  funzioneEsegui: PropTypes.func,
  funzioneSelezionaRisposta: PropTypes.func,
  stepTotali: PropTypes.number,
  stepEseguiti: PropTypes.number,
  hasLessico: PropTypes.bool,
  isVersione: PropTypes.bool,
  rispostaSelezionata: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  hasHelp: PropTypes.bool.isRequired,
  hasSkip: PropTypes.bool,
  hasCorreggi: PropTypes.bool.isRequired,
  apriModalBox: PropTypes.func.isRequired,
  chiudiModalBox: PropTypes.func.isRequired,
  correzioneRisposta: PropTypes.shape({
    isCheckable: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isPristine: PropTypes.bool.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    isHelpEnabled: PropTypes.bool.isRequired,
    mostraSoluzione: PropTypes.bool.isRequired,
    mostraCorrezione: PropTypes.bool.isRequired,
  }).isRequired,
  correzioneRispostaFx: PropTypes.func.isRequired,
  helpFunction: PropTypes.func,
  skipFunction: PropTypes.func,
  topBarParams: PropTypes.object.isRequired,
  helpButtonFunction: PropTypes.func,
  disableAutofocus: PropTypes.bool,
  toggleFocusFunction: PropTypes.func.isRequired,
  audioSettings: PropTypes.shape({
    maxRepetitions: PropTypes.number,
    enablePause: PropTypes.bool,
  }),
};

export default EsecuzioneSteps;
