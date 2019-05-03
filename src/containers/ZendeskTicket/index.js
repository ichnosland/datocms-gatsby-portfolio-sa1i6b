/**
 *
 * ZendeskTicket
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Spinner from 'components/Spinner';
import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import WhatsAppBanner from 'components/Profilo/WhatsAppBanner';
import Svg from 'components/Svg';
import AlertBanner from 'components/AlertBanner';
import { Button } from 'components/Button';
import { H3 } from 'components/Heading';
import icon from 'icons/buttons';
import { colore } from 'style/color';
import { modalSetEmptyData } from 'containers/ModalBox/actions';
import reducer from './reducer';
import saga from './saga';
import ZendeskFormView from './FeedbackForm';
import { zendeskTicketDataPost, zendeskTicketDataReset } from './actions';

export class ZendeskTicketView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (e) => {
    e.preventDefault();
    const {
      configuration,
      userAppData,
      userAnagraphics,
      userAuthentication,
      onZendeskDataPost,
      feedbackFormData,
      ticketData,
    } = this.props;

    onZendeskDataPost({
      configuration,
      ticketData: {
        nome: userAuthentication.logged ?
          `${userAnagraphics.first_name} ${userAnagraphics.last_name}` :
          feedbackFormData.values.nome,
        email: userAuthentication.logged ?
          userAnagraphics.email :
          feedbackFormData.values.email,
        ...(ticketData || {}),
        isUserLogged: userAuthentication.logged,
        isDocente: userAppData.docente,
        tipologia: feedbackFormData.values.tipologia || ticketData.tipologia,
        descrizione: feedbackFormData.values.descrizione,
        citta: feedbackFormData.values.citta,
        ruolo: feedbackFormData.values.ruolo,
        scuola: feedbackFormData.values.scuola,
        tipologiaAdozione: feedbackFormData.values.tipologiaAdozione,
        classeSezione: feedbackFormData.values.classeSezione,
        indirizzoDiStudio: feedbackFormData.values.indirizzoDiStudio,
        piattaforma: feedbackFormData.values.piattaforma ?
          Object.keys(feedbackFormData.values.piattaforma)
            .filter((key) => feedbackFormData.values.piattaforma[key]).join(', ') :
          undefined,
      },
    });
  }

  componentWillUnmount() {
    const { onZendeskTicketDataReset, onModalEmptyData } = this.props;

    onZendeskTicketDataReset();
    onModalEmptyData();
  }

  render() {
    const {
      spinner,
      feedback,
      onModalEmptyData,
      userAppData,
      userAuthentication,
      onZendeskTicketDataReset,
      configuration,
      formConfiguration,
    } = this.props;

    const ComponenteForm = formConfiguration ? formConfiguration.component : undefined;
    const formProps = {
      handleSubmit: this.onSubmit,
      handleClose: () => {
        onZendeskTicketDataReset();
        onModalEmptyData();
      },
      hasAnagraphics: !userAuthentication.logged,
      feedback,
      closeFeedbackFunction: () => {
        onZendeskTicketDataReset();
        onModalEmptyData();
      },
      ...(formConfiguration ? formConfiguration.props : {}),
    };

    return ComponenteForm ?
      (<ComponenteForm {...formProps} />) :
      (
        <Div padding="20px" width="100%" maxWidth="480px" align="center">
          <FlexBox margin="20px 0 30px">
            <Svg {...icon.feedback} fill={colore.ui.feedback} />
            <H3 margin="0"> &nbsp;LASCIA IL TUO FEEDBACK</H3>
          </FlexBox>
          {userAppData.docente && <WhatsAppBanner href={configuration.whatsAppUrl} />}
          {feedback.hasFeedback && (
            <Div>
              <AlertBanner tag margin="10px auto 20px" actioncolor={feedback.tipologia}>{feedback.messaggio}</AlertBanner>
              <Button
                standard
                radius="3px"
                type="submit"
                actioncolor="help"
                onClick={() => {
                  onZendeskTicketDataReset();
                  onModalEmptyData();
                }}
              >
                Chiudi
              </Button>
            </Div>
          )}
          {spinner ?
            <Spinner /> : (
              !feedback.hasFeedback && <ZendeskFormView {...formProps} />
            )}
        </Div>
      );
  }
}

ZendeskTicketView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  configuration: PropTypes.shape({
    homePage: PropTypes.string,
    whatsAppUrl: PropTypes.string,
  }).isRequired,
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }).isRequired,
  userAuthentication: PropTypes.shape({
    logged: PropTypes.bool.isRequired,
  }),
  userAnagraphics: PropTypes.shape({
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  onModalEmptyData: PropTypes.func.isRequired,
  onZendeskDataPost: PropTypes.func.isRequired,
  ticketData: PropTypes.object,
  feedbackFormData: PropTypes.object,
  onZendeskTicketDataReset: PropTypes.func.isRequired,
  formConfiguration: PropTypes.shape({
    component: PropTypes.func,
    props: PropTypes.object,
  }),
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAppData: state.get('user').toJS().appData,
  userAnagraphics: state.get('user').toJS().anagraphics,
  userAuthentication: state.get('user').toJS().authentication,
  spinner: state.get('zendeskTicket').toJS().spinner,
  feedback: state.get('zendeskTicket').toJS().feedback,
  feedbackFormData: state.get('form').toJS().feedbackForm,
});

function mapDispatchToProps(dispatch) {
  return {
    onModalEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
    onZendeskDataPost: (payload) => {
      dispatch(zendeskTicketDataPost(payload));
    },
    onZendeskTicketDataReset: () => {
      dispatch(zendeskTicketDataReset());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'zendeskTicket', reducer });
const withSaga = injectSaga({ key: 'zendeskTicket', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ZendeskTicketView);
