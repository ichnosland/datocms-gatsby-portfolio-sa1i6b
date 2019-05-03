/**
 *
 * VersionePeriodi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TopBar from 'components/TopBar';
import { Button } from 'components/Button';
import {
  versioniVersioneEsecuzionePeriodoCaricatoSet,
  versioniVersioneEsecuzioneConsegna,
} from 'containers/Versioni/actions';
import {
  calcolaTraduzioneUtentePeriodo,
  calcolaContenutoPeriodoDaEseguire,
} from 'containers/Versioni/utils';
import { getHintToDisplay } from 'common/hints';
import Page from 'components/Page';
import Container from 'components/Container';
import Div from 'components/Div';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { userHintDisplay } from 'containers/User/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import VersionePeriodiTradotti from 'components/VersionePeriodiTradotti';

export class VersionePeriodiView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { configuration, history, versioneCaricata } = this.props;

    if (!versioneCaricata.isEsecuzioneLoaded) {
      history.push(configuration.homePage);
    }
  }

  eseguiPeriodo = (idPeriodo, keyPeriodo) => {
    const {
      versioneAvanzamento,
      versioneCaricata,
      onSetEsecuzione,
      history,
      onUserHintDisplay,
      dispatch,
      userAppData,
      userAnagraphics,
      configuration,
    } = this.props;

    if (!versioneAvanzamento.periodiDaEseguire.stepDaEseguire[idPeriodo]) {
      return false;
    }

    const periodoCaricato = calcolaContenutoPeriodoDaEseguire(
      versioneAvanzamento.periodiDaEseguire.stepDaEseguire[idPeriodo],
      versioneCaricata.periodi[keyPeriodo].periodo
    );

    const lunghezzaPeriodo = versioneCaricata.periodi[keyPeriodo].periodo.length;

    onSetEsecuzione({
      periodoCaricato,
      stepCaricatoKey: 0,
      periodoCaricatoId: idPeriodo,
      stepTotali: lunghezzaPeriodo,
      stepEseguiti: lunghezzaPeriodo - periodoCaricato.length,
    });

    onUserHintDisplay({
      dispatch,
      hintToDisplay: getHintToDisplay(
        configuration.product,
        `versione_${periodoCaricato[0].esercizi[0].tipo}`,
        userAppData.hints
      ),
      userHints: userAppData.hints,
      userId: userAnagraphics.id,
      product: configuration.product,
    });

    history.push('/versione-esecuzione');
    return true;
  }

  calcolaPropsPreviewPeriodo(enableEsegui = false) {
    const { versioneCaricata, versioneAvanzamento } = this.props;

    return {
      titolo: versioneCaricata.titolo,
      sottotitolo: versioneCaricata.sottotitolo,
      periodi: versioneCaricata.previewPeriodi.map((periodo, key) => ({
        ...periodo,
        testoTradotto: calcolaTraduzioneUtentePeriodo(
          versioneCaricata.periodi[periodo.keyPeriodo],
          versioneAvanzamento.risposteFornite[periodo.idPeriodo] || {}
        ),
        mostraTestoTradotto: versioneAvanzamento.periodiDaEseguire.periodiIncompletiPks.indexOf(
          periodo.idPeriodo
        ) === -1,
        goTo: {
          enable: enableEsegui && versioneAvanzamento.periodiDaEseguire.periodiIncompletiPks.indexOf(
            periodo.idPeriodo
          ) > -1,
          onClick: () => this.eseguiPeriodo(periodo.idPeriodo, key),
        },
      })),
    };
  }

  render() {
    const {
      versioneCaricata,
      spinner,
      versioneConsegna,
      feedback,
      userAppData,
      versioneAvanzamento,
      history,
      onModalSetData,
      onModalSetEmptyData,
    } = this.props;

    return (
      <Page>
        <TopBar
          backNav={{
            url: versioneCaricata.backUrl,
            enabled: true,
          }}
          title="Esecuzione versione"
          single
          key="versione_esecuzione_topbar"
        />
        {spinner ?
          <Spinner /> :
          <Container
            key="versione_esecuzione_container"
          >
            <VersionePeriodiTradotti {...this.calcolaPropsPreviewPeriodo(true)} />
            {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
            <Div align="center" padding="20px 0">
              <Button
                onClick={() => onModalSetData({
                  titolo: 'Consegna versione',
                  contenuto: 'Sei sicuro di voler consegnare? Se consegni non potrai riprendere la versione',
                  acceptButton: {
                    onClick: /* istanbul ignore next */ () => {
                      versioneConsegna({
                        id: versioneCaricata.id,
                        isDocente: userAppData.docente,
                        risposteFornite: versioneAvanzamento.risposteFornite,
                        history,
                        enableSuoni: userAppData.enableSuoni,
                      });
                      onModalSetEmptyData();
                    },
                  },
                  show: true,
                })}
              >Consegna
              </Button>
            </Div>
          </Container>}
      </Page>
    );
  }
}

VersionePeriodiView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  versioneCaricata: PropTypes.shape({
    titolo: PropTypes.string.isRequired,
    assegnata: PropTypes.bool.isRequired,
    ritirata: PropTypes.bool.isRequired,
    totaleDomande: PropTypes.number,
    previewPeriodi: PropTypes.arrayOf(PropTypes.shape({
      testoDaTradurre: PropTypes.string.isRequired,
      idPeriodo: PropTypes.number.isRequired,
      keyPeriodo: PropTypes.number.isRequired,
    })).isRequired,
    periodi: PropTypes.arrayOf(PropTypes.shape({
      periodo: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        testi: PropTypes.array.isRequired,
        esercizi: PropTypes.array.isRequired,
      })).isRequired,
    })),
  }),
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  history: PropTypes.object.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalSetEmptyData: PropTypes.func.isRequired,
  versioneAvanzamento: PropTypes.shape({
    periodiDaEseguire: PropTypes.shape({
      periodiIncompletiPks: PropTypes.array.isRequired,
      stepDaEseguire: PropTypes.object.isRequired,
    }),
  }),
  onSetEsecuzione: PropTypes.func.isRequired,
  versioneConsegna: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onUserHintDisplay: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  versioneCaricata: state.get('versioni').toJS().versioneCaricata,
  spinner: state.get('versioni').toJS().spinner,
  feedback: state.get('versioni').toJS().feedback,
  versioneAvanzamento: state.get('versioni').toJS().versioneAvanzamento,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSetEsecuzione: (payload) => {
      dispatch(versioniVersioneEsecuzionePeriodoCaricatoSet(payload));
    },
    versioneConsegna: (payload) => {
      dispatch(versioniVersioneEsecuzioneConsegna(payload));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalSetEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
    onUserHintDisplay: (payload) => {
      dispatch(userHintDisplay(payload));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(VersionePeriodiView);
