/*
 *
 * UserProfileView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';

import { APP_VERSION } from 'configuration';
import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Profilo from 'components/Profilo';
import { cookieSet } from 'common/cookies';
import { userLogoutTrigger, userDataSet } from 'containers/User/actions';
import { watchDownloadProtetti } from 'containers/DownloadProtetti/saga';
import { downloadProtettiFetch } from 'containers/DownloadProtetti/actions';
import { modalSetData, modalSetEmptyData } from 'containers/ModalBox/actions';

import { calcolaDownload } from './downloads';

export class UserProfileView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  scaricaAllegato = (stub) => {
    const { onDownloadProtetti } = this.props;
    const scaricaWindow = window.open('', '_blank');

    onDownloadProtetti(stub, scaricaWindow);
  }

  formatDate = (date) => {
    if (!date) {
      return undefined;
    }

    const d = new Date(date);
    return `Scade il ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  svuotaToken = () => {
    const { 
      onModalSetData, 
      onModalSetEmptyData,
      onUserLogout,
      configuration,
      history,
    } = this.props;

    onModalSetData({
      titolo: 'Reset degli accessi effettuati',
      contenuto: 'Sei sicuro di voler procedere con il reset di tutti gli accessi effettuati? Verrai sloggato da tutti i device, compreso quello corrente',
      acceptButton: {
        onClick: /* istanbul ignore next */ () => {
          onUserLogout({
            configuration,
            history,
            logoutAll: true,
          });
          onModalSetEmptyData();
        },
      },
      show: true,
    });
  }

  render() {
    const {
      configuration,
      userAnagraphics: {
        id,
        last_name: lastName,
        first_name: firstName,
        email,
        studenteAcademy: { punti },
      },
      userAppData,
      onUserLogout,
      userAuthentication,
      history,
      onSetSuoni,
    } = this.props;

    const downloadDisponibili = calcolaDownload({
      configuration, isDocente: userAppData.docente,
    });

    return (
      <Page>
        <TopBar
          backNav={{
            url: configuration.homePage,
            enabled: true,
          }}
          title="Profilo"
          single
        />
        <Container>
          <Profilo
            downloadDisponibili={downloadDisponibili}
            downloadFunction={this.scaricaAllegato}
            svuotaTokenFunction={this.svuotaToken}
            nome={`${firstName || ''} ${lastName || ''}`}
            email={email || ''}
            versioneSoftware={APP_VERSION}
            punti={configuration.hasXp && !userAppData.docente ? punti : -1}
            logoutFunction={() => onUserLogout({
              configuration,
              history,
            })}
            toggleSuoniFx={configuration.hasSuoni ? () => onSetSuoni(
              !userAppData.enableSuoni,
              id,
              configuration.product
            ) : null}
            sound={userAppData.enableSuoni}
            gotToPremiumFunction={
              userAuthentication.codiceDaSbloccare ?
                () => history.push('/sblocca') :
                null
            }
            premiumActive={userAuthentication.codiceSbloccato}
            scadenza={this.formatDate(userAppData.premiumDataScadenza)}
            whatsapp={(userAppData.docente && configuration.whatsAppUrl) || ''}
          />
        </Container>
      </Page>
    );
  }
}

UserProfileView.propTypes = {
  userAppData: PropTypes.shape({
    docente: PropTypes.bool.isRequired,
  }).isRequired,
  userAnagraphics: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    studenteAcademy: PropTypes.shape({
      punti: PropTypes.number,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
    homePage: PropTypes.string.isRequired,
    whatsAppUrl: PropTypes.string,
    disciplinaId: PropTypes.number.isRequired,
  }).isRequired,
  onUserLogout: PropTypes.func.isRequired,
  userAuthentication: PropTypes.shape({
    codiceDaSbloccare: PropTypes.bool.isRequired,
  }),
  onSetSuoni: PropTypes.func.isRequired,
  onDownloadProtetti: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  userAuthentication: state.get('user').toJS().authentication,
  userAnagraphics: state.get('user').toJS().anagraphics,
  userAppData: state.get('user').toJS().appData,
  userSettings: state.get('user').toJS().settings,
});

function mapDispatchToProps(dispatch) {
  return {
    onUserLogout: (payload) => {
      dispatch(userLogoutTrigger(payload));
    },
    onSetSuoni: (enable, userId, product) => {
      cookieSet({
        cookieKey: `enableSounds_${product}_${userId}`, 
        payload: enable ? 'true' : 'false',
      });
      dispatch(userDataSet({
        appData: {
          enableSuoni: enable,
        },
      }));
    },
    onDownloadProtetti: (slug, window) => {
      dispatch(downloadProtettiFetch(slug, window));
    },
    onModalSetData: (payload) => {
      dispatch(modalSetData(payload));
    },
    onModalSetEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
  };
}

const withSaga = injectSaga({ key: 'downloadProtetti', saga: watchDownloadProtetti });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(UserProfileView);
