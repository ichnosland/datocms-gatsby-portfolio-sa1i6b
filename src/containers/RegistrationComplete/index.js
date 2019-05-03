/*
 *
 * Registration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from 'components/Section';
import Spinner from 'components/Spinner';
import AlertBanner from 'components/AlertBanner';
import { userRegistrationCompletePost } from 'containers/User/actions';
import RegistrationCompleteForm from './RegistrationCompleteForm';


export class RegistrationCompleteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (e) => {
    e.preventDefault();
    const { values: registrationData } = this.props.formRegistrationData;
    const { history, onUserRegisterComplete, configuration } = this.props;

    onUserRegisterComplete({
      ...registrationData,
      history,
      configuration,
    });
  }

  render() {
    const { configuration, spinner, error } = this.props;

    return (
      <Section full>
        {error.hasErrors && error.errorMessage && (
          <AlertBanner
            text={error.errorMessage}
            actioncolor="error"
          >
            {error.errorMessage}
          </AlertBanner>
        )}
        {spinner ?
          <Spinner /> :
          <RegistrationCompleteForm
            handleSubmit={this.onSubmit}
            product={configuration.product}
          />}
      </Section>
    );
  }
}

RegistrationCompleteView.propTypes = {
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
  }).isRequired,
  spinner: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    errorMessage: PropTypes.string.isRequired,
    hasErrors: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onUserRegisterComplete: PropTypes.func.isRequired,
  formRegistrationData: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  onUserRegisterComplete: (payload) => {
    dispatch(userRegistrationCompletePost(payload));
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
)(RegistrationCompleteView);

export default Registration;

