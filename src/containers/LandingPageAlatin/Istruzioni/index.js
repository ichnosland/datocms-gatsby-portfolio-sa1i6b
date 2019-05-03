/*
 *
 * Istruzioni
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import provideScrollPosition from 'react-provide-scroll-position';
import styled from 'styled-components';

import ZendeskTicket from 'containers/ZendeskTicket';
import LandingForm from 'components/LandingForm';
import { modalSetData } from 'containers/ModalBox/actions';
import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import LandingMenuBar from 'components/LandingMenuBar';
import LandingCard from 'components/LandingCard';
import SubLandingCard from 'components/LandingCard/SubLandingCard';
import { Section } from 'components/Section';
import Container from 'components/Container';
import { ActionButtonLink } from 'components/ButtonLink';
import { H1, H2, H3 } from 'components/Heading';
import { BrandTxt, ColorTxt } from 'components/Text';
import ZigZagBorder from 'components/ZigZagBorder';
import Footer from 'components/Footer';
import { singleFieldRequired, atLeastNChars, singleFieldValidateEmail } from 'common/forms';
import InputField from 'components/FormElements/Field';
import { colore } from 'style/color';
import media from 'style/mediainjector';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import unito from './images/unito.png';
import premium from './images/premiumBadge.png';
import digitale from './images/digitalFirst.png';

const quota = '12';

const P = styled.p`
    color: #12334e;
    a {
      color: #fff;
      background-color: inherit;
      &:hover {
        background-color: ${colore.alatin.dark};
      }
    }
`;

const DashedBox = styled.div`
    color: #fff;
    text-align: center;
    padding: 10px;
    border: 2px dashed #fff;
    border-radius: 9px;
    div {
      padding: 10px 30px;
      background-color: ${colore.alatin.brand};
      border-radius: 6px;
      ${media.lt480`
        padding: 10px;
      `}
    }
    a {
      color: inherit;
      &:hover {
      }
    }

`;

const Warning = styled.div`
  padding: 20px 26px;
  background: #FFFFFF;
  border-radius: 9px;
`;

export const atLeast3Chars = atLeastNChars(3);

export class Istruzioni extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onModalSetData,
      configuration,
      landingPage: { isMenuOpened },
      onlandingPageToggleMenu,
      match: { path },
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
        <StickyTop>
          <WrappedLandingMenuBar />
          <Section first>
            <Container>
              <H1 margin="20px 0 0">Istruzioni per l’adozione e l’acquisto</H1>
            </Container>
          </Section>
          <Section padding="0 50px 50px">
            <LandingCard
              titleColor="black"
              title="Docenti"
              color="#12334e"
              src={unito}
              actionButton={{
                text: 'Richiedi un codice classe*',
                props: {
                  bgcolor: colore.landing.orange,
                  shadow: 'true',
                },
                richiediCodice: () => onModalSetData({
                  contenuto: (
                    <ZendeskTicket
                      ticketData={{
                        provenienza: 'landing_istruzioni',
                        titolo: 'Richiesta codice classe',
                        tipologia: 'comunicazione',
                      }}
                      formConfiguration={{
                        component: LandingForm,
                        props: {
                          formtitle: 'Richiesta codice classe',
                          alatin: true,
                          privacy: true,
                          formFields: [{
                            id: 'nome',
                            type: 'text',
                            name: 'nome',
                            label: 'Nome e cognome*',
                            landing: true,
                            validate: [atLeast3Chars],
                            component: InputField,
                          }, {
                            id: 'email',
                            type: 'text',
                            name: 'email',
                            label: 'Email*',
                            landing: true,
                            validate: [singleFieldValidateEmail],
                            component: InputField,
                          }, {
                            id: 'scuola',
                            type: 'text',
                            name: 'scuola',
                            label: 'Scuola*',
                            landing: true,
                            validate: [singleFieldRequired],
                            component: InputField,
                          }, {
                            id: 'citta',
                            type: 'text',
                            name: 'citta',
                            label: 'Città*',
                            landing: true,
                            validate: [singleFieldRequired],
                            component: InputField,
                          }, {
                            id: 'ruolo',
                            type: 'text',
                            name: 'ruolo',
                            label: 'Ruolo*',
                            landing: true,
                            validate: [singleFieldRequired],
                            component: InputField,
                          }],
                        },
                      }}
                    />
                  ),
                  show: true,
                  disableClose: true,
                  isPopup: false,
                  formBox: true,
                  maxWidth: '480px',
                }),
              }}
              body={'<p>Il docente ha libero accesso ai contenuti di Alatin. Può richiedere un profilo docente e la creazione di una classe compilando il modulo qui sotto. Per affiancare alla versione digitale anche il compendio cartaceo è necessario richiederne una copia saggio all’agente Loescher di zona.</p>'}
              footNote={{
                text: '* Modulo riservato ai docenti',
              }}
            />
          </Section>
          <Section bgColor={colore.landing.green} direction="column">
            <SubLandingCard
              src={premium}
              dashed
              alignThumb="flex-start"
            >
              <H2 color="#fff" margin="0">Studente Premium</H2>
              <P>Si ottiene un profilo studente <strong>premium</strong> scegliendo l’opzione <strong>digitale + cartaceo</strong> o quella solo <strong>digitale</strong>.</P>
              <Warning><strong><BrandTxt>Nota bene:</BrandTxt></strong> &nbsp;per tutte le operazioni di acquisto o sblocco è necessaria la registrazione online</Warning>
            </SubLandingCard>
            <SubLandingCard single dashed>
              <H3 color="black" margin="0">Digitale + cartaceo</H3>
              <P>Se hai già acquistato il <strong>cartaceo</strong>:</P>
              <ol>
                <li>
                  <P>registrati sul sito di tuo interesse: <a className="text-link" href="https://alatin.it/h/#/registration" target="_blank">Alatin</a> o <a className="text-link" href="https://alatin.it/lyceum/registrazione" target="_blank">Lyceum</a></P>
                </li>
                <li>
                  <P>clicca sul pulsante con la “A” che si trova nella pagina principale e scegli la voce “Premium”</P>
                </li>
                <li>
                  <P>inserisci il codice di sblocco che si trova sul frontespizio del libro cartaceo</P>
                </li>
                <li>
                  <P>clicca nuovamente sul pulsante con la “A”, scegli la voce “Classi” e inserisci il codice classe che ti fornisce il tuo docente (es. Rossi1234)</P>
                </li>
              </ol>
              <Warning><strong><ColorTxt color={colore.actions.error}>Attenzione:</ColorTxt></strong> &nbsp;ogni libro ha un codice di sblocco per la parte digitale; se acquisti un libro di seconda mano, il codice potrebbe non essere più valido e pertanto dovrà essere riacquistato online.</Warning>
            </SubLandingCard>
            <SubLandingCard
              src={digitale}
              alignThumb="flex-start"
            >
              <H3 color="black" margin="0">Digitale</H3>
              <P>Se vuoi acquistare il <strong>digitale</strong>:</P>
              <ol>
                <li>
                  <P>registrati sul sito di tuo interesse: <a className="text-link" href="https://alatin.it/h/#/registration" target="_blank">Alatin</a> o <a className="text-link" href="https://alatin.it/lyceum/registrazione" target="_blank">Lyceum</a></P>
                </li>
                <li>
                  <P>clicca sul pulsante con la “A” che si trova nella pagina principale e scegli la voce “Premium”</P>
                </li>
                <li>
                  <P>clicca sul pulsante “Paypal” e procedi al pagamento della quota tramite carta di credito o account Paypal; lo sblocco dell’account avverrà in automatico.</P>
                </li>
              </ol>
              <P>Dopo aver attivato una licenza potrai <strong>associarti alla classe</strong>:</P>
              <ol>
                <li><P>clicca sul pulsante con la “A”</P></li>
                <li><P>scegli la voce “Classi”</P></li>
                <li><P>inserisci il codice classe che ti fornisce il tuo docente (es. Rossi1234).</P></li>
              </ol>
            </SubLandingCard>
            <Container>
              <DashedBox>
                <div>
                  <p>L’abbonamento al digitale si può acquistare anche in <strong>un’unica soluzione per tutta la classe</strong>, previa raccolta delle quote ({quota}€ a studente per l’anno scolastico), tramite <strong>bonifico</strong> intestato a:</p>
                  <p>MAIEUTICAL LABS SRL<br />presso BCC, Banca di Casalgrasso e Sant’Albano Stura<br />IBAN IT33P0883301003000200100529</p>
                  <p><strong>Specificando nella causale il codice (o i codici) classe.</strong></p>
                </div>
              </DashedBox>
            </Container>
          </Section>
          <Section bgColor={colore.landing.green} padding="0 50px 50px" paddingmobile="0 20px 20px">
            <Container align="center">
              <ActionButtonLink bgcolor={colore.landing.orange} sectionbutton={1} shadow={1} to="/contatti">Scrivici per saperne di più</ActionButtonLink>
            </Container>
          </Section>
        </StickyTop>
        <StickyBottom>
          <ZigZagBorder />
          <Footer />
        </StickyBottom>
      </StickyWrap>
    );
  }
}

Istruzioni.propTypes = {
  configuration: PropTypes.object.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  landingPage: PropTypes.shape({
    isMenuOpened: PropTypes.bool.isRequired,
  }).isRequired,
  onlandingPageToggleMenu: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
  onlandingPageToggleMenu: (enable) => {
    dispatch(landingPageToggleMenu(enable));
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  landingPage: state.get('landingPage').toJS(),
});

const IstruzioniConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const IstruzioniComposed = compose(
  IstruzioniConnect
)(Istruzioni);

export default IstruzioniComposed;
