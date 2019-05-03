/**
 *
 * EsecuzionePreviewStatistiche
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  rappresentaSoluzioneTestuale,
  calcolaSoluzioni,
} from 'common/esercizi';
import TopBar from 'components/TopBar';
import StatisticheView from 'components/StatisticheView';
import Container from 'components/Container';
import Page from 'components/Page';


export default class EsecuzionePreviewStatistiche extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      isErroriComuni,
      contenutoEsercizio: {
        id,
        voto,
        steps,
        risposteFornite,
        openedSections,
      },
      apriChiudiSezioniFx,
      backUrl,
    } = this.props;

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            url: backUrl,
            enabled: true,
          }}
          single
          title={isErroriComuni ? 'Errori comuni' : 'Test di esecuzione'}
        />
        <Container>
          <StatisticheView
            selezionaUtenteFx={/* istanbul ignore next */ () => { }}
            media={steps.reduce((acc, s) => {
              acc[s.id] = {
                risposte: [{
                  ...(risposteFornite[s.id] || {
                    corretta: false,
                    readable: 'Saltata',
                  }),
                  studenti: [],
                }],
              };

              return acc;
            }, {})}
            scores={[]}
            grafici={[]}
            studentiVersione={[{
              id: 1,
              key: 0,
              first_name: isErroriComuni ? 'Errori' : 'Test',
              last_name: isErroriComuni ? 'comuni' : 'esecuzione',
              voto,
            }]}
            utenteSelezionato={{
              id: 1,
              key: 0,
            }}
            esercizi={steps.reduce((acc, s) => {
              acc[s.id] = {
                titolo: s.esercizi[0].titolo || s.testi[0].titolo,
                stepData: s,
                soluzioneTestuale: rappresentaSoluzioneTestuale(
                  calcolaSoluzioni(s.testi, s.esercizi, 1),
                  s.esercizi[0].tipo
                ),
              };

              return acc;
            }, {})}
            stepPks={steps.map((s) => (s.id))}
            apriChiudiSezioniFx={apriChiudiSezioniFx}
            openedSections={openedSections}
            idAssegnazione={id}
          />
        </Container>
      </Page>
    );
  }
}

EsecuzionePreviewStatistiche.propTypes = {
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
  }).isRequired,
  contenutoEsercizio: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totaleDomande: PropTypes.number.isRequired,
    voto: PropTypes.number.isRequired,
    risposteFornite: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired,
  }).isRequired,
  isErroriComuni: PropTypes.bool,
  backUrl: PropTypes.string.isRequired,
};
