/**
 *
 * Dettaglio valutazione studente
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import ReportGrid from 'components/ReportGrid';
import BreadCrumb, { Crumb } from 'components/BreadCrumb';
import Container from 'components/Container';
import Div from 'components/Div';
import { TextButton } from 'components/Button';
import { BrandTxt } from 'components/Text';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';

import reducer from './reducer';


export class GrigliaValutazioniDettaglioStudenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      history: { push },
      configuration: { homePage },
      dettaglioStudente: { isLoaded },
    } = this.props;

    if (!isLoaded) {
      push(homePage);
    }
  }

  render() {
    const {
      history: { push },
      dettaglioStudente,
      dettaglioStudente: {
        nome: studenteNome,
        valutazioneTitolo,
        dataCreazioneValutazione,
        votoMedia,
        corsoNome,
        valutazioneId,
        corsoId,
        valutazioneTipologia,
      },
      configuration: { theme },
    } = this.props;

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            onClickFunction: () => push({
              pathname: `/griglia-valutazione-dettaglio/${valutazioneId}`,
              state: {
                id: valutazioneId,
                titolo: valutazioneTitolo,
                corsoNome,
                tipologia: valutazioneTipologia,
                dataCreazione: dataCreazioneValutazione,
                corsoId,
              },
            }),
            enabled: true,
          }}
          title={corsoNome}
          button={{
            bone: true,
            buttonIcon: 'print',
            label: 'Stampa',
            onClick: () => window.print(),
          }}
        />
        <Container>
          <Div margin="0 auto 30px">
            <BreadCrumb>
              <Crumb>
                <TextButton
                  color="inherit"
                  onClick={() => push(`/classe-dettaglio/${corsoId}/grigliavalutazione`)}
                >Valutazioni
                </TextButton>
              </Crumb>
              <Crumb>
                <TextButton
                  color="inherit"
                  onClick={() => push({
                    pathname: `/griglia-valutazione-dettaglio/${valutazioneId}`,
                    state: {
                      id: valutazioneId,
                      titolo: valutazioneTitolo,
                      corsoNome,
                      tipologia: valutazioneTipologia,
                      dataCreazione: dataCreazioneValutazione,
                      corsoId,
                    },
                  })
                  }
                ><strong>{valutazioneTitolo}</strong>&nbsp;
                </TextButton>
                <CountBadge radius="3px">
                  <CountBadgeItem bgcolor={theme.subtle}><strong>{dataCreazioneValutazione}</strong></CountBadgeItem>
                </CountBadge>
              </Crumb>
              <Crumb>
                <BrandTxt>
                  <strong>{studenteNome}</strong>&nbsp;
                </BrandTxt>
                <CountBadge radius="3px">
                  <CountBadgeItem actioncolor="help">media: <strong>{votoMedia}</strong></CountBadgeItem>
                </CountBadge>
              </Crumb>
            </BreadCrumb>
          </Div>
          {['unita', 'versioni', 'verifiche', 'proveCompetenza'].map((tipo) => (
            dettaglioStudente[tipo].length > 0 && ([
              <Div margin="30px auto 10px" key={`valutazione_titolo_${valutazioneId}_${tipo}`}>
                <strong>
                  {
                    {
                      unita: 'Unità:',
                      versioni: 'Versioni:',
                      verifiche: 'Verifiche:',
                      prove_competenza: 'Prove competenza:',
                    }[tipo]
                  }
                </strong>
              </Div>,
              <ReportGrid
                mono
                key={`valutazione_grid_${valutazioneId}_${tipo}`}
                intestazioniColonna={[{
                  label: 'Titolo',
                  field: 'titolo',
                  type: 'string',
                  style: {
                    justifyContent: 'space-between',
                  },
                  fieldsDisplay: [{
                    field: 'titolo',
                  }],
                }, {
                  label: 'Punteggio',
                  field: 'voto',
                  type: 'number',
                  fieldsDisplay: [{ field: 'votoApprossimato' }],
                }]}
                righe={
                  dettaglioStudente[tipo].sort((a, b) => {
                    if (a.titolo.toUpperCase() < b.titolo.toUpperCase()) {
                      return -1;
                    }
                    if (a.titolo.toUpperCase() > b.titolo.toUpperCase()) {
                      return 1;
                    }
                    return 0;
                  })
                }
                filtriAttivi={{
                  field: 'titolo',
                  sort: 'asc',
                  type: 'string',
                  block: 'obiettivi',
                }}
              />,
            ])
          ))}
        </Container>
      </Page>
    );
  }
}

GrigliaValutazioniDettaglioStudenteView.propTypes = {
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    theme: PropTypes.shape({
      subtle: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dettaglioStudente: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    nome: PropTypes.string.isRequired,
    valutazioneTitolo: PropTypes.string.isRequired,
    dataCreazioneValutazione: PropTypes.string.isRequired,
    votoMedia: PropTypes.number.isRequired,
    corsoNome: PropTypes.string.isRequired,
    valutazioneId: PropTypes.number.isRequired,
    corsoId: PropTypes.number.isRequired,
    valutazioneTipologia: PropTypes.string.isRequired,
    versioni: PropTypes.array.isRequired,
    verifiche: PropTypes.array.isRequired,
    proveCompetenza: PropTypes.array.isRequired,
    unita: PropTypes.array.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = (state) => ({
  dettaglioStudente: state.get('grigliaValutazioni').toJS().dettaglioStudente,
  configuration: state.get('configuration').toJS(),
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: 'grigliaValutazioni', reducer });

export default compose(
  withReducer,
  withConnect,
)(GrigliaValutazioniDettaglioStudenteView);
