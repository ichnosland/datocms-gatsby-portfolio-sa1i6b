/*
 *
 * Registration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ZendeskTicket from 'containers/ZendeskTicket';
import ButtonGroup from 'components/ButtonGroup';
import Spinner from 'components/Spinner';
import Div from 'components/Div';
import AlertBanner from 'components/AlertBanner';
import ClearLink from 'components/ClearLink';
import P, { LegalInfo } from 'components/Paragraph';
import { FormSection, FormElement } from 'components/FormElements';
import { modalSetData } from 'containers/ModalBox/actions';
import { userRegistrationPost, userDataFetch } from 'containers/User/actions';
import RegistrationForm from './RegistrationForm';


export class RegistrationView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (e) => {
    e.preventDefault();
    const { values: registrationData } = this.props.formRegistrationData;
    const { history, onUserRegister, configuration } = this.props;

    onUserRegister({
      ...registrationData,
      history,
      configuration,
    });
  }

  onResponseFacebook = (response) => {
    const { history, configuration, onUserLogin } = this.props;

    onUserLogin(
      {
        email: response.email,
        fbname: response.name,
        fbuid: response.id,
        fbtoken: response.accessToken,
        register: true,
      },
      configuration,
      history,
      true
    );
  }

  render() {
    const {
      configuration,
      onModalSetData,
      spinner,
      error,
    } = this.props;

    return (
      <FormSection paddingmobile="20px" className="Wrap">
        {[
          error.hasErrors && error.errorMessage && (
            <AlertBanner
              key="AlertBanner"
              text={error.errorMessage}
              actioncolor="error"
              margin="0 0 20px"
            >
              {error.errorMessage}
            </AlertBanner>
          ),
          spinner ?
            <Spinner key="Spinner" /> :
            [
              <Div
                align="center"
                key="Div_centrato"
              >
                <RegistrationForm
                  handleSubmit={this.onSubmit}
                  product={configuration.product}
                  responseFacebookFunction={this.onResponseFacebook}
                />
                <FormElement>
                  <P><ClearLink to="/login">Sei già registrato?</ClearLink></P>
                </FormElement>
                <FormElement>
                  <ButtonGroup
                    buttons={[{
                      id: 1,
                      label: 'Assistenza',
                      onClickFunction: () => onModalSetData({
                        contenuto: (
                          <ZendeskTicket
                            ticketData={{
                              provenienza: 'registration',
                            }}
                          />
                        ),
                        show: true,
                        disableClose: true,
                        isPopup: false,
                      }),
                    }]}
                  />
                </FormElement>
              </Div>,
              <LegalInfo
                key="LegalInfo"
                align="center"
              >
                <a href="https://maieuticallabs.it/privacy/" target="_blank">Termini, condizioni d&apos;uso e normative sulla privacy</a><br className="mobileOnly" /> di <a href="https://maieuticallabs.it/" target="_blank">Maieutical Labs</a>.
              </LegalInfo>,
            ],
        ]}
      </FormSection>
    );
  }
}

RegistrationView.propTypes = {
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
  }).isRequired,
  spinner: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onUserRegister: PropTypes.func.isRequired,
  formRegistrationData: PropTypes.object,
  onUserLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
  onUserRegister: (payload) => {
    dispatch(userRegistrationPost(payload));
  },
  onUserLogin: (loginData, configuration, history, isFacebook) => {
    dispatch(userDataFetch(loginData, configuration, history, isFacebook));
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAuthentication: state.get('user').toJS().authentication,
  spinner: state.get('user').toJS().spinner,
  error: state.get('user').toJS().error,
  formRegistrationData: state.get('form').toJS().registration,
});

const Registration = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationView);

export default Registration;

