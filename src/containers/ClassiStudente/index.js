/**
 *
 * ClassiStudente
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm, reset } from 'redux-form/immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import { H2 } from 'components/Heading';
import { CardForm, FormElement } from 'components/FormElements';
import renderedField from 'components/FormElements/Field';
import AlertBanner from 'components/AlertBanner';
import { Button } from 'components/Button';
import { BrandTxt } from 'components/Text';
import P from 'components/Paragraph';

import reducer from './reducer';
import { watchClassiStudente } from './saga';
import { classiStudenteFetch, classiStudenteIscrivitiPost } from './actions';


export const required = (value) => value ? undefined : 'Campo obbligatorio';
export const validate = (values) => {
  const errors = {};
  const re = new RegExp('[0-9]+$');

  if (!values.get('codice')) {
    errors.codice = 'Campo obbligatorio';
  } else if (!values.get('codice').match(re)) {
    errors.codice = 'Inserire un codice corretto';
  }

  return errors;
};


export class ClassiStudenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onClassiStudenteFetch, configuration, userAuthentication, history } = this.props;
    if (userAuthentication.codiceDaSbloccare) {
      history.push(configuration.homePage);
    } else {
      onClassiStudenteFetch(configuration.disciplinaId);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onClassiStudentePost, formIscrizioneData, onResetForm, configuration } = this.props;

    onClassiStudentePost(formIscrizioneData.values.codice, configuration);
    onResetForm();
  };

  render() {
    const { configuration, spinner, feedback, list, formIscrizioneData } = this.props;

    return (
      <Page>
        <TopBar
          backNav={{
            url: configuration.homePage,
            enabled: true,
          }}
          pinned
          title="Classi"
          single
        />
        <Container>
          {spinner ? <Spinner /> : (
            <CardForm onSubmit={this.handleSubmit}>
              <H2>Associa classe</H2>
              <P>Inserisci il codice per associarti ad una classe</P>
              {feedback.hasFeedback && feedback.messaggio && (
                <AlertBanner
                  text={feedback.messaggio}
                  actioncolor={feedback.tipologia}
                >
                  {feedback.messaggio}
                </AlertBanner>)
              }
              <FormElement>
                <Field
                  name="codice"
                  component={renderedField}
                  type="text"
                  label="codice"
                  validate={[required]}
                  align="center"
                />
              </FormElement>
              <FormElement>
                <Button
                  actioncolor="okay"
                  full
                  disabled={(formIscrizioneData || /* istanbul ignore next */ {}).syncErrors}
                >Salva
                </Button>
              </FormElement>
              <P margin="40px auto 20px"><BrandTxt><strong>Classi a cui sei iscritto</strong></BrandTxt></P>
              {list.length ? (
                <div>{list.map((corso) => (<P key={`corso_${corso.pk}`}>{corso.nome}</P>))}</div>
              ) :
                (
                  <AlertBanner
                    actioncolor="help"
                  >
                    Non sei iscritto a classi
                  </AlertBanner>
                )}
            </CardForm>
          )
          }
        </Container>
      </Page>
    );
  }
}

ClassiStudenteView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    messaggio: PropTypes.string.isRequired,
    tipologia: PropTypes.string.isRequired,
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
  })).isRequired,
  configuration: PropTypes.shape({
    disciplinaId: PropTypes.number.isRequired,
    homePage: PropTypes.string.isRequired,
  }).isRequired,
  onClassiStudenteFetch: PropTypes.func.isRequired,
  onClassiStudentePost: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  formIscrizioneData: PropTypes.object,
  userAuthentication: PropTypes.shape({
    codiceDaSbloccare: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = (state) => ({
  list: state.get('classiStudente').toJS().list,
  feedback: state.get('classiStudente').toJS().feedback,
  spinner: state.get('classiStudente').toJS().spinner,
  configuration: state.get('configuration').toJS(),
  formIscrizioneData: state.get('form').toJS().iscrizioneClasse,
  userAuthentication: state.get('user').toJS().authentication,
});

function mapDispatchToProps(dispatch) {
  return {
    onClassiStudenteFetch: (disciplinaId) => {
      dispatch(classiStudenteFetch(disciplinaId));
    },
    onClassiStudentePost: (codiceCorso, configuration) => {
      dispatch(classiStudenteIscrivitiPost(codiceCorso, configuration));
    },
    onResetForm: () => {
      dispatch(reset('sbloccaCodice'));
    },
  };
}

const ClassiStudente = reduxForm({
  form: 'iscrizioneClasse',
  validate,
})(ClassiStudenteView);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'classiStudente', reducer });
const withSaga = injectSaga({ key: 'classiStudente', saga: watchClassiStudente });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClassiStudente);
