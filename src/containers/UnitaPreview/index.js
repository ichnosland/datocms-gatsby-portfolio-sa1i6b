/**
 *
 * UnitaPreviewView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import { BASENAME } from 'configuration';
import FlexBox, { FlexWrap } from 'components/FlexBox';
import LogoPlatform from 'components/LogoPlatform';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import CentralBox from 'components/CentralBox';
import { H2 } from 'components/Heading';
import media from 'style/mediainjector';
import { googleAnalyticsWrapper } from 'common/utils';
import {
  unitaContenutoFetch,
  unitaAssegna,
  unitaStepInitialize,
} from 'containers/Unita/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import UnitaPreviewStudente from './UnitaPreviewStudente';
import UnitaPreviewDocente from './UnitaPreviewDocente';

const ninja = [
  `${BASENAME}difficolta-1.png`,
  `${BASENAME}difficolta-2.png`,
  `${BASENAME}difficolta-3.png`,
  `${BASENAME}difficolta-4.png`,
  `${BASENAME}difficolta-5.png`,
  `${BASENAME}difficolta-6.png`,
  `${BASENAME}difficolta-7.png`,
];

export const UnitWrap = styled(FlexWrap)`
  ${media.mobile`
    background-color: ${(props) => props.theme.brand};
    height: 100%;
  `};
`;

UnitWrap.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

const FullContainer = styled(Container)`
  ${media.mobile`
    height: 100%;
  `};
`;

export class UnitaPreviewView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      onUnitaContenutoFetch,
      corsoSelezionato: { isCorsoLoaded, pk: corsoId },
      match: { params: { id: unitaId } },
      userAppData: { docente },
    } = this.props;

    if (!docente || isCorsoLoaded) {
      onUnitaContenutoFetch(parseInt(unitaId, 10), corsoId);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      corsoSelezionato: { isCorsoLoaded, pk: corsoId },
      onUnitaContenutoFetch,
      match: { params: { id: unitaId } },
      userAppData: { docente },
    } = this.props;

    const {
      corsoSelezionato: {
        isCorsoLoaded: prevCorsoLoaded,
        pk: prevCorsoId,
      },
    } = prevProps;

    if (docente && isCorsoLoaded && (prevCorsoLoaded !== isCorsoLoaded || prevCorsoId !== corsoId)) {
      onUnitaContenutoFetch(parseInt(unitaId, 10), corsoId);
    }
  }

  eseguiLezioneDocente = (e) => {
    e.preventDefault();
    const { formUnitaLezione: { values: { lezione } } } = this.props;

    this.eseguiLezione(parseInt(lezione, 10));
  }

  eseguiLezione = (key) => {
    const {
      userAppData: { hints: userHints, docente },
      onUnitaStepInizialize,
      contenutoUnita: { lezioni: { andamento }, id, prerequisito },
      userAnagraphics: { id: userId },
      configuration: { disciplinaId },
      history: { push },
      configuration: { product },
      dispatch,
    } = this.props;

    if (!andamento[key]) {
      return false;
    }

    googleAnalyticsWrapper('event', {
      category: 'Unita',
      action: `Esegui ${docente ? 'docente' : 'studente'}`,
    });

    onUnitaStepInizialize({
      dispatch,
      unitaId: id,
      prerequisito,
      difficolta: andamento[key].difficolta,
      disciplina: disciplinaId,
      historyPush: push,
      productName: product,
      userId,
      userHints,
    });

    return true;
  }

  assegnaFunction = (e) => {
    e.preventDefault();
    const {
      onModalSetData,
      onModalSetEmptyData,
      corsoSelezionato: { nome: nomeCorso, pk: corsoId, iscritti },
      contenutoUnita: { id: unitaId, titolo },
      onUnitaAssegna,
      configuration: { disciplinaId },
    } = this.props;

    if (iscritti.length === 0) {
      let messaggio = 'Per assegnare un\'unità devi avere creato almeno una classe';
      if (corsoId > 0) {
        messaggio = `Non posso assegnare un'unità ad una classe vuota (<strong>${nomeCorso}</strong>)`;
      }
      onModalSetData({
        titolo: 'Assegnazione unità',
        contenuto: messaggio,
        show: true,
      });
    } else {
      onModalSetData({
        titolo: 'Assegnazione unità',
        contenuto: `Si desidera assegnare l'unità<br /><strong>${titolo}</strong><br /> alla classe <strong>${nomeCorso}</strong>?`,
        acceptButton: {
          onClick: /* istanbul ignore next */ () => {
            onUnitaAssegna(unitaId, corsoId, disciplinaId);
            onModalSetEmptyData();
          },
        },
        show: true,
      });
    }
  }

  visualizzaAndamento = () => {
    const { contenutoUnita, history: { push } } = this.props;
    push(
      `/unita-andamento/${contenutoUnita.id}`
    );
  }

  render() {
    const {
      configuration,
      userAppData: { docente: isDocente },
      contenutoUnita: {
        lezioni: {
          totali: lezioniTotali,
          andamento,
        },
        lezione,
        titolo,
        id,
        assegnata,
      },
      spinner,
      feedback,
    } = this.props;

    let indiceLezioneDaEseguire = 0;
    if (!isDocente) {
      indiceLezioneDaEseguire = (
        Array.from({
          length: lezioniTotali,
        }, (_, k) => ({ ...andamento[k], k }))
          .filter((m) => (m.sbloccata))
          .reverse()[0] || {}
      ).k || 0;
    }

    return (
      <UnitWrap className="UnitWrap">
        {spinner &&
          <FlexBox height="100%">
            <Spinner ringo />
          </FlexBox>
        }
        <FullContainer>
          {!spinner && !feedback.hasFeedback && (
            <CentralBox unita >
              <TopBar
                box
                closeBtn={{
                  url: configuration.homePage,
                  enabled: true,
                }}
                lesson={{
                  url: `/lezione/${lezione}`,
                  enabled: lezione > 0,
                }}
                noShadow
              />
              <div>
                <H2 color="#fff" margin="0">{titolo}</H2>
                {!isDocente ? (
                  <UnitaPreviewStudente
                    displayIndex={indiceLezioneDaEseguire}
                    lezioni={
                      Array.from({
                        length: lezioniTotali,
                      }, (_, k) => ({
                        buttonLabel: `Lezione ${k + 1}`,
                        buttonFunction: andamento[k].sbloccata ? () => this.eseguiLezione(k) : null,
                        emoji: (<img
                          src={lezioniTotali > 1 && k === (lezioniTotali - 1) ? ninja[6] : ninja[k]}
                          alt={`difficoltà ${k + 1}`}
                          className={`difficolta_${lezioniTotali > 1 && k === (lezioniTotali - 1) ? 7 : k + 1}`}
                        />),
                        buttonLocked: !andamento[k].sbloccata,
                        buttonCheck: andamento[k].completata,
                      }))
                    }
                  />
                ) :
                  (
                    <UnitaPreviewDocente
                      eseguiUnitaFunction={this.eseguiLezioneDocente}
                      tempoEsecuzione={15 * lezioniTotali}
                      unitaId={id}
                      buttonAssegnaLabel={assegnata ? 'Assegnata' : 'Assegna'}
                      buttonAssegnaIcon={assegnata ? 'noBell' : 'bell'}
                      buttonAssegnaFunction={assegnata ? null : this.assegnaFunction}
                      buttonAssegnaDisabled={assegnata}
                      lezioni={
                        Array.from({
                          length: lezioniTotali,
                        }, (v, k) => ({
                          optionLabel: `${k + 1}`,
                          optionKey: k,
                        }))
                      }
                    />
                  )}
              </div>
            </CentralBox>
          )}
          {feedback.hasFeedback && <AlertBanner actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>}
        </FullContainer>
        <LogoPlatform
          product={configuration.product}
          execLogo
          margin="0 0 20px"
          desktopOnly
        />
      </UnitWrap>
    );
  }
}

UnitaPreviewView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }),
  corsoSelezionato: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    iscritti: PropTypes.array.isRequired,
  }).isRequired,
  contenutoUnita: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    lezione: PropTypes.number.isRequired,
    lezioni: PropTypes.shape({
      totale: PropTypes.number,
      andamento: PropTypes.shape({
        inCorso: PropTypes.bool,
        completata: PropTypes.bool,
        sbloccata: PropTypes.bool,
      }),
    }),
    unitaCompletata: PropTypes.bool,
    assegnata: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    titolo: PropTypes.string.isRequired,
    prerequisito: PropTypes.number.isRequired,
  }).isRequired,
  onUnitaContenutoFetch: PropTypes.func.isRequired,
  onUnitaAssegna: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onModalSetEmptyData: PropTypes.func.isRequired,
  onUnitaStepInizialize: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  formUnitaLezione: PropTypes.shape({
    values: PropTypes.shape({
      lezione: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  spinner: state.get('unita').toJS().spinner,
  feedback: state.get('unita').toJS().feedback,
  contenutoUnita: state.get('unita').toJS().contenuto,
  lezione: state.get('unita').toJS().lezione,
  risposta: state.get('unita').toJS().risposta,
  corsoSelezionato: state.get('corsi').toJS().corsoSelezionato,
  formUnitaLezione: state.get('form').toJS().unitaLezione,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onUnitaContenutoFetch: (id, idCorso) => {
      dispatch(unitaContenutoFetch(id, idCorso));
    },
    onUnitaAssegna: (idVersione, idCorso, idDisciplina) => {
      dispatch(unitaAssegna(idVersione, idCorso, idDisciplina));
    },
    onUnitaStepInizialize: (payload) => {
      dispatch(unitaStepInitialize(payload));
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

export default compose(
  withConnect,
)(UnitaPreviewView);
