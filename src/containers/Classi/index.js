/**
 *
 * Classi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Div from 'components/Div';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { singleFieldRequired } from 'common/forms';
import InputField from 'components/FormElements/Field';
import SelectField from 'components/FormElements/SelectField';
import { Button, Icon } from 'components/Button';
import LandingForm from 'components/LandingForm';
import BtnIcn from 'icons/buttons';
import { modalSetData } from 'containers/ModalBox/actions';
import { ListLink, ListItemText, ListPanelHeader } from 'components/NewListPanels';
import ZendeskTicket from 'containers/ZendeskTicket';
import ListSideBox from 'components/NewListPanels/ListSideBox';
import classiReducer from 'containers/Classi/reducer';
import { classiWatch } from 'containers/Classi/saga';
import { classiDataFetch, classiDataReset } from './actions';

export class ClassiView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onDataFetch, configuration } = this.props;
    onDataFetch(configuration.disciplinaId);
  }

  componentWillUnmount() {
    const { onClassiDataReset } = this.props;
    onClassiDataReset();
  }

  render() {
    const { classi, history, configuration, onModalSetData } = this.props;

    return (
      <Div>
        <TopBar
          pinned
          backNav={{
            onClickFunction: () => {
              history.push(configuration.homePage);
            },
            enabled: true,
          }}
          title="Classi"
          single
        />
        {classi.spinner ?
          <Container padding="64px 20px 30px">
            <Spinner />
          </Container> :
          <Container padding="64px 20px 30px">
            {!classi.error.hasErrors ? (
              <div>
                {classi.classiData.map((scuola) => (
                  <div key={scuola.pk}>
                    <ListPanelHeader>{scuola.nome}</ListPanelHeader>
                    {scuola.corsi.map((corso) => (
                      <ListLink key={corso.pk} to={`/classe-dettaglio/${corso.pk}`}>
                        <ListItemText>{corso.nome}</ListItemText>
                        <ListSideBox studenti={corso.applied || 0} />
                      </ListLink>
                    ))}
                  </div>
                ))}
                {classi.classiData.length === 0 && (
                  <AlertBanner actioncolor="error">Non sono presenti classi</AlertBanner>
                )}
                <Div align="center" margin="42px auto 0">
                  <Button
                    onClick={() => onModalSetData({
                      contenuto: (
                        <ZendeskTicket
                          ticketData={{
                            provenienza: 'classi',
                            tipologia: 'comunicazione',
                            titolo: 'Classi: richiesta creazione nuova classe',
                          }}
                          formConfiguration={{
                            component: LandingForm,
                            props: {
                              alatin: false,
                              privacy: false,
                              formtitle: 'Richiesta creazione classe',
                              formFields: [{
                                id: 'scuola',
                                type: 'text',
                                name: 'scuola',
                                label: 'Scuola*',
                                landing: true,
                                validate: [singleFieldRequired],
                                component: InputField,
                              }, {
                                id: 'citta',
                                type: 'text',
                                name: 'citta',
                                label: 'Città*',
                                landing: true,
                                validate: [singleFieldRequired],
                                component: InputField,
                              }, {
                                id: 'indirizzoDiStudio',
                                type: 'select',
                                name: 'indirizzoDiStudio',
                                label: 'Indirizzo di studio*',
                                validate: [singleFieldRequired],
                                opts: [{
                                  label: 'Indirizzo di studio*',
                                  id: 'seleziona_corso',
                                  value: '',
                                }, {
                                  label: 'Liceo classico',
                                  id: 'classico',
                                  value: 'classico',
                                }, {
                                  label: 'Liceo scientifico',
                                  id: 'scientifico',
                                  value: 'scientifico',
                                }, {
                                  label: 'Liceo linguistico',
                                  id: 'linguistico',
                                  value: 'linguistico',
                                }, {
                                  label: 'Liceo scienze umane',
                                  id: 'scienze_umane',
                                  value: 'scienze_umane',
                                }, {
                                  label: 'Scuola media',
                                  id: 'scuola_media',
                                  value: 'scuola_media',
                                }, {
                                  label: 'Altro',
                                  id: 'altro',
                                  value: 'altro',
                                }],
                                component: SelectField,
                                margin: '0 0 12px',
                              }, {
                                id: 'classeSezione',
                                type: 'text',
                                name: 'classeSezione',
                                label: 'Classe e sezione*',
                                landing: true,
                                validate: [singleFieldRequired],
                                component: InputField,
                              }],
                            },
                          }}
                        />
                      ),
                      show: true,
                      disableClose: true,
                      isPopup: false,
                      formBox: true,
                      maxWidth: '480px',
                    })}
                  >
                    <Icon {...BtnIcn.plus} left />Richiedi una classe
                  </Button>
                </Div>
              </div>
            ) : <AlertBanner actioncolor="error">{classi.error.errorMessage}</AlertBanner>}
          </Container>}
      </Div>
    );
  }
}

ClassiView.propTypes = {
  classi: PropTypes.shape({
    spinner: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      hasErrors: PropTypes.bool.isRequired,
      errorMessage: PropTypes.string.isRequired,
    }),
    classiData: PropTypes.arrayOf(PropTypes.shape({
      nome: PropTypes.string.isRequired,
      pk: PropTypes.number.isRequired,
      corsi: PropTypes.arrayOf(PropTypes.shape({
        nome: PropTypes.string.isRequired,
        applied: PropTypes.number,
        pk: PropTypes.number.isRequired,
      })),
    })).isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  onDataFetch: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onClassiDataReset: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  classi: state.get('classiDocente').toJS(),
  configuration: state.get('configuration').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDataFetch: (filtro) => {
      dispatch(classiDataFetch(filtro));
    },
    onClassiDataReset: () => {
      dispatch(classiDataReset());
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withClassiReducer = injectReducer({ key: 'classiDocente', reducer: classiReducer });
const withClassiSaga = injectSaga({ key: 'classiDocente', saga: classiWatch });

export default compose(
  withClassiReducer,
  withClassiSaga,
  withConnect,
)(ClassiView);
