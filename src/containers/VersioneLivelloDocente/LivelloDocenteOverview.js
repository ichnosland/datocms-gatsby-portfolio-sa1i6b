/**
*
* VersioniLivelloDocenteOverview
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { FlexBox } from 'components/FlexBox';
import Div from 'components/Div';
import { BrandTxt } from 'components/Text';
import P from 'components/Paragraph';
import { Button, Icon } from 'components/Button';
import { ExpandButtonGroup } from 'components/StyledButtonGroup';
import { InfoBanner } from 'components/AlertBanner';
import Spinner from 'components/Spinner';
import {
  ListItem,
  ListItemText,
  ListPanelHeader,
} from 'components/NewListPanels';
import ListSideBox from 'components/NewListPanels/ListSideBox';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';
import buttonicon from 'icons/buttons';
import { colore } from 'style/color';

class VersioniLivelloDocenteOverview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      assegnaFunction,
      visualizzaStatisticheFunction,
      ritiraFunction,
      simulaFunction,
      versioniAssegnate,
      selezionaVersioneFunction,
      versioneSelezionata,
      hasRisultati,
      spinner,
      totaleDomande,
      tempoEsecuzione,
      missioni,
      versioniMissione,
    } = this.props;

    return (
      <Div>
        <ExpandButtonGroup padding="0 0 10px">
          {[
            <Button
              key="button_esegui"
              onClick={simulaFunction}
              disabled={!versioneSelezionata}
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
                  onClick={() => assegnaFunction(versioneSelezionata.id)}
                  disabled={!versioneSelezionata}
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
        </FlexBox>
        {missioni.length > 0 && missioni
          .sort((a, b) => (a.ordine - b.ordine))
          .map((missione) => (
            <div key={`missione_assegnata_div_wrapper_${missione.id}`}>
              <ListPanelHeader>{missione.titolo}</ListPanelHeader>
              <div key={`missione_assegnata_div_${missione.id}`}>
                {!!versioniMissione[missione.id] && versioniMissione[missione.id].map((v) => (
                  <ListItem key={`versione_missione_${missione.id}_${v.id}`}>
                    <ListItemText
                      unita
                      locked={v.assegnata}
                    >
                      {v.titolo}
                    </ListItemText>
                    {!v.assegnata && (
                      <ListSideBox
                        radio
                        isChecked={(versioneSelezionata || {}).id === v.id}
                        checkBoxFunction={() => selezionaVersioneFunction(v)}
                      />
                    )}
                  </ListItem>
                ))}
              </div>
            </div>
          ))}
        {versioniAssegnate.length > 0 && (
          <div key="versioni_assegnate_div_wrapper">
            <ListPanelHeader>Versioni assegnate</ListPanelHeader>
            {versioniAssegnate.map((assegnata, key) => (
              <div key={`versione_assegnata_wrapper_${assegnata.id}`}>
                <ListItem key={`versione_assegnata_titolo_${assegnata.id}`}>
                  <ListItemText>
                    <BrandTxt>{assegnata.titolo} - {assegnata.assegnata_data} &nbsp;</BrandTxt>
                    {assegnata.ritirata ?
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
                {!assegnata.ritirata && (
                  spinner[`ritira_${assegnata.id}`] ?
                    <Spinner size="small" key={`assegnata_assegnata_spinner_ritira_${assegnata.id}`} /> : (
                      <P align="center" margin="10px auto 20px" key={`assegnata_assegnata_P_ritira_${assegnata.id}`}>
                        <Button
                          key={`assegnata_assegnata_button_ritira_${assegnata.id}`}
                          standard
                          actioncolor="escape"
                          onClick={() => ritiraFunction(key)}
                        >
                          Ritira
                        </Button>
                      </P>
                    )
                )}
              </div>
            ))}
          </div>
        )}
      </Div>
    );
  }
}

VersioniLivelloDocenteOverview.propTypes = {
  versioneSelezionata: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  versioniAssegnate: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ritirata: PropTypes.bool.isRequired,
      titolo: PropTypes.string.isRequired,
      assegnata_data: PropTypes.string.isRequired,
    })
  ).isRequired,
  selezionaVersioneFunction: PropTypes.func.isRequired,
  ritiraFunction: PropTypes.func.isRequired,
  hasRisultati: PropTypes.bool.isRequired,
  spinner: PropTypes.object.isRequired,
  totaleDomande: PropTypes.number.isRequired,
  tempoEsecuzione: PropTypes.number.isRequired,
  simulaFunction: PropTypes.func.isRequired,
};

export default VersioniLivelloDocenteOverview;
