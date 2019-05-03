/*
 *
 * ClasseCreazione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from 'redux-form/immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Section from 'components/Section';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import ButtonGroup from 'components/ButtonGroup';
import { FormSection } from 'components/FormElements';
import ClasseCreationForm from './ClasseCreationForm';
import reducer from './reducer';
import { watchClasseCreazione } from './saga';
import {
  classeCreazioneReset,
  classeCreazioneScuoleAttiveFetch,
  classeCreazioneDataSet,
  classeCreazioneDataPost,
  classeCreazioneGeoProvinciaFetch,
  classeCreazioneGeoComuneFetch,
  classeCreazioneScuoleAttiveSet,
} from './actions';

export class ClasseCreazioneView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = /* istanbul ignore next */ () => {
    const { scuoleAttive, onClasseCreazioneScuoleAttiveFetch } = this.props;

    if (!scuoleAttive.isLoaded) {
      onClasseCreazioneScuoleAttiveFetch();
    }
  }

  render() /* istanbul ignore next */ {
    const {
      configuration,
      spinner,
      feedback,
      data,
      history,
      onResetForm,
      onClasseCreazioneReset,
      onClasseCreazioneDataSet,
      onClasseCreazioneDataPost,
      onClasseCreazioneGeoFetch,
      onClasseCreazioneGeoComuneFetch,
      onClasseCreazioneScuoleAttiveSet,
      scuoleAttive,
      geo,
    } = this.props;

    const dataForm = {
      /**
       * Opzioni per la selezione della scuola del docente
       * o per la creazione di una nuova selezione
       */
      scuoleAttive: {
        items: scuoleAttive.list,
        selectionFx: (e) => {
          if (e.target.value) {
            onClasseCreazioneDataSet({
              scuolaSelezionata: scuoleAttive.list.filter(
                (item) => item.pk === parseInt(e.target.value, 10)
              )[0] || {},
              display: 'classeDocente',
            });
          }
        },
        cercaAltraScuolaFunction: () => {
          if (!geo.isProvinceLoaded) {
            onClasseCreazioneGeoFetch();
          }
          onClasseCreazioneDataSet({
            display: 'cercaAltraScuola',
          });
        },
      },

      /**
       * Opzioni per la selezione di una classe associata
       * a una delle scuole del docente o per crearne una
       * nuova
       */
      classeDocente: {
        items: (data.scuolaSelezionata || {}).classi || [],
        titolo: (data.scuolaSelezionata || {}).nome || '',
        isClasseSelezionata: data.classeSelezionata > 0,
        isCreaNuovaClasse: data.creaNuovaClasse,
        isDatiNuovaClasseValid: data.annoClasse && data.nomeClasse,
        onChangeDatiClasse: (type, e) => {
          onClasseCreazioneDataSet({
            [type]: e.target.value,
          });
        },
        creaNuovaClasseFunction: () => {
          onClasseCreazioneDataPost({
            anno: parseInt(data.annoClasse, 10),
            nome: data.nomeClasse,
            disciplina: configuration.disciplinaId,
            nuova: true,
            pk: 0,
            scuola: data.scuolaSelezionata.pk,
          }, history);
        },
        aggiungiCampoNuovaClasse: () => {
          onClasseCreazioneDataSet({
            creaNuovaClasse: true,
          });
        },
        creaDaClasseEsistenteFunction: () => {
          onClasseCreazioneDataPost({
            anno: '',
            nome: '',
            disciplina: configuration.disciplinaId,
            nuova: false,
            pk: data.classeSelezionata,
            scuola: data.scuolaSelezionata.pk,
          }, history);
        },
        selectionFx: (e) => {
          onClasseCreazioneDataSet({
            classeSelezionata: e.target.value ? parseInt(e.target.value, 10) : undefined,
          });
        },
      },

      /**
       * Opzioni per la selezione di una nuova scuola
       */
      cercaAltraScuola: {
        province: geo.province,
        comuni: geo.comuni[data.provinciaSelezionata] || [],
        scuole: (
          ((geo.scuole[data.provinciaSelezionata] || {})[data.comuneSelezionato] || {})[data.indirizzoDiStudioSelezionato]
        ) || [],
        indirizziDiStudio: geo.indirizziDiStudio,
        isProvinciaSelezionata: !!data.provinciaSelezionata,
        isComuneSelezionato: !!data.comuneSelezionato,
        isIndirizzoDiStudioSelezionato: !!data.indirizzoDiStudioSelezionato,
        isScuolaSelezionata: !!data.scuolaSelezionata,
        selezionaProvincia: (e) => {
          if (e.target.value) {
            onClasseCreazioneDataSet({
              provinciaSelezionata: e.target.value,
            });
            if (!geo.comuni[e.target.value]) {
              onClasseCreazioneGeoComuneFetch(e.target.value);
            }
          }
        },
        selezionaComune: (e) => {
          if (e.target.value) {
            onClasseCreazioneDataSet({
              comuneSelezionato: e.target.value,
            });
          }
        },
        selezionaIndirizzoDiStudio: (e) => {
          if (e.target.value) {
            onClasseCreazioneDataSet({
              indirizzoDiStudioSelezionato: e.target.value,
            });
          }
        },
        selezionaScuola: (e) => {
          if (e.target.value) {
            const pk = parseInt(e.target.value, 10);
            const scuoleComune = (geo.scuole[data.provinciaSelezionata] || {})[data.comuneSelezionato] || {};
            const scuolaSelezionata = (scuoleComune[data.indirizzoDiStudioSelezionato] || [])
              .filter((scuola) => (scuola.pk === pk))[0];
            onClasseCreazioneScuoleAttiveSet({
              list: scuoleComune[data.indirizzoDiStudioSelezionato] || [],
              isLoaded: true,
            });
            onClasseCreazioneDataSet({
              scuolaSelezionata,
              display: 'classeDocente',
            });
          }
        },
      },
    };

    return (
      <div>
        {feedback.hasFeedback && (
          <Section full>
            <AlertBanner
              text={feedback.messaggio}
              actioncolor={feedback.tipologia}
            >
              {feedback.errorMessage}
            </AlertBanner>
          </Section>
        )}
        <FormSection paddingmobile="20px">
          <ClasseCreationForm
            handleSubmit={this.onSubmit}
            product={configuration.product}
            display={data.display}
            data={dataForm}
          />
          <ButtonGroup
            buttons={[{
              id: 1,
              label: 'Cancella',
              actioncolor: 'action',
              onClickFunction: () => {
                onClasseCreazioneReset();
                onResetForm();
              },
            }, {
              id: 2,
              label: 'Esci',
              onClickFunction: () => history.push(configuration.homePage),
            }]}
          />
          {spinner && <Spinner />}
        </FormSection>
      </div>
    );
  }
}

ClasseCreazioneView.propTypes = {
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
  }).isRequired,
  spinner: PropTypes.bool.isRequired,
  feedback: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  scuoleAttive: PropTypes.shape({
    list: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
  }).isRequired,
  onClasseCreazioneReset: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  onClasseCreazioneDataSet: PropTypes.func.isRequired,
  onClasseCreazioneDataPost: PropTypes.func.isRequired,
  onClasseCreazioneGeoFetch: PropTypes.func.isRequired,
  onClasseCreazioneGeoComuneFetch: PropTypes.func.isRequired,
  onClasseCreazioneScuoleAttiveFetch: PropTypes.func.isRequired,
  onClasseCreazioneScuoleAttiveSet: PropTypes.func.isRequired,
  geo: PropTypes.shape({
    province: PropTypes.array.isRequired,
    isProvinceLoaded: PropTypes.bool.isRequired,
    comuni: PropTypes.object.isRequired,
    scuole: PropTypes.object.isRequired,
    indirizziDiStudio: PropTypes.array.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    display: PropTypes.string.isRequired,
    classeSelezionata: PropTypes.number,
    creaNuovaClasse: PropTypes.bool.isRequired,
    scuolaSelezionata: PropTypes.shape({
      pk: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      classi: PropTypes.array.isRequired,
    }),
    provinciaSelezionata: PropTypes.string,
    comuneSelezionato: PropTypes.string,
    indirizzoDiStudioSelezionato: PropTypes.string,
    annoClasse: PropTypes.string,
    nomeClasse: PropTypes.string,
    pk: PropTypes.number,
    nuova: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = /* istanbul ignore next */ (dispatch) => ({
  onResetForm: () => {
    dispatch(reset('creazioneClasse'));
  },
  onClasseCreazioneReset: () => {
    dispatch(classeCreazioneReset());
  },
  onClasseCreazioneScuoleAttiveFetch: () => {
    dispatch(classeCreazioneScuoleAttiveFetch());
  },
  onClasseCreazioneDataSet: (payload) => {
    dispatch(classeCreazioneDataSet(payload));
  },
  onClasseCreazioneDataPost: (payload, history) => {
    dispatch(classeCreazioneDataPost(payload, history));
  },
  onClasseCreazioneGeoFetch: () => {
    dispatch(classeCreazioneGeoProvinciaFetch());
  },
  onClasseCreazioneGeoComuneFetch: (sigla) => {
    dispatch(classeCreazioneGeoComuneFetch(sigla));
  },
  onClasseCreazioneScuoleAttiveSet: (payload) => {
    dispatch(classeCreazioneScuoleAttiveSet(payload));
  },
});

const mapStateToProps = /* istanbul ignore next */ (state) => ({
  configuration: state.get('configuration').toJS(),
  spinner: state.get('classeCreazione').toJS().spinner,
  data: state.get('classeCreazione').toJS().data,
  feedback: state.get('classeCreazione').toJS().feedback,
  scuoleAttive: state.get('classeCreazione').toJS().scuoleAttive,
  geo: state.get('classeCreazione').toJS().geo,
  formRegistrationData: state.get('form').toJS().registration,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'classeCreazione', reducer });
const withSaga = injectSaga({ key: 'classeCreazione', saga: watchClasseCreazione });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClasseCreazioneView);
