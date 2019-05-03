/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import provideScrollPosition from 'react-provide-scroll-position';

import { cookieSet } from 'common/cookies';
import ZendeskTicket from 'containers/ZendeskTicket';
import { modalSetData } from 'containers/ModalBox/actions';
import Footer from 'components/Footer';
import LandingMenuBar from 'components/LandingMenuBar';
import LandingCard from 'components/LandingCard';
import LandingForm from 'components/LandingForm';
import { FirstSection, Section } from 'components/Section';
import Container, { ActionBox } from 'components/Container';
import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import Svg from 'components/Svg';
import icon from 'icons/globals';
import FlexBox from 'components/FlexBox';
import { Table, Tr, Td, NoteTd } from 'components/Tables';
import { H2 } from 'components/Heading';
import { ActionButtonLink } from 'components/ButtonLink';
import { ButtonStyle, ActionButtonStyle } from 'components/Button';
import Separator from 'components/Paragraph/Separator';
import media from 'style/mediainjector';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import { singleFieldRequired, atLeastNChars, singleFieldValidateEmail } from 'common/forms';
import { userDataSet } from 'containers/User/actions';
import InputField from 'components/FormElements/Field';
import AlertCookies from 'components/AlertCookies';
import AlertBanner from 'components/AlertBanner';

import viaggio from './images/viaggio.png';
import basepremium from './images/basepremium.png';
import classe from './images/classe.png';
import formazione from './images/formazione.png';
import ceaverifiche from './images/ceaverifiche.png';
import cover from './images/cover.png';

const PricingBox = styled(Container)`
  text-align: center;
`;

const BColor = '1px solid #afd2ed';

const Th = styled(Td)`
  font-weight: bold;
`;

const TdHighlight = styled(Td)`
  background-color: rgba(255, 255, 255, 0.25);
`;

const TableContainer = styled(FlexBox)`
  width: 100%;
  align-items: stretch;
  margin: 0 auto;
  padding: 20px 0 40px;
  ${media.lt768`
    flex-direction: column;
  `}
`;

const TableBlock = styled.div`
  width: 50%;
  padding:10px;
  text-align:center;
  ${media.lt768`
    width: 100%;
    `}
`;

const TableNote = styled.p`
  color: ${colore.itaca.sugar};
  font-size: 16px;
`;

const PayOff = styled(H2)`
  font-size: 2.6em;
  line-height: 45px;
  margin: 0 auto 24px;
  ${media.lt768`
    margin: 0;
  `}
  ${media.lt667`
    font-size: 2.4em;
    line-height: 1em;
  `}
`;

const PayOffBox = styled.div`
  margin:0 40px 0 0;
  align-self: baseline;
  ${media.gt667`
    max-width: 460px;
  `}
  ${media.lt667`
    margin: 10px 0 30px 0;
    h2 {
      text-align: center;
    }
    p {
      display: none;
    }
  `}
`;

const AccessBox = styled.div`
  padding:14px 20px 20px;
  min-width: 388px;
  max-width: 388px;
  text-align:center;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
  border-radius: 3px;
  ${media.lt667`
    align-self: stretch;
    min-width: 100%;
    max-width: 100%;
    button,
    a {
      font-size: 18px;
    }
  `}
  ${media.lt480`
    button,
    a {
      font-size: 16px;
    }
  `}
`;

const AccessButton = styled.a`
  ${ButtonStyle}
  ${ActionButtonStyle}
  text-decoration: none;
`;

export const atLeast3Chars = atLeastNChars(3);

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onModalSetData,
      configuration,
      landingPage: { isMenuOpened },
      onlandingPageToggleMenu,
      match: { path },
      userAppData: { hints },
      onUserCookieSet,
      modalBox: { show: isModalBoxOpened },
    } = this.props;

    const checkmark = <Svg {...icon.checkBold} fill={colore.landing.green} width="28px" height="28px" />;
    const LandingMenuComponent = /* istanbul ignore next */ ({ scrollTop }) => (
      <LandingMenuBar
        configuration={configuration}
        start={(scrollTop < 60 && !isModalBoxOpened) ? 1 : 0}
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
          <FirstSection>
            <ActionBox
              src={cover}
              bgSize="860px 290px"
              bgPosition="0 bottom"
              bgPositionMobile="left bottom"
              margin="0 auto"
            >
              <PayOffBox>
                <PayOff color={colore.itaca.sugar}>Grammatica italiana per padronanza</PayOff>
              </PayOffBox>
              <AccessBox minWidth="340px">
                <AccessButton full={1} bgcolor={colore.ui.okTxt} shadow={1} margin="10px auto" href="/h/#/login">
                  <span>Accedi</span>
                </AccessButton>
                <AccessButton full={1} bgcolor={colore.itaca.brand} shadow={1} margin="5px auto 0" href="/h/#/registration">Registrati</AccessButton>
                <Separator text="O" color={colore.itaca.sugar} />
                <ActionButtonLink full={1} bgcolor={colore.actions.help} shadow={1} margin="5px auto 0" to="/istruzioni">Istruzioni per l’acquisto</ActionButtonLink>
              </AccessBox>
            </ActionBox>
          </FirstSection>
          <Section bgColor={colore.itaca.brand}>
            <LandingCard
              titleColor="#FFF"
              color="rgb(0, 0, 0)"
              src={viaggio}
              action={{
                text: 'Scopri di più',
                link: '/itaca-academy',
              }}
              title="La lingua è un viaggio"
              body={'<p>Conoscere è sempre <em>riconoscere</em>. Itaca ti insegna a riconoscere la grammatica nella lingua che usi tutti i giorni e vedere l’italiano in una prospettiva diversa, più leggera. Così le tue parole impareranno ad andare lontano :)</p>'}
            />
          </Section>
          <Section bgColor={colore.itaca.sugar}>
            <LandingCard
              color="rgb(0, 0, 0)"
              titleColor="#fff"
              src={formazione}
              action={{
                text: 'Scopri di più',
                link: '/formazione',
              }}
              title="Novità 2019: formazione Itaca per i docenti"
              body={'<p>Da settembre a giugno il team di Itaca organizza il corso <strong>L’apprendimento per padronanza nella didattica della lingua italiana al biennio</strong> (accredito SOFIA 26185). Un’occasione unica per provare la piattaforma, approfondirne la metodologia e aggiornarsi sulla didattica della disciplina attraverso prove in classe e confronto dei dati.</p>'}
            />
          </Section>
          <Section bgColor="rgb(167, 190, 192)">
            <LandingCard
              color="rgb(0, 0, 0)"
              titleColor="#fff"
              src={ceaverifiche}
              title="Itaca Papers (creaverifiche)"
              body={'<p>Con il cartaceo di Itaca arriva anche il <em>creaverifiche</em>: uno strumento fruibile da qualunque dispositivo, pensato per la creazione di verifiche cartacee personalizzate, con un pacchetto di oltre 800 esercizi che il docente può assemblare o modificare secondo le proprie esigenze. Se hai già un account docente su Itaca online, puoi iniziare a esplorare Itaca Papers aprendolo dal pulsante dedicato nel menu principale di Itaca. L’intero sillabo sarà disponibile per i docenti che adotteranno cartaceo + digitale.</p>'}
            />
          </Section>
          <Section bgColor={colore.landing.grey}>
            <LandingCard
              color={colore.ui.txt}
              titleColor={colore.itaca.brand}
              src={classe}
              actionButton={{
                text: 'Richiedi un codice classe*',
                props: {
                  bgcolor: colore.itaca.brand,
                },
                richiediCodice: () => onModalSetData({
                  contenuto: (
                    <ZendeskTicket
                      ticketData={{
                        provenienza: 'landing Itaca',
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
              title="Prova Itaca nella tua classe"
              body={'<p>Itaca si adatta automaticamente alle risposte degli studenti, somministrando a ciascuno tanti esercizi quanti servono per raggiungere l’obiettivo che tu hai prefissato. Entra nella nostra community, prova Itaca nella tua classe!</p>'}
              footNote={{
                text: '* Modulo riservato ai docenti',
                color: colore.itaca.brand,
              }}
            />
          </Section>
          <Section bgColor="#fff">
            <LandingCard
              titleColor={colore.itaca.sugar}
              src={basepremium}
              title="Itaca Base e Premium"
              body={'<p>Itaca contempla due profili per gli studenti, <strong>base</strong> e <strong>premium</strong>.</p><p>Il profilo <strong>base</strong> di Itaca è <strong>gratuito</strong> e aperto a tutti. Con un profilo base, lo studente può affrontare individualmente le singole unità che compongono una missione. Completando tutte le unità di una missione, sblocca la missione successiva. Per ottenere un profilo base basta registrarsi gratuitamente.</p><p>Il profilo <strong>premium</strong> di Itaca consente l’associazione dello studente a una classe e l’accesso ai contenuti e ai servizi a pagamento (sblocco di unità non sequenziali, verifiche, report sugli errori ecc.), sotto la guida del proprio docente. I docenti possono richiedere un periodo di prova gratuito della versione premium per le proprie classi.</p>'}
            />
          </Section>
          <Section
            bgColor="#fff"
            direction="column"
            padding="0 50px 50px"
            paddingmobile="0 20px 30px"
          >
            <PricingBox>
              <H2 color={colore.itaca.sugar} margin="0">Profili a confronto</H2>
              <TableContainer>
                <Table fixed pricing bgcolor={colore.itaca.sugar}>
                  <tbody>
                    <Tr fullBg Bg={colore.landing.grey}>
                      <Th>FUNZIONI</Th>
                      <Th>BASE</Th>
                      <Th>PREMIUM</Th>
                    </Tr>
                    <Tr Bb={BColor}>
                      <TdHighlight Br={BColor}><strong>Esercizi</strong></TdHighlight>
                      <Td Br={BColor}>{checkmark}</Td>
                      <Td>{checkmark}</Td>
                    </Tr>
                    <Tr Bb={BColor}>
                      <TdHighlight Br={BColor}><strong>Registro di classe</strong></TdHighlight>
                      <Td Br={BColor}> – </Td>
                      <Td>{checkmark}</Td>
                    </Tr>
                    <Tr Bb={BColor}>
                      <TdHighlight Br={BColor}><strong>Sblocco unità non sequenziali</strong></TdHighlight>
                      <Td Br={BColor}> – </Td>
                      <Td>{checkmark}</Td>
                    </Tr>
                    <Tr Bb={BColor}>
                      <TdHighlight Br={BColor}><strong>Verifiche</strong></TdHighlight>
                      <Td Br={BColor}> – </Td>
                      <Td>{checkmark}</Td>
                    </Tr>
                    <Tr>
                      <TdHighlight Br={BColor}><strong>Reportistica</strong></TdHighlight>
                      <Td Br={BColor}> – </Td>
                      <Td>{checkmark}</Td>
                    </Tr>
                  </tbody>
                </Table>
              </TableContainer>
              <H2 id="prezzi" color={colore.itaca.sugar} margin="0">I profili Premium sono disponibili in due formule:</H2>
              <AlertBanner margin="20px auto 0" border bgcolor={colore.ui.note}>
                <div>
                  <H2 margin="12px auto">Licenza Summer School 2019</H2>
                  <span>Dal 1° aprile al 31 maggio è acquistabile la licenza Premium estiva di Itaca<br className="mediumUp" /> al prezzo di 5 euro a studente.</span><br /><br />
                  <small>La Summer School vale fino al 15/10/2019.</small>
                </div>
              </AlertBanner>
              <TableContainer>
                <TableBlock>
                  <Table pricing bgcolor={colore.itaca.sugar}>
                    <tbody>
                      <Tr fullBg Bg={colore.landing.grey}>
                        <Th colSpan="3">CARTA + DIGITALE (tipologia B)</Th>
                      </Tr>
                      <Tr>
                        <TdHighlight Br={BColor}></TdHighlight>
                        <TdHighlight Br={BColor}><strong>ISBN</strong></TdHighlight>
                        <TdHighlight><strong>Prezzo</strong></TdHighlight>
                      </Tr>
                      <Tr Bb={BColor}>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Volume A</strong> + <strong>B</strong> </Td>
                        <Td Br={BColor}>978-88-99053-20-8</Td>
                        <Td rowSpan="2" Bb="1px solid #fff">28,50 € </Td>
                      </Tr>
                      <Tr Bb={BColor}>
                        <NoteTd colSpan="2" Bb="1px solid #fff" Bt="1px solid #afd2ed" bgcolor="rgba(255, 255, 255, 0.1)">
                          <strong>+ licenza online biennale</strong>
                        </NoteTd>
                      </Tr>
                      <Tr Bb={BColor}>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Volume A</strong> </Td>
                        <Td Br={BColor}>978-88-99053-19-2</Td>
                        <Td rowSpan="2" Bb="1px solid #fff">20,90 € </Td>
                      </Tr>
                      <Tr Bb={BColor}>
                        <NoteTd colSpan="2" Bb="1px solid #fff" Bt="1px solid #afd2ed" bgcolor="rgba(255, 255, 255, 0.1)">
                          <strong>+ licenza online biennale</strong>
                        </NoteTd>
                      </Tr>
                      <Tr>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Volume B</strong> </Td>
                        <Td Br={BColor}>978-88-99053-34-5</Td>
                        <Td rowSpan="2" Bb="1px solid #fff">10,90 € </Td>
                      </Tr>
                      <Tr Bb={BColor}>
                        <NoteTd colSpan="2" Bb="1px solid #fff" Bt="1px solid #afd2ed" bgcolor="rgba(255, 255, 255, 0.1)">
                          <strong>+ licenza online annuale</strong>
                        </NoteTd>
                      </Tr>
                    </tbody>
                  </Table>
                  <TableNote>Richiedi una <strong>copia saggio</strong> all’agente <strong>Loescher</strong> di zona</TableNote>
                </TableBlock>
                <TableBlock>
                  <Table pricing bgcolor={colore.itaca.sugar}>
                    <tbody>
                      <Tr fullBg Bg={colore.landing.grey}>
                        <Th colSpan="3">DIGITALE (tipologia C)</Th>
                      </Tr>
                      <Tr>
                        <TdHighlight Br={BColor}></TdHighlight>
                        <TdHighlight Br={BColor}><strong>ISBN</strong></TdHighlight>
                        <TdHighlight><strong>Prezzo*</strong></TdHighlight>
                      </Tr>
                      <Tr>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Licenza online<br />annuale</strong></Td>
                        <Td Br={BColor}>978-88-99053-14-7</Td>
                        <Td>9,00 € </Td>
                      </Tr>
                    </tbody>
                  </Table>
                  <TableNote>Un anno di licenza online va da settembre dell’anno di adozione a ottobre dell’anno successivo</TableNote>
                  <TableNote>*Prezzo valido per l’a.s. 2019/2020</TableNote>
                </TableBlock>
              </TableContainer>
              <ActionButtonLink shadow={1} sectionbutton={1} bgcolor={colore.itaca.sugar} color="#fff" border="none" to="/istruzioni">Istruzioni per l’acquisto</ActionButtonLink>
            </PricingBox>
          </Section>
        </StickyTop>
        <StickyBottom>
          <AlertCookies
            show={hints.cookiesDisclaimer}
            onClickFunction={() => onUserCookieSet(
              `cookiesDisclaimer_${configuration.product}_0`,
              'false',
              hints
            )}
          />
          <Footer />
        </StickyBottom>
      </StickyWrap>
    );
  }
}

HomePage.propTypes = {
  configuration: PropTypes.object.isRequired,
  onModalSetData: PropTypes.func.isRequired,
  userAppData: PropTypes.shape({
    hints: PropTypes.object.isRequired,
  }).isRequired,
  landingPage: PropTypes.shape({
    isMenuOpened: PropTypes.bool.isRequired,
  }).isRequired,
  onlandingPageToggleMenu: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  onUserCookieSet: PropTypes.func.isRequired,
  modalBox: PropTypes.shape({
    show: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onModalSetData: (payload) => {
    dispatch(modalSetData(payload));
  },
  onlandingPageToggleMenu: (enable) => {
    dispatch(landingPageToggleMenu(enable));
  },
  onUserCookieSet: (cookieKey, payload, hints) => {
    cookieSet({ cookieKey, payload });
    dispatch(userDataSet({
      appData: {
        hints: {
          ...hints,
          cookiesDisclaimer: payload === 'true',
        },
      },
    }));
  },
});

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  landingPage: state.get('landingPage').toJS(),
  userAppData: state.get('user').toJS().appData,
  modalBox: state.get('modalBox').toJS(),
});

const homePageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const homePageComposed = compose(homePageConnect)(HomePage);

export default homePageComposed;
