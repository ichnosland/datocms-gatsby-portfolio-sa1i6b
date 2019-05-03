/*
 *
 * Academy
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import provideScrollPosition from 'react-provide-scroll-position';

import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import { Section } from 'components/Section';
import Container from 'components/Container';
import SubLandingCard from 'components/LandingCard/SubLandingCard';
import { H1, H2 } from 'components/Heading';
import { ActionButtonLink } from 'components/ButtonLink';
import { DesktopImage, MobileImage } from 'components/RespImg';
import LandingMenuBar from 'components/LandingMenuBar';
import Footer from 'components/Footer';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import libro from './images/libro.png';
import dashboard from './images/dashboard.png';
import lezione from './images/lezione.png';
import andamento from './images/andamento.png';

const Ul = styled.ul`
  padding-left: 20px;
`;

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
          <Section first bgColor={colore.itaca.brand} direction="column">
            <SubLandingCard
              src={libro}
              flexorder={2}
              color="#fff"
            >
              <H1 color="#fff" margin="0">Che cos’è?</H1>
              <p>Itaca è una corso di grammatica basato sull’apprendimento per padronanza o <strong>“Mastery Learning”</strong>. Il docente non assegna un compito, bensì un obiettivo comune a tutta la classe, ad esempio “I pronomi personali”. Gli studenti sono tenuti a completare tutte le lezioni pratiche comprese nell’unità, ma la mole di esercizi che toccherà loro varierà in base al numero degli errori compiuti nel corso delle lezioni.</p>
              <p>In ogni lezione pratica, lo studente è tenuto a rispondere correttamente a 12 domande; ogni volta che sbaglia, gli viene posta una nuova domanda; in coda, per chiudere la lezione, dovrà correggere tutte le domande che ha sbagliato. Completando la prima lezione, lo studente sblocca quella successiva, per poi raggiungere l’obiettivo.</p>
            </SubLandingCard>
            <Container color="#fff">
              <H1 color="#fff" margin="0">Perché provare Itaca?</H1>
              <p>Da sempre il Mastery Learning si scontra con le difficoltà dei docenti di compensare gli squilibri di una classe con compiti mirati al singolo studente. Itaca è pensata per offrire al docente la possibilità di superare questa impasse.</p>
              <p>Monitorando minuziosamente ogni studente, Itaca è in grado di ponderare automaticamente il suo carico di lavoro, fino a fargli raggiungere il traguardo fissato. Al tempo stesso, Itaca riporta al docente le difficoltà incontrate dalla classe nel raggiungimento dei singoli traguardi, offrendo ottimi spunti anche per la lezione frontale.</p>
              <p>È possibile utilizzare le lezioni di Itaca sia come attività di pratica e consolidamento dell’argomento appena trattato in classe, indicando quest’ultimo come traguardo da superare per la volta successiva, sia come prologo dell’argomento non ancora affrontato in classe, proprio a partire dagli errori più frequenti che la classe ha commesso a casa. Itaca è uno strumento ideale per il potenziamento e per il recupero.</p>
            </Container>
          </Section>
          <Section bgColor={colore.landing.grey}>
            <Container>
              <H2 color={colore.itaca.brand} margin="0">Struttura del corso</H2>
              <p>Itaca è organizzata in <strong>78 unità</strong> (obiettivi di apprendimento), scandite in <strong>13 missioni</strong>, raggruppate a loro volta in <strong>8 livelli</strong>. Ogni unità (es. «Verbi transitivi e intransitivi») contiene due lezioni pratiche, in cui lo studente affronta esercizi di individuazione, analisi, trasformazione e composizione.</p>
              <DesktopImage src={dashboard} />
              <MobileImage src={dashboard} />
              <H2 color={colore.itaca.brand} margin="0">Le lezioni pratiche</H2>
              <p>In ogni lezione pratica, lo studente è tenuto a svolgere correttamente 12 esercizi; ogni volta che sbaglia, Itaca gli somministra un nuovo esercizio. In coda, per chiudere la lezione, dovrà correggere tutti gli esercizi che ha sbagliato. Completando la prima lezione, lo studente sblocca quella successiva, per poi raggiungere l’obiettivo.</p>
              <DesktopImage src={lezione} />
              <MobileImage src={lezione} />
              <H2 color={colore.itaca.brand} margin="0">La valutazione degli obiettivi</H2>
              <p>Per ogni unità il docente ha a disposizione un tasto “Andamento” che gli consente di monitorare in tempo reale, su tre indici, il comportamento della classe rispetto al lavoro assegnato. I tre indici rappresentati sono:</p>
              <ol>
                <li>grado di completamento dell’obiettivo;</li>
                <li>percentuale di errori sull’argomento;</li>
                <li>punteggio esperienza complessivo (XP) raggiunto in tutti gli obiettivi.</li>
              </ol>
              <DesktopImage src={andamento} />
              <MobileImage src={andamento} />
              <H2 color={colore.itaca.brand} margin="0">Gli esercizi di riepilogo</H2>
              <p>Ogni missione è corredata di una sezione di esercizi di riepilogo, che verificano trasversalmente le unità affrontate nella missione.
              </p>
              <H2 color={colore.itaca.brand} margin="0">Le verifiche: spunti per l’uso</H2>
              <p>Per ogni livello il docente può assemblare delle verifiche da somministrare online. Le verifiche possono avere un duplice utilizzo:</p>
              <Ul>
                <li>la <strong>verifica sommativa</strong> (con valutazione): in questo caso la verifica viene composta dal docente sulla base delle unità già assegnate alla propria classe (cioè degli argomenti già affrontati), con le medesime tipologie di esercizi che i ragazzi trovano nel lavoro a casa. Le verifiche, a differenza degli obiettivi assegnati per casa, non hanno feedback immediato e non presentano la teoria in linea: solo chi si esercita costantemente a casa riuscirà a ottenere un buon risultato. In più gli esercizi sono uguali per tutti ma somministrati in ordine randomico, quindi è molto difficile copiare;</li>
                <li>il <strong>placement test</strong> (test di livello): in questo caso la verifica viene composta dal docente sulla base di quel che intende testare, può trattarsi anche di un singolo argomento (il test sarà breve, per es. 10 minuti per testare la padronanza dei ragazzi sui pronomi indefiniti, direttamente in classe, ognuno sul proprio smartphone). I risultati in tempo reale, soprattutto se interfacciati con le percentuali di errore nazionali proposte sul cartaceo in apertura alle unità, danno subito un’idea dei punti di forza e delle lacune degli studenti.</li>
              </Ul>
            </Container>
          </Section>
          <Section bgColor={colore.landing.grey} padding="0 50px 50px" paddingmobile="0 20px 30px">
            <Container align="center">
              <ActionButtonLink bgcolor={colore.itaca.sugar} sectionbutton={1} shadow={1} to="/contatti">Scrivici per saperne di più</ActionButtonLink>
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
