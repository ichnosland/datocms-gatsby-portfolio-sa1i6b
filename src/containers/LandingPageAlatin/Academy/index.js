/*
 *
 * Academy
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import provideScrollPosition from 'react-provide-scroll-position';

import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import { Section } from 'components/Section';
import Container from 'components/Container';
import SubLandingCard from 'components/LandingCard/SubLandingCard';
import { H1, H2, H4 } from 'components/Heading';
import ZigZagBorder from 'components/ZigZagBorder';
import { ActionButtonLink } from 'components/ButtonLink';
import { DesktopImage, MobileImage } from 'components/RespImg';
import LandingMenuBar from 'components/LandingMenuBar';
import Footer from 'components/Footer';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import libro from './images/libro.png';
import dashboardDesktop from './images/dashboard-desktop.png';
import lessicoDesktop from './images/lessico-desktop.png';
import lezioneDesktop from './images/lezione-desktop.png';
import andamentoDesktop from './images/andamento-desktop.png';
import reportisticaDesktop from './images/reportistica-desktop.png';
import dashboardMobile from './images/dashboard-mobile.png';
import lessicoMobile from './images/lessico-mobile.png';
import lezioneMobile from './images/lezione-mobile.png';
import andamentoMobile from './images/andamento-mobile.png';
import reportisticaMobile from './images/reportistica-mobile.png';

export class Academy extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      <StickyWrap>
        <StickyTop>
          <WrappedLandingMenuBar />
          <Section first bgColor={colore.alatin.brand}>
            <SubLandingCard
              src={libro}
              flexorder={2}
              color="#fff"
            >
              <H1 color="#fff" margin="0">Alatin Academy</H1>
              <p>Alatin è un corso di lingua basato sull’apprendimento per padronanza o <strong>“Mastery Learning”</strong>. Il docente non assegna un compito, bensì un obiettivo comune a tutta la classe, ad esempio “3ª declinazione”. Gli studenti sono tenuti a completare tutte le lezioni pratiche comprese nella 3ª declinazione, ma la mole di esercizi che toccherà loro varierà in base al numero degli errori compiuti nel corso delle lezioni.</p>

              <p>In ogni lezione pratica, lo studente è tenuto a raggiungere 12 risposte corrette; ogni volta che sbaglia, gli viene proposto un nuovo esercizio; in coda, per chiudere la lezione, dovrà correggere tutte le domande che ha sbagliato.</p>

              <p>Completata una lezione lo studente sblocca e accede alle lezioni successive, con domande ed esercizi via via più difficili, fino al raggiungimento dell’obiettivo.</p>
            </SubLandingCard>
          </Section>
          <Section bgColor={colore.landing.grey}>
            <Container>
              <H2 color={colore.alatin.brand} margin="0">Struttura del corso</H2>
              <p>Alatin è organizzato in <strong>180 unità</strong> (obiettivi di apprendimento), scandite in <strong>40 missioni</strong>, raggruppate a loro volta in <strong>14 livelli</strong>. Ogni unità (es. «1ª declinazione») contiene un numero variabile di <strong>lezioni pratiche</strong>, in cui lo studente affronta esercizi di morfologia, morfosintassi e sintassi a difficoltà crescente, dall’analisi dei verbi alla traduzione di frasi.</p>
              <DesktopImage src={dashboardDesktop} />
              <MobileImage src={dashboardMobile} />
              <H4 color="#000">Le lezioni pratiche</H4>
              <p>Ogni lezione pratica di <em>traduzione</em> è scandita da una continua dialettica fra le lingue: si traduce cioè non solo dal latino all’italiano ma, in egual misura, dall’italiano al latino.</p><p>Ciascuna missione è organizzata in modo da consentire allo studente un’acquisizione mirata e progressiva del lessico di base. Il vocabolario è in linea, dunque lo studente trova il lemma della parola direttamente sul testo. Se la parola è focus, cioè si tratta di una parola-chiave per il tipo di esercizio richiesto (nome, verbo, aggettivo), è corredata dalla rispettiva tabella morfologica che ne riporta il quadro dei casi o della coniugazione.</p>
              <DesktopImage src={lessicoDesktop} />
              <MobileImage src={lessicoMobile} />
              <p>Oltre al lessico, gli studenti trovano in Alatin anche la teoria. Ciascuna unità, infatti, è dotata di una breve lezione teorica di supporto all’argomento trattato, in linea con quanto avviene nei laboratori tradizionali.</p>
              <DesktopImage src={lezioneDesktop} />
              <MobileImage src={lezioneMobile} />
              <H4 color="#000">La valutazione degli obiettivi</H4>
              <p> Per ogni unità il docente ha a disposizione un tasto “Andamento” che gli consente di monitorare in tempo reale, su 3 indici, il comportamento della classe rispetto al lavoro assegnato. I 3 indici rappresentati sono: </p>
              <ul> <li>grado di completamento dell’obiettivo</li> <li>numero di errori commessi</li> <li>punteggio esperienza complessivo (XP) raggiunto in <strong>tutti</strong> gli obiettivi</li> </ul>
              <DesktopImage src={andamentoDesktop} />
              <MobileImage src={andamentoMobile} />
              <H4 color="#000">Le verifiche e le versioni</H4>
              <p>In ogni missione il docente dispone di 3 o più <strong>versioni</strong>, che può decidere se assegnare tutte o in parte a scuola, a titolo di compito in classe, o a casa. Le versioni sono valutate in <strong>decimi</strong>.<br /> Ciascuna versione è scandita per periodi, che lo studente deve prima analizzare e poi tradurre passo a passo. La valutazione tiene conto in egual misura degli step di analisi e di quelli di traduzione.</p><p> Per ogni livello il docente può creare delle <strong>verifiche sommative</strong> personalizzabili sulla base delle unità assegnate, dalla morfologia alla traduzione, basate rigorosamente sul medesimo lessico che i ragazzi trovano nel lavoro a casa.<br /> Le verifiche tuttavia, a differenza degli obiettivi assegnati per casa, non hanno feedback immediato e non hanno i traducenti in linea: solo chi si esercita costantemente a casa riuscirà a prendere un buon voto nelle verifiche!</p>
              <DesktopImage src={reportisticaDesktop} />
              <MobileImage src={reportisticaMobile} />
              <H4 color="#000">Perché provare Alatin?</H4>
              <p>Da sempre il Mastery Learning si scontra con le difficoltà dei docenti di compensare gli squilibri fisiologici di una classe con compiti mirati al singolo studente. Alatin è pensato per offrire al docente la possibilità di superare questa impasse.<br />Monitorando minuziosamente tutto il lavoro di ogni studente Alatin è in grado di ponderare automaticamente il suo carico di lavoro, fino a fargli raggiungere il traguardo fissato. Al tempo stesso, Alatin riporta al docente le difficoltà incontrate dalla classe nel raggiungimento dei singoli traguardi, offrendo ottimi spunti anche per la lezione frontale.<br />È possibile utilizzare le lezioni di Alatin sia come attività di pratica e consolidamento dell’argomento appena trattato in classe, indicando quest’ultimo come traguardo da superare per la volta successiva, sia come prologo dell’argomento non ancora affrontato in classe, proprio a partire dagli errori più frequenti che la classe ha commesso a casa.<br />E ciò che vale per la fase lineare della programmazione tradizionale, vale a maggior ragione per i momenti puntuali di potenziamento e di recupero.</p>
            </Container>
          </Section>
          <Section bgColor={colore.landing.grey} padding="0 50px 50px" paddingmobile="0 20px 30px">
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

Academy.propTypes = {
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

const academyConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const academyComposed = compose(
  academyConnect
)(Academy);

export default academyComposed;
