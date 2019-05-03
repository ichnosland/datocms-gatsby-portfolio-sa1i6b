/*
 *
 * CreaVerifichePronteView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Div from 'components/Div';
import EmptyBox from 'components/EmptyBox';
import CreaVerificheList from 'components/CreaVerificheList';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import creaVerificheReducer from 'containers/CreaVerifiche/reducer';
import { creaverificheVerificaSet } from 'containers/CreaVerifiche/actions';
import watchVerifichePronte from './saga';
import creaVerifichePronteReducer from './reducer';
import {
  creaverificheVerifichePronteFetch,
  creaverificheVerifichePronteEserciziFetch,
} from './actions';

export class CreaVerifichePronteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.tornaAllaDashboard = this.tornaAllaDashboard.bind(this);
  }

  componentDidMount() {
    const { configuration, fetchVerifichePronteData } = this.props;
    fetchVerifichePronteData(configuration.disciplinaId);
  }

  componentWillReceiveProps(nextProps) {
    const { loadingPrerequisitoVerifica, spinnerLoadEsercizio, history } = this.props;

    if (!nextProps.spinnerLoadEsercizio && spinnerLoadEsercizio &&
      loadingPrerequisitoVerifica > 0 && nextProps.loadingPrerequisitoVerifica === -1) {
      history.push(`/modificaverifica/${loadingPrerequisitoVerifica}`);
    }
  }

  tornaAllaDashboard() {
    const { setVerificaData, history } = this.props;

    setVerificaData({
      anteprimaStampa: false,
    });

    history.push('/');
  }

  modificaVerifica = (verifica) => {
    const { fetchEserciziPrerequisito } = this.props;
    fetchEserciziPrerequisito(verifica);
  }

  render = () => {
    const {
      verifichePronte,
      loadingPrerequisitoVerifica,
      spinnerLoadEsercizio,
      spinner,
    } = this.props;

    return (
      <Page>
        <TopBar
          noShadow
          title="Verifiche pronte"
          single
          closeBtn={{
            onClickFunction: this.tornaAllaDashboard,
            enabled: true,
          }}
        />
        <Container>
          {spinner ? <Spinner /> : (
            <Div>
              {!verifichePronte.length ?
                <EmptyBox
                  text="Non sono ancora presenti verifiche"
                />
                :
                <CreaVerificheList
                  buttonText={
                    `${verifichePronte.length} ${verifichePronte.length === 1 ? 'Verifica' : 'Verifiche'}`
                  }
                  itemsList={
                    [...verifichePronte].sort((a, b) => {
                      if (a.titolo.toUpperCase() > b.titolo.toUpperCase()) {
                        return 1;
                      }
                      if (a.titolo.toUpperCase() < b.titolo.toUpperCase()) {
                        return -1;
                      }
                      return 0;
                    }).map((singolaVerifica) => ({
                      key: `verifica_panel_${singolaVerifica.key}`,
                      elementi: [{
                        isHtml: true,
                        id: `step_titolo_${singolaVerifica.key}`,
                        nome: singolaVerifica.titolo,
                        esercizi: singolaVerifica.eserciziNumero,
                      }],
                      pulsanti: [{
                        id: `step_button_modifica_${singolaVerifica.key}`,
                        label: 'Modifica',
                        icona: 'eye',
                        onClickFunction: () => this.modificaVerifica(singolaVerifica),
                      }],
                      buttonsSpinner: loadingPrerequisitoVerifica === singolaVerifica.prerequisito && spinnerLoadEsercizio,
                    }))
                  }
                />}
            </Div>)}
        </Container>
      </Page>
    );
  }
}

CreaVerifichePronteView.propTypes = {
  setVerificaData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchVerifichePronteData: PropTypes.func.isRequired,
  fetchEserciziPrerequisito: PropTypes.func.isRequired,
  verifichePronte: PropTypes.array.isRequired,
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
    hasPremium: PropTypes.bool.isRequired,
    disciplinaId: PropTypes.number.isRequired,
  }).isRequired,
  loadingPrerequisitoVerifica: PropTypes.number.isRequired,
  spinnerLoadEsercizio: PropTypes.bool.isRequired,
  spinner: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  creaVerifiche: state.get('CreaVerifiche').toJS(),
  verifichePronte: state.get('CreaVerifichePronte').toJS().verifichePronte,
  spinner: state.get('CreaVerifichePronte').toJS().spinner,
  loadingPrerequisitoVerifica: state.get('CreaVerifichePronte').toJS().loadingPrerequisitoVerifica,
  spinnerLoadEsercizio: state.get('CreaVerifichePronte').toJS().spinnerLoadEsercizio,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVerifichePronteData: (disciplinaId) => {
    dispatch(creaverificheVerifichePronteFetch(disciplinaId));
  },
  setVerificaData: (payload) => {
    dispatch(creaverificheVerificaSet(payload));
  },
  fetchEserciziPrerequisito: (payload) => {
    dispatch(creaverificheVerifichePronteEserciziFetch(payload));
  },
});

const CreaVerificheConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducerVerifiche = injectReducer({
  key: 'CreaVerifiche',
  reducer: creaVerificheReducer,
});
const withReducerVerifichePronte = injectReducer({
  key: 'CreaVerifichePronte',
  reducer: creaVerifichePronteReducer,
});
const withSaga = injectSaga({
  key: 'CreaVerifichePronte',
  saga: watchVerifichePronte,
});

const CreaVerifichePronteComposed = compose(
  withReducerVerifiche,
  withReducerVerifichePronte,
  withSaga,
  CreaVerificheConnect
)(CreaVerifichePronteView);

export default CreaVerifichePronteComposed;
