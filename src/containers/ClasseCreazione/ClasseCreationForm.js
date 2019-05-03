/**
*
* CreazioneClasseForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { CardForm, FormElement } from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import { Button } from 'components/Button';
import LogoPlatform from 'components/LogoPlatform';
import { CLASSE_ANNUALITA } from './constants';

export class ClasseCreazioneForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  displayAndSort = /* istanbul ignore next */ (data = [], value = 'pk') => (
    data.sort((a, b) => {
      const nameA = a.nome.toUpperCase();
      const nameB = b.nome.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }).map((item, key) => (
      <option
        value={item[value]}
        key={`${item[value]}_${key + 1}`}
      >{item.nome}
      </option>
    ))
  );


  render =/* istanbul ignore next */ () => {
    const { product, display, data } = this.props;

    /*
      Selezione della scuola tra quelle associate
      al docente
    */
    const scuoleAttiveData = display === 'scuoleAttive' && ([
      <FormElement key="scuole_recenti">
        <h3>Scuole recenti</h3>
        <Field
          name="scuoleAttive"
          component="select"
          onChange={data.scuoleAttive.selectionFx}
        >
          <option value="" key="label">Nome</option>
          {this.displayAndSort(data.scuoleAttive.items)}
        </Field>
      </FormElement>,
      <FormElement key="button_cerca_altra_scuola">
        <Button
          actioncolor="action"
          full
          type="button"
          onClick={data.scuoleAttive.cercaAltraScuolaFunction}
        >
          Cerca altra scuola
        </Button>
      </FormElement>,
    ]);

    /*
      Selezione della classe tra quelle appartenenti alla scuola
      selezioanta dal docente o creazione di una nuova
    */
    const classeDocenteData = display === 'classeDocente' && ([
      <p key="titolo_classe">{data.classeDocente.titolo}</p>,
      !data.classeDocente.isCreaNuovaClasse && (
        <FormElement key="field_classe_docente">
          <Field
            name="classeDocente"
            component="select"
            onChange={data.classeDocente.selectionFx}
          >
            <option value="">Nome</option>
            {this.displayAndSort(data.classeDocente.items)}
          </Field>
        </FormElement>
      ),
      data.classeDocente.isCreaNuovaClasse && ([
        <FormElement key="creazione_nuova_classe_annualita">
          <Field
            name="nuovaClasseAnnualita"
            component="select"
            onChange={(e) => data.classeDocente.onChangeDatiClasse('annoClasse', e)}
          >{
              [
                <option value="" key="label">Anno</option>,
                ...CLASSE_ANNUALITA.map((item) => (
                  <option
                    value={item.value}
                    key={`classe_annualita_${item.pk}`}
                  >
                    {item.nome}
                  </option>
                )),
              ]
            }
          </Field>
        </FormElement>,
        <FormElement key="creazione_nuova_classe_nome">
          <Field
            name="nuovaClasseNome"
            component={renderedField}
            type="text"
            label="Nome della sezione"
            onChange={(e) => data.classeDocente.onChangeDatiClasse('nomeClasse', e)}
          />
        </FormElement>,
        data.classeDocente.isDatiNuovaClasseValid && (
          <FormElement key="field_nuova_classe">
            <Button
              actioncolor="okay"
              full
              type="button"
              onClick={data.classeDocente.creaNuovaClasseFunction}
            >
              Crea classe
            </Button>
          </FormElement>
        ),
      ]),
      !data.classeDocente.isClasseSelezionata && !data.classeDocente.isCreaNuovaClasse && (
        <FormElement key="field_nuova_nuova_classe">
          <Button
            actioncolor="action"
            full
            type="button"
            onClick={data.classeDocente.aggiungiCampoNuovaClasse}
          >
            Crea una nuova classe
          </Button>
        </FormElement>
      ),
      data.classeDocente.isClasseSelezionata && (
        <FormElement key="field_nuova_classe_selezionata">
          <Button
            actioncolor="okay"
            full
            type="button"
            onClick={data.classeDocente.creaDaClasseEsistenteFunction}
          >
            Crea classe
          </Button>
        </FormElement>
      ),
    ]);

    /**
     * Seleziona la scuola tra quelle presenti in database
     */
    const cercaAltraScuolaData = display === 'cercaAltraScuola' && ([
      <h3 key="selezione_scuola_titolo">Seleziona una scuola</h3>,
      <FormElement key="selezione_scuola_provincia">
        <Field
          name="provincia"
          component="select"
          onChange={data.cercaAltraScuola.selezionaProvincia}
        >
          <option value="" key="label">Provincia</option>
          {this.displayAndSort(
            data.cercaAltraScuola.province, 'pk', data.cercaAltraScuola.provinciaSelezionata
          )}
        </Field>
      </FormElement>,
      data.cercaAltraScuola.isProvinciaSelezionata && (
        <FormElement key="selezione_scuola_comune">
          <Field
            name="comune"
            component="select"
            onChange={data.cercaAltraScuola.selezionaComune}
          >
            <option value="" key="label">Comune</option>
            {this.displayAndSort(
              data.cercaAltraScuola.comuni
                .sort()
                .map((comune) => ({ pk: comune, nome: comune }))
            )}
          </Field>
        </FormElement>
      ),
      data.cercaAltraScuola.isComuneSelezionato && (
        <FormElement key="selezione_scuola_tipologia">
          <Field
            name="tipologia"
            component="select"
            onChange={data.cercaAltraScuola.selezionaIndirizzoDiStudio}
          >
            <option value="" key="label">Indirizzo di studio</option>
            {this.displayAndSort(data.cercaAltraScuola.indirizziDiStudio
              .map((indirizzo) => ({ pk: indirizzo, nome: indirizzo })))
            }
          </Field>
        </FormElement>
      ),
      data.cercaAltraScuola.isIndirizzoDiStudioSelezionato && (
        <FormElement key="selezione_scuola_nome">
          <Field
            name="scuola"
            component="select"
            onChange={data.cercaAltraScuola.selezionaScuola}
          >
            <option value="" key="label">Scuola</option>
            {this.displayAndSort(data.cercaAltraScuola.scuole)}
          </Field>
        </FormElement>
      ),
    ]);

    return (
      <CardForm>
        <FormElement margin="0 auto 36px">
          <LogoPlatform
            product={product}
            formLogo
          />
        </FormElement>
        <h3>Creazione nuova classe</h3>
        {scuoleAttiveData}
        {classeDocenteData}
        {cercaAltraScuolaData}
      </CardForm>
    );
  }
}

ClasseCreazioneForm.propTypes = {
  display: PropTypes.string.isRequired,
  product: PropTypes.string,
  data: PropTypes.shape({
    scuoleAttive: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          pk: PropTypes.number.isRequired,
          nome: PropTypes.string.isRequired,
        }),
      ),
      selectionFx: PropTypes.func.isRequired,
    }),
    classeDocente: PropTypes.shape({
      titolo: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          pk: PropTypes.number.isRequired,
          nome: PropTypes.string.isRequired,
        }),
      ),
      isCreaNuovaClasse: PropTypes.bool.isRequired,
      isClasseSelezionata: PropTypes.bool.isRequired,
      onChangeDatiClasse: PropTypes.func.isRequired,
      creaNuovaClasseFunction: PropTypes.func.isRequired,
      aggiungiCampoNuovaClasse: PropTypes.func.isRequired,
      creaDaClasseEsistenteFunction: PropTypes.func.isRequired,
      selectionFx: PropTypes.func.isRequired,
    }),
  }),
};

const CreazioneClasseForm = reduxForm({
  form: 'creazioneClasse',
})(ClasseCreazioneForm);

export default CreazioneClasseForm;
