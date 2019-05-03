/**
 *
 * ProvaParallelEsecuzione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import {
  provaParallelRispostaSet,
  provaParallelReset,
  provaParallelRispostaPost,
  provaParallelEsecuzioneFetch,
} from 'containers/ProvaParallel/actions';
import { checkIsRispostaSelezionata } from 'common/esercizi';
import EsecuzioneSteps from 'components/EsecuzioneSteps';
import { FlexWrap } from 'components/FlexBox';
import Container from 'components/Container';
import Page from 'components/Page';
import LogoPlatform from 'components/LogoPlatform';
import HtmlBlock from 'components/HtmlBlock';
import Spinner from 'components/Spinner';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';


// FIXME
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

export class ProvaParallelEsecuzioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      onProvaParallelEsecuzioneFetch,
      match: { params: { id } },
      configuration: {
        disciplinaId,
        product,
      },
    } = this.props;

    onProvaParallelEsecuzioneFetch({
      id: parseInt(id, 10), // FIXME probabilmente non sarà intero
      disciplinaId,
      product,
    });
  }

  selezionaRisposta = (data) => {
    const { onRispostaSet, step } = this.props;

    onRispostaSet({
      rispostaSelezionata: data,
      isCheckable: checkIsRispostaSelezionata(data, step),
    });
  }

  submitRisposta = (skipRequest) => {
    const {
      esecuzione: {
        risposteFornite,
        stepCaricato,
        id: idProvaParallel,
        steps,
      },
      step,
      risposta: {
        rispostaSelezionata,
      },
      onProvaParallelRispostaPost,
      history: { push },
      configuration: {
        disciplinaId,
        product,
      },
    } = this.props;
    onProvaParallelRispostaPost({
      step,
      steps,
      rispostaSelezionata,
      risposteFornite,
      stepCaricato,
      skipRequest,
      idProvaParallel,
      historyPush: push,
      disciplinaId,
      product,
    });
  }

  toggleFocus = (enable) => {
    const { onRispostaSet } = this.props;
    onRispostaSet({ isFocusEnabled: enable });
  }

  render() {
    const {
      onModalSetData,
      onModalResetData,
      esecuzione: {
        steps,
        testo,
        id,
      },
      spinner,
      step,
      risposta: {
        rispostaSelezionata,
        isCheckable,
        risposteInizializza,
        isFocusEnabled,
      },
      onProvaParallelReset,
      history,
      isModalBoxOpened,
      configuration: { product },
    } = this.props;

    return (
      <FlexWrap>
        {spinner ?
          <Spinner /> :
          <EsecuzioneSteps
            key={`prova_parallel_step_${step.numeroProgressivoStep}`}
            toggleFocusFunction={this.toggleFocus}
            stepCaricato={step}
            funzioneSelezionaRisposta={(e) => this.selezionaRisposta(e)}
            stepTotali={steps.length}
            stepEseguiti={step.numeroProgressivoStep}
            rispostaSelezionata={rispostaSelezionata}
            disableAutofocus={isModalBoxOpened}
            skipFunction={() => this.submitRisposta(true)}
            hasSkip
            correzioneRisposta={{
              isCheckable,
              isChecked: false,
              isCorrect: false,
              isPristine: false,
              isInterfaceLocked: false,
              isHelpEnabled: false,
              mostraSoluzione: false,
              mostraCorrezione: false,
              risposteInizializza,
              isFocusEnabled,
            }}
            correzioneRispostaFx={() => this.submitRisposta(false)}
            apriModalBox={onModalSetData}
            chiudiModalBox={onModalResetData}
            hasHelp={false}
            hasCorreggi={false}
            hasLessico={false}
            audioSettings={{
              maxRepetitions: 1,
              enablePause: true,
            }}
            topBarParams={{
              closeBtn: { // FIXME
                url: '#',
                enabled: true,
                onClickFunction: () => {
                  onProvaParallelReset();
                  history.push(`/prova-parallel/${id}`); // FIXME
                },
              },
              rightBtn: testo ? {
                icon: 'version',
                onClickFunction: () => onModalSetData({
                  topbar: true,
                  titolo: 'Testo',
                  isPopup: false,
                  bgcolor: 'transparent',
                  contenuto: (
                    <Page full>
                      <Container>
                        <BloccoRiepilogo text={testo} />
                      </Container>
                    </Page>
                  ),
                  show: true,
                }),
              } : undefined,
            }}
          />}
        <LogoPlatform
          product={product}
          execLogo
          margin="0 0 20px"
          desktopOnly
        />
      </FlexWrap>
    );
  }
}

ProvaParallelEsecuzioneView.propTypes = {
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
    disciplinaId: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  step: PropTypes.shape({
    testi: PropTypes.array.isRequired,
    esercizi: PropTypes.array.isRequired,
    numeroProgressivoStep: PropTypes.number.isRequired,
  }).isRequired,
  esecuzione: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    consegnata: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string.isRequired,
    testo: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
      testi: PropTypes.array.isRequired,
      esercizi: PropTypes.array.isRequired,
      numeroProgressivoStep: PropTypes.number.isRequired,
    })).isRequired,
    risposteFornite: PropTypes.object.isRequired,
    stepCaricato: PropTypes.number.isRequired,
  }).isRequired,
  risposta: PropTypes.shape({
    rispostaSelezionata: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    isCheckable: PropTypes.bool.isRequired,
    isFocusEnabled: PropTypes.bool.isRequired,
  }).isRequired,
  spinner: PropTypes.bool.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalResetData: PropTypes.func.isRequired,
  onProvaParallelReset: PropTypes.func.isRequired,
  onRispostaSet: PropTypes.func.isRequired,
  isModalBoxOpened: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  spinner: state.get('provaParallel').toJS().spinner,
  feedback: state.get('provaParallel').toJS().feedback,
  esecuzione: state.get('provaParallel').toJS().esecuzione,
  step: state.get('provaParallel').toJS().step,
  risposta: state.get('provaParallel').toJS().risposta,
  isModalBoxOpened: state.get('modalBox').toJS().show,
});

function mapDispatchToProps(dispatch) {
  return {
    onProvaParallelEsecuzioneFetch: (payload) => {
      dispatch(provaParallelEsecuzioneFetch(payload));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalResetData: () => {
      dispatch(modalSetEmptyData());
    },
    onRispostaSet: (payload) => {
      dispatch(provaParallelRispostaSet(payload));
    },
    onProvaParallelReset: () => {
      dispatch(provaParallelReset());
    },
    onProvaParallelRispostaPost: (payload) => {
      dispatch(provaParallelRispostaPost(payload));
    },
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ProvaParallelEsecuzioneView);
