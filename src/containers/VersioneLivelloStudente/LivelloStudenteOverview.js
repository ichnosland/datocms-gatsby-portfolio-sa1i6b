/**
*
* VersioniLivelloStudenteOverview
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import Div from 'components/Div';
import { Button, Icon } from 'components/Button';
import { ListItem, ListItemText } from 'components/NewListPanels';
import { BrandTxt } from 'components/Text';
import buttonicon from 'icons/buttons';


class VersioniLivelloStudenteOverview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      eseguiFunction,
      visualizzaStatisticheFunction,
      versioniAssegnate,
    } = this.props;

    return (
      <Div>
        {versioniAssegnate.length && versioniAssegnate.map((versione) => (
          <div key={`versione_assegnata_div_${versione.id}`}>
            <ListItem key={`versione_assegnata_titolo_${versione.id}`} justifyContent="center">
              <ListItemText>
                {versione.titolo}
              </ListItemText>
            </ListItem>
            <ListItem key={`versione_assegnata_riepilogo_${versione.id}`} justifyContent="space-around">
              <span className="mediumUp">
                <ListItemText>
                  <span><BrandTxt>Totale domande:</BrandTxt> {versione.totale_domande}</span>
                </ListItemText>
              </span>
              <span className="mediumUp">
                <ListItemText>
                  <span><BrandTxt>Tempo di esecuzione ca:</BrandTxt> {`${versione.totale_domande}'`}</span>
                </ListItemText>
              </span>
              <ListItemText>
                <Button
                  actioncolor="okay"
                  disabled={!versione.ritirata && versione.consegnata}
                  onClick={() => {
                    if (versione.ritirata) {
                      visualizzaStatisticheFunction(versione.assegnazione);
                    } else if (!versione.ritirata && !versione.consegnata) {
                      eseguiFunction(versione);
                    }
                  }}
                >
                  {versione.ritirata && <Icon {...buttonicon.stats} left />}
                  {[
                    versione.ritirata && 'Statistiche',
                    !versione.ritirata && versione.in_corso && 'Riprendi',
                    !versione.ritirata && versione.consegnata && 'Consegnata',
                    !versione.ritirata && !versione.in_corso && !versione.consegnata && 'Esegui',
                  ]}
                </Button>
              </ListItemText>
            </ListItem>
          </div>
        ))}
      </Div>
    );
  }
}

VersioniLivelloStudenteOverview.propTypes = {
  versioniAssegnate: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ritirata: PropTypes.bool.isRequired,
      consegnata: PropTypes.bool.isRequired,
      titolo: PropTypes.string.isRequired,
    })
  ).isRequired,
  visualizzaStatisticheFunction: PropTypes.func.isRequired,
  eseguiFunction: PropTypes.func.isRequired,
};

export default VersioniLivelloStudenteOverview;
