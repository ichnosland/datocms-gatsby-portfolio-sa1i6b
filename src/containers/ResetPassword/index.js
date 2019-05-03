/*
 *
 * ResetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from 'components/Spinner';
import Div from 'components/Div';
import { FormSection } from 'components/FormElements';
import AlertBanner from 'components/AlertBanner';
import { userResetPassword, userConfirmNewPasswordPost } from 'containers/User/actions';
import ButtonGroup from 'components/ButtonGroup';
import { LegalInfo } from 'components/Paragraph';
import ZendeskTicket from 'containers/ZendeskTicket';
import { modalSetData } from 'containers/ModalBox/actions';
import ResetPasswordForm from './ResetPasswordForm';
import ConfirmPasswordForm from './ConfirmPasswordForm';


export class ResetPasswordView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  confirmPasswordSubmit = (e) => {
    e.preventDefault();
    const { values: confirmPasswordData } = this.props.confirmPasswordData;
    const {
      configuration,
      onUserConfirmNewPassword,
      match: { params: { uid, token } },
      history,
    } = this.props;

    onUserConfirmNewPassword({
      new_password1: confirmPasswordData.password_new_1,
      new_password2: confirmPasswordData.password_new_2,
      uid,
      token,
      configuration,
      history,
    });
  }

  resetPasswordSubmit = (e) => {
    e.preventDefault();
    const { values: resetPasswordData } = this.props.resetPasswordData;
    const { configuration, onUserResetPassword } = this.props;

    onUserResetPassword({
      email: resetPasswordData.email,
      disciplina: configuration.disciplinaId,
    });
  }

  render() {
    const {
      error,
      configuration,
      onModalSetData,
      match: { params: { uid, token } },
      history,
    } = this.props;
    const displayPasswordReset = !!uid && !!token;

    return (
      <FormSection paddingmobile="20px">
        {[
          error.hasErrors && (
            <AlertBanner
              key="AlertBanner"
              text={error.errorMessage}
              actioncolor={error.tipologia}
              margin="0 0 20px"
            >
              {error.errorMessage}
            </AlertBanner>
          ),
          this.props.spinner ?
            <Spinner key="Spinner" /> :
            <Div
              align="center"
              key="Div_centrato"
            >
              {displayPasswordReset ?
                <ConfirmPasswordForm
                  product={configuration.product}
                  handleSubmit={this.confirmPasswordSubmit}
                />
                : <ResetPasswordForm
                  product={configuration.product}
                  handleSubmit={this.resetPasswordSubmit}
                  backFunction={() => history.push('/login')}
                />}
              <ButtonGroup
                buttons={[{
                  id: 1,
                  label: 'Assistenza',
                  onClickFunction: () => onModalSetData({
                    contenuto: (
                      <ZendeskTicket
                        ticketData={{
                          provenienza: 'reset_password',
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
        ]}
      </FormSection>
    );
  }
}

ResetPasswordView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  onUserResetPassword: PropTypes.func.isRequired,
  resetPasswordData: PropTypes.object,
  configuration: PropTypes.object.isRequired,
  error: PropTypes.shape({
    hasErrors: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }).isRequired,
  onModalSetData: PropTypes.func.isRequired,
  onUserConfirmNewPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string,
      token: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  confirmPasswordData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  spinner: state.get('user').toJS().spinner,
  error: state.get('user').toJS().error,
  configuration: state.get('configuration').toJS(),
  resetPasswordData: state.get('form').toJS().resetPassword,
  confirmPasswordData: state.get('form').toJS().confirmPassword,
});

const mapDispatchToProps = (dispatch) => ({
  onUserResetPassword: (payload) => {
    dispatch(userResetPassword(payload));
  },
  onUserConfirmNewPassword: (payload) => {
    dispatch(userConfirmNewPasswordPost(payload));
  },
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
});

const ResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordView);

export default ResetPassword;
