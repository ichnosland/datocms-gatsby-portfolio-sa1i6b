/**
 *
 * SbloccaCodice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from 'redux-form/immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Page from 'components/Page';
import Div from 'components/Div';
import TopBar from 'components/TopBar';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import ButtonGroup from 'components/ButtonGroup';
import { Icon } from 'components/Button';
import buttonicon from 'icons/buttons';
import ZendeskTicket from 'containers/ZendeskTicket';
import watchZendesk from 'containers/ZendeskTicket/saga';
import { modalSetData } from 'containers/ModalBox/actions';
import AlertBanner from 'components/AlertBanner';

import sbloccaCodiceReducer from './reducer';
import { watchSbloccaCodice } from './saga';
import {
  sbloccaCodiceSbloccaPost,
  sbloccaCodiceAcquistaSet,
  sbloccaCodiceAcquistaPost,
  sbloccaCodiceAcquistaFetch,
  sbloccaCodiceFeedbackReset,
} from './actions';
import SbloccaCodiceForm from './SbloccaCodiceForm';
import AcquistaForm from './AcquistaForm';


export class SbloccaCodiceView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmitSblocca = (e) => {
    e.preventDefault();
    const { onSendCodice, formSblocco, configuration, onResetFormSbloccaCodice, history } = this.props;
    onSendCodice(formSblocco.values.codice, configuration, history);
    onResetFormSbloccaCodice();
  };

  paymentPaypal(_data, actions, amount) {
    return actions.payment.create({
      transactions: [{
        amount: {
          total: amount.total,
          currency: amount.currency,
        },
        description: amount.description,
      }],
    });
  }

  authorizePaypal = (_data, actions, orderData) => {
    const {
      onSbloccaCodiceAcquistaPost,
      onResetFormAcquista,
      configuration,
      userAnagraphics,
      userAppData,
    } = this.props;

    return actions.payment.execute().then((paypalData) => {
      onSbloccaCodiceAcquistaPost(
        paypalData.id,
        orderData,
        configuration, {
          nome: `${userAnagraphics.first_name} ${userAnagraphics.last_name}`,
          email: userAnagraphics.email,
          isDocente: userAppData.docente,
        }
      );
      onResetFormAcquista();
    });
  }

  togglePaypalBox = () => {
    const {
      onSbloccaCodiceAcquistaFetch,
      onSbloccaCodiceFeedbackReset,
      onSbloccaCodiceAcquistaSet,
      configuration: { disciplinaId },
      sbloccaCodice: { paypal: { isLoaded, display } },
    } = this.props;

    if (!isLoaded && !display) {
      onSbloccaCodiceAcquistaFetch(disciplinaId);
    } else {
      onSbloccaCodiceFeedbackReset();
    }

    onSbloccaCodiceAcquistaSet({ display: !display });
  }

  render() {
    const { sbloccaCodice, configuration, formAcquista, onModalSetData, userAnagraphics } = this.props;

    return (
      <Page>
        <TopBar
          backNav={{
            url: configuration.homePage,
            enabled: true,
          }}
          pinned
          title="Premium"
          single
        />
        <Container>
          <Div padding="0 0 20px;">
            {sbloccaCodice.spinner && [
              <Spinner key="spinner" />,
              sbloccaCodice.paypal.display && (
                <AlertBanner
                  key="alertBanner"
                  actioncolor="action"
                  icona="hourglass"
                  maxWidth="380px"
                  direction="column"
                  margin="20px auto"
                  padding="30px 0 0"
                >
                  <Icon {...buttonicon.hourglass} />
                  <p>Stiamo processando il pagamento:<br />non chiudere il browser e attendi<br />di essere reindirizzato. Grazie</p>
                </AlertBanner>
              ),
            ]}
            {!sbloccaCodice.spinner && (
              !sbloccaCodice.paypal.display ?
                (
                  <SbloccaCodiceForm
                    feedback={sbloccaCodice.feedback}
                    handleSubmit={this.handleSubmitSblocca}
                    togglePaypalBox={this.togglePaypalBox}
                  />
                ) :
                (
                  <AcquistaForm
                    userAnagraphics={userAnagraphics}
                    authorizePaypal={this.authorizePaypal}
                    paymentPaypal={this.paymentPaypal}
                    feedback={sbloccaCodice.feedback}
                    togglePaypalBox={this.togglePaypalBox}
                    prodotti={sbloccaCodice.paypal.prodottiDisponibili}
                    selectedValue={((formAcquista || /* istanbul ignore next */ {}).values || {}).prodotto}
                  />
                )

            )}
          </Div>
          <ButtonGroup
            buttons={[{
              id: 1,
              label: 'Assistenza',
              onClickFunction: /* istanbul ignore next */ () => onModalSetData({
                contenuto: (
                  <ZendeskTicket
                    ticketData={{
                      provenienza: 'sblocca_codice',
                    }}
                  />
                ),
                show: true,
                disableClose: true,
                isPopup: false,
              }),
            }]}
          />
        </Container>
      </Page>
    );
  }
}

SbloccaCodiceView.propTypes = {
  configuration: PropTypes.shape({
    disciplinaId: PropTypes.number.isRequired,
  }).isRequired,
  onSendCodice: PropTypes.func.isRequired,
  sbloccaCodice: PropTypes.shape({
    feedback: PropTypes.shape({
      hasFeedback: PropTypes.bool.isRequired,
      tipologia: PropTypes.string.isRequired,
      messaggio: PropTypes.string.isRequired,
    }).isRequired,
    paypal: PropTypes.shape({
      prodottiDisponibili: PropTypes.array.isRequired,
      display: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  formSblocco: PropTypes.object,
  onResetFormSbloccaCodice: PropTypes.func.isRequired,
  onResetFormAcquista: PropTypes.func.isRequired,
  onSbloccaCodiceAcquistaFetch: PropTypes.func.isRequired,
  onSbloccaCodiceAcquistaSet: PropTypes.func.isRequired,
  formAcquista: PropTypes.object,
  onSbloccaCodiceAcquistaPost: PropTypes.func.isRequired,
  onSbloccaCodiceFeedbackReset: PropTypes.func.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  userAnagraphics: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  sbloccaCodice: state.get('sbloccaCodice').toJS(),
  formSblocco: state.get('form').toJS().sbloccaCodice,
  formAcquista: state.get('form').toJS().acquista,
  userAnagraphics: state.get('user').toJS().anagraphics,
  userAppData: state.get('user').toJS().appData,
});

const mapDispatchToProps = (dispatch) => ({
  onSendCodice: (codice, configuration, history) => {
    dispatch(sbloccaCodiceSbloccaPost(codice, configuration, history));
  },
  onResetFormSbloccaCodice: () => {
    dispatch(reset('sbloccaCodice'));
  },
  onResetFormAcquista: () => {
    dispatch(reset('acquista'));
  },
  onSbloccaCodiceFeedbackReset: () => {
    dispatch(sbloccaCodiceFeedbackReset());
  },
  onSbloccaCodiceAcquistaFetch: (disciplina) => {
    dispatch(sbloccaCodiceAcquistaFetch(disciplina));
  },
  onSbloccaCodiceAcquistaSet: (payload) => {
    dispatch(sbloccaCodiceAcquistaSet(payload));
  },
  onSbloccaCodiceAcquistaPost: (paypalId, orderData, disciplinaId, configuration, ticketData) => {
    dispatch(sbloccaCodiceAcquistaPost(paypalId, orderData, disciplinaId, configuration, ticketData));
  },
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'sbloccaCodice', reducer: sbloccaCodiceReducer });
const withSaga = injectSaga({ key: 'sbloccaCodice', saga: watchSbloccaCodice });
const withSagaZendesk = injectSaga({ key: 'zendeskTicket', saga: watchZendesk });

export default compose(
  withReducer,
  withSagaZendesk,
  withSaga,
  withConnect,
)(SbloccaCodiceView);
