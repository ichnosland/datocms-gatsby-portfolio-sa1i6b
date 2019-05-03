/*
 *
 * Contatti
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import provideScrollPosition from 'react-provide-scroll-position';
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { BASENAME } from 'configuration';
import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import LandingMenuBar from 'components/LandingMenuBar';
import { Section } from 'components/Section';
import { H1, H2, H3 } from 'components/Heading';
import ZigZagBorder from 'components/ZigZagBorder';
import ContactForm from 'components/ContactForm';
import { FlexSwitch, Image, CardBox } from 'components/LandingCard';
import Footer from 'components/Footer';
import Spinner from 'components/Spinner';
import media from 'style/mediainjector';
import zendeskReducer from 'containers/ZendeskTicket/reducer';
import zendeskSaga from 'containers/ZendeskTicket/saga';
import { modalSetEmptyData } from 'containers/ModalBox/actions';
import { zendeskTicketDataPost, zendeskTicketDataReset } from 'containers/ZendeskTicket/actions';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

const HalfBox = styled.div`
  color: white;
  width: 50%;
  float: left;
  p {
    font-size: 0.9em;
  }
  ${media.lt480`
    width: 100%;
  `}
`;

export class ContattiView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (e) => {
    e.preventDefault();
    const {
      configuration,
      userAppData,
      userAuthentication,
      onZendeskDataPost,
      richiestaInformazioniForm,
    } = this.props;

    onZendeskDataPost({
      configuration,
      ticketData: {
        nome: richiestaInformazioniForm.values.nome,
        email: richiestaInformazioniForm.values.email,
        provenienza: 'form_contatti',
        titolo: 'Richiesta informazioni',
        tipologia: 'comunicazione',
        isUserLogged: userAuthentication.logged,
        isDocente: userAppData.docente,
        descrizione: richiestaInformazioniForm.values.descrizione,
        citta: richiestaInformazioniForm.values.citta,
        ruolo: richiestaInformazioniForm.values.ruolo,
        scuola: richiestaInformazioniForm.values.scuola,
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
      configuration,
      landingPage: { isMenuOpened },
      onlandingPageToggleMenu,
      match: { path },
      enableZigZagBorder,
      palette: { section, stickyTop },
    } = this.props;

    const LandingMenuComponent = /* istanbul ignore next */ ({ scrollTop }) => (
      <LandingMenuBar
        configuration={configuration}
        start={scrollTop < 60 ? 1 : 0}
        openNav={isMenuOpened}
        toggleNavFunction={onlandingPageToggleMenu}
        loadedPath={path}
      />
    );
    const WrappedLandingMenuBar = provideScrollPosition(LandingMenuComponent);

    return (
      <StickyWrap>
        <StickyTop bgColor={stickyTop.bgColor}>
          <WrappedLandingMenuBar />
          <Section first bgColor={stickyTop.sectionBgColor} direction="column">
            <H1 color={stickyTop.buttonColor} margin="20px auto">Richiesta informazioni</H1>
            {spinner ? <Spinner /> : (
              <ContactForm
                feedback={feedback}
                handleSubmit={this.onSubmit}
                buttonBg={stickyTop.buttonBg}
              />
            )}
          </Section>
          <Section bgColor={section.bgColor}>
            <FlexSwitch maxWidth="960px">
              <CardBox padding="0 30px 0 0">
                <H3 color="#fff" margin="0">I nostri recapiti</H3>
                <H2 color="#fff" margin="20px auto 0">Maieutical Labs</H2>
                <HalfBox>
                  <p>
                    <strong>Sede operativa</strong><br />
                    Via Abate Vassalli Eandi, 5<br />
                    10138 • Torino
                  </p>
                  <p><strong>Sede legale</strong><br />
                    Via Pietro Regis, 26<br /> 10064 • Pinerolo (TO)
                  </p>
                  <p>
                    <strong>Telefono</strong><br /> (+39) 011 19705073
                  </p>
                </HalfBox>
                <HalfBox>
                  <p>P. IVA 10623350013<br />
                    C.F. e n. iscriz.<br />
                    Reg. Imp. di TO<br />
                    10623350013<br />
                    REA: TO -1149034<br />
                    PEC: maieuticallabs@legalmail.it<br />
                    Capitale in bilancio: € 11.000
                  </p>
                </HalfBox>
              </CardBox>
              <Image src={`${BASENAME}contatti.png`} role="presentation" />
            </FlexSwitch>
          </Section>
        </StickyTop>
        <StickyBottom>
          {enableZigZagBorder && <ZigZagBorder />}
          <Footer />
        </StickyBottom>
      </StickyWrap>
    );
  }
}

ContattiView.propTypes = {
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
  feedback: PropTypes.shape({
    hasFeedback: PropTypes.bool.isRequired,
    tipologia: PropTypes.string.isRequired,
    messaggio: PropTypes.string.isRequired,
  }).isRequired,
  onZendeskDataPost: PropTypes.func.isRequired,
  richiestaInformazioniForm: PropTypes.object,
  landingPage: PropTypes.shape({
    isMenuOpened: PropTypes.bool.isRequired,
  }).isRequired,
  onlandingPageToggleMenu: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  enableZigZagBorder: PropTypes.bool.isRequired,
  palette: PropTypes.shape({
    stickyTop: PropTypes.shape({
      bgColor: PropTypes.string,
      buttonBg: PropTypes.string,
      buttonColor: PropTypes.string,
      sectionBgColor: PropTypes.string,
    }).isRequired,
    section: PropTypes.shape({
      bgColor: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onZendeskTicketDataReset: PropTypes.func.isRequired,
  onModalEmptyData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  richiestaInformazioniForm: state.get('form').toJS().richiestaInformazioniForm,
  userAppData: state.get('user').toJS().appData,
  userAuthentication: state.get('user').toJS().authentication,
  spinner: state.get('zendeskTicket').toJS().spinner,
  feedback: state.get('zendeskTicket').toJS().feedback,
  landingPage: state.get('landingPage').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    onZendeskDataPost: (payload) => {
      dispatch(zendeskTicketDataPost(payload));
    },
    onlandingPageToggleMenu: (enable) => {
      dispatch(landingPageToggleMenu(enable));
    },
    onZendeskTicketDataReset: () => {
      dispatch(zendeskTicketDataReset());
    },
    onModalEmptyData: () => {
      dispatch(modalSetEmptyData());
    },
  };
}

const withReducer = injectReducer({ key: 'zendeskTicket', reducer: zendeskReducer });
const withSaga = injectSaga({ key: 'zendeskTicket', saga: zendeskSaga });

const ContattiConnect = connect(mapStateToProps, mapDispatchToProps);
const ContattiComposed = compose(
  withSaga,
  withReducer,
  ContattiConnect
)(ContattiView);

export default ContattiComposed;
