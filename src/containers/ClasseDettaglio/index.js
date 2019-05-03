/**
 *
 * ClasseDettaglio
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { sortDataBySpecs } from 'common/statistiche';
import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import { FlexBox } from 'components/FlexBox';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import Svg from 'components/Svg';
import { Icon } from 'components/Button';
import { ButtonLink } from 'components/ButtonLink';
import { BrandTxt } from 'components/Text';
import buttonicon from 'icons/buttons';
import ButtonGroup from 'components/ButtonGroup';
import ReportGrid from 'components/ReportGrid';
import { colore } from 'style/color';
import { APP_TESTING } from 'configuration';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import { grigliaValutazioneDettaglioFetch, grigliaValutazioniElimina } from 'containers/GrigliaValutazioni/actions';
import watchValutazione from 'containers/GrigliaValutazioni/saga';

import reducer from './reducer';
import {
  classeDettaglioEspelli,
  classeDettaglioDataFetch,
  classeDettaglioCorsoFetch,
  classeDettaglioDisplaySort,
} from './actions';
import { watchClasseDettaglio } from './saga';

export const InfoStudente = styled(FlexBox)`
  padding: 16px;
  margin-bottom: 20px;
  background-color: ${colore.ui.contrast};
  border-radius: 3px;
  overflow: hidden;
`;

export class ClasseDettaglioView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      match: { params: { id: corsoId, blocco } },
      configuration: { disciplinaId, theme },
      onClasseDettaglioCorsoFetch,
    } = this.props;
    const blocchiAttivi = this.calcolaBlockAttivi();

    onClasseDettaglioCorsoFetch({
      corsoId: parseInt(corsoId, 10),
      disciplinaId,
      theme,
      enabledBlocks: blocchiAttivi.map((b) => b.name),
      block: (blocchiAttivi.filter((b) => (b.name.toLowerCase() === blocco))[0] || blocchiAttivi[0] || {}).name,
    });
  }

  calcolaBlockAttivi = () => {
    const {
      configuration: {
        modules: {
          verificheLivello = { enabled: false },
          versioniLivello = { enabled: false },
          versioniMissione = { enabled: false },
          provaCompetenza = { enabled: false },
          grigliaValutazione = { enabled: false },
          registroClasse: { obiettivi } = false,
        } = {
          verificheLivello: {},
          versioniLivello: {},
          versioniMissione: {},
          provaCompetenza: {},
          grigliaValutazione: {},
          registroClasse: { obiettivi: false },
        },
      },
    } = this.props;

    return [
      obiettivi && {
        label: 'Obiettivi',
        name: 'obiettivi',
      },
      versioniLivello.enabled && {
        label: 'Versioni',
        name: 'versioniLivello',
      },
      versioniMissione.enabled && {
        label: 'Versioni',
        name: 'versioniMissione',
      },
      verificheLivello.enabled && {
        id: 4,
        label: 'Verifiche',
        name: 'verificheLivello',
      },
      provaCompetenza.enabled && {
        id: 5,
        label: 'Prove competenza',
        name: 'proveCompetenza',
      },
      grigliaValutazione.enabled && {
        id: 6,
        label: 'Valutazioni',
        name: 'grigliaValutazione',
      }].filter((b) => (b));
  };


  changeDisplay = (selection) => {
    const {
      onClasseDettaglioDataFetch,
      contenuto,
      history: { push },
      configuration: { theme },
    } = this.props;

    onClasseDettaglioDataFetch({
      block: selection,
      corsoId: contenuto.corsoId,
      historyPush: push,
      theme,
      corsoIscritti: contenuto.corsoIscritti,
      data: this.calcolaBlockAttivi().reduce((acc, b) => {
        acc[b.name] = contenuto[b.name] || { isLoaded: false };

        return acc;
      }, {}),
    });
  };

  showDetailData = (detailData, key) => {
    const { onModalSetData } = this.props;
    const {
      sortedData,
      field: displayField,
      type: displayType,
      sort: displaySort,
      intestazioniColonna,
      titolo,
      sottoTitolo,
    } = detailData;

    onModalSetData({
      topbar: true,
      titolo,
      isPopup: false,
      bgcolor: 'transparent',
      contenuto: (
        <Page full key={`detail_data_${key}`}>
          <Container>
            {sottoTitolo && (
              <InfoStudente key={`blocco_sottotitolo_${key}`}>
                <BrandTxt key="sottotitolo">{sottoTitolo}</BrandTxt>
              </InfoStudente>
            )}
            {sortedData.length > 0 && <ReportGrid
              key="dettaglio_utente"
              intestazioniColonna={intestazioniColonna}
              righe={sortDataBySpecs(sortedData, {
                field: displayField,
                type: displayType,
                sort: displaySort,
              })}
              filtriAttivi={{
                field: displayField,
                sort: displaySort,
                type: displayType,
              }}
            />}
          </Container>
        </Page>
      ),
      show: true,
    });
  }

  eliminaValutazione = (val) => {
    const {
      onGrigliaValutazioniElimina,
      onModalSetEmptyData,
      onModalSetData,
      display: { block: displayBlock },
      contenuto,
      history: { push },
    } = this.props;

    onModalSetData({
      titolo: 'Elimina valutazione',
      contenuto: `Sei sicuro di voler eliminare la valutazione<br /><strong>${val.titolo}</strong>`,
      acceptButton: {
        onClick: /* istanbul ignore next */ () => {
          onGrigliaValutazioniElimina({
            id: val.id,
            block: displayBlock,
            corsoId: contenuto.corsoId,
            historyPush: push,
            corsoIscritti: contenuto.corsoIscritti,
            data: this.calcolaBlockAttivi().reduce((acc, b) => {
              acc[b.name] = contenuto[b.name] || { isLoaded: false };
              return acc;
            }, {}),
          });
          onModalSetEmptyData();
        },
      },
      show: true,
    });
  }

  espelliStudente = (item) => {
    const {
      onModalSetData,
      onEspelliStudente,
      onModalSetEmptyData,
      configuration,
      contenuto: { corsoId, corsoNome },
      display: { block: displayBlock },
    } = this.props;

    onModalSetData({
      titolo: 'Espulsione studente',
      contenuto: `Si desidera espellere lo studente <strong>${`${item.name}`}</strong> per la classe <strong>${corsoNome}</strong>?`,
      acceptButton: {
        onClick: /* istanbul ignore next */ () => {
          onEspelliStudente({
            block: displayBlock,
            studente: {
              nome: `${item.name}`,
              id: item.studenteAcademyId,
            },
            corso: {
              id: corsoId,
              nome: corsoNome,
            },
            configuration,
          });
          onModalSetEmptyData();
        },
      },
      show: true,
    });
  }

  sortData = (payloadData, sortingData) => {
    const { onClasseDettaglioDisplaySort } = this.props;

    onClasseDettaglioDisplaySort(payloadData, sortingData);
  }

  render() {
    const {
      spinner,
      feedback,
      userAnagraphics,
      history,
      contenuto: {
        corsoNome,
        corsoId,
        intestazioniColonna,
        sortedData,
      },
      display: {
        field: displayField,
        sort: displaySort,
        type: displayType,
        block: displayBlock,
      },
      history: { push },
      configuration: {
        modules: {
          grigliaValutazione = {
            enabled: false,
          },
        } = {
          grigliaValutazione: {},
        },
      },
    } = this.props;

    const { actions: { help, okay, error }, ui: { darkBg } } = colore;
    const { check, crono, minus, trash } = buttonicon;
    const intestazioniColonnaBlocco = intestazioniColonna
      .filter((i) => (i.blocchi.indexOf(displayBlock) > -1));

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            onClickFunction: () => { history.push('/classi'); },
            enabled: true,
          }}
          title={corsoNome}
          single
        />
        <Container>
          <FlexBox justifyContent="space-between" padding="0 0 20px">
            <p>Codice classe:<br />
              <BrandTxt>{userAnagraphics.last_name}{corsoId > 0 ? corsoId : ''}</BrandTxt>
            </p>
            {grigliaValutazione.enabled && (
              <ButtonLink
                actioncolor="action"
                to={`/griglia-valutazione-nuova/${corsoId}`}
              >
                <Icon left {...buttonicon.plus} fill="#fff" /> Valuta
              </ButtonLink>
            )}
          </FlexBox>
          <FlexBox justifyContent="space-around" padding="0 0 40px">
            <ButtonGroup
              buttons={this.calcolaBlockAttivi().map((c, k) => ({
                id: k,
                label: c.label,
                attivo: displayBlock === c.name,
                onClickFunction: displayBlock === c.name ? null : /* istanbul ignore next */ () => this.changeDisplay(c.name),
              }))}
            />
          </FlexBox>
          {spinner ?
            <Spinner /> :
            <div>
              {!feedback.hasFeedback ? (
                <ReportGrid
                  key="riepilogo"
                  intestazioniColonna={
                    intestazioniColonnaBlocco.map((b) => ({
                      ...b,
                      label: {
                        completate: <Icon {...check} fill={okay} />,
                        inCorso: <Icon {...crono} fill={help} />,
                        nonIniziate: <Icon {...minus} fill={darkBg} />,
                      }[b.field] || b.label,
                    }))
                  }
                  sortingFunction={this.sortData}
                  righe={sortedData.map(/* istanbul ignore next */(r) => ({
                    ...r,
                    espelliStudentefunction: APP_TESTING ? () => this.espelliStudente(r) : null,
                    espelliStudente: APP_TESTING && <Svg {...trash} fill={error} />,
                    detailDataFunction: r.detailData ?
                      () => this.showDetailData(r.detailData, r.key) : null,
                    apriValutazioneFunction: () => push({
                      pathname: `/griglia-valutazione-dettaglio/${r.id}`,
                      state: {
                        id: r.id,
                        titolo: r.titolo,
                        corsoNome,
                        tipologia: r.tipo,
                        dataCreazione: r.dataCreazione,
                        corsoId: parseInt(corsoId, 10),
                      },
                    }),
                    eliminaValutazione: <Svg {...trash} fill={error} />,
                    eliminaValutazioneFunction: () => this.eliminaValutazione(r),
                  }))}
                  filtriAttivi={{
                    field: displayField,
                    sort: displaySort,
                    type: displayType,
                  }}
                />
              ) : <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>
              }
            </div>
          }
        </Container>
      </Page>
    );
  }
}

ClasseDettaglioView.propTypes = {
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    theme: PropTypes.shape({
      brand: PropTypes.string.isRequired,
      subtle: PropTypes.string.isRequired,
      light: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.object.isRequired,
  spinner: PropTypes.bool.isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  userAnagraphics: PropTypes.shape({
    last_name: PropTypes.string.isRequired,
  }).isRequired,
  contenuto: PropTypes.shape({
    sortedData: PropTypes.array.isRequired,
    isCorsoLoaded: PropTypes.bool.isRequired,
    corsoNome: PropTypes.string.isRequired,
    corsoId: PropTypes.number.isRequired,
  }).isRequired,
  onEspelliStudente: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onClasseDettaglioCorsoFetch: PropTypes.func.isRequired,
  onClasseDettaglioDisplaySort: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  userAnagraphics: state.get('user').toJS().anagraphics,
  spinner: state.get('classeDettaglio').toJS().spinner,
  spinnerDetail: state.get('classeDettaglio').toJS().spinnerDetail,
  feedback: state.get('classeDettaglio').toJS().feedback,
  display: state.get('classeDettaglio').toJS().display,
  contenuto: state.get('classeDettaglio').toJS().contenuto,
  configuration: state.get('configuration').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGrigliaValutazioniDettaglioFetch: (payload) => {
      dispatch(grigliaValutazioneDettaglioFetch(payload));
    },
    onGrigliaValutazioniElimina: (payload) => {
      dispatch(grigliaValutazioniElimina(payload));
    },
    onClasseDettaglioCorsoFetch: (payload) => {
      dispatch(classeDettaglioCorsoFetch(payload));
    },
    onClasseDettaglioDataFetch: (payload) => {
      dispatch(classeDettaglioDataFetch(payload));
    },
    onClasseDettaglioDisplaySort: (payloadData, sortingData) => {
      dispatch(classeDettaglioDisplaySort(payloadData, sortingData));
    },
    onEspelliStudente: (payload) => {
      dispatch(classeDettaglioEspelli(payload));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalSetEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'classeDettaglio', reducer });
const withSaga = injectSaga({ key: 'classeDettaglio', saga: watchClasseDettaglio });
const withGrigliaValutazioneSaga = injectSaga({ key: 'grigliaValutazioni', saga: watchValutazione });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withGrigliaValutazioneSaga,
)(ClasseDettaglioView);
