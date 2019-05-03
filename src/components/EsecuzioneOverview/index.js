/**
*
* EsecuzioneOverview
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { darken } from 'polished';
import { FlexBox } from 'components/FlexBox';
import Div from 'components/Div';
import { BrandTxt } from 'components/Text';
import { Button, Icon } from 'components/Button';
import { H1 } from 'components/Heading';
import P from 'components/Paragraph';
import AlertBanner, { InfoBanner } from 'components/AlertBanner';
import HtmlBlock from 'components/HtmlBlock';
import buttonicon from 'icons/buttons';
import { colore } from 'style/color';
import media from 'style/mediainjector';

const SpanTag = styled.span`
  display: inline-block;
  font-size: 16px;
  padding: 4px 9px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-right: 6px;
  margin-bottom: 6px;
  &:last-child {
    margin-right: 0;
  }
  ${media.lt667`
    font-size: 12px;
    padding: 4px 6px;
  `}
`;

const BloccoTesto = styled(HtmlBlock)`
  line-height: 1.4em;
  user-select: none;
  ${media.lt667`
    font-size: 16px;
  `}
`;

class EsecuzioneOverview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      totaleDomande,
      tempoEsecuzione,
      titolo,
      autore,
      fonte,
      difficolta,
      prerequisito,
      testo,
      sottotitolo,
      assegnaFx,
      visualizzaStatisticheFx,
      ritiraFx,
      eseguiSimulaFx,
      isDocente,
      isAssegnata,
      dataAssegnazione,
      isRitirata,
      isConsegnata,
      inCorso,
      previewFx,
    } = this.props;

    let labelEsegui = 'Esegui';
    if (isDocente) {
      labelEsegui = 'Prova';
    } else if (inCorso) {
      labelEsegui = 'Riprendi';
    }

    return (
      <div>
        <FlexBox justifyContent="space-around" padding="0 0 20px">
          {!isDocente && !isRitirata && isConsegnata ? (
            <AlertBanner
              actioncolor="action"
              tag
            >
              <Icon {...buttonicon.hourglass} fill={darken(0.2, colore.actions.action)} left />
              <span> &nbsp;In fase di valutazione</span>
            </AlertBanner>
          ) : ([
            eseguiSimulaFx && (
              <Button
                key="button_esegui"
                onClick={eseguiSimulaFx}
                disabled={!isDocente && (isRitirata || isConsegnata)}
              >
                <Icon {...buttonicon.eye} left />
                {labelEsegui}
              </Button>
            ),
            isDocente && !isRitirata && !isAssegnata && assegnaFx && (
              <Button
                key="button_assegna"
                actioncolor="action"
                onClick={assegnaFx}
              >
                <Icon {...buttonicon.bell} left />
                Assegna
              </Button>
            ),
            isDocente && !isRitirata && isAssegnata && ritiraFx && (
              <Button
                key="button_ritira"
                actioncolor="escape"
                onClick={ritiraFx}
              >
                <Icon {...buttonicon.noBell} left />
                Ritira
              </Button>
            ),
            visualizzaStatisticheFx && (
              <Button
                key="button_risultato"
                actioncolor="okay"
                onClick={visualizzaStatisticheFx}
                disabled={!isRitirata}
              >
                <Icon {...buttonicon.stats} left />
                Risultati
              </Button>
            ),
            previewFx && (
              <Button
                key="button_preview"
                actioncolor="help"
                onClick={previewFx}
              >
                <Icon {...buttonicon.stats} left />
                Preview
              </Button>
            ),
          ])}
        </FlexBox>
        <FlexBox justifyContent="space-between" padding="20px 0" alignItems="stretch">
          {isDocente && totaleDomande > -1 && <InfoBanner>Totale domande: <BrandTxt>&nbsp;{totaleDomande}</BrandTxt></InfoBanner>}
          {isDocente && tempoEsecuzione > -1 && <InfoBanner>Tempo di esecuzione ca: <BrandTxt>&nbsp;{tempoEsecuzione}&apos;</BrandTxt></InfoBanner>}
          {dataAssegnazione && <InfoBanner>Data assegnazione: <BrandTxt>&nbsp;{dataAssegnazione}</BrandTxt></InfoBanner>}
        </FlexBox>
        <Div padding="20px 0 0">
          <H1 margin="0">{titolo}</H1>
          {sottotitolo && <P margin="0 auto 20px">{sottotitolo}</P>}
        </Div>
        <P>{autore && <SpanTag><strong>Autore: </strong> {autore}</SpanTag>}{fonte && <SpanTag><strong>Fonte: </strong> {fonte}</SpanTag>}{difficolta && <SpanTag><strong>Difficoltà: </strong> {difficolta}</SpanTag>}{prerequisito && <SpanTag><strong>Prerequisiti: </strong> {prerequisito}</SpanTag>}</P>
        {testo && <BloccoTesto text={testo} padding="20px" />}
        {(isRitirata || isAssegnata) &&
          <Div align="center" margin="20px auto 30px">
            {isRitirata ?
              <AlertBanner actioncolor="okay" tag><Icon {...buttonicon.noBell} fill={darken(0.2, colore.actions.okay)} left /> Ritirata</AlertBanner>
              :
              <AlertBanner actioncolor="action" tag><Icon {...buttonicon.bell} fill={darken(0.2, colore.actions.action)} left /> Assegnata</AlertBanner>
            }
          </Div>
        }
      </div>
    );
  }
}

EsecuzioneOverview.propTypes = {
  totaleDomande: PropTypes.number,
  tempoEsecuzione: PropTypes.number,
  titolo: PropTypes.string.isRequired,
  autore: PropTypes.string,
  fonte: PropTypes.string,
  difficolta: PropTypes.string,
  prerequisito: PropTypes.string,
  testo: PropTypes.string,
  sottotitolo: PropTypes.string,
  isDocente: PropTypes.bool.isRequired,
  assegnaFx: PropTypes.func,
  ritiraFx: PropTypes.func,
  visualizzaStatisticheFx: PropTypes.func,
  eseguiSimulaFx: PropTypes.func,
  isRitirata: PropTypes.bool.isRequired,
  isAssegnata: PropTypes.bool.isRequired,
  isConsegnata: PropTypes.bool,
  inCorso: PropTypes.bool,
  dataAssegnazione: PropTypes.string,
  previewFx: PropTypes.func,
};

export default EsecuzioneOverview;
