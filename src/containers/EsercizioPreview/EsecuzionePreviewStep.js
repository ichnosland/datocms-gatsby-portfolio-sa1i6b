/**
 *
 * EsecuzionePreviewStep
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import EsecuzioneSteps from 'components/EsecuzioneSteps';
import { FlexWrap } from 'components/FlexBox';
import LogoPlatform from 'components/LogoPlatform';


export default class EsecuzionePreviewStep extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      totaleDomande,
      step,
      risposta: {
        rispostaSelezionata,
        isCheckable,
        isChecked,
        isPristine,
        isCorrect,
        isInterfaceLocked,
        isHelpEnabled,
        correzioneStep,
        mostraSoluzione,
        mostraCorrezione,
        isFocusEnabled,
        risposteInizializza,
      },
      configuration,
      disableAutofocus,
      selezioneRispostaFx,
      toggleFocusFunction,
      correzioneRispostaFx,
      apriModalBoxFx,
      chiudiModalBoxFx,
      helpFunction,
      stepEseguiti,
      backUrl,
    } = this.props;

    return (
      <FlexWrap>
        <EsecuzioneSteps
          key={`esecuzione_preview_${step.numeroProgressivoStep}`}
          toggleFocusFunction={toggleFocusFunction}
          stepCaricato={step}
          funzioneSelezionaRisposta={selezioneRispostaFx}
          stepTotali={totaleDomande}
          stepEseguiti={stepEseguiti}
          rispostaSelezionata={rispostaSelezionata}
          disableAutofocus={disableAutofocus}
          correzioneRisposta={{
            isCheckable,
            isChecked,
            isPristine,
            isCorrect,
            isInterfaceLocked,
            isHelpEnabled,
            correzioneStep,
            mostraSoluzione,
            mostraCorrezione,
            risposteInizializza,
            isFocusEnabled,
          }}
          correzioneRispostaFx={correzioneRispostaFx}
          apriModalBox={apriModalBoxFx}
          chiudiModalBox={chiudiModalBoxFx}
          helpFunction={helpFunction}
          hasHelp
          hasCorreggi={false}
          hasLessico
          topBarParams={{
            closeBtn: {
              url: backUrl,
              enabled: true,
            },
          }}
        />
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

EsecuzionePreviewStep.propTypes = {
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
  }).isRequired,
  step: PropTypes.shape({
    testi: PropTypes.array.isRequired,
    esercizi: PropTypes.array.isRequired,
    isStepLoaded: PropTypes.bool.isRequired,
    numeroProgressivoStep: PropTypes.number.isRequired,
  }).isRequired,
  totaleDomande: PropTypes.number.isRequired,
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
  correzioneRispostaFx: PropTypes.func.isRequired,
  apriModalBoxFx: PropTypes.func.isRequired,
  chiudiModalBoxFx: PropTypes.func.isRequired,
  helpFunction: PropTypes.func.isRequired,
  selezioneRispostaFx: PropTypes.func.isRequired,
  backUrl: PropTypes.string.isRequired,
};

