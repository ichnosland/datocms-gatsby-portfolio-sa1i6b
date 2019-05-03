/**
*
* TestoConsegna
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { findDOMNode } from 'react-dom';
import { Howl } from 'howler';
import 'katex/dist/katex.min.css';

import { H2 } from 'components/Heading';
import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { colore } from 'style/color';
import { ButtonStyle } from 'components/Button';
import Page from 'components/Page';
import Container from 'components/Container';
import TabelleList from 'components/TabelleList';
import AudioPlayer from './AudioPlayer';

import { generaElementiTesto } from './utils';

export const NoSelect = styled(Div)`
  user-select: none;
`;

export const BloccoConsegna = styled(Div)`
  line-height: 1.5em;
  user-select: none;
`;

export const LessicoContainer = styled(Div)`
  position: fixed;
  text-align: center;
  padding: 10px;
  color: ${colore.ui.darkTxt};
  background-color: ${colore.ui.contrast};
  border-radius: ${(props) => props.theme.radius.general};
  box-shadow: 0 0 3px rgba(0, 0, 0, .25);
  user-select: none;
  z-index: 12;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  ${({ hideTooltip }) => hideTooltip && css`
    display: none;
  `}
`;

LessicoContainer.defaultProps = {
  theme: {
    radius: {
      general: '6px',
    },
  },
};

export const BaloonCaret = styled(Div)`
  background-color: ${colore.ui.contrast};
  height: 16px;
  position: absolute;
  top: -8px;
  left: calc(50% - 8px);
  transform: rotate(135deg);
  width: 16px;
  box-shadow: -1.5px 1.5px 1px rgba( 0, 0, 0, .1 );
`;

const padding = css`
  display:block;
  padding: 8px 12px;
`;

export const Lemma = styled.span`
  ${padding}
  font-weight: bold;
`;

export const Traduzione = styled.span`
  ${padding}
  font-weight: 300;
`;

export const ButtonConiugazione = styled.span`
  ${ButtonStyle}
  margin-top: 10px;
`;


class TestoConsegna extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      tooltipContent: { id: undefined },
      tooltip: undefined,
      lessico: undefined,
      audioPlayback: {},
    };

    this.lessicoRefs = {};
    this.tooltipRefs = {};
  }

  componentDidMount() {
    const { step: { testi } } = this.props;
    const audio = testi.filter((t) => t.url_audio);

    if (audio.length) {
      this.initializeAudio(audio);
    }
  }

  componentDidUpdate(oldProps, oldState) {
    const {
      hideTooltip: hideTooltipNew,
      rispostaSelezionata: newRisposta,
      step,
    } = this.props;
    const {
      hideTooltip: hideTooltipOld,
      rispostaSelezionata: oldRisposta,
      step: oldStep,
    } = oldProps;

    const { tooltipContent: { id: chiaveNew } } = this.state;
    const { tooltipContent: { id: chiaveOld } } = oldState;

    /**
     * questo fa abbastanza schifo ma è al momento il modo più veloce
     * per controllare se ho una modifica della risposta selezionata in
     * modo da disabilitare il tooltip anche in questo caso e non solo
     * tramite la flag hideTooltip. Non avendo più uno stato comune, lo
     * devo fare qui
     */
    if ((hideTooltipNew && !hideTooltipOld) || (newRisposta.join() !== oldRisposta.join())) {
      this.toggleAperti({ id: undefined });
      return false;
    }

    if (oldStep.id !== step.id) {
      const audio = step.testi.filter((t) => t.url_audio);

      if (audio.length) {
        this.initializeAudio(audio);
      }
    }

    if (chiaveNew && chiaveNew !== chiaveOld) /* istanbul ignore next */ {
      const nodeDataTooltip = findDOMNode(this.tooltipRefs[`lessicocontainer_block_${chiaveNew}`]); // eslint-disable-line react/no-find-dom-node
      if (nodeDataTooltip) {
        this.aggiornaState({
          tooltip: nodeDataTooltip.getBoundingClientRect(),
        });
      }
    }
    return true;
  }

  aggiornaState(data) {
    this.setState(data);
  }

  endAudio = (id) => {
    const { audioPlayback } = this.state;
    const { audioSettings: { maxRepetitions } = {} } = this.props;

    if (!audioPlayback[id]) {
      return false;
    }

    const dataToSet = {
      played: true,
      paused: false,
      playing: false,
      counterRepetitions: audioPlayback[id].counterRepetitions + 1,
    };

    if (maxRepetitions > 0 && dataToSet.counterRepetitions >= maxRepetitions) {
      dataToSet.locked = true;
    }

    this.setState({
      audioPlayback: {
        ...audioPlayback,
        [id]: { ...audioPlayback[id], ...dataToSet },
      },
    });

    return true;
  }

  errorAudio = (id, loadError = false) => {
    const { audioPlayback } = this.state;
    const { apriModalFunction } = this.props;

    if (!audioPlayback[id]) {
      return false;
    }

    apriModalFunction({
      contenuto: loadError ?
        `Non ho potuto caricare il file ${audioPlayback[id].fileName}` :
        `Non ho potuto riprodurre il file ${audioPlayback[id].fileName}`,
      show: true,
      closeButton: {
        text: 'Ok',
      },
    });

    this.setState({
      audioPlayback: {
        ...audioPlayback,
        [id]: {
          ...audioPlayback[id],
          paused: false,
          played: false,
          playing: false,
          locked: false,
          counterRepetitions: 0,
        },
      },
    });

    return true;
  }

  initializeAudio = (files) => {
    const { audioPlayback } = this.state;

    this.setState({
      audioPlayback: {
        ...audioPlayback,
        ...files.reduce((acc, item) => {
          acc[item.id] = {
            controller: new Howl({
              src: [item.url_audio],
              onend: () => this.endAudio(item.id),
              onplayerror: () => this.errorAudio(item.id),
              onloaderror: () => this.errorAudio(item.id, true),
            }),
            fileName: item.url_audio,
            paused: false,
            played: false,
            playing: false,
            locked: false,
            counterRepetitions: 0,
          };

          return acc;
        }, {}),
      },
    });
  }

  audioPlay = (id, paused = false) => {
    const { audioPlayback } = this.state;

    if (!audioPlayback[id]) {
      return false;
    }

    const dataToSet = {
      ...audioPlayback,
      [id]: {
        ...audioPlayback[id],
        paused,
        playing: !paused,
      },
    };

    if (paused) {
      audioPlayback[id].controller.pause();
    } else {
      audioPlayback[id].controller.play();
    }

    this.setState({ audioPlayback: dataToSet });

    return true;
  }

  toggleAperti = (data) => {
    const { tooltipContent } = this.state;

    const newState = {
      tooltip: undefined,
      lessico: undefined,
      tooltipContent: tooltipContent.id === data.id ? { id: undefined } : data,
    };

    if (newState.tooltipContent.id) /* istanbul ignore next */ {
      const nodeDataLessico = findDOMNode(this.lessicoRefs[`lessico_block_${data.id}`]); // eslint-disable-line react/no-find-dom-node
      if (nodeDataLessico) {
        const offsets = nodeDataLessico.getBoundingClientRect();
        newState.lessico = offsets;
      }
    }

    this.aggiornaState(newState);
  }

  render() {
    const {
      mostraPerStampa,
      step,
      audioSettings: { enablePause } = {},
      nascondiTitolo,
      margin,
      apriModalFunction,
      hideTooltip,
      hasLessico,
    } = this.props;

    const {
      tooltipContent: {
        id,
        inputLessicale: {
          lemma = '',
          traduzione = '',
          tabelle = [],
          tipo = '',
        } = {
          lemma: '',
          traduzione: '',
          tabelle: [],
          tipo: '',
        },
      },
      tooltip = { left: 0, right: 0, top: 0, height: 0, width: 0 },
      lessico = { left: 0, right: 0, top: 0, height: 0, width: 0 },
      audioPlayback,
    } = this.state;

    const audioFiles = step.testi.filter((f) => (f.url_audio));
    return (
      <NoSelect>
        {(audioFiles.length > 0 || !nascondiTitolo) && (
          <FlexBox margin="0 0 20px" justifyContent="space-between">
            {!nascondiTitolo && <H2 margin="0">{step.esercizi[0].titolo || step.testi[0].titolo}</H2>}
            {audioFiles.map((f) => (
              <AudioPlayer
                key={`audio_player_${f.id}`}
                titolo={f.titolo}
                playFunction={() => this.audioPlay(f.id)}
                pauseFunction={() => this.audioPlay(f.id, true)}
                disablePause={!enablePause}
                paused={(audioPlayback[f.id] || {}).paused}
                locked={(audioPlayback[f.id] || {}).locked}
                playing={(audioPlayback[f.id] || {}).playing}
              />
            ))}
          </FlexBox>
        )}
        <BloccoConsegna margin={margin}>
          {step.testi.map((testo) => (
            <div key={`consegna_${testo.id}`}>
              {generaElementiTesto({
                elementiTesto: testo.testoConsegna,
                hasLessico,
                lessicoRefs: this.lessicoRefs,
                toggleAperti: hasLessico && !hideTooltip ? this.toggleAperti : null,
              })}
            </div>
          ))}
          {mostraPerStampa && ['U', 'P'].indexOf(step.esercizi[0].tipo) > -1 && (
            <div>
              {step.esercizi.map((elemento) => (generaElementiTesto({
                hasLessico,
                elementiTesto: [{
                  content: elemento.testo_principale_pre,
                }, {
                  children: [{
                    content:
                      `${elemento.testo_principale_pre ? ' ' : ''}...${elemento.testo_principale_post ? ' ' : ''}`,
                  }],
                  type: 'context',
                }, {
                  content: elemento.testo_principale_post,
                }],
              })))}
            </div>
          )}
        </BloccoConsegna>
        {!!id && (
          <LessicoContainer
            left={(lessico.left - (tooltip.width / 2)) + (lessico.width / 2)}
            top={lessico.top + (lessico.height * 1.5)}
            key={`lessicocontainer_block_${id}`}
            ref={/* istanbul ignore next */ (input) => { this.tooltipRefs[`lessicocontainer_block_${id}`] = input; }}
            hideTooltip={hideTooltip}
          >
            <BaloonCaret />
            <Lemma>{lemma}</Lemma>
            {traduzione && <Traduzione>{traduzione}</Traduzione>}
            {tabelle && apriModalFunction && (
              <ButtonConiugazione
                onClick={() => apriModalFunction({
                  topbar: true,
                  barcolor: `${colore.actions.hint}`,
                  titolo: lemma,
                  isPopup: false,
                  bgcolor: 'transparent',
                  contenuto: (
                    <Page full>
                      <Container>
                        <TabelleList
                          margin="0 0 16px"
                          radius="3px"
                          userSelect="none"
                          key="tabella_risposte"
                          tabelle={tabelle.map((t) => ({
                            intestazione: t.titolo,
                            righe: t.righe.map((riga) => (
                              [{ titolo: riga.label }, { titolo: riga.valore }]
                            )),
                          }))}
                        />
                      </Container>
                    </Page>
                  ),
                  show: true,
                })}
              >
                {tipo === 'v' ? 'Coniugazione' : 'Declinazione'}
              </ButtonConiugazione>
            )}
          </LessicoContainer>
        )}
      </NoSelect>
    );
  }
}

TestoConsegna.propTypes = {
  mostraPerStampa: PropTypes.bool,
  hasLessico: PropTypes.bool.isRequired,
  margin: PropTypes.string,
  nascondiTitolo: PropTypes.bool,
  hideTooltip: PropTypes.bool.isRequired,
  rispostaSelezionata: PropTypes.array,
  step: PropTypes.shape({
    testi: PropTypes.arrayOf(
      PropTypes.shape({
        testoConsegna: PropTypes.array,
      })
    ).isRequired,
  }).isRequired,
  apriModalFunction: PropTypes.func,
  audioSettings: PropTypes.shape({
    maxRepetitions: PropTypes.number,
    enablePause: PropTypes.bool,
  }),
};

TestoConsegna.defaultProps = {
  rispostaSelezionata: [],
};

export default TestoConsegna;
