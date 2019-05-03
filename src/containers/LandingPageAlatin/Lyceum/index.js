/*
 *
 * Lyceum
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import provideScrollPosition from 'react-provide-scroll-position';
import styled from 'styled-components';

import { StickyTop, StickyBottom } from 'components/StickyFooter';
import { Section } from 'components/Section';
import Container from 'components/Container';
import LandingMenuBar from 'components/LandingMenuBar';
import LandingCard from 'components/LandingCard';
import { H1, H2, H4 } from 'components/Heading';
import { ActionButtonLink } from 'components/ButtonLink';
import { DesktopImage, MobileImage } from 'components/RespImg';
import FlexBox from 'components/FlexBox';
import { Table, Tr, Td } from 'components/Tables';
import Footer from 'components/Footer';
import { colore } from 'style/color';
import media from 'style/mediainjector';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import libriLyceum from './images/libri-lyceum.png';
import analizzaDesktop from './images/analizza-desktop.png';
import analizzaMobile from './images/analizza-mobile.png';
import traduzioneDesktop from './images/traduzione-desktop.png';
import traduzioneMobile from './images/traduzione-mobile.png';
import piechartDesktop from './images/pie-chart-lyceum-desktop.png';
import piechartMobile from './images/pie-chart-lyceum-mobile.png';
import lezioneTeoricaDesktop from './images/lezione-teorica-desktop.png';
import lezioneTeoricaMobile from './images/lezione-teorica-mobile.png';
import reportisticaBarreDesktop from './images/reportistica-barre-desktop.png';
import reportisticaBarreMobile from './images/reportistica-barre-mobile.png';
import reportisticaTraduzioneDesktop from './images/reportistica-traduzione-desktop.png';
import reportisticaTraduzioneMobile from './images/reportistica-traduzione-mobile.png';
import versioneDesktop from './images/versione-desktop.png';
import versioneMobile from './images/versione-mobile.png';
import predicati from './images/predicati.png';

const Th = styled(Td)`
  background-color: rgba(165, 195, 242, 0.5);
`;

const Tlat = styled(Td)`
  border-right: 1px solid ${colore.landing.dark};
`;

const Tbot = styled(Tr)`
  border-bottom: 1px solid ${colore.landing.dark};
`;

const TableContainer = styled(FlexBox)`
  width: 100%;
  align-items: stretch;
  margin: 0 auto;
  padding: 20px 0;
  ${media.lt768`
    flex-direction: column;
  `}
`;

export class Lyceum extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
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
      <div>
        <StickyTop>
          <WrappedLandingMenuBar />
          <Section first bgColor={colore.lyceum.brand}>
            <Container>
              <H1 margin="20px 0 -30px" color="#fff">Lyceum</H1>
            </Container>
          </Section>
          <Section padding="0 50px 50px" bgColor={colore.lyceum.brand}>
            <LandingCard
              title="Una nuova proposta didattica"
              titleColor="#fff"
              color="#fff"
              flexorder={2}
              src={libriLyceum}
              body={'<p>Alatin Lyceum nasce nel solco dell’esperienza di Alatin Academy, un punto di riferimento quotidiano per oltre 15.000 studenti italiani del primo biennio del liceo che si avvicinano al latino.</p><p>Alatin Lyceum condivide di quell’esperienza la carica innovativa; l’idea di sperimentare strade nuove, l’ambizione di offrire ai docenti e agli studenti strumenti diversi per interpretare in chiave più moderna il processo di insegnamento-apprendimento della lingua latina senza mai snaturarlo nelle sue radici formative più profonde, con lo scopo di renderlo, invece, più funzionale alle esigenze di una scuola in costante e deciso cambiamento.</p><p>Alatin Lyceum recepisce nel suo impianto metodologico diversi spunti di riflessione sulla didattica del latino e sulla pratica del testo estremamente attuali, che arrivano dalle scuole aderenti alle prime sperimentazioni nell’ambito della certificazione del Latino, sulla scorta delle certificazioni di lingue vive, dal mondo accademico, attraverso la <strong>Consulta Universitaria per gli Studi Latini</strong> (<a href="http://www.cusl.eu" target="_blank">CUSL</a>), e dagli ambienti del MIUR.</p>'}
            />
          </Section>
          <Section bgColor={colore.landing.grey}>
            <Container>
              <H2 color={colore.lyceum.brand} margin="0">Struttura del corso</H2>
              <p>Alatin Lyceum è articolato in <strong>6 livelli principali</strong>, a loro volta scanditi in <strong>61 missioni complessive</strong>:</p>
              <ol>
                <li>completamento e ripasso della morfosintassi (missioni 1-20)</li>
                <li>autori dell’età repubblicana (missioni 22-30)</li>
                <li>autori dell’età augustea (missioni 31-37)</li>
                <li>autori dell’età imperiale (missioni 38-52)</li>
                <li>testi scientifici (missioni 53-60)</li>
                <li>il latino moderno (missione 61)</li>
              </ol>
              <p>Ciascuna missione comprende, in misura variabile, <strong>due tipologie di prove</strong> distinte, potenzialmente sequenziali ma in realtà indipendenti, e dunque assegnabili alla classe singolarmente, a seconda delle necessità del docente. La missione può essere introdotta da una breve lezione teorica di argomento grammaticale (es. “L’uso dei modi indefiniti - Il participio”), o da un profilo d’autore.</p>
              <DesktopImage src={lezioneTeoricaDesktop} />
              <MobileImage src={lezioneTeoricaMobile} />
              <H4 color="#000">Analisi e traduzione</H4>
              <p>La prima tipologia di prova, <strong>“Analisi e traduzione”</strong>, propone una sequenza di quesiti finalizzati all’analisi dei meccanismi morfosintattici del passo, che culmina nella traduzione come momento finale, sulla falsariga di quanto già sperimentato da Alatin Academy. In questo modo la decodifica del testo latino che Alatin on-line propone è sempre preceduta da una serie di passaggi organici, che attraverso i diversi livelli del passo, quello sintattico, quello morfologico e quello semantico permettono allo studente di giungere a una comprensione del testo impossibile con qualunque altro tipo di strumento digitale.</p>
              <DesktopImage src={versioneDesktop} />
              <MobileImage src={versioneMobile} />
              <DesktopImage src={analizzaDesktop} />
              <MobileImage src={analizzaMobile} />
              <DesktopImage src={traduzioneDesktop} />
              <MobileImage src={traduzioneMobile} />
              <H4 color="#000">La Certificazione delle competenze di lingua latina (CLL)</H4>
              <p>Il modello di analisi proposto da Alatin Lyceum si basa in larga parte sulle ricerche condotte dalla <strong>Consulta Universitaria di Studi latini</strong> (CUSL), già dal 2012, sui modelli di Certificazione delle competenze di Lingua Latina. Gli studiosi che afferiscono alla CUSL hanno definito tali modelli di esercizio, distinti per livello, <strong>A1</strong>, <strong>A2</strong>, <strong>B1</strong>, <strong>B2</strong> sulla base di quelli che sono stati somministrati agli studenti di alcune regioni pilota (Lombardia, Liguria, Emilia Romagna, Sicilia), nel corso dell’ultimo quinquennio.</p>
              <p>Dopo una riflessione attenta su questo materiale, nella convinzione dell’utilità didattica degli schemi di analisi definiti dalla Consulta e ancora prima dai licei che hanno per primi sperimentato forme di certificazione nelle regioni pilota, il team e gli autori di Alatin hanno deciso di sposare le basi metodologiche di queste prove. I docenti, pertanto, ritroveranno le linee di indirizzo di questi modelli in tutte le didattiche del secondo tipo, indicate sulla dashboard come <strong>“Prova per competenze”</strong>, corredate del relativo livello di certificazione (A o B).</p>
              <H4 color="#000">Le prove per competenze di Alatin Lyceum</H4>
              <p>Il sillabo pubblicato recentemente dalla CUSL si ispira alla struttura del QCER, il quadro europeo della certificazione linguistica, che prevede 3 livelli (A, B, C) divisi in due sottolivelli (1 e 2). Rispetto al QCER, il sillabo CUSL non prevede gli ultimi due livelli in ordine di difficoltà, C1 e C2, per l’ovvia ragione che in questi due livelli la certificazione delle lingue vive riguarda soprattutto la competenza attiva (scritta e orale), che non si considera in genere come obiettivo didattico nello studio della lingua latina.</p>
              <p>Le prove di Lyceum riprendono la distinzione in due macrolivelli A e B, che condividono, seppure a diversa gradazione, le medesime competenze.</p>
              <p>Entrambi i livelli toccano due aree di riferimento, la <strong>comprensione globale</strong> e la <strong>comprensione analitica</strong>, che a sua volta può essere strutturata in <strong>competenza lessicale</strong> o <strong>morfosintattica</strong>, quest’ultima anche “attiva”, intesa cioè come capacità di trasformare un costrutto o un’espressione latina ricorrendo a una diversa struttura sintattica.</p>
              <DesktopImage src={piechartDesktop} />
              <MobileImage src={piechartMobile} />
              <p>A seconda del livello indicato, la prova si rifà a <strong>due modelli</strong> di base:</p>
              <TableContainer>
                <Table fixed neutral>
                  <tbody>
                    <Tbot>
                      <Th>
                        <strong>LIVELLO A</strong>
                      </Th>
                      <Th>
                        <strong>LIVELLO B</strong>
                      </Th>
                    </Tbot>
                    <Tbot>
                      <Tlat>
                        <strong>Comprensione globale</strong>
                        <ul>
                          <li>Indica il titolo latino più adatto a caratterizzare il tema del passo</li>
                          <li>Scegli la sequenza che corrisponde allo sviluppo del testo</li>
                          <li>Individua la tipologia testuale prevalente</li>
                        </ul>
                      </Tlat>
                      <Td>
                        <strong>Comprensione globale</strong>
                        <ul>
                          <li>Completa le seguenti frasi (completamento di parafrasi)</li>
                          <li>Individua il punto di snodo / nuclei concettuali, le affermazioni forti / fondamentali del testo</li>
                          <li>Verifica le seguenti affermazioni (in latino)</li>
                          <li>Domanda su figure retoriche (dove possibile)</li>
                        </ul>
                      </Td>
                    </Tbot>
                    <Tbot>
                      <Tlat>
                        <strong>Competenza morfosintattica</strong>
                        <ul>
                          <li>Indica il valore del costrutto/dell’espressione</li>
                          <li>Analizza il periodo</li>
                        </ul>
                      </Tlat>
                      <Td>
                        <strong>Comprensione analitica (livello lessicale)</strong>
                        <ul>
                          <li>Indica il significato corretto del termine</li>
                        </ul>
                      </Td>
                    </Tbot>
                    <Tbot>
                      <Tlat>
                        <strong>Competenza m­orfosintattica attiva</strong>
                        <ul>
                          <li>Trasforma il costrutto / l’espressione</li>
                        </ul>
                      </Tlat>
                      <Td>
                        <strong>Comprensione analitica (livello sintattico)</strong>
                        <ul>
                          <li>Analizza il periodo (o domanda su struttura sintattica)</li>
                          <li>Indica la funzione (domanda su connettivi)</li>
                          <li>Domanda su rimandi anaforici</li>
                          <li>Trasforma il costrutto / l’espressione (competenza morfosintattica attiva)</li>
                        </ul>
                      </Td>
                    </Tbot>
                    <Tbot>
                      <Tlat>
                        <strong>Competenza lessicale</strong>
                        <ul>
                          <li>Indica il significato del termine</li>
                        </ul>
                      </Tlat>
                      <Td></Td>
                    </Tbot>
                    <Tbot>
                      <Tlat>
                        <strong>Comprensione analitica</strong>
                        <ul>
                          <li>Domanda in latino</li>
                        </ul>
                      </Tlat>
                      <Td></Td>
                    </Tbot>
                  </tbody>
                </Table>
              </TableContainer>
              <p>Trattandosi di schede pensate per il lavoro a casa o in classe, e che dunque consentono l’uso del dizionario, abbiamo preferito non fare uso di glosse lessicali di appoggio, né fare riferimento tutte le volte a un lessico frequenziale specifico, come invece previsto dalle prove di certificazione, dove <em>non è consentito</em> l’uso del dizionario.</p>
              <p>Al tempo stesso, <strong>ogni prova per competenze su Alatin Lyceum è sempre preceduta e accompagnata da quella di analisi e traduzione</strong>, che funge proprio da strumento di appoggio a livello di comprensione globale e analitica e da traduzione di “servizio” per la prova per competenze.</p>
              <p>In questo modo, il docente può sempre scegliere, sulla base dei tempi e del carico di lavoro che reputa più opportuno, di assegnare le due prove in coppia o singolarmente, a seconda che sul testo scelga di prediligere un approccio più o meno guidato dal supporto della piattaforma.</p>
              <H4 color="#000">La valutazione</H4>
              <p>Entrambe le tipologie di prove condividono la medesima reportistica, sfruttabile su diversi piani, dal colpo d’occhio all’osservazione analitica.</p>
              <p>Di ogni esercizio, sia questo versione o prova per competenze, viene analizzato l’approccio dei ragazzi a più livelli: individuale, di classe, in rapporto con la media nazionale.</p>
              <p>I grafici consentono un primo colpo d’occhio sulla prova, presa singolarmente (grafico a torta) e nel tempo (grafico a istogrammi o a curva, questi ultimi con un utilissimo confronto della classe con la media nazionale).</p>
              <p>Sotto i grafici Alatin riporta una correzione completa dell’esercizio, domanda per domanda. Il docente, usando i filtri che trova sulla colonna di sinistra, può scegliere se visualizzare la correzione per “tutta la classe” o per singolo studente.</p>
              <p>Nel primo caso, i colori che rappresentano l’andamento delle domande possono essere tre: verde per le domande a cui la maggioranza degli studenti ha risposto correttamente, giallo nel caso in cui almeno la metà degli studenti ha risposto correttamente, rosso in caso contrario.</p>
              <DesktopImage src={reportisticaBarreDesktop} />
              <MobileImage src={reportisticaBarreMobile} />
              <p>Un sistema di menu a tendina permette di aprire il dettaglio delle risposte e degli studenti che le hanno fornite. Tale sistema consente di monitorare la correzione di ogni verifica concentrandosi solo sulle domande che sono risultate più problematiche, tralasciando quelle a cui la maggioranza della classe ha risposto correttamente.</p>
              <DesktopImage src={predicati} />
              <MobileImage src={predicati} />
              <p>Selezionando il nominativo dello studente sulla colonna di sinistra, Alatin fornisce la situazione dello stesso, sia per ciò che riguarda l’andamento nel tempo, dove una terza colonna in verde, relativa allo studente, compare nel grafico a istogrammi, consentendo di osservarne i risultati delle varie prove in confronto alla classe e alla media nazionale; sia per il dettaglio delle domande (e della traduzione nel caso delle versioni), che ovviamente saranno solo due tipi: corrette (in verde) e sbagliate (in rosso).</p>
              <DesktopImage src={reportisticaTraduzioneDesktop} />
              <MobileImage src={reportisticaTraduzioneMobile} />
              <p>In alto a destra sulla pagina, un tasto con l’icona della stampante consente di stampare ed archiviare eventualmente il report, nel caso di tratti di una prova di verifica in classe, fermo restando che ciascuno studente, al momento del ritiro del compito da parte del docente riceve già, in tempo reale, il report relativo al proprio compito.</p>
            </Container>
          </Section>
          <Section bgColor={colore.landing.grey} padding="0 50px 50px" paddingmobile="0 20px 30px">
            <Container align="center">
              <ActionButtonLink margin="0 auto" bgcolor={colore.landing.orange} sectionbutton={1} shadow={1} to="/contatti">Scrivici per saperne di più</ActionButtonLink>
            </Container>
          </Section>
        </StickyTop>
        <StickyBottom>
          <Footer />
        </StickyBottom>
      </div>
    );
  }
}

Lyceum.propTypes = {
  configuration: PropTypes.object.isRequired,
  landingPage: PropTypes.shape({
    isMenuOpened: PropTypes.bool.isRequired,
  }).isRequired,
  onlandingPageToggleMenu: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  landingPage: state.get('landingPage').toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  onlandingPageToggleMenu: (enable) => {
    dispatch(landingPageToggleMenu(enable));
  },
});

const LyceumConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const LyceumComposed = compose(LyceumConnect)(Lyceum);

export default LyceumComposed;
