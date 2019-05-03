/**
*
* Step
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'katex/dist/katex.min.css';

import {
  rappresentaOpzioniScelta,
  inizializzaStepTipologiaG,
  splitClean,
  cleanTesto,
  creaTestoReadable,
  calculateChildrenTestoFromDataElem,
} from 'common/esercizi';
import { Button, Icon } from 'components/Button';
import globals from 'icons/globals';
import Elemento from 'components/Elemento';
import { Inseriti } from 'components/Elemento/Inseriti';
import Page from 'components/Page';
import Container from 'components/Container';
import Div from 'components/Div';
import TabelleList from 'components/TabelleList';
import RadioCheck from 'components/FormElements/RadioCheck';
import { H2 } from 'components/Heading';
import { colore } from 'style/color';
import TestoConsegna from 'containers/TestoConsegna';
import { generaElementiTesto } from 'containers/TestoConsegna/utils';
import { EditableSpanView } from 'components/ContentEditable/EditableSpan';
import OpzioniBlocchi from './OpzioniBlocchi';

export const WrapperNoSelectStep = styled(Div)`
  user-select: none;
`;

export const RispostaUtente = styled(Div)`
  padding: 16px;
  margin-bottom: 20px;
  text-align: left;
  color: ${(props) => props.theme.brand};
  background-color: ${colore.ui.contrast};
  border-radius: 3px;
  overflow: hidden;
  div {
    &:first-child {
      color: ${colore.ui.contrast};
      padding: 16px;
      margin: -16px -16px 16px;
      background-color: ${(props) => props.theme.brand};
    }
  }
`;


class Step extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  mostraContenutiStep = (data) => (
    generaElementiTesto({
      elementiTesto: calculateChildrenTestoFromDataElem(data),
    })
  );

  mostraOpzioniPopupG = (rispostePossibili, matriceRisposte, opzione) => {
    const {
      apriModalBox,
      chiudiModalBox,
      rispostaSelezionata,
      funzioneSelezionaRisposta,
    } = this.props;

    apriModalBox({
      isPopup: false,
      disableClose: true,
      contenuto: (
        <OpzioniBlocchi
          titolo={this.mostraContenutiStep(opzione.parola)}
          opzioni={rispostePossibili.map((r) => ({
            ...r,
            etichettaComposita: this.mostraContenutiStep(r.etichetta),
          }))}
          indiceBlocco={opzione.indiceBlocco}
          selectFunction={
            (data) => {
              funzioneSelezionaRisposta(
                { ...matriceRisposte, ...rispostaSelezionata || {}, ...data }
              );
              chiudiModalBox();
            }
          }
        />
      ),
      show: true,
    });
  }

  creaBloccoSelezioneRisposta = () => {
    const {
      rispostaSelezionata,
      correzioneRisposta,
      funzioneSelezionaRisposta,
      correzioneRispostaFx,
      enableFocusButtonRisposta,
      step,
      toggleFocusFunction,
    } = this.props;

    let inizializzaStep;
    let risposteAccettate;
    let risposteInizializza;

    switch (step.esercizi[0].tipo) {
      case 'I':
        risposteInizializza = [...(rispostaSelezionata || [])];
        return (
          <div>
            {splitClean(step.testi[step.testi.length - 1].testo_principale, 'leavepunct').map((opzione, key) => (
              <Elemento
                key={`elemento_disponibile_${opzione}_${key + 1}`}
                label={this.mostraContenutiStep(opzione)}
                trovato={!correzioneRisposta.mostraCorrezione && risposteInizializza.indexOf(key) > -1}
                giusto={
                  correzioneRisposta.mostraCorrezione && correzioneRisposta.correzioneStep.corrette.indexOf(key) > -1
                }
                sbagliato={
                  correzioneRisposta.mostraCorrezione && correzioneRisposta.correzioneStep.sbagliate.indexOf(key) > -1
                }
                onClickFx={
                  /* istanbul ignore next */
                  correzioneRisposta.isInterfaceLocked ? null : () => funzioneSelezionaRisposta(
                    risposteInizializza.indexOf(key) > -1 ?
                      risposteInizializza.filter((risp) => (risp !== key)) : [...risposteInizializza, key]
                  )}
              />
            ))}
          </div>
        );

      case 'O':
        risposteInizializza = [...(rispostaSelezionata || [])];
        inizializzaStep = risposteInizializza.map((item) => (item.key));
        return (
          <div>
            <Inseriti
              giusto={
                (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && correzioneRisposta.isCorrect
              }
              sbagliato={
                (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && !correzioneRisposta.isCorrect
              }
            >
              {risposteInizializza.map((item) => (
                <Elemento
                  key={`elemento_selezionato_${item.opzione}_${item.key + 1}`}
                  label={this.mostraContenutiStep(item.opzione)}
                  inserito
                  onClickFx={
                    /* istanbul ignore next */
                    correzioneRisposta.isInterfaceLocked ? null : () => funzioneSelezionaRisposta(
                      risposteInizializza.filter((risp) => (risp.key !== item.key))
                    )}
                />
              ))}
            </Inseriti>
            <Div align="center">
              {step.esercizi[0].traduci.map((opzione, key) => (
                <Elemento
                  key={`elemento_disponibile_${opzione}_${key + 1}`}
                  label={this.mostraContenutiStep(opzione)}
                  inattivo={inizializzaStep.indexOf(key) > -1}
                  onClickFx={
                    /* istanbul ignore next */
                    correzioneRisposta.isInterfaceLocked ? null : () => funzioneSelezionaRisposta(
                      inizializzaStep.indexOf(key) > -1 ?
                        risposteInizializza.filter(
                          (risp) => (risp.key !== key)
                        ) : [...risposteInizializza, { opzione, key }]
                    )}
                />
              ))}
            </Div>
          </div>
        );

      case 'U':
      case 'P':
        risposteInizializza = [...(rispostaSelezionata || [])];
        return step.esercizi.reduce((acc, elem, key) => {
          if (elem.testo_principale_pre) {
            acc.push(
              <span key={`traduci_pre_${elem.id}_${key + 1}`}>{this.mostraContenutiStep(elem.testo_principale_pre)}</span>
            );
          }

          const editableProps = {
            isEditable: !correzioneRisposta.isInterfaceLocked,
            single: step.esercizi[0].tipo === 'P' || (!elem.testo_principale_post && !elem.continua),
            spellcheck: false,
            autocomplete: 'off',
            autocorrect: 'off',
            autocapitalize: 'none',
            onpaste: (e) => { e.preventDefault(); },
            oncopy: (e) => { e.preventDefault(); },
            ondrag: (e) => { e.preventDefault(); },
            ondragstart: (e) => { e.preventDefault(); },
            ondragend: (e) => { e.preventDefault(); },
            ondrop: (e) => { e.preventDefault(); },
            onfocus: () => toggleFocusFunction(true),
            onblur: () => toggleFocusFunction(false),
            oncontextmenu: (e) => e.preventDefault(),
            giusto: (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) &&
              correzioneRisposta.correzioneStep.corrette.indexOf(key) > -1,
            sbagliato: (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) &&
              correzioneRisposta.correzioneStep.sbagliate.indexOf(key) > -1,
            onkeydown: (e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                enableFocusButtonRisposta();
                if (correzioneRisposta.isCheckable || correzioneRisposta.mostraSoluzione) {
                  correzioneRispostaFx();
                }
              }
            },
            prefill: risposteInizializza[key],
            oninput: correzioneRisposta.isInterfaceLocked ? null : (e) => {
              // questa è proprio pessima ma apparentemente è l'unico modo per avere
              // il contenuto di un elemento con contentEditable
              risposteInizializza[key] = cleanTesto(ReactDOM.findDOMNode(e.target).innerHTML, 'leavepunct'); // eslint-disable-line react/no-find-dom-node
              funzioneSelezionaRisposta(risposteInizializza);
            },
          };

          acc.push(
            <EditableSpanView
              {...editableProps}
              key={`traduci_input_${elem.id}`}
            />
          );

          if (elem.testo_principale_post) {
            acc.push(
              <span key={`traduci_post_${elem.id}`}>{this.mostraContenutiStep(elem.testo_principale_post)}</span>
            );
            acc.push(' ');
          }
          return acc;
        }, []);
      case 'M':
        risposteInizializza = [...(rispostaSelezionata || [])];
        return rappresentaOpzioniScelta(step.esercizi).map((opzione, key) => (
          <RadioCheck
            key={`esercizio_${opzione}_${key + 1}`}
            label={this.mostraContenutiStep(opzione)}
            hasImage={calculateChildrenTestoFromDataElem(opzione).filter((o) => (o.type === 'image')).length > 0}
            checked={risposteInizializza.indexOf(opzione) > -1}
            type="radio"
            onClickFunction={
              /* istanbul ignore next */
              correzioneRisposta.isInterfaceLocked ? null : () => funzioneSelezionaRisposta(
                [opzione]
              )}
            giusto={
              (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && correzioneRisposta.correzioneStep.corrette.indexOf(opzione) > -1
            }
            sbagliato={
              (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && correzioneRisposta.correzioneStep.sbagliate.indexOf(opzione) > -1
            }
          />
        ));
      case 'N':
        risposteInizializza = [...(rispostaSelezionata || [])];
        return rappresentaOpzioniScelta(step.esercizi).map((opzione, key) => (
          <RadioCheck
            key={`esercizio_${opzione}_${key + 1}`}
            label={this.mostraContenutiStep(opzione)}
            hasImage={calculateChildrenTestoFromDataElem(opzione).filter((o) => (o.type === 'image')).length > 0}
            checked={risposteInizializza.indexOf(opzione) > -1}
            type="checkbox"
            onClickFunction={
              /* istanbul ignore next */
              correzioneRisposta.isInterfaceLocked ? null : () => funzioneSelezionaRisposta(
                risposteInizializza.indexOf(opzione) > -1 ?
                  risposteInizializza.filter((risp) => (risp !== opzione)) : [...risposteInizializza, opzione]
              )}
            giusto={
              (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && correzioneRisposta.correzioneStep.corrette.indexOf(opzione) > -1
            }
            sbagliato={
              (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && correzioneRisposta.correzioneStep.sbagliate.indexOf(opzione) > -1
            }
          />
        ));
      case 'G':
        inizializzaStep = inizializzaStepTipologiaG(step.esercizi[0]);
        risposteAccettate = splitClean(
          step.testi[step.testi.length - 1].testo_principale, 'leavepunct'
        ).map((word, index) => ({
          daAnalizzare: !!inizializzaStep.risposteCorrette[index],
          parola: word,
        }));

        risposteInizializza = risposteAccettate.reduce((acc, item, rispostaPk) => {
          if (item.daAnalizzare) {
            acc[rispostaPk] = { labelOpzione: '', indiceLabel: -1 };
          }
          return acc;
        }, {});

        return risposteAccettate.map((opzione, key) => (
          <Elemento
            key={`elemento_${opzione.parola}_${key + 1}`}
            drag
            dragDisabled={!opzione.daAnalizzare}
            label={this.mostraContenutiStep(opzione.parola)}
            dragLabel={this.mostraContenutiStep(((rispostaSelezionata || {})[key] || {}).labelOpzione || '')}
            dragColor={{
              1: 'uno', 2: 'due', 3: 'tre', 4: 'quattro', 5: 'cinque',
            }[
              ((rispostaSelezionata || {})[key] || {}).indiceLabel
            ] || ''
            }
            onClickFx={
              /* istanbul ignore next */
              correzioneRisposta.isInterfaceLocked ? null : () => this.mostraOpzioniPopupG(
                inizializzaStep.boxGruppiModalOpzioni,
                risposteInizializza,
                { ...opzione, indiceBlocco: key }
              )}
            giusto={
              (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && correzioneRisposta.correzioneStep.corrette.indexOf(key) > -1
            }
            sbagliato={
              (correzioneRisposta.mostraCorrezione || correzioneRisposta.mostraSoluzione) && correzioneRisposta.correzioneStep.sbagliate.indexOf(key) > -1
            }
          />
        ));
      /* istanbul ignore next */
      default: break;
    }

    return false;
  };

  creaBloccoDisplaySoluzione = () => {
    const {
      correzioneRisposta,
      apriModalBox,
      step,
      rispostaSelezionata,
    } = this.props;

    if (!correzioneRisposta.mostraSoluzione) {
      return false;
    }

    let bloccoSoluzioni;
    switch (step.esercizi[0].tipo) {
      case 'I':
        bloccoSoluzioni = (
          <div className="bloccoSoluzioni">
            <div>
              {splitClean(step.testi[step.testi.length - 1].testo_principale, 'leavepunct').map((opzione, key) => (
                <Elemento
                  key={`elemento_disponibile_${opzione}_${key + 1}`}
                  label={this.mostraContenutiStep(opzione)}
                  giusto={correzioneRisposta.correzioneStep.soluzione[0][key] !== ''}
                />
              ))}
            </div>
            <Button
              actioncolor="hint"
              onClick={
                /* istanbul ignore next */
                () => apriModalBox({
                  topbar: true,
                  barcolor: `${colore.actions.hint}`,
                  titolo: 'Altre Soluzioni',
                  isPopup: false,
                  bgcolor: 'transparent',
                  contenuto: (
                    <Page full>
                      <Container>
                        {rispostaSelezionata && (
                          <RispostaUtente key="risposta_selezionata">
                            <div>La tua risposta:</div>
                            <div>{creaTestoReadable(rispostaSelezionata, step)}</div>
                          </RispostaUtente>)}
                        <TabelleList
                          margin="0 0 16px"
                          radius="3px"
                          userSelect="none"
                          key="tabella_risposte"
                          tabelle={[{
                            intestazione: cleanTesto(step.testi[step.testi.length - 1].testo_principale.replace(/_/g, ' ')),
                            righe: correzioneRisposta.correzioneStep.soluzione
                              .reduce((acc, riga, index) => {
                                acc.push(
                                  [{ titolo: index + 1 }, { titolo: riga.filter((item) => (item)).join(' ') }]
                                );
                                return acc;
                              }, [])
                              .sort((a, b) => {
                                if (a[1].titolo.toUpperCase() < b[1].titolo.toUpperCase()) {
                                  return -1;
                                }
                                if (a[1].titolo.toUpperCase() > b[1].titolo.toUpperCase()) {
                                  return 1;
                                }
                                return 0;
                              }),
                          }]}
                        />
                      </Container>
                    </Page>
                  ),
                  show: true,
                })}
            >
              Altre Soluzioni
              <Icon right {...globals.caretRight} />
            </Button>
          </div>
        );

        break;
      case 'O':
        bloccoSoluzioni = (
          <div className="bloccoSoluzioni">
            <Inseriti giusto>
              {this.mostraContenutiStep(correzioneRisposta.correzioneStep.soluzione[0].replace(/_/g, ' '))}
            </Inseriti>
            <Button
              actioncolor="hint"
              onClick={
                /* istanbul ignore next */
                () => apriModalBox({
                  topbar: true,
                  barcolor: `${colore.actions.hint}`,
                  titolo: 'Altre Soluzioni',
                  isPopup: false,
                  bgcolor: 'transparent',
                  contenuto: (
                    <Page full>
                      <Container>
                        {rispostaSelezionata && (
                          <RispostaUtente key="risposta_selezionata">
                            <div>La tua risposta:</div>
                            <div>{creaTestoReadable(rispostaSelezionata, step)}</div>
                          </RispostaUtente>
                        )}
                        <TabelleList
                          margin="0 0 16px"
                          radius="3px"
                          userSelect="none"
                          key="tabella_risposte"
                          tabelle={[{
                            intestazione: step.testi.map((testo) => (cleanTesto(testo.testo_principale))).join(' ').replace(/_/g, ' '),
                            righe: correzioneRisposta.correzioneStep.soluzione.sort((a, b) => {
                              if (a.toUpperCase() < b.toUpperCase()) {
                                return -1;
                              }
                              if (a.toUpperCase() > b.toUpperCase()) {
                                return 1;
                              }
                              return 0;
                            }).map(
                              (riga, key) => ([{ titolo: key + 1 }, { titolo: riga }])
                            ),
                          }]}
                        />
                      </Container>
                    </Page>
                  ),
                  show: true,
                })}
            >
              Altre Soluzioni
              <Icon right {...globals.caretRight} />
            </Button>
          </div>
        );
        break;
      case 'U':
      case 'P':
        bloccoSoluzioni = (
          <div className="bloccoSoluzioni">
            {step.esercizi.map((elem, key) => (
              <div key={`esercizi_soluzioni_${elem.id}`}>
                <p>
                  {elem.testo_principale_pre && (
                    <span key={`traduci_soluzioni_pre${key + 1}`}>{this.mostraContenutiStep(elem.testo_principale_pre)} </span>
                  )}
                  <span>{this.mostraContenutiStep(correzioneRisposta.correzioneStep.soluzione[0][key][0])}</span>
                  {elem.testo_principale_post && (
                    <span key={`traduci_soluzioni_post${key + 1}`}> {this.mostraContenutiStep(elem.testo_principale_post)}</span>
                  )}
                </p>
              </div>
            ))}
            <Button
              actioncolor="hint"
              onClick={
                /* istanbul ignore next */
                () => apriModalBox({
                  topbar: true,
                  barcolor: `${colore.actions.hint}`,
                  titolo: 'Altre Soluzioni',
                  isPopup: false,
                  bgcolor: 'transparent',
                  contenuto: (
                    <Page full>
                      <Container>
                        {rispostaSelezionata && (
                          <RispostaUtente key="risposta_selezionata">
                            <div>La tua risposta:</div>
                            <div>{creaTestoReadable(rispostaSelezionata, step)}</div>
                          </RispostaUtente>
                        )}
                        <TabelleList
                          margin="0 0 16px"
                          radius="3px"
                          userSelect="none"
                          key="tabella_risposte"
                          tabelle={step.esercizi.map((elem, key) => ({
                            intestazione: [elem.testo_principale_pre || '', '(...)', elem.testo_principale_post || ''].join(' ').replace(/_/g, ' '),
                            righe: (correzioneRisposta.correzioneStep.soluzione[0][key] || []).sort((a, b) => {
                              if (a.toUpperCase() < b.toUpperCase()) {
                                return -1;
                              }
                              if (a.toUpperCase() > b.toUpperCase()) {
                                return 1;
                              }
                              return 0;
                            }).map((riga, index) => (
                              [{ titolo: index + 1 }, { titolo: riga }]
                            )),
                          }))}
                        />
                      </Container>
                    </Page>
                  ),
                  show: true,
                })}
            >
              Altre Soluzioni
              <Icon right {...globals.caretRight} />
            </Button>
          </div>
        );
        break;

      case 'M':
        bloccoSoluzioni = (
          <RadioCheck
            label={this.mostraContenutiStep(correzioneRisposta.correzioneStep.soluzione[0])}
            hasImage={calculateChildrenTestoFromDataElem(correzioneRisposta.correzioneStep.soluzione[0]).filter((o) => (o.type === 'image')).length > 0}
            type="radio"
            checked
            giusto
          />
        );
        break;
      case 'N':
        bloccoSoluzioni = (correzioneRisposta.correzioneStep.soluzione[0] || []).map((soluzione, key) => (
          <RadioCheck
            key={`elemento_soluzione_${soluzione}_${key + 1}`}
            label={this.mostraContenutiStep(soluzione)}
            hasImage={calculateChildrenTestoFromDataElem(soluzione).filter((o) => (o.type === 'image')).length > 0}
            type="checkbox"
            checked
            giusto
          />
        ));
        break;
      case 'G':
        bloccoSoluzioni = (correzioneRisposta.correzioneStep.soluzione[0] || []).map((opzione, key) => (
          <Elemento
            key={`elemento_soluzione_${opzione.parola}_${key + 1}`}
            drag
            label={this.mostraContenutiStep(opzione.parola)}
            dragLabel={this.mostraContenutiStep(opzione.rispostaCorretta)}
            dragDisabled={!opzione.daAnalizzare}
            dragColor={{
              1: 'uno', 2: 'due', 3: 'tre', 4: 'quattro', 5: 'cinque',
            }[opzione.rispostaCorrettaIndice]}
            giusto={opzione.daAnalizzare}
          />
        ));
        break;
      default: break;
    }

    return (
      <div className="AreaSoluzioni">
        <H2 margin="20px 0" color={colore.actions.help}>Soluzione</H2>
        {bloccoSoluzioni}
      </div>
    );
  };


  render() {
    const {
      step,
      hasLessico,
      disableAutofocus,
      rispostaSelezionata,
      apriModalBox,
      correzioneRisposta: { isFocusEnabled, mostraCorrezione, mostraSoluzione },
      audioSettings,
    } = this.props;

    if (!step || !step.esercizi.length) {
      return false;
    }

    return (
      <WrapperNoSelectStep key={`step_${step.periodoId || 0}_${step.id || 0}`}>
        <TestoConsegna
          margin="0 0 20px"
          step={step}
          hasLessico={hasLessico}
          apriModalFunction={apriModalBox}
          audioSettings={audioSettings}
          /**
           * nascondo il tooltip già aperto se
           * - sto scrivendo in una P / U (isFocusEnabled)
           * - sto visualizzando una correzione (mostraCorrezione)
           * - sto visualizzando una soluzione (mostraSoluzione)
           * - sto aprendo un popup di riepilogo / selezione gruppi (disableAutoFocus)
           */
          hideTooltip={isFocusEnabled || mostraCorrezione || mostraSoluzione || disableAutofocus}
          /**
           * la risposta selezionata mi serve per capire nel container del testo se ho
           * in corso una modifica della risposta data, così posso disabilitare il tooltip
           * anche in questo caso
          */
          rispostaSelezionata={step.esercizi[0].tipo === 'G' ? undefined : rispostaSelezionata}
        />
        {this.creaBloccoSelezioneRisposta()}
        {this.creaBloccoDisplaySoluzione()}
      </WrapperNoSelectStep>
    );
  }
}

Step.propTypes = {
  step: PropTypes.shape({
    esercizi: PropTypes.array.isRequired,
    testi: PropTypes.arrayOf(
      PropTypes.shape({
        testoConsegna: PropTypes.array,
      }),
    ).isRequired,
  }),
  hasLessico: PropTypes.bool,
  funzioneSelezionaRisposta: PropTypes.func.isRequired,
  rispostaSelezionata: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  apriModalBox: PropTypes.func.isRequired,
  chiudiModalBox: PropTypes.func.isRequired,
  hasHelp: PropTypes.bool.isRequired,
  hasCorreggi: PropTypes.bool.isRequired,
  disableAutofocus: PropTypes.bool.isRequired,
  correzioneRisposta: PropTypes.shape({
    isCheckable: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isPristine: PropTypes.bool.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    isHelpEnabled: PropTypes.bool.isRequired,
    isFocusEnabled: PropTypes.bool.isRequired,
    mostraSoluzione: PropTypes.bool.isRequired,
    mostraCorrezione: PropTypes.bool.isRequired,
    correzioneStep: PropTypes.object,
  }).isRequired,
  correzioneRispostaFx: PropTypes.func.isRequired,
  helpFunction: PropTypes.func,
  enableFocusButtonRisposta: PropTypes.func.isRequired,
  toggleFocusFunction: PropTypes.func.isRequired,
  audioSettings: PropTypes.shape({
    maxRepetitions: PropTypes.number,
    enablePause: PropTypes.bool,
  }),
};

export default Step;

