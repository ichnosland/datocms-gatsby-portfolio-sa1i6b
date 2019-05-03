/**
*
* VerificheLivelloDocenteOverview
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { FlexBox } from 'components/FlexBox';
import { BrandTxt } from 'components/Text';
import { Button, Icon } from 'components/Button';
import { H2, H3 } from 'components/Heading';
import P from 'components/Paragraph';
import { InfoBanner } from 'components/AlertBanner';
import Spinner from 'components/Spinner';
import {
  ListItem,
  ListItemText,
} from 'components/NewListPanels';
import { MiniButtonGroup, ExpandButtonGroup } from 'components/StyledButtonGroup';
import ListSideBox from 'components/NewListPanels/ListSideBox';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';
import buttonicon from 'icons/buttons';
import icon from 'icons/globals';
import { colore } from 'style/color';


class VerificheLivelloDocenteOverview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      titolo,
      assegnaFunction,
      visualizzaStatisticheFunction,
      ritiraFunction,
      simulaFunction,
      verificheAssegnate,
      unita,
      aggiungiUnitaFunction,
      datiVerifica: { unitaSelezionate, soloLatino },
      verificheCartacee,
      downloadProtettiFunction,
      hasRisultati,
      spinner,
      toggleSoloLatinoFunction,
      unitaAssegnate,
      totaleDomande,
      tempoEsecuzione,
      switcherLingua,
    } = this.props;

    return (
      <div>
        <H2 center normal margin="0 auto 24px">{titolo}</H2>
        <ExpandButtonGroup padding="20px 0">
          {[
            <Button
              key="button_esegui"
              onClick={simulaFunction}
              disabled={unitaSelezionate.length === 0}
            >
              <Icon {...buttonicon.eye} left />
              Prova
            </Button>,
            <Button
              key="button_risultato"
              actioncolor="okay"
              onClick={visualizzaStatisticheFunction}
              disabled={!hasRisultati}
            >
              <Icon {...buttonicon.stats} left />
              Risultati
            </Button>,
            spinner.assegna ?
              <Spinner size="small" key="spinner_assegna" /> : (
                <Button
                  key="button_assegna"
                  actioncolor="action"
                  onClick={assegnaFunction}
                  disabled={unitaSelezionate.length === 0}
                >
                  <Icon {...buttonicon.bell} left />
                  Assegna
                </Button>
              ),
          ]}
        </ExpandButtonGroup>
        <FlexBox justifyContent="space-between" padding="20px 0" alignItems="stretch">
          <InfoBanner>Totale domande: <BrandTxt>&nbsp;{totaleDomande}</BrandTxt></InfoBanner>
          <InfoBanner>Tempo di esecuzione ca: <BrandTxt>&nbsp;{tempoEsecuzione}&apos;</BrandTxt></InfoBanner>
          <InfoBanner>Unità assegnate: <BrandTxt>&nbsp;{unitaAssegnate}</BrandTxt></InfoBanner>
        </FlexBox>
        {unita.length > 0 && (
          <div>
            {switcherLingua && [
              <H3 normal center key="titolo">Unità della verifica</H3>,
              <FlexBox justifyContent="space-around" padding="0 0 20px" key="selector">
                <MiniButtonGroup>
                  <Button
                    admin={!soloLatino}
                    onClick={() => toggleSoloLatinoFunction(true)}
                  >
                    lat-ita
                  </Button>
                  <Button
                    onClick={() => toggleSoloLatinoFunction(false)}
                    admin={soloLatino}
                  >
                    lat-ita + ita-lat
                  </Button>
                </MiniButtonGroup>
              </FlexBox>,
            ]}
            <div>
              {unita.map((singolaUnita) => (
                <ListItem key={`singola_unita_${singolaUnita.id}`}>
                  <ListItemText
                    unita
                    locked={singolaUnita.inVerifica}
                  >
                    {singolaUnita.nome}
                  </ListItemText>
                  <ListSideBox
                    assigned={singolaUnita.assegnata}
                    checkbox
                    checkBoxFunction={!singolaUnita.inVerifica ? () => aggiungiUnitaFunction(singolaUnita.id) : null}
                    isChecked={unitaSelezionate.indexOf(singolaUnita.id) > -1}
                  />
                </ListItem>
              ))}
            </div>
          </div>
        )}
        {verificheCartacee.length > 0 && (
          <div>
            <H3 normal center>Versione cartacea</H3>
            {verificheCartacee.map((cartaceo) => (
              <ListItem key={`singola_unita_${cartaceo.id}`}>
                <ListItemText>
                  {cartaceo.titolo}
                </ListItemText>
                <ListItemText>
                  <Button
                    outline={1}
                    onClick={() => downloadProtettiFunction(cartaceo.slug)}
                  >
                    <Icon {...icon.arrowBoldDown} left />
                    Scarica
                  </Button>
                </ListItemText>
              </ListItem>
            ))}
          </div>
        )}
        {verificheAssegnate.length > 0 && (
          <div>
            <H3 normal center>Verifiche assegnate</H3>
            {verificheAssegnate.sort(/* istanbul ignore next */(a, b) => {
              if (a.ritirata > b.ritirata) {
                return -1;
              }
              if (a.ritirata < b.ritirata) {
                return 1;
              }
              return 0;
            }).map((verifica, key) => (
              <div key={`verifica_assegnata_div_${verifica.id}`}>
                {[
                  <div key={`verifica_assegnata_panelWrap_${verifica.id}`}>
                    <ListItem key={`verifica_assegnata_titolo_${verifica.id}`}>
                      <ListItemText>
                        <BrandTxt>{verifica.titolo} -&nbsp;</BrandTxt>
                        {verifica.ritirata ?
                          <CountBadge radius="3px">
                            <CountBadgeItem actioncolor="okay"><strong>Ritirata</strong></CountBadgeItem>
                          </CountBadge>
                          :
                          <CountBadge radius="3px">
                            <CountBadgeItem bgcolor={colore.actions.escape}><strong>In corso</strong></CountBadgeItem>
                          </CountBadge>
                        }
                      </ListItemText>
                    </ListItem>
                    {[...verifica.unita.map((u) => (
                      <ListItem key={`verifica_assegnata_unita_${verifica.id}_${u.id}`}>
                        <ListItemText>
                          {u.nome}
                        </ListItemText>
                      </ListItem>
                    )),
                    ]}
                  </div>,
                  !verifica.ritirata && (
                    spinner[`ritira_${verifica.id}`] ?
                      <Spinner size="small" key={`verifica_assegnata_spinner_ritira_${verifica.id}`} /> : (
                        <P align="center" margin="10px auto 20px" key={`verifica_assegnata_P_ritira_${verifica.id}`}>
                          <Button
                            key={`verifica_assegnata_button_ritira_${verifica.id}`}
                            standard
                            actioncolor="escape"
                            onClick={() => ritiraFunction(key)}
                          >
                            Ritira
                          </Button>
                        </P>
                      )
                  ),
                ]}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

VerificheLivelloDocenteOverview.propTypes = {
  titolo: PropTypes.string.isRequired,
  switcherLingua: PropTypes.bool.isRequired,
  datiVerifica: PropTypes.shape({
    soloLatino: PropTypes.bool.isRequired,
    unitaSelezionate: PropTypes.array.isRequired,
  }).isRequired,
  verificheAssegnate: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ritirata: PropTypes.bool.isRequired,
      solo_latino: PropTypes.bool.isRequired,
      titolo: PropTypes.string.isRequired,
      unita: PropTypes.arrayOf(
        PropTypes.shape({
          domande: PropTypes.shape({
            conteggio_lat_ita: PropTypes.number.isRequired,
            conteggio_totale: PropTypes.number.isRequired,
          }),
          id: PropTypes.number.isRequired,
          nome: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  unita: PropTypes.arrayOf(
    PropTypes.shape({
      assegnata: PropTypes.bool.isRequired,
      domande: PropTypes.shape({
        conteggio_lat_ita: PropTypes.number.isRequired,
        conteggio_totale: PropTypes.number.isRequired,
      }),
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
    })
  ).isRequired,
  aggiungiUnitaFunction: PropTypes.func.isRequired,
  verificheCartacee: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      titolo: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ),
  downloadProtettiFunction: PropTypes.func.isRequired,
  ritiraFunction: PropTypes.func.isRequired,
  hasRisultati: PropTypes.bool.isRequired,
  spinner: PropTypes.object.isRequired,
  toggleSoloLatinoFunction: PropTypes.func.isRequired,
  unitaAssegnate: PropTypes.number.isRequired,
  totaleDomande: PropTypes.number.isRequired,
  tempoEsecuzione: PropTypes.number.isRequired,
  assegnaFunction: PropTypes.func.isRequired,
  visualizzaStatisticheFunction: PropTypes.func.isRequired,
  simulaFunction: PropTypes.func.isRequired,
};

export default VerificheLivelloDocenteOverview;
