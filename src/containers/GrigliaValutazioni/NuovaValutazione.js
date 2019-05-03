/**
 *
 * GrigliaValutazioniNew
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
import { FlexBox } from 'components/FlexBox';
import icon from 'icons/buttons';
import Spinner from 'components/Spinner';
import Div from 'components/Div';
import AlertBanner from 'components/AlertBanner';
import { H3 } from 'components/Heading';
import { Button, Icon } from 'components/Button';
import ContentEditable from 'components/ContentEditable';
import ButtonGroup from 'components/ButtonGroup';
import ReportGrid from 'components/ReportGrid';
import { CountBadge, CountBadgeItem } from 'components/CountBadge';

import reducer from './reducer';
import saga from './saga';
import {
  grigliaValutazioneValutabiliFetch,
  grigliaValutazioneCrea,
  grigliaValutazioneSelectionSet,
  grigliaValutazioneValutabiliSort,
  grigliaValutazioneValutabiliBloccoSet,
} from './actions';


export class GrigliaValutazioniNewView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      onGrigliaValutazioneValutabiliFetch,
      match: { params: { corsoId } },
      configuration: { product },
    } = this.props;

    const blocchiAttivi = this.calcolaBlockAttivi().map((b) => (b.name));
    onGrigliaValutazioneValutabiliFetch(parseInt(corsoId, 10), product, { blocchiAttivi });
  }

  sortData = (payloadData, sortingData) => {
    const { onGrigliaValutazioneValutabiliSort } = this.props;
    onGrigliaValutazioneValutabiliSort(payloadData, sortingData);
  }

  calcolaBlockAttivi = () => {
    const {
      selection,
      configuration: {
        theme,
        modules: {
          verificheLivello = { enabled: false },
          verificheMissione = { enabled: false },
          versioniLivello = { enabled: false },
          versioniMissione = { enabled: false },
          provaCompetenza = { enabled: false },
          registroClasse: { obiettivi } = false,
        } = {
          verificheLivello: {},
          verificheMissione: {},
          versioniLivello: {},
          versioniMissione: {},
          provaCompetenza: {},
          registroClasse: { obiettivi: false },
        },
      },
    } = this.props;

    return [
      obiettivi && {
        id: 1,
        label: (
          <div>
            <span>Obiettivi</span>
            <CountBadge>
              <CountBadgeItem bgcolor={theme.light}>{selection.obiettivi.length}</CountBadgeItem>
            </CountBadge>
          </div>
        ),
        name: 'obiettivi',
      },
      versioniLivello.enabled && {
        id: 2,
        label: (
          <div>
            <span>Versioni</span>
            <CountBadge>
              <CountBadgeItem bgcolor={theme.light}>{selection.versioniLivello.length}</CountBadgeItem>
            </CountBadge>
          </div>
        ),
        name: 'versioniLivello',
      },
      versioniMissione.enabled && {
        id: 3,
        label: (
          <div>
            <span>Versioni</span>
            <CountBadge>
              <CountBadgeItem bgcolor={theme.light}>
                {selection.versioniMissione.length}
              </CountBadgeItem>
            </CountBadge>
          </div>
        ),
        name: 'versioniMissione',
      },
      verificheLivello.enabled && {
        id: 4,
        label: (
          <div>
            <span>Verifiche</span>
            <CountBadge>
              <CountBadgeItem bgcolor={theme.light}>
                {selection.verificheLivello.length}
              </CountBadgeItem>
            </CountBadge>
          </div>
        ),
        name: 'verificheLivello',
      },
      verificheMissione.enabled && {
        id: 5,
        label: (
          <div>
            <span>Verifiche</span>
            <CountBadge>
              <CountBadgeItem bgcolor={theme.light}>
                {selection.verificheMissione.length}
              </CountBadgeItem>
            </CountBadge>
          </div>
        ),
        name: 'verificheMissione',
      },
      provaCompetenza.enabled && {
        id: 6,
        label: (
          <div>
            <span>Prove competenza</span>
            <CountBadge>
              <CountBadgeItem bgcolor={theme.light}>
                {selection.proveCompetenza.length}
              </CountBadgeItem>
            </CountBadge>
          </div>
        ),
        name: 'proveCompetenza',
      }].filter((b) => (b));
  };

  changeDisplay = (selection) => {
    const {
      onGrigliaValutazioneValutabiliBloccoSet,
      valutabili,
    } = this.props;

    onGrigliaValutazioneValutabiliBloccoSet(selection, valutabili);
  };

  selectData = (pk = undefined, titolo = undefined) => {
    const {
      display: { block: displayBlock },
      selection,
      onGrigliaValutazioneSelectionSet,
    } = this.props;

    if (pk) {
      onGrigliaValutazioneSelectionSet({
        [displayBlock]: selection[displayBlock].indexOf(pk) > -1 ?
          selection[displayBlock].filter((i) => (i !== pk)) :
          [...selection[displayBlock], pk],
      });
    } else if (titolo !== undefined) {
      onGrigliaValutazioneSelectionSet({ titolo });
    }
  }

  render() {
    const {
      display: {
        field: displayField,
        sort: displaySort,
        type: displayType,
        block: displayBlock,
      },
      match: { params: { corsoId } },
      contenuto: {
        intestazioniColonna,
        sortedData,
        nomeCorso,
      },
      selection,
      history: { push },
      onGrigliaValutazioneCrea,
      spinner,
      feedback,
      valutabili,
    } = this.props;
    const intestazioniColonnaBlocco = intestazioniColonna
      .filter((i) => (i.blocchi.indexOf(displayBlock) > -1));
    const blocchiAttivi = this.calcolaBlockAttivi().map((b) => (b.name));

    return (
      <Page>
        <TopBar
          pinned
          backNav={{
            onClickFunction: () => { push(`/classe-dettaglio/${corsoId}`); },
            enabled: true,
          }}
          title={nomeCorso}
          single
        />
        <Container>
          {spinner.default ?
            <Spinner /> : [
              <FlexBox
                margin="0 auto 20px"
                justifyContent="space-between"
                padding="0 0 10px"
                key="crea_valutazione_nome_classe"
              >
                <H3 margin="0">Nuova valutazione</H3>
                <Button
                  actioncolor="okay"
                  onClick={() => onGrigliaValutazioneCrea({
                    selection,
                    historyPush: push,
                    blocchiAttivi,
                    corsoId: parseInt(corsoId, 10),
                  })}
                  disabled={
                    blocchiAttivi.reduce((acc, item) => (acc + selection[item].length), 0) === 0 ||
                    !selection.titolo
                  }
                >
                  <Icon left {...icon.plus} />
                  Crea
                </Button>
              </FlexBox>,
              <Div key="crea_valutazione_titolo_valutazione" margin="0 auto 30px">
                <ContentEditable
                  type="text"
                  key="nuova_valutazione_titolo"
                  label="Titolo valutazione*"
                  width="100%"
                  onChangeFunction={/* istanbul ignore next */ (e) => {
                    this.selectData(
                      undefined,
                      e.target.value || ''
                    );
                  }}
                />
              </Div>,
              <FlexBox justifyContent="space-around" margin="0 auto" key="crea_valutazione_blocchi">
                {blocchiAttivi.length &&
                  <ButtonGroup
                    full
                    tabs
                    buttons={this.calcolaBlockAttivi().map((c, k) => ({
                      id: k,
                      label: c.label,
                      disabled: !valutabili[c.name].length,
                      attivo: displayBlock === c.name,
                      onClickFunction: displayBlock === c.name ? null : () => this.changeDisplay(c.name),
                    }))}
                  />}
              </FlexBox>,
              feedback.hasFeedback && (
                <AlertBanner
                  key="crea_valutazione_alertbanner"
                  actioncolor={feedback.tipologia}
                >
                  {feedback.messaggio}
                </AlertBanner>
              ),
              !feedback.hasFeedback && (
                <ReportGrid
                  key="crea_valutazione_report_grid"
                  intestazioniColonna={intestazioniColonnaBlocco}
                  sortingFunction={this.sortData}
                  righe={sortedData.map((i) => ({
                    ...i,
                    checkbox: (
                      <input
                        type="checkbox"
                        prefill={selection.titolo}
                        onChange={/* istanbul ignore next */ () => { }}
                        onClick={/* istanbul ignore next */ () => this.selectData(i.id)}
                        checked={(selection[displayBlock] || []).indexOf(i.id) > -1}
                      />
                    ),
                    checkboxSortable: (selection[displayBlock] || []).indexOf(i.id),
                  }))}
                  filtriAttivi={{
                    field: displayField,
                    sort: displaySort,
                    type: displayType,
                  }}
                />
              ),
            ]}
        </Container>
      </Page>
    );
  }
}

GrigliaValutazioniNewView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      corsoId: PropTypes.string.isRequired,
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
  display: PropTypes.shape({
    field: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    block: PropTypes.string.isRequired,
  }).isRequired,
  contenuto: PropTypes.shape({
    intestazioniColonna: PropTypes.array.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onGrigliaValutazioneValutabiliFetch: PropTypes.func.isRequired,
  onGrigliaValutazioneCrea: PropTypes.func.isRequired,
  onGrigliaValutazioneValutabiliBloccoSet: PropTypes.func.isRequired,
  onGrigliaValutazioneSelectionSet: PropTypes.func.isRequired,
  onGrigliaValutazioneValutabiliSort: PropTypes.func.isRequired,
  selection: PropTypes.shape({
    obiettivi: PropTypes.array.isRequired,
    versioniLivello: PropTypes.array.isRequired,
    versioniMissione: PropTypes.array.isRequired,
    verificheLivello: PropTypes.array.isRequired,
    verificheMissione: PropTypes.array.isRequired,
    proveCompetenza: PropTypes.array.isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
    theme: PropTypes.shape({
      light: PropTypes.string.isRequired,
    }).isRequired,
    modules: PropTypes.object,
  }).isRequired,
  valutabili: PropTypes.object.isRequired,
};

export const mapStateToProps = (state) => ({
  spinner: state.get('grigliaValutazioni').toJS().spinner,
  feedback: state.get('grigliaValutazioni').toJS().feedback,
  display: state.get('grigliaValutazioni').toJS().display,
  contenuto: state.get('grigliaValutazioni').toJS().contenuto,
  valutabili: state.get('grigliaValutazioni').toJS().valutabili,
  selection: state.get('grigliaValutazioni').toJS().selection,
  configuration: state.get('configuration').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGrigliaValutazioneValutabiliFetch: (corso, progetto, payload) => {
      dispatch(grigliaValutazioneValutabiliFetch(corso, progetto, payload));
    },
    onGrigliaValutazioneCrea: (payload) => {
      dispatch(grigliaValutazioneCrea(payload));
    },
    onGrigliaValutazioneValutabiliBloccoSet: (blocco, valutabili) => {
      dispatch(grigliaValutazioneValutabiliBloccoSet(blocco, valutabili));
    },
    onGrigliaValutazioneSelectionSet: (payload) => {
      dispatch(grigliaValutazioneSelectionSet(payload));
    },
    onGrigliaValutazioneValutabiliSort: (payloadData, sortingData) => {
      dispatch(grigliaValutazioneValutabiliSort(payloadData, sortingData));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'grigliaValutazioni', reducer });
const withSaga = injectSaga({ key: 'grigliaValutazioni', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GrigliaValutazioniNewView);
