/**
 *
 * GrigliaValutazioni
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Div from 'components/Div';
import { TextButton } from 'components/Button';
import { BrandTxt } from 'components/Text';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import ReportGrid from 'components/ReportGrid';
import BreadCrumb, { Crumb } from 'components/BreadCrumb';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';

import reducer from './reducer';
import saga from './saga';
import {
  grigliaValutazioneDettaglioFetch,
  grigliaValutazioneDettaglioSort,
  grigliaValutazioneDettaglioStudenteFetch,
} from './actions';


export class GrigliaValutazioniDettaglioView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      history: { push },
      configuration: { homePage, theme },
      match: { params: { valutazioneId } },
      location: {
        state: {
          id,
          titolo,
          tipologia,
          dataCreazione,
          corsoId,
          corsoNome,
        },
      } = { state: {} },
      onGrigliaValutazioniDettaglioFetch,
    } = this.props;

    if (id && corsoId) {
      onGrigliaValutazioniDettaglioFetch({
        data: {
          titolo,
          tipologia,
          dataCreazione,
          corsoId: parseInt(corsoId, 10),
          corsoNome,
        },
        valutazioneId: parseInt(valutazioneId, 10),
        theme,
      });
    } else {
      push(homePage);
    }
  }

  render() {
    const {
      history: { push },
      match: { params: { valutazioneId } },
      configuration: { theme },
      dettaglio: {
        sortedData,
        corsoId,
        corsoNome,
        titolo,
        intestazioniColonna,
        dataCreazione,
        tipologia,
      },
      spinner,
      feedback: { hasFeedback, tipologia: feedbackTipologia, messaggio: feedbackMessaggio },
      display,
      onGrigliaValutazioniDettaglioSort,
      onGrigliaValutazioneDettaglioStudenteFetch,
    } = this.props;
    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            onClickFunction: () => push(`/classe-dettaglio/${corsoId}/grigliavalutazione`),
            enabled: true,
          }}
          title={corsoNome}
          single
        />
        {spinner.default ? <Spinner /> : ([
          hasFeedback && (
            <AlertBanner key="feedback" actioncolor={feedbackTipologia}>{feedbackMessaggio}</AlertBanner>
          ),
          !hasFeedback && sortedData.length === 0 && (
            <AlertBanner key="feedback_empty" actioncolor={'error'}>Non sono presenti dati da visualizzare</AlertBanner>
          ),
          !hasFeedback && sortedData.length > 0 && (
            <Container key="main_container">
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
                    <BrandTxt>
                      <strong>{titolo}</strong>
                    </BrandTxt>&nbsp;
                    <CountBadge radius="3px">
                      <CountBadgeItem bgcolor={theme.subtle}><strong>{dataCreazione}</strong></CountBadgeItem>
                    </CountBadge>
                  </Crumb>
                </BreadCrumb>
              </Div>
              {sortedData.length > 0 && (
                <ReportGrid
                  mono
                  key="riepilogo"
                  intestazioniColonna={intestazioniColonna}
                  sortingFunction={onGrigliaValutazioniDettaglioSort}
                  righe={sortedData.map((r) => ({
                    ...r,
                    studenteDetailFunction: !spinner.dettaglioStudente ?
                      () => onGrigliaValutazioneDettaglioStudenteFetch({
                        studenteAcademyId: r.studente,
                        valutazioneId: parseInt(valutazioneId, 10),
                        nomeStudente: r.nome,
                        dataCreazioneValutazione: dataCreazione,
                        voto: r.voto,
                        corsoId,
                        historyPush: push,
                        valutazioneTitolo: titolo,
                        valutazioneTipologia: tipologia,
                        corsoNome,
                      }) : null,
                  }))}
                  filtriAttivi={display}
                />
              )}
            </Container>
          ),
        ])}
      </Page>
    );
  }
}

GrigliaValutazioniDettaglioView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      valutazioneId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  spinner: PropTypes.shape({
    default: PropTypes.bool.isRequired,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
  }).isRequired,
  onGrigliaValutazioniDettaglioFetch: PropTypes.func.isRequired,
  onGrigliaValutazioniDettaglioSort: PropTypes.func.isRequired,
  onGrigliaValutazioneDettaglioStudenteFetch: PropTypes.func.isRequired,
  display: PropTypes.shape({
    field: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  dettaglio: PropTypes.shape({
    dataCreazione: PropTypes.string.isRequired,
    sortedData: PropTypes.array.isRequired,
    valutazioneId: PropTypes.number.isRequired,
    corsoId: PropTypes.number.isRequired,
    titolo: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    tipologia: PropTypes.string.isRequired,
    intestazioniColonna: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        fieldsDisplay: PropTypes.array.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number,
      titolo: PropTypes.string,
      tipologia: PropTypes.string,
      dataCreazione: PropTypes.string,
      corsoId: PropTypes.number,
      corsoNome: PropTypes.string,
    }),
  }),
};

export const mapStateToProps = (state) => ({
  display: state.get('grigliaValutazioni').toJS().display,
  spinner: state.get('grigliaValutazioni').toJS().spinner,
  feedback: state.get('grigliaValutazioni').toJS().feedback,
  dettaglio: state.get('grigliaValutazioni').toJS().dettaglio,
  configuration: state.get('configuration').toJS(),
});

export const mapDispatchToProps = (dispatch) => ({
  onGrigliaValutazioniDettaglioFetch: (payload) => {
    dispatch(grigliaValutazioneDettaglioFetch(payload));
  },
  onGrigliaValutazioniDettaglioSort: (payload, sorting) => {
    dispatch(grigliaValutazioneDettaglioSort(payload, sorting));
  },
  onGrigliaValutazioneDettaglioStudenteFetch: (payload) => {
    dispatch(grigliaValutazioneDettaglioStudenteFetch(payload));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'grigliaValutazioni', reducer });
const withSaga = injectSaga({ key: 'grigliaValutazioni', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GrigliaValutazioniDettaglioView);
