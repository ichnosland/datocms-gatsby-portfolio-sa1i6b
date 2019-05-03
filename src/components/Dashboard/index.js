/*
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Div from 'components/Div';
import ListPanel, { PanelHeader } from 'components/ListPanel';
import MissionTag from './MissionTag';

export default class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let counterMissioni = 0;
    const incrementCounterMissioni = () => {
      counterMissioni += 1;
      return counterMissioni;
    };
    const { livelli, searchActive } = this.props;
    return (
      <div>
        {livelli.length > 0 ? livelli.map((livello) => (
          <div key={livello.id}>
            <PanelHeader>{livello.titolo}</PanelHeader>
            {livello.missioni.map((missione) => (
              <Div key={missione.titolo}>
                <MissionTag
                  number={incrementCounterMissioni()}
                  searchActive={searchActive}
                />
                <ListPanel
                  unit
                  items={missione.unita.map((elemento) => ({
                    ...elemento,
                    url: {
                      pathname: `/creaverifica/${elemento.prerequisito}`,
                      params: {
                        titoloUnita: elemento.nome,
                        titoloMissione: missione.titolo,
                        titoloLivello: livello.titolo,
                      },
                    },
                  }))}
                  key={`missione_${livello.id}_${missione.titolo}`}
                  isMytest
                />
              </Div>
            ))}
          </div>
        )) : <p>Non sono presenti livelli per questa materia</p>}
      </div>
    );
  }
}

Dashboard.propTypes = {
  livelli: PropTypes.array.isRequired,
  searchActive: PropTypes.bool,
};
