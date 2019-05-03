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
import Footer from 'components/Footer';
import { singleFieldRequired, atLeastNChars, singleFieldValidateEmail } from 'common/forms';
import InputField from 'components/FormElements/Field';
import Svg from 'components/Svg';
import menuIcon from 'icons/menuIcons';
import { colore } from 'style/color';
import media from 'style/mediainjector';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import docente from './images/docente.png';
import studentepremium from './images/studentepremium.png';
import digitale from './images/digitalFirst.png';

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

const Ul = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const DashedBox = styled.div`
    color: black;
    text-align: center;
    padding: 10px;
    border: 2px dashed #fff;
    border-radius: 9px;
    div {
      padding: 10px 30px;
      background-color: ${colore.itaca.subtle};
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
              title="Docente"
              color="#12334e"
              src={docente}
              actionButton={{
                text: 'Richiedi un codice classe*',
                props: {
                  bgcolor: colore.itaca.brand,
                  shadow: 'true',
                },
                richiediCodice: () => onModalSetData({
                  contenuto: (
                    <ZendeskTicket
                      ticketData={{
                        provenienza: 'landing_itaca_istruzioni',
                        titolo: 'Richiesta codice classe',
                        tipologia: 'comunicazione',
                      }}
                      formConfiguration={{
                        component: LandingForm,
                        props: {
                          formtitle: 'Richiesta codice classe',
                          itaca: true,
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
              body={'<p>Il docente ha libero accesso ai contenuti di Itaca. Può richiedere un profilo docente e la creazione di una classe compilando il modulo qui sotto. Per affiancare alla versione digitale anche il compendio cartaceo è necessario richiederne una copia saggio all’agente Loescher di zona.</p>'}
              footNote={{
                text: '* Modulo riservato ai docenti',
                color: colore.itaca.sugar,
              }}
            />
          </Section>
          <Section bgColor={colore.itaca.sugar} direction="column">
            <SubLandingCard
              src={studentepremium}
              dashed
              alignThumb="flex-start"
            >
              <H2 color="#fff" margin="0">Studente Premium</H2>
              <P>Si può attivare un profilo studente <strong>premium</strong> acquistando <strong>cartaceo + digitale</strong> o la sola versione <strong>digitale</strong>.</P>
              <Warning><strong><BrandTxt>Nota bene:</BrandTxt></strong>
                <Ul>
                  <li>per tutte le operazioni di acquisto o sblocco è necessaria la registrazione online;</li>
                  <li>lo studente dovrebbe acquistare una licenza Premium solo se l’uso di Itaca è stato concordato con il docente della classe; per lavorare in autoapprendimento è sufficiente la versione base gratuita.</li>
                </Ul> 
              </Warning>
            </SubLandingCard>
            <SubLandingCard single dashed>
              <H3 color="black" margin="0">Cartaceo + digitale</H3>
              <P>Se hai già acquistato il <strong>cartaceo</strong>:</P>
              <ol>
                <li>
                  <P><a className="text-link" href="https://itaca.academy/h/#/registration" target="_blank">registrati sul sito</a></P>
                </li>
                <li>
                  <P>clicca sul pulsante tondo con l’ago della bussola <Svg {...menuIcon.circleItaca} width="18px" height="18px" /> che si trova nella pagina principale e scegli la voce “Premium”</P>
                </li>
                <li>
                  <P>inserisci il codice di sblocco che si trova sul frontespizio del libro cartaceo</P>
                </li>
                <li>
                  <P>clicca nuovamente sul pulsante <Svg {...menuIcon.circleItaca} width="18px" height="18px" />, scegli la voce “Classi” e inserisci il codice classe che ti fornisce il tuo docente (es. Rossi1234)</P>
                </li>
              </ol>
              <Warning><strong><ColorTxt color={colore.actions.error}>Attenzione:</ColorTxt></strong> ogni libro ha un codice di sblocco per la parte digitale. Se acquisti un libro di seconda mano, il codice potrebbe non essere più valido; in questo caso dovrai acquistare una nuova licenza online.</Warning>
            </SubLandingCard>
            <SubLandingCard
              src={digitale}
              alignThumb="flex-start"
            >
              <H3 color="black" margin="0">Digitale</H3>
              <P>Se vuoi acquistare il <strong>digitale</strong>:</P>
              <ol>
                <li>
                  <P><a className="text-link" href="https://itaca.academy/h/#/registration" target="_blank">registrati sul sito</a></P>
                </li>
                <li>
                  <P>clicca sul pulsante tondo con l’ago della bussola <Svg {...menuIcon.circleItaca} width="18px" height="18px" /> che si trova nella pagina principale e scegli la voce “Premium”</P>
                </li>
                <li>
                  <P>clicca sul pulsante “Paypal” e procedi al pagamento della quota tramite carta di credito o account Paypal; lo sblocco dell’account avverrà in automatico.</P>
                </li>
              </ol>
              <P>Dopo aver attivato una licenza potrai <strong>associarti alla classe</strong>:</P>
              <ol>
                <li><P>clicca sul pulsante <Svg {...menuIcon.circleItaca} width="18px" height="18px" /></P></li>
                <li><P>scegli la voce “Classi”</P></li>
                <li><P>inserisci il codice classe che ti fornisce il tuo docente (es. Rossi1234).</P></li>
              </ol>
            </SubLandingCard>
            <Container>
              <DashedBox>
                <div>
                  <p>L’abbonamento al digitale si può acquistare anche in <strong>un’unica soluzione per tutta la classe</strong>, previa raccolta delle quote, tramite <strong>bonifico</strong> intestato a:</p>
                  <p>MAIEUTICAL LABS SRL<br />presso BCC, Banca di Casalgrasso e Sant’Albano Stura<br />IBAN IT33P0883301003000200100529</p>
                  <p><strong>È necessario specificare nella causale il codice (o i codici) classe.</strong></p>
                </div>
              </DashedBox>
            </Container>
          </Section>
          <Section bgColor={colore.itaca.sugar} padding="0 50px 50px" paddingmobile="0 20px 20px">
            <Container align="center">
              <ActionButtonLink bgcolor="#fff" color={colore.itaca.sugar} sectionbutton={1} shadow={1} to="/contatti">Scrivici per saperne di più</ActionButtonLink>
            </Container>
          </Section>
        </StickyTop>
        <StickyBottom>
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
