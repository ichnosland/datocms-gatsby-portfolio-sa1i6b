/*
 *
 * CreaVerificaModifica
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled, { css } from 'styled-components';

import media from 'style/mediainjector';
import TopBar from 'components/TopBar';
import Page from 'components/Page';
import Container from 'components/Container';
import { H2 } from 'components/Heading';
import { googleAnalyticsWrapper } from 'common/utils';
import Div from 'components/Div';
import { MYTEST_PRODUCTS } from 'configuration';
import CreaVerificheList from 'components/CreaVerificheList';
import { Button, Icon } from 'components/Button';
import { Buttons } from 'icons/buttons';
import FlexBox, { FlexChild } from 'components/FlexBox';
import { modalSetData } from 'containers/ModalBox/actions';
import {
  creaverificheVerificaEsercizioRemove,
  creaverificheVerificaSet,
} from 'containers/CreaVerifiche/actions';
import CreaVerificaForm from './CreaVerificaForm';

export const FlexChildRow = styled(FlexChild)`
  width: 100%;
  border-bottom: 1px solid rgb(164, 164, 164);
  justify-content: flex-start;
  span {
    font-weight: 600;
  }
`;

const Pagina = styled(Page)`
  position: relative;
  ${media.print`
    padding: 20px;
  `}
`;

const marginIntestazione = css`
  0 0 60px 0;
  ${media.lt667`
    margin: 0 0 40px 0;
  `}
`;

const paddingIntestazione = css`
  0 0 40px 0;
  ${media.lt667`
    padding: 0 0 20px 0;
  `}
  ${media.print`
    padding: 0 0 40px 0;
  `}
`;

export const FlexContainer = styled(FlexBox)`
  padding: 20px;
`;

export class CreaVerificaModificaView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      openedSolutions: {},
      numerazioneStep: {},
      editItemKey: '',
      editorConsegnaHTML: '',
      editorSoluzioneHTML: '',
      anteprimaDiStampa: {
        eserciziSelezionati: [],
        verificheCreate: [],
        key: -1,
        titolo: '',
        note: '',
      },
    };
    this.submitForm = this.submitForm.bind(this);
    this.tornaAlRiepilogo = this.tornaAlRiepilogo.bind(this);
    this.toggleAllSolutions = this.toggleAllSolutions.bind(this);
    this.toggleModificaTestoStep = this.toggleModificaTestoStep.bind(this);
    this.saveModifiedItem = this.saveModifiedItem.bind(this);
    this.svuotaEsercizi = this.svuotaEsercizi.bind(this);
  }

  onEditStep = (editorState, field) => (
    this.setState({
      [field]: editorState.editor.getData(),
    })
  );

  saveModifiedItem() {
    const { verifica, setVerificaData } = this.props;
    const { editorConsegnaHTML, editorSoluzioneHTML, editItemKey } = this.state;
    const htmlConsegna = editorConsegnaHTML;
    const htmlSoluzione = editorSoluzioneHTML;
    const dataVerifiche = {
      eserciziSelezionati: [...verifica.eserciziSelezionati.map(
        (esercizio) => (esercizio.key === editItemKey) ? {
          ...esercizio,
          consegnaHTML: `<div class="consegna">${htmlConsegna}</div>`,
          soluzioneTestuale: htmlSoluzione,
        } :
          esercizio
      )],
    };

    setVerificaData(dataVerifiche);
    this.setState({
      editItemKey: '',
    });
  }

  toggleModificaTestoStep = (step) => {
    const { editItemKey, openedSolutions } = this.state;

    this.setState({
      openedSolutions: {
        ...openedSolutions,
        [step.key]: true,
      },
      editItemKey: (step.key === editItemKey) ? '' : step.key,
      editorConsegnaHTML: (step.key === editItemKey) ?
        '' :
        step.consegnaHTML,
      editorSoluzioneHTML: (step.key === editItemKey) ?
        '' :
        step.soluzioneTestuale,
    });
  }

  tornaAlRiepilogo() {
    const {
      setVerificaData,
      verifica,
      history,
      match = { params: undefined },
    } = this.props;

    if (verifica.anteprimaStampa) {
      setVerificaData({
        anteprimaStampa: false,
        eserciziSelezionati: [],
        titolo: '',
        note: '',
        key: -1,
      });
    }

    if ((match.params || {}).key > -1) {
      history.goBack();
    } else {
      history.push('/');
    }
  }

  sortStepByNumber(steps, numerazioneStep) {
    return steps.map((step, indice) => ({
      indice,
      position: numerazioneStep[step.key] || indice + 1,
    }))
      .sort((a, b) => a.position - b.position)
      .map((sortedItem) => steps[sortedItem.indice]);
  }

  submitForm = (e) => {
    e.preventDefault();
    const {
      verificaCreazioneFormData,
      setVerificaData,
      verifica,
      onModalSetData,
      configuration,
    } = this.props;
    const datiInviati = verificaCreazioneFormData.get('values').toJS();
    if (!datiInviati.titolo) {
      onModalSetData({
        titolo: 'Completa i campi obbligatori',
        contenuto: 'Non è stato specificato un titolo',
        closeButton: {
          text: 'Ok',
        },
        show: true,
      });
      return false;
    }
    const key = verifica.key > -1 ? verifica.key : verifica.verificheCreate.length;
    const date = new Date();

    const verificaDaAggiungere = {
      titolo: datiInviati.titolo,
      note: datiInviati.note,
      eserciziSelezionati: this.sortStepByNumber(
        verifica.eserciziSelezionati,
        this.state.numerazioneStep
      ),
      key,
      dataUltimaModifica: date,
    };

    const dataVerifiche = {
      verificheCreate: [
        ...verifica.verificheCreate.filter((ver) => (ver.key !== verifica.key)),
        verificaDaAggiungere,
      ],
      eserciziSelezionati: [],
      titolo: '',
      note: '',
      anteprimaStampa: true,
      key: -1,
    };

    setVerificaData(dataVerifiche);
    this.setState({
      anteprimaDiStampa: verificaDaAggiungere,
      openedSolutions: {},
      numerazioneStep: {},
    });

    googleAnalyticsWrapper('event', {
      category: 'Salvataggio verifica',
      action: `Salvataggio verifica ${configuration.title}`,
    });
    return true;
  }

  toggleAllSolutions = (keys, value) => {
    const vals = {
      openedSolutions: {
        ...keys.reduce(
          (acc, key) => {
            acc[key] = value;
            return acc;
          }, {}
        ),
      },
    };
    this.setState(vals);
  }

  stampaContenuto = () => {
    const { configuration } = this.props;
    googleAnalyticsWrapper('event', {
      category: 'Stampa verifica',
      action: `Stampa verifica ${configuration.title}`,
    });
    window.print();
  }

  toggleSoluzione = (key) => {
    this.setState({
      openedSolutions: {
        ...this.state.openedSolutions,
        [key]: !this.state.openedSolutions[key],
      },
    });
  }

  svuotaEsercizi = () => {
    const { setVerificaData } = this.props;
    setVerificaData({
      eserciziSelezionati: [],
    });
  }

  cambiaNumerazioneStep = (e, key) => {
    this.setState({
      numerazioneStep: {
        ...this.state.numerazioneStep,
        [key]: parseInt(e.target.value, 10),
      },
    });
  }

  render = () => {
    const {
      verifica,
      removeEsercizio,
      configuration,
    } = this.props;
    const { editItemKey, numerazioneStep } = this.state;
    const { anteprimaDiStampa, openedSolutions } = this.state;
    const verificaDaMostrare = verifica.anteprimaStampa ? anteprimaDiStampa : verifica;
    const topBarProps = {
      noShadow: true,
      pinned: true,
    };
    const openedSolutionsKeys = Object.keys(openedSolutions).filter((key) => openedSolutions[key]);

    topBarProps.backNav = {
      onClickFunction: this.tornaAlRiepilogo,
      enabled: true,
    };

    return (
      <Pagina>
        <TopBar
          {...topBarProps}
        />
        <Container>
          <Div>
            {!verifica.anteprimaStampa ? <CreaVerificaForm
              aggiungiEserciziFunction={
                () => this.props.history.push('/')
              }
              itemCount={verificaDaMostrare.eserciziSelezionati.length.toString()}
              handleSubmit={(e) => this.submitForm(e)}
              saveDisabled={verificaDaMostrare.eserciziSelezionati.length === 0}
              initialValues={{ note: verificaDaMostrare.note, titolo: verificaDaMostrare.titolo }}
              svuotaEserciziFunction={this.svuotaEsercizi}
            /> : (
              <div>
                {openedSolutionsKeys.length === 0 && (
                  <Div margin={marginIntestazione}>
                    <FlexBox padding={paddingIntestazione}>
                      <FlexChildRow><span>Studente</span></FlexChildRow>
                    </FlexBox>
                    <FlexBox>
                      <FlexChildRow><span>Classe</span></FlexChildRow>
                      <FlexChildRow><span>Data</span></FlexChildRow>
                      <FlexChildRow><span>Valutazione</span></FlexChildRow>
                    </FlexBox>
                  </Div>
                )}
                <H2>{verificaDaMostrare.titolo}</H2>
                {verificaDaMostrare.note && <p>{verificaDaMostrare.note}</p>}
                <FlexContainer justifyContent="space-between" noPrint>
                  <Button
                    actioncolor="help"
                    onClick={() => this.toggleAllSolutions(
                      verificaDaMostrare.eserciziSelezionati.map((step) => (step.key)),
                      !(openedSolutionsKeys.length > 0),
                    )}
                  >
                    <Icon {...(openedSolutionsKeys.length > 0 ? Buttons.hide : Buttons.eye)} fill="#fff" left /> Soluzioni
                  </Button>
                  <Button
                    actioncolor="okay"
                    onClick={() => this.stampaContenuto()}
                  >
                    <Icon {...Buttons.print} fill="#fff" left /> Stampa
                  </Button>
                </FlexContainer>
              </div>
            )}
            <CreaVerificheList
              itemsList={
                verificaDaMostrare.eserciziSelezionati.map((step, keyStep) => ({
                  key: `step_panel_${step.key}`,
                  elementi: [{
                    id: `step_titolo_${step.key}`,
                    nome: step.titoloLivello || step.titoloUnita ?
                      `${[step.titoloLivello || '', step.titoloUnita || ''].filter(
                        (item) => (item)
                      ).join(' - ')}` :
                      '',
                    text: `<div class="${[
                      configuration.product,
                      MYTEST_PRODUCTS.indexOf(configuration.product) > -1 ? 'mytest' : '',
                    ].join(' ')}">${
                      verifica.anteprimaStampa ? `<span class="numero-esercizio">${keyStep + 1}</span>` : ''
                    }${step.consegnaHTML}</div>`,
                    editor: {
                      show: (editItemKey === step.key),
                      onChangeConsegna: (state) => this.onEditStep(state, 'editorConsegnaHTML'),
                      onChangeSoluzione: (state) => this.onEditStep(state, 'editorSoluzioneHTML'),
                      editorConsegnaHTML: this.state.editorConsegnaHTML,
                      editorSoluzioneHTML: this.state.editorSoluzioneHTML,
                      config: {
                        allowedContent: true,
                        toolbar: 'Basic',
                        toolbar_Basic: [
                          ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo', 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList'],
                        ],
                      },
                    },
                    options: [!verifica.anteprimaStampa && {
                      tipo: 'contenteditable',
                      key: `contenteditable_${step.key}`,
                      content: (numerazioneStep[step.key] || (keyStep + 1)).toString(),
                      onChangeFunction: (e) => this.cambiaNumerazioneStep(e, step.key),
                      mustBeNumeric: true,
                      label: '#',
                    }],
                    isHtml: true,
                    hasLatex: configuration.hasLatex || false,
                    solution: openedSolutions[step.key] ? step.soluzioneTestuale : '',
                    noPrint: verifica.anteprimaStampa,
                  }],
                  pulsanti: !verifica.anteprimaStampa ? [{
                    id: `step_button_vedi_${step.key}`,
                    label: 'Soluzione',
                    icona: openedSolutions[step.key] ? 'hide' : 'eye',
                    onClickFunction: () => this.toggleSoluzione(step.key),
                    mostra: editItemKey !== step.key,
                  }, {
                    id: `step_button_modifica_${step.key}`,
                    label: (editItemKey === step.key) ? 'Annulla' : 'Modifica',
                    icona: (editItemKey === step.key) ? 'cancel' : 'edit',
                    onClickFunction: () => this.toggleModificaTestoStep(step),
                    mostra: step.tipo !== 'G',
                    hideOnMobile: true,
                  }, {
                    id: `step_button_salva_${step.key}`,
                    label: 'Salva',
                    icona: 'check',
                    onClickFunction: this.saveModifiedItem,
                    mostra: editItemKey === step.key,
                  }, {
                    id: `step_button_edit_${step.key}`,
                    label: 'Rimuovi',
                    icona: 'minus',
                    onClickFunction: () => removeEsercizio(step),
                    mostra: editItemKey !== step.key,
                  }].filter((pulsante) => (pulsante.mostra)) : [],
                }))
              }
            />
          </Div>
        </Container>
      </Pagina>
    );
  }
}

CreaVerificaModificaView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      key: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  verifica: PropTypes.shape({
    eserciziSelezionati: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        idEsercizio: PropTypes.number.isRequired,
        idsElementi: PropTypes.array.isRequired,
      })
    ).isRequired,
    titolo: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    anteprimaStampa: PropTypes.bool.isRequired,
  }).isRequired,
  verificaCreazioneFormData: PropTypes.object,
  setVerificaData: PropTypes.func.isRequired,
  removeEsercizio: PropTypes.func.isRequired,
  configuration: PropTypes.object.isRequired,
  onModalSetData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  verifica: state.get('CreaVerifiche').toJS().verifica,
  verificaCreazioneFormData: state.get('form').get('creaVerifica'),
});

const mapDispatchToProps = (dispatch) => ({
  setVerificaData: (payload) => {
    dispatch(creaverificheVerificaSet(payload));
  },
  removeEsercizio: (step) => {
    dispatch(creaverificheVerificaEsercizioRemove(step));
  },
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
});

const CreaVerificaModificaConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const CreaVerificheModificaComposed = compose(
  CreaVerificaModificaConnect
)(CreaVerificaModificaView);

export default CreaVerificheModificaComposed;
