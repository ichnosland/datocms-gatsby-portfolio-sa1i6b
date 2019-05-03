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
import { SkySection, Section } from 'components/Section';
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
import { BrandTxt } from 'components/Text';
import ZigZagBorder from 'components/ZigZagBorder';
import media from 'style/mediainjector';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import { singleFieldRequired, atLeastNChars, singleFieldValidateEmail } from 'common/forms';
import { userDataSet } from 'containers/User/actions';
import InputField from 'components/FormElements/Field';
import AlertBanner from 'components/AlertBanner';
import AlertCookies from 'components/AlertCookies';

import busto from './images/busto.png';
import coin from './images/coin.png';
import elefante from './images/elefante.png';
import classe from './images/classe.png';
import formazione from './images/formazione.png';
import colosseo from './images/colosseo.png';

const PricingBox = styled(Container)`
  text-align: center;
`;

// const BColor = '1px solid rgba(255, 255, 255, 0.5)';
const BColor = '1px solid #8ed5f0';

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
  color: white;
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
  max-width: 388px;
  text-align:center;
  background: rgba(255,255,255,0.70);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
  border-radius: 3px;
  ${media.lt667`
    align-self: stretch;
    max-width: 100%;
    button,
    a {
      font-size: 18px;
      padding: 12px;
    }
  `}
  ${media.lt480`
    button,
    a {
      font-size: 16px;
      padding: 12px;
    }
  `}
`;

const AccessButton = styled.a`
  ${ButtonStyle}
  ${ActionButtonStyle}
  text-decoration: none;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 13px;
  span {
    display: inline-block;
    margin: 0 auto;
    &:last-child {
      font-size: 15px;
      font-weight: 400;
    }
  }

`;

const GrassStrip = styled(FlexBox)`
width: 100%;
height: 15px;
margin: -15px auto 0;
overflow: hidden;
max-width: 860px;
${media.gt667`
  justify-content: flex-end;
`}
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
    const grasspath = <path d="M0 15C56.83 5 118.996 0 186.5 0S316.171 5 373 15H0z" fill={colore.landing.green} fillRule="evenodd" />;
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
          <SkySection direction="column">
            <ActionBox
              src={colosseo}
              bgSize="460px 284px"
              bgPosition="111% 97%"
              bgPositionMobile="center 100%"
            >
              <PayOffBox>
                <PayOff color={colore.alatin.brand}>
                  Affronta gli antichi <br className="desktopOnly" />stando al passo <br className="desktopOnly" />coi tempi
                </PayOff>
                <p className="mediumOnly">
                  Alatin è un corso di latino basato sull’apprendimento per padronanza o “Mastery Learning”: tu fissi un obiettivo, lui ti aiuta a raggiungerlo, facendoti esercitare in base alle tue reali necessità. Così risparmi tempo e ottieni il massimo dei risultati.
                </p>
              </PayOffBox>
              <AccessBox>
                <BrandTxt>Accedi</BrandTxt>
                <AccessButton full={1} bgcolor={colore.alatin.brand} shadow={1} margin="10px auto" href="/h/#/login">
                  <span>Academy</span>
                  <span>Biennio</span>
                </AccessButton>
                <AccessButton full={1} bgcolor={colore.lyceum.brand} shadow={1} margin="10px auto 5px" href="/lyceum/login">
                  <span>Lyceum</span>
                  <span>Triennio</span>
                </AccessButton>
                <Separator text="O" />
                <ActionButtonLink full={1} bgcolor="#F5A623" shadow={1} margin="5px auto 0" to="/istruzioni">Informazioni sull’acquisto</ActionButtonLink>
              </AccessBox>
            </ActionBox>
          </SkySection>
          <GrassStrip>
            <Svg
              width="373px"
              height="15px"
              viewBox="0 0 373 15"
              path={grasspath}
            />
          </GrassStrip>
          <Section bgColor={colore.landing.green}>
            <LandingCard
              titleColor="#FFF"
              color="#12334e"
              src={busto}
              action={{
                text: 'Academy',
                link: '/alatin-academy',
              }}
              secondAction={{
                text: 'Lyceum',
                link: '/alatin-lyceum',
              }}
              title="Imparare il latino per imparare a studiare"
              body={'<p>Il latino non si studia per imparare a parlare latino, ma per imparare a studiare. Alatin ti insegna il latino giocando, e così ti insegna a ragionare. Bastano pochi minuti al giorno per migliorare già dalla prima settimana.</p><h3 style="color:#239101;text-align:center;font-weight:normal">Scopri di più:</h3>'}
            />
          </Section>
          <Section bgColor={colore.alatin.brand}>
            <LandingCard
              titleColor="#fff"
              color="#12334e"
              src={elefante}
              action={{
                text: 'Guarda le testimonianze',
                link: '/testimonials',
              }}
              title="Un corso leggero per una memoria di ferro"
              body={'<p>Le lezioni di Alatin sono brevi e concentrate su poche parole per volta. In ogni lezione traduci prima dal latino all’italiano e poi dall’italiano al latino. Le versioni di Alatin sono esercizi perfetti per potenziare le abilità traduttive; le prove per competenze sono basate sulle prove di Certificazione delle competenze di Lingua Latina (CLL) della Consulta Universitaria degli Studi Latini (CUSL).</p>'}
            />
          </Section>
          <Section bgColor="#347185">
            <LandingCard
              color="rgb(178, 208, 223)"
              titleColor="#fff"
              src={formazione}
              action={{
                text: 'Scopri di più',
                link: '/formazione',
              }}
              title="Formazione Alatin per i docenti "
              body={'<p>Da settembre a giugno il team di Alatin organizza il corso <strong>Didattica del Latino per competenze</strong> (accredito SOFIA 21983), che ha superato ormai le 20 edizioni. Un’occasione unica per provare la piattaforma, approfondirne la metodologia e aggiornarsi sulla didattica della disciplina attraverso prove in classe e confronto dei dati, e anche per avvicinarsi alla nuova frontiera della Certificazione di Lingua Latina (CLL) che ha visto negli ultimi anni moltiplicare il numero degli iscritti in tutta Italia.</p>'}
            />
          </Section>
          <Section bgColor={colore.landing.orange}>
            <LandingCard
              color="#fff"
              titleColor="#F7F05C"
              src={classe}
              actionButton={{
                text: 'Richiedi un codice classe*',
                props: {
                  bone: 'true',
                },
                richiediCodice: () => onModalSetData({
                  contenuto: (
                    <ZendeskTicket
                      ticketData={{
                        provenienza: 'landing',
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
              title="Prova Alatin nella tua classe"
              body={'<p>Ogni mese 20 mila studenti di liceo italiani fanno i compiti su Alatin. Il suo metodo “per padronanza” si adatta automaticamente alle loro necessità e somministra a ciascuno tanti esercizi quanti servono per raggiungere l’obiettivo che tu hai prefissato. Entra nella nostra community. Prova Alatin nella tua classe.</p>'}
              footNote={{
                text: '* Modulo riservato ai docenti',
                color: '#fff',
              }}
            />
          </Section>
          <Section bgColor={colore.landing.grey}>
            <LandingCard
              titleColor={colore.alatin.brand}
              src={coin}
              title="Alatin Base e Premium"
              body={'<p>Alatin Academy contempla due profili per gli studenti, <strong>base</strong> e <strong>premium</strong>.</p><p>Il profilo <strong>base</strong> di Alatin Academy è <strong>gratuito</strong> e aperto a tutti. Con un profilo base, lo studente può affrontare individualmente le singole unità che compongono una missione (unità grammaticali, versioni o prove per competenze). Per ottenere un profilo base basta registrarsi gratuitamente.</p><p>I profili <strong>premium</strong> di Alatin Academy e Lyceum consentono l’associazione dello studente a una classe e l’accesso ai contenuti e ai servizi a pagamento (sblocco di unità non sequenziali, versioni, verifiche, report sugli errori ecc.), sotto la guida del proprio docente.</p>'}
            />
          </Section>
          <Section bgColor={colore.alatin.brand} direction="column">
            <PricingBox>
              <H2 color="#fff" margin="0">Profili a confronto</H2>
              <TableContainer>
                <Table fixed pricing>
                  <tbody>
                    <Tr fullBg>
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
                      <TdHighlight Br={BColor}><strong>Versioni</strong></TdHighlight>
                      <Td Br={BColor}> – </Td>
                      <Td>{checkmark}</Td>
                    </Tr>
                    <Tr Bb={BColor}>
                      <TdHighlight Br={BColor}><strong>Prove per competenza</strong></TdHighlight>
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
              <H2 id="prezzi" color="#fff" margin="0">I profili Premium sono disponibili in due formule:</H2>
              <AlertBanner shadow margin="20px auto 0" bgcolor={colore.ui.note}>
                <div>
                  <H2 margin="12px auto">Licenza Summer School 2019</H2>
                  <span>Dal 1° aprile al 31 maggio è acquistabile la licenza Premium estiva di Alatin e Lyceum<br className="mediumUp" /> al prezzo di 8 euro a studente.</span><br /><br />
                  <small>La Summer School vale fino al 15/10/2019.</small>
                </div>
              </AlertBanner>
              <TableContainer>
                <TableBlock>
                  <Table pricing>
                    <tbody>
                      <Tr fullBg>
                        <Th colSpan="3">CARTA + DIGITALE (tipologia B)</Th>
                      </Tr>
                      <Tr>
                        <TdHighlight Br={BColor}></TdHighlight>
                        <TdHighlight Br={BColor}><strong>ISBN</strong></TdHighlight>
                        <TdHighlight><strong>Prezzo</strong></TdHighlight>
                      </Tr>
                      <Tr Bb={BColor}>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Laboratorio 1</strong> </Td>
                        <Td Br={BColor}>978-88-99053-05-5</Td>
                        <Td rowSpan="2" Bb="1px solid #fff"><strong>23,90 €</strong></Td>
                      </Tr>
                      <Tr Bb={BColor}>
                        <NoteTd colSpan="2" Bb="1px solid #fff" Bt="1px solid #8ed5f0" bgcolor="rgba(255, 255, 255, 0.1)">
                          <strong>+ licenza online annuale</strong>
                        </NoteTd>
                      </Tr>
                      <Tr Bb={BColor}>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Laboratorio 2</strong></Td>
                        <Td Br={BColor}>978-88-99053-22-2</Td>
                        <Td rowSpan="2" Bb="1px solid #fff"><strong>23,90 €</strong></Td>
                      </Tr>
                      <Tr Bb={BColor}>
                        <NoteTd colSpan="2" Bb="1px solid #fff" Bt="1px solid #8ed5f0" bgcolor="rgba(255, 255, 255, 0.1)">
                          <strong>+ licenza online triennale</strong>
                        </NoteTd>
                      </Tr>
                      <Tr>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Lyceum</strong> </Td>
                        <Td Br={BColor}>978-88-99053-16-1</Td>
                        <Td rowSpan="2" Bb="1px solid #fff"><strong>21,00 €</strong></Td>
                      </Tr>
                      <Tr Bb={BColor}>
                        <NoteTd colSpan="2" Bb="1px solid #fff" Bt="1px solid #8ed5f0" bgcolor="rgba(255, 255, 255, 0.1)">
                          <strong>+ licenza online triennale</strong>
                        </NoteTd>
                      </Tr>
                    </tbody>
                  </Table>
                  <TableNote>Richiedi una <strong>copia saggio</strong> all’agente <strong>Loescher</strong> di zona</TableNote>
                </TableBlock>
                <TableBlock>
                  <Table pricing>
                    <tbody>
                      <Tr fullBg>
                        <Th colSpan="3">DIGITALE (tipologia C)</Th>
                      </Tr>
                      <Tr>
                        <TdHighlight Br={BColor}></TdHighlight>
                        <TdHighlight Br={BColor}><strong>ISBN</strong></TdHighlight>
                        <TdHighlight><strong>Prezzo</strong></TdHighlight>
                      </Tr>
                      <Tr Bb={BColor}>
                        <Td rowSpan="2" Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Laboratorio 1 e 2</strong></Td>
                        <Td rowSpan="2" Br={BColor}>978-88-99053-01-7</Td>
                        <Td Bb={BColor}><strong>12,00 €</strong></Td>
                      </Tr>
                      <Tr Bb={BColor}>
                        <Td><strong>12,00 €</strong></Td>
                      </Tr>
                      <Tr>
                        <Td Br={BColor} bgcolor="rgba(0, 0, 0, 0.05)"><strong>Lyceum</strong> </Td>
                        <Td Br={BColor}>978-88-99053-27-7</Td>
                        <Td><strong>12,00 €</strong></Td>
                      </Tr>
                      <Tr>
                        <NoteTd colSpan="3" Bt="1px solid #8ed5f0" bgcolor="rgba(255, 255, 255, 0.1)"><strong>licenze online annuali</strong></NoteTd>
                      </Tr>
                    </tbody>
                  </Table>
                  <TableNote>Un anno di licenza online va da settembre dell’anno di adozione a ottobre dell’anno successivo</TableNote>
                </TableBlock>
              </TableContainer>
              <ActionButtonLink sectionbutton={1} bgcolor={colore.landing.grey} color="#0085b2" border="none" to="/istruzioni">Istruzioni per l’acquisto</ActionButtonLink>
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
          <ZigZagBorder />
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
