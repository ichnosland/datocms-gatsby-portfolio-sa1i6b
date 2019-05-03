/**
 *
 * UnitaAndamento
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import correzione from 'images/infocard-icn_correzione.png';
import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import P from 'components/Paragraph';
import Spinner from 'components/Spinner';
import AlertBanner, { IconBanner } from 'components/AlertBanner';
import { H2 } from 'components/Heading';
import { Icon, Button, GhostButton } from 'components/Button';
import Svg from 'components/Svg';
import ReportGrid from 'components/ReportGrid';
import FlexBox, { FlexChild } from 'components/FlexBox';
import buttonicon from 'icons/buttons';
import icon from 'icons/globals';
import { colore } from 'style/color';
import { modalSetData } from 'containers/ModalBox/actions';
import { unitaErroriComuniStepInitialize } from 'containers/UnitaErroriComuni/actions';
import unitaErroriComuniSaga from 'containers/UnitaErroriComuni/saga';

import reducer from './reducer';
import { watchUnitaAndamento } from './saga';
import { unitaAndamentoFetch, unitaAndamentoSort } from './actions';

export class UnitaAndamentoView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      corsoSelezionato: {
        isCorsoLoaded,
        pk: idCorso,
        iscritti,
        isIscrittiLoaded,
      },
      match: { params: { id: idUnita } },
      onUnitaAndamentoFetch,
      display,
      configuration: { theme },
    } = this.props;

    if (isCorsoLoaded && isIscrittiLoaded) {
      onUnitaAndamentoFetch(idUnita, idCorso, { display, iscritti, theme });
    }
  }

  componentDidUpdate(oldData) {
    const { corsoSelezionato: corsoSelezionatoOld } = oldData;
    const {
      corsoSelezionato: { pk: idCorso, iscritti, isIscrittiLoaded },
      match: { params: { id: idUnita } },
      display,
      onUnitaAndamentoFetch,
      configuration: { theme },
    } = this.props;

    if (isIscrittiLoaded && !corsoSelezionatoOld.isIscrittiLoaded) {
      onUnitaAndamentoFetch(idUnita, idCorso, { display, iscritti, theme });
    }
  }

  render() {
    const {
      history: { push },
      match: { params: { id: idUnita } },
      contenuto: {
        titolo,
        numeroLezioni,
        prerequisito,
        sortedData,
        totaleUnitaCompletate,
        totaleUnitaIniziate,
        totaleUnitaNonIniziate,
        intestazioniColonna,
      },
      onModalSetData,
      spinner,
      feedback: { hasFeedback, tipologia: feedbackTipologia, messaggio: feedbackMessaggio },
      display,
      onUnitaAndamentoSort,
      onUnitaErroriComuniStepInizialize,
      corsoSelezionato: { pk: corsoId },
    } = this.props;
    const { actions: { help, okay }, ui: { darkBg } } = colore;
    const { check, crono, minus } = buttonicon;

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            onClickFunction: () => push(`/unita-preview/${idUnita}`),
            enabled: true,
          }}
          title="Andamento"
          single
        />
        {spinner ? <Spinner /> : ([
          hasFeedback && (
            <AlertBanner key="feedback" actioncolor={feedbackTipologia}>{feedbackMessaggio}</AlertBanner>
          ),
          !hasFeedback && sortedData.length === 0 && (
            <AlertBanner key="feedback_empty" actioncolor={'error'}>Non sono presenti dati da visualizzare</AlertBanner>
          ),
          !hasFeedback && sortedData.length > 0 && (
            <Container key="main_container">
              <H2 margin="0 0 0.83em" center>{titolo}</H2>
              <P align="center">{numeroLezioni} Lezion{numeroLezioni === 1 ? 'e' : 'i'}</P>
              {sortedData.length > 0 && ([
                <FlexBox justifyContent="space-between" padding="20px 0" alignItems="stretch" key="counter">
                  <IconBanner tag>
                    <FlexChild>{totaleUnitaCompletate}&nbsp;<Icon {...check} fill={okay} /></FlexChild>
                    <FlexChild>{totaleUnitaIniziate}&nbsp;<Icon {...crono} fill={help} /></FlexChild>
                    <FlexChild>{totaleUnitaNonIniziate}&nbsp;<Icon {...minus} fill={darkBg} /></FlexChild>
                  </IconBanner>
                  <FlexBox key="errori_frequenti">
                    <Button
                      actioncolor="okay"
                      onClick={() => onUnitaErroriComuniStepInizialize({
                        corsoId,
                        unitaId: parseInt(idUnita, 10),
                        prerequisitoId: prerequisito,
                        historyPush: push,
                      })}
                    >
                      Errori frequenti
                    </Button>
                    <GhostButton
                      margin="0 0 0 10px"
                      className="mediumUp"
                      onClick={() => onModalSetData({
                        contenuto: `
                          L’opzione "Errori frequenti" ti permette di eseguire gli
                          esercizi su cui i tuoi studenti hanno incontrato più difficoltà
                          in questa unità. Correggendoli insieme a loro e monitorando la pagina
                          "Andamento" avrai sempre un quadro completo,
                          in tempo reale, dei loro progressi.
                        `,
                        show: true,
                        image: {
                          src: correzione,
                          width: '180px',
                          height: '130px',
                          alt: 'Associa',
                        },
                        closeButton: {
                          text: 'Ok',
                        },
                      })}
                    >
                      <Svg {...icon.info} />
                    </GhostButton>
                  </FlexBox>
                </FlexBox>,
                <ReportGrid
                  key="riepilogo"
                  intestazioniColonna={intestazioniColonna}
                  sortingFunction={onUnitaAndamentoSort}
                  righe={sortedData.map((r) => {
                    let stato = <Icon {...minus} fill={darkBg} />;

                    if (r.completata) {
                      stato = <Icon {...check} fill={okay} />;
                    } else if (!r.completata && r.inCorso) {
                      stato = <Icon {...crono} fill={help} />;
                    }

                    return {
                      ...r,
                      stato,
                    };
                  })}
                  filtriAttivi={display}
                />,
              ])}
            </Container>
          ),
        ])}
      </Page>
    );
  }
}

UnitaAndamentoView.propTypes = {
  corsoSelezionato: PropTypes.shape({
    isIscrittiLoaded: PropTypes.bool.isRequired,
    isCorsoLoaded: PropTypes.bool.isRequired,
    pk: PropTypes.number.isRequired,
    iscritti: PropTypes.array.isRequired,
  }).isRequired,
  onModalSetData: PropTypes.func.isRequired,
  spinner: PropTypes.bool.isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  contenuto: PropTypes.shape({
    titolo: PropTypes.string.isRequired,
    numeroLezioni: PropTypes.number.isRequired,
    prerequisito: PropTypes.number.isRequired,
    sortedData: PropTypes.array.isRequired,
    totaleUnitaCompletate: PropTypes.number.isRequired,
    totaleUnitaIniziate: PropTypes.number.isRequired,
    totaleUnitaNonIniziate: PropTypes.number.isRequired,
  }).isRequired,
  onUnitaAndamentoSort: PropTypes.func.isRequired,
  onUnitaAndamentoFetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    theme: PropTypes.object.isRequired,
  }).isRequired,
  onUnitaErroriComuniStepInizialize: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
  display: state.get('unitaAndamento').toJS().display,
  spinner: state.get('unitaAndamento').toJS().spinner,
  feedback: state.get('unitaAndamento').toJS().feedback,
  contenuto: state.get('unitaAndamento').toJS().contenuto,
  configuration: state.get('configuration').toJS(),
});

export const mapDispatchToProps = (dispatch) => ({
  onUnitaAndamentoFetch: (...data) => {
    dispatch(unitaAndamentoFetch(...data));
  },
  onUnitaAndamentoSort: (...data) => {
    dispatch(unitaAndamentoSort(...data));
  },
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
  onUnitaErroriComuniStepInizialize: (payload) => {
    dispatch(unitaErroriComuniStepInitialize(payload));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'unitaAndamento', reducer });
const withSaga = injectSaga({ key: 'unitaAndamento', saga: watchUnitaAndamento });
const withEsercizioPreviewSaga = injectSaga({ key: 'unitaErroriComuni', saga: unitaErroriComuniSaga });

export default compose(
  withEsercizioPreviewSaga,
  withReducer,
  withSaga,
  withConnect,
)(UnitaAndamentoView);
