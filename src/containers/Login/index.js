/*
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Spinner from 'components/Spinner';
import Div from 'components/Div';
import { FormSection } from 'components/FormElements';
import AlertBanner from 'components/AlertBanner';
import ClearLink from 'components/ClearLink';
import P, { LegalInfo } from 'components/Paragraph';
import { userDataFetch } from 'containers/User/actions';
import ButtonGroup from 'components/ButtonGroup';
import { ButtonStyle } from 'components/Button';
import ZendeskTicket from 'containers/ZendeskTicket';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';
import LoginForm from './LoginForm';

export const AnnullaButton = styled.a`
  ${ButtonStyle}
  text-decoration: none;
`;


export class LoginView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (e) => {
    e.preventDefault();
    const { values: loginData } = this.props.formLoginData;
    const { history, configuration, onUserLogin } = this.props;

    onUserLogin(
      {
        email: loginData.email,
        password: loginData.password,
      },
      configuration,
      history
    );
  }

  onResponseFacebook = (response) => {
    const { history, configuration, onUserLogin } = this.props;

    onUserLogin(
      {
        email: response.email,
        fbname: response.name,
        fbuid: response.id,
        fbtoken: response.accessToken,
        register: false,
      },
      configuration,
      history,
      true
    );
  }

  render() {
    const { error, configuration, onModalSetData, spinner } = this.props;
    return (
      <FormSection paddingmobile="20px">
        {[
          error.hasErrors && error.errorMessage && (
            <AlertBanner
              key="AlertBanner"
              text={error.errorMessage}
              actioncolor={error.tipologia}
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
                <LoginForm
                  responseFacebookFunction={this.onResponseFacebook}
                  product={configuration.product}
                  handleSubmit={this.onSubmit}
                />
                {configuration.landingUrl &&
                  <AnnullaButton
                    full
                    admin
                    href={configuration.landingUrl}
                  >
                    Annulla
                  </AnnullaButton>
                }
                <P margin="40px 20px 20px"><ClearLink to="/registrazione">Nuovo utente? Registrati</ClearLink></P>
                <P margin="20px"><ClearLink to="/reset-password">Hai perso la password?</ClearLink></P>
                <ButtonGroup
                  buttons={[{
                    id: 1,
                    label: 'Assistenza',
                    onClickFunction: () => onModalSetData({
                      contenuto: (
                        <ZendeskTicket
                          ticketData={{
                            provenienza: 'login',
                          }}
                        />
                      ),
                      show: true,
                      disableClose: true,
                      isPopup: false,
                    }),
                  }]}
                />
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

LoginView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  onUserLogin: PropTypes.func.isRequired,
  formLoginData: PropTypes.object,
  configuration: PropTypes.object.isRequired,
  error: PropTypes.shape({
    hasErrors: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onModalSetData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  spinner: state.get('user').toJS().spinner,
  error: state.get('user').toJS().error,
  configuration: state.get('configuration').toJS(),
  formLoginData: state.get('form').toJS().login,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onUserLogin: (loginData, configuration, history, isFacebook = false) => {
    dispatch(userDataFetch(loginData, configuration, history, isFacebook, dispatch));
  },
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
  onModalSetEmptyData: () => {
    dispatch(modalSetEmptyData());
  },
});

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);

export default Login;
