/**
*
* StatisticheView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HtmlBlock from 'components/HtmlBlock';
import Svg from 'components/Svg';
import { Icon, GhostButton } from 'components/Button';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';
import P from 'components/Paragraph';
import icon from 'icons/globals';
import buttonIcon from 'icons/buttons';
import { colore } from 'style/color';
import { round } from 'common/utils';
import mediaQuery from 'style/mediainjector';
import TestoConsegna from 'containers/TestoConsegna';

import GraficoMedieCompito from './GraficoIstogrammi';
import GraficoMedieVotiClasse from './GraficoTorta';
import {
  StatsCurrentUser,
  WrapReportistica,
  SideBarReportistica,
  CloseSideBarBtn,
  Studente,
  ReportCard,
  ReportCardToolbar,
  CardToolbox,
  CardContent,
  ToggleDomanda,
  DomandaRisposta,
  Risposta,
  ToggleRisposta,
  VotoSelectedUser,
} from './StatsElements';
import PrintWrap from './PrintWrap';

const TitleP = styled(P)`
  ${mediaQuery.print`
    font-weight: bold;
    margin: 0;
    padding: 20px 20px 5px 20px;
    border-bottom: 1px solid #ccc;
  `}
`;

export class StatisticheView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  calcolaMedia = (valore) => {
    if (valore >= 0.7) {
      return 'bene';
    } else if (valore >= 0.5) {
      return 'media';
    }
    return 'male';
  }

  labelCorrezione = (corretto) => ({ true: 'bene', false: 'male' }[corretto]);

  render() {
    const {
      studentiVersione,
      selezionaUtenteFx,
      esercizi,
      media,
      stepPks,
      utenteSelezionato,
      traduzione,
      openedSections,
      apriChiudiSezioniFx,
      grafici,
      scores,
      isDocente,
      idAssegnazione,
      onDidascaliaSet,
      onDidascaliaReset,
      didascalia,
    } = this.props;

    const conteggio = (scores || []).reduce((acc, score) => {
      const responso = this.calcolaMedia(score / 10);
      if (!acc[responso]) {
        acc[responso] = 0;
      }
      acc[responso] += 1;
      return acc;
    }, {});

    const coloriConteggio = {
      bene: {
        colore: colore.stats.pie.good,
        label: 'Punteggio 7 - 10',
      },
      media: {
        colore: colore.stats.pie.medium,
        label: 'Punteggio 5 - 6.99',
      },
      male: {
        colore: colore.stats.pie.bad,
        label: 'Punteggio 1 - 4.99',
      },
    };

    let utenteSelezionatoLabel = 'Tutta la classe';
    let utenteSelezionatoVoto = '';

    if (utenteSelezionato) {
      utenteSelezionatoVoto = 'NC';

      const studenteSelezionato = studentiVersione.filter((s) => s.id === utenteSelezionato.id)[0] || {};
      utenteSelezionatoLabel = studenteSelezionato.first_name && studenteSelezionato.last_name ?
        `${studenteSelezionato.first_name} ${studenteSelezionato.last_name}` : '';

      if (utenteSelezionato.key >= 0 && studenteSelezionato.voto >= 0) {
        utenteSelezionatoVoto = `${round(studenteSelezionato.voto, 2)}`;
      }
    }

    return (
      <div>
        {studentiVersione.length > 0 && (
          <SideBarReportistica
            isDocente={isDocente}
            active={(openedSections.menu || { blocco: false }).blocco}
          >
            <CloseSideBarBtn
              onClick={
                () => apriChiudiSezioniFx(
                  'menu', !(openedSections.menu || { blocco: false }
                  ).blocco
                )
              }
            >
              <Svg {...icon.close} />
            </CloseSideBarBtn>
            {isDocente && (
              <Studente
                key="iscritto_all"
                attivo={utenteSelezionato === undefined}
              >
                <button
                  onClick={
                    () => {
                      selezionaUtenteFx(undefined);
                      apriChiudiSezioniFx('menu', false);
                    }
                  }
                >
                  Tutta la classe
                </button>
              </Studente>
            )}
            {studentiVersione
              .sort((a, b) => {
                const nameA = `${a.last_name} ${a.first_name}`.toUpperCase();
                const nameB = `${b.last_name} ${b.first_name}`.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }

                return 0;
              }).map((iscritto) => (
                <Studente
                  key={`iscritto_user_${iscritto.id}`}
                  attivo={(utenteSelezionato || {}).id === iscritto.id}
                  ennecci={iscritto.key === -1}
                >
                  <GhostButton
                    onClick={
                      () => {
                        selezionaUtenteFx(iscritto);
                        apriChiudiSezioniFx('menu', false);
                      }
                    }
                  >
                    {iscritto.first_name} {iscritto.last_name}
                  </GhostButton>
                  <span>
                    {iscritto.voto > -1 ?
                      <CountBadge radius="3px">
                        <CountBadgeItem
                          bgcolor={() => {
                            if (iscritto.voto >= 5 && iscritto.voto < 7) {
                              return colore.stats.pie.medium;
                            } else if (iscritto.voto >= 7) {
                              return colore.stats.pie.good;
                            } return colore.stats.pie.bad;
                          }
                          }
                        >
                          <strong>{round(iscritto.voto, 2)}</strong>
                        </CountBadgeItem>
                      </CountBadge>
                      :
                      <CountBadge radius="3px"><CountBadgeItem bgcolor={colore.ui.darkBg}><strong>NC</strong></CountBadgeItem></CountBadge>
                    }
                  </span>
                </Studente>
              ))}
          </SideBarReportistica>
        )}
        <WrapReportistica isDocente={isDocente}>
          <StatsCurrentUser isDocente={isDocente}>
            <GhostButton
              fill="#fff"
              onClick={
                () => apriChiudiSezioniFx(
                  'menu', !(openedSections.menu || { blocco: false }
                  ).blocco
                )
              }
            >
              <Icon {...buttonIcon.users} />
            </GhostButton>
            <span className="consegnato">
              {utenteSelezionatoLabel}
            </span>
            <VotoSelectedUser className="studente__score">{utenteSelezionatoVoto}</VotoSelectedUser>
          </StatsCurrentUser>
          {!(utenteSelezionato || {}).id && didascalia && (
            <GraficoMedieVotiClasse
              onDidascaliaSet={onDidascaliaSet}
              onDidascaliaReset={onDidascaliaReset}
              didascalia={didascalia}
              mediaNazionale={[
                'bene',
                'media',
                'male',
              ].map(
                (tipologia) => ({
                  count: conteggio[tipologia] || 0,
                  totale: (conteggio.bene || 0) + (conteggio.media || 0) + (conteggio.male || 0),
                  tipologia: coloriConteggio[tipologia].label,
                  colour: coloriConteggio[tipologia].colore,
                  title: coloriConteggio[tipologia].label,
                })
              )
              }
            />
          )}
          {grafici.length > 0 && <GraficoMedieCompito
            titoliGrafici={grafici.map((grafico, key) => ({
              key: key + 1,
              titolo: grafico.titolo,
            }))}
            mediaNazionale={grafici.map((grafico, key) => ({
              x: `#${key + 1}`,
              titolo: grafico.titolo,
              tipologia: 'Media nazionale',
              campioni: grafico.media_nazionale_campioni,
              y: round(grafico.media_nazionale, 2),
              color: idAssegnazione === grafico.id ? colore.stats.medie.nazionale : colore.stats.medie.nazionaleLight,
            }))}
            mediaClasse={grafici.map((grafico, key) => ({
              x: `#${key + 1}`,
              titolo: grafico.titolo,
              tipologia: 'Media di classe',
              y: round(grafico.media, 2),
              color: idAssegnazione === grafico.id ? colore.stats.medie.classe : colore.stats.medie.classeLight,
            }))}
            mediaStudente={(utenteSelezionato || {}).id > 0 ? grafici.map((grafico, key) => ({
              x: `#${key + 1}`,
              titolo: grafico.titolo,
              tipologia: 'Media studente',
              y: round((grafico.scores.filter((utente) => ((utente.id) === utenteSelezionato.id))[0] || {}).voto || 0, 2),
              color: idAssegnazione === grafico.id ? colore.stats.medie.studente : colore.stats.medie.studenteLight,
            })) : []}
            onDidascaliaSet={onDidascaliaSet}
            onDidascaliaReset={onDidascaliaReset}
            didascalia={didascalia}
          />}
          {traduzione && (
            <ReportCard>
              <ReportCardToolbar>
                Traduzione
                <CardToolbox
                  onClick={
                    () => apriChiudiSezioniFx(
                      'traduzione', !(openedSections.traduzione || { blocco: true }
                      ).blocco
                    )
                  }
                  key="sezione_titolo"
                >
                  {(openedSections.traduzione || { blocco: true }).blocco ?
                    <Svg {...icon.chevronDown} />
                    :
                    <Svg {...icon.chevronUp} />
                  }
                </CardToolbox>
              </ReportCardToolbar>
              <PrintWrap
                childrenvisible={!(openedSections.traduzione || { blocco: true }).blocco}
              >
                <HtmlBlock
                  key="sezione_contenuto"
                  padding="20px"
                  text={traduzione}
                />
              </PrintWrap>
            </ReportCard>
          )}
          {stepPks.length > 0 && stepPks.map((stepId) => (
            <ReportCard key={`step_${stepId}`}>
              <ReportCardToolbar>
                {esercizi[stepId].titolo}
                <CardToolbox
                  onClick={
                    () => apriChiudiSezioniFx(
                      stepId, !(openedSections[stepId] || { blocco: true }).blocco
                    )
                  }
                  key="sezione_titolo"
                >
                  {(openedSections[stepId] || { blocco: true }).blocco ?
                    <Svg {...icon.chevronUp} />
                    :
                    <Svg {...icon.chevronDown} />
                  }
                </CardToolbox>
              </ReportCardToolbar>
              <PrintWrap
                childrenvisible={!!(openedSections[stepId] || { blocco: true }).blocco}
              >
                <CardContent key="blocco_risposte">
                  <DomandaRisposta>
                    {esercizi[stepId].consegna}
                    <TestoConsegna
                      step={esercizi[stepId].stepData}
                      hasLessico={false}
                      nascondiTitolo
                      hideTooltip
                      mostraPerStampa
                    />
                  </DomandaRisposta>
                  <div>
                    <TitleP margin="20px">Esempio di risposta corretta:</TitleP>
                    <HtmlBlock
                      color={colore.ui.okTxt}
                      padding="20px"
                      text={esercizi[stepId].soluzioneTestuale}
                    />
                  </div>
                  {((media[stepId] || {}).risposte || []).length > 0 && (
                    <ToggleDomanda
                      risultato={
                        utenteSelezionato ?
                          this.labelCorrezione(media[stepId].risposte[0].corretta) :
                          this.calcolaMedia(/* istanbul ignore next */(media[stepId] || {}).media || 0)
                      }
                      onClick={
                        () => apriChiudiSezioniFx(
                          stepId,
                          (openedSections[stepId] || { blocco: true }).blocco,
                          !(openedSections[stepId] || { risposte: false }).risposte
                        )
                      }
                      key="sezione_risposte"
                    >
                      {(openedSections[stepId] || { risposte: false }).risposte ?
                        <Svg {...icon.chevronDown} />
                        :
                        <Svg {...icon.chevronRight} />
                      }
                    </ToggleDomanda>
                  )}
                  <PrintWrap
                    childrenvisible={(openedSections[stepId] || { risposte: false }).risposte}
                  >
                    <div key="blocco_risposte_correzione" className="primo">
                      {((media[stepId] || {}).risposte || []).length > 0 && (
                        <div>
                          {media[stepId].risposte.map((risposta, key) => ([
                            <TitleP key={`risposta_titolo_${key + 1}`} margin="20px">Risposta:</TitleP>,
                            <Risposta key={`risposta_${key + 1}`} className="trovami">
                              <HtmlBlock
                                color={(risposta.corretta && /* istanbul ignore next */ colore.ui.okTxt) || ''}
                                text={risposta.readable}
                              />
                              {risposta.studenti.length > 0 && (
                                <ToggleRisposta
                                  onClick={
                                    () => apriChiudiSezioniFx(
                                      stepId,
                                      openedSections[stepId].blocco,
                                      openedSections[stepId].risposte,
                                      { [key]: !openedSections[stepId].studenti[key] || /* istanbul ignore next */ false }
                                    )
                                  }
                                  key="sezione_risposte_studenti"
                                >
                                  <span>{risposta.studenti.length > 0 && `${risposta.studenti.length}/${studentiVersione.length}`}</span>
                                  {((openedSections[stepId] || {}).studenti || [])[key] ?
                                    <Svg {...icon.chevronDown} />
                                    :
                                    <Svg {...icon.chevronLeft} />
                                  }
                                </ToggleRisposta>
                              )}
                              {((openedSections[stepId] || {}).studenti || [])[key] && risposta.studenti.length > 0 && (
                                <ul>
                                  {risposta.studenti.map((studente) => (
                                    <li key={`studente_${studente.id}`}>{studente.nome}</li>
                                  ))}
                                </ul>
                              )}
                            </Risposta>,
                          ]))}
                        </div>
                      )}
                    </div>
                  </PrintWrap>
                </CardContent>
              </PrintWrap>
            </ReportCard>
          ))}
        </WrapReportistica>
      </div>
    );
  }
}

StatisticheView.propTypes = {
  apriChiudiSezioniFx: PropTypes.func.isRequired,
  selezionaUtenteFx: PropTypes.func.isRequired,
  traduzione: PropTypes.string,
  studentiVersione: PropTypes.array.isRequired,
  utenteSelezionato: PropTypes.shape({
    key: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
  grafici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      media: PropTypes.number.isRequired,
      media_nazionale: PropTypes.number.isRequired,
      media_nazionale_campioni: PropTypes.number.isRequired,
      titolo: PropTypes.string.isRequired,
      scores: PropTypes.arrayOf(PropTypes.shape({
        voto: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
      })),
    }).isRequired,
  ).isRequired,
  esercizi: PropTypes.object.isRequired,
  stepPks: PropTypes.array.isRequired,
  scores: PropTypes.array,
  media: PropTypes.object.isRequired,
  openedSections: PropTypes.object.isRequired,
  isDocente: PropTypes.bool,
  idAssegnazione: PropTypes.number.isRequired,
  onDidascaliaSet: PropTypes.func,
  onDidascaliaReset: PropTypes.func,
  didascalia: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
    x: PropTypes.string.isRequired,
    titolo: PropTypes.string.isRequired,
    campioni: PropTypes.number,
  }),
};

export default StatisticheView;
