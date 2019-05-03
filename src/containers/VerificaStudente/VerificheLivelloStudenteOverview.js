/**
*
* VerificheLivelloStudenteOverview
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'components/Button';
import { BrandTxt } from 'components/Text';
import {
  ListItem,
  ListItemText,
  ListPanelHeader,
} from 'components/NewListPanels';
import buttonicon from 'icons/buttons';


class VerificheLivelloStudenteOverview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      eseguiFunction,
      visualizzaStatisticheFunction,
      verificheAssegnate,
    } = this.props;

    return (
      <div>
        {verificheAssegnate.length > 0 && verificheAssegnate.sort((a, b) => {
          if (a.ritirata > b.ritirata) {
            return 1;
          }
          if (a.ritirata < b.ritirata) {
            return -1;
          }
          return 0;
        }).map((verifica) => {
          const totaleStep = verifica.unita.reduce((acc, u) => (
            acc + u.domande[`conteggio_${verifica.solo_latino ? 'lat_ita' : 'totale'}`]
          ), 0);

          return (
            <div key={`verifica_assegnata_div_${verifica.id}`}>
              <ListPanelHeader>{verifica.titolo}</ListPanelHeader>
              {[
                <ListItem key={`verifica_assegnata_titolo_${verifica.id}`}>
                  <ListItemText>
                    <BrandTxt>Unit&agrave; della verifica:</BrandTxt>
                  </ListItemText>
                </ListItem>,
                ...verifica.unita.map((u) => (
                  <ListItem key={`verifica_assegnata_unita_${verifica.id}_${u.id}`}>
                    <ListItemText>
                      {u.nome}
                    </ListItemText>
                  </ListItem>
                )),
                <ListItem key={`verifica_assegnata_riepilogo_${verifica.id}`} justifyContent="space-around">
                  <span className="mediumUp">
                    <ListItemText>
                      <span><BrandTxt>Totale domande:&nbsp;</BrandTxt>{totaleStep}
                      </span>
                    </ListItemText>
                  </span>
                  <span className="mediumUp">
                    <ListItemText>
                      <span><BrandTxt>Tempo di esecuzione ca:&nbsp;</BrandTxt>{`${(totaleStep * (verifica.tempo_secondi_singola_domanda || 60)) / 60}'`}</span>
                    </ListItemText>
                  </span>
                  <ListItemText>
                    <Button
                      actioncolor="okay"
                      standard
                      disabled={!verifica.ritirata && verifica.consegnata}
                      onClick={() => {
                        if (verifica.ritirata) {
                          visualizzaStatisticheFunction(verifica.id);
                        } else if (!verifica.ritirata && !verifica.consegnata) {
                          eseguiFunction(verifica.id);
                        }
                      }}
                    >
                      {verifica.ritirata && <Icon {...buttonicon.stats} left />}
                      {[
                        verifica.ritirata && 'Statistiche',
                        !verifica.ritirata && verifica.in_corso && 'Riprendi',
                        !verifica.ritirata && verifica.consegnata && 'Consegnata',
                        !verifica.ritirata && !verifica.in_corso && !verifica.consegnata && 'Esegui',
                      ]}
                    </Button>
                  </ListItemText>
                </ListItem>,
              ]}
            </div>
          );
        })}
      </div>
    );
  }
}

VerificheLivelloStudenteOverview.propTypes = {
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
  visualizzaStatisticheFunction: PropTypes.func.isRequired,
  eseguiFunction: PropTypes.func.isRequired,
};

export default VerificheLivelloStudenteOverview;
