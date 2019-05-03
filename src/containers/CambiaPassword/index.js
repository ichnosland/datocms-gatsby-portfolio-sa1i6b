/*
 *
 * CambiaPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from 'components/Spinner';
import Div from 'components/Div';
import { FormSection } from 'components/FormElements';
import AlertBanner from 'components/AlertBanner';
import { userChangePassword } from 'containers/User/actions';
import ButtonGroup from 'components/ButtonGroup';
import { LegalInfo } from 'components/Paragraph';
import ZendeskTicket from 'containers/ZendeskTicket';
import { modalSetData } from 'containers/ModalBox/actions';
import CambiaPasswordForm from './CambiaPasswordForm';


export class CambiaPasswordView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (e) => {
    e.preventDefault();
    const { values: cambiaPasswordData } = this.props.resetPasswordData;
    const { history, configuration, onUserChangePassword } = this.props;

    onUserChangePassword({
      new_password1: cambiaPasswordData.password_new_1,
      new_password2: cambiaPasswordData.password_new_2,
      old_password: cambiaPasswordData.password_old,
      configuration,
      history,
    });
  }

  render() {
    const { error, configuration, onModalSetData, history } = this.props;
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
          this.props.spinner ?
            <Spinner key="Spinner" /> :
            <Div
              align="center"
              key="Div_centrato"
            >
              <CambiaPasswordForm
                product={configuration.product}
                handleSubmit={this.onSubmit}
                backFunction={() => history.push('/profilo')}
              />
              <ButtonGroup
                buttons={[{
                  id: 1,
                  label: 'Assistenza',
                  onClickFunction: () => onModalSetData({
                    contenuto: (
                      <ZendeskTicket
                        ticketData={{
                          provenienza: 'cambia_password',
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

CambiaPasswordView.propTypes = {
  spinner: PropTypes.bool.isRequired,
  onUserChangePassword: PropTypes.func.isRequired,
  resetPasswordData: PropTypes.object,
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
  resetPasswordData: state.get('form').toJS().cambiaPassword,
});

const mapDispatchToProps = (dispatch) => ({
  onUserChangePassword: (payload) => {
    dispatch(userChangePassword(payload));
  },
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
});

const CambiaPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(CambiaPasswordView);

export default CambiaPassword;
