/**
 *
 * Formazione
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import provideScrollPosition from 'react-provide-scroll-position';

import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import { Section } from 'components/Section';
import Container from 'components/Container';
import SubLandingCard from 'components/LandingCard/SubLandingCard';
import { H1, H3 } from 'components/Heading';
import { ActionButtonLink } from 'components/ButtonLink';
import LandingMenuBar from 'components/LandingMenuBar';
import Footer from 'components/Footer';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import docente from '../Istruzioni/images/docente.png';


export class Formazione extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <Section
            padding="100px 50px 0"
            paddingmobile="76px 20px 0"
            bgColor={colore.itaca.sugar}
          >
            <SubLandingCard
              src={docente}
              flexorder={2}
              color="white"
              padding="20px 0 0"
            >
              <H1 color="#fff" margin="0">Formazione per i docenti</H1>
              <p>(Corso accreditato MIUR ai fini del conseguimento di CFU - accredito SOFIA 26185)</p>
            </SubLandingCard>
          </Section>
          <Section
            padding="10px 50px 50px"
            paddingmobile="10px 20px 30px"
            bgColor={colore.landing.grey}
          >
            <Container>
              <H3 color="#000" margin="23px auto 18px">Descrizione</H3>
              <ul>
                <li>Impostare un sillabo di lingua italiana per padronanza.</li>
                <li>L’apprendimento personalizzato attraverso i software adattivi.</li>
                <li>L’analisi dei risultati; gli errori tipici.</li>
                <li>La programmazione: come individuare gli argomenti sensibili nei limiti del quadro orario della disciplina al biennio.</li>
                <li>La verifica degli apprendimenti.</li>
              </ul>
              <H3 color="#000" margin="42px auto 16px">Obiettivi</H3>
              <p>Il corso ha natura laboratoriale e si prefigge di fornire ai docenti partecipanti i rudimenti metodologici del <strong>Mastery Learning</strong> (apprendimento per padronanza) e del <strong>Digital Authentic Learning</strong> (le competenze digitali previste dalla legge 107/2015) applicati alla didattica della lingua italiana.</p><p>Il corso prevede la sperimentazione gratuita della piattaforma online di Itaca, corso di grammatica italiana per padronanza.</p>
              <H3 color="#000" margin="42px auto 16px">Programma</H3>
              <p>Il programma è articolato in <strong>4 moduli</strong>:</p>
              <ol>
                <li>Lezione mattutina con le classi (1 ora): durante l’incontro si invitano  ragazzi a iscriversi e provare la piattaforma in una situazione informale, cimentandosi con un argomento affrontato di recente.</li>
                <li>Lezione pomeridiana con i docenti (2 ore).</li>
                <li>Laboratorio online (22 ore): si svolge online nelle settimane successive all’incontro in presenza e consiste nella somministrazione di (minimo) 11 unità di apprendimento (argomenti grammaticali) a scelta dei docenti, seguendo la propria programmazione.</li>
                <li>Valutazione delle unità affrontate.</li>
              </ol>
              <H3 color="#000" margin="42px auto 16px">Brevi profili dei formatori</H3>
              <p><strong>Zoe Martini</strong> (1983), linguista. Si è laureata con lode a Torino in Scienze della Mediazione Linguistica con una tesi in Italiano L2 su didattica e BES. Ha lavorato come tutor con studenti delle medie e del liceo e come insegnante di italiano per stranieri. Dopo varie collaborazioni con Loescher e Maieutical Labs, è entrata stabilmente in quest’ultima all’inizio del 2016, come autrice per le medie e il biennio. Nel 2017 ha curato Argonauta, un libro per le vacanze digital first, di italiano, storia, geografia e cittadinanza, per la Scuola secondaria di 1° grado, scrivendo inoltre i contenuti di grammatica italiana. È suo il coordinamento redazionale cartaceo e digitale di Itaca, un corso di grammatica italiana strutturato per obiettivi, basato sul Mastery Learning, “apprendimento per padronanza”.</p>
              <p><strong>Matteo Boero</strong> (1978), linguista. È stato editor e multimedia consultant per Loescher, Mondadori Education, Zanichelli. Project manager per la Fondazione Agnelli e l’Ansas, l’Agenzia Nazionale per l’Autonomia Scolastica del MIUR (attuale INDIRE). Collaboratore di Rai Educational. Nel 2012 insieme ad Adriano Allora e Ivan Molineris ha fondato i Maieutical Labs, “laboratori maieutici”, primo centro di ricerca in Italia per webapp e tutoring sulle lingue classiche. Ideatore e creatore tra gli altri di Cloudschooling, Alatin, Itaca (Accademia di Italiano), piattaforme di apprendimento con oltre 25.000 studenti attivi e 100.000 sessioni di lavoro mensili. Da anni si occupa di digitalizzazione della didattica nell’ambito umanistico.</p>
              <H3 color="#000" margin="42px auto 16px">Mappatura delle competenze</H3>
              <ul>
                <li>Impostare un sillabo per padronanza.</li>
                <li>Applicare le basi del cloud computing e del Digital Authentic Learning nella didattica della lingua italiana.</li>
                <li>Definire una programmazione in modo oggettivo, partendo dai dati.</li>
              </ul>
              <H3 color="#000" margin="42px auto 16px">Ambiti specifici</H3>
              <ul>
                <li>Sviluppo della cultura digitale ed educazione ai media.</li>
                <li>Didattica delle singole discipline previste dagli ordinamenti.</li>
              </ul>
              <H3 color="#000" margin="42px auto 16px">Ambiti trasversali</H3>
              <ul>
                <li>Didattica e metodologie.</li>
                <li>Metodologie e attività laboratoriali.</li>
                <li>Innovazione e didattica digitale.</li>
              </ul>
              <H3 color="#000" margin="42px auto 16px">Destinatari</H3>
              <p>Docenti classi A11, A12, A23 (lingua italiana L2).</p>
              <H3 color="#000" margin="42px auto 16px">Durata ore</H3>
              <p>25h</p>
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

Formazione.propTypes = {
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

const formazioneConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const formazioneComposed = compose(formazioneConnect)(Formazione);

export default formazioneComposed;
