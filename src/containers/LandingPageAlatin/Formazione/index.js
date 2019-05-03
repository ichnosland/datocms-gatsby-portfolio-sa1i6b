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
import P from 'components/Paragraph';
import SubLandingCard from 'components/LandingCard/SubLandingCard';
import { H1, H2, H4 } from 'components/Heading';
import ZigZagBorder from 'components/ZigZagBorder';
import { ActionButtonLink } from 'components/ButtonLink';
import LandingMenuBar from 'components/LandingMenuBar';
import Footer from 'components/Footer';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
import formazione from '../HomePage/images/formazione.png';


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
          <Section first bgColor={colore.landing.formazione}>
            <SubLandingCard
              src={formazione}
              flexorder={2}
              color="rgb(178, 208, 223)"
              padding="20px 0 0"
            >
              <H1 color="#fff" margin="0">Formazione Alatin per i docenti</H1>
              <p><em>Didattica del latino per competenze</em> è il corso di formazione accreditato organizzato dal Team di Alatin direttamente nelle scuole.</p>
            </SubLandingCard>
          </Section>
          <Section bgColor={colore.landing.grey}>
            <Container>
              <H2 color={colore.landing.formazione} margin="0">La didattica del latino per competenze e la Certificazione di Lingua Latina; le piattaforme Alatin Academy (biennio) e Alatin Lyceum (triennio)</H2>
              <P margin="0" color={colore.landing.formazione}><small>(corso accreditato MIUR ai fini del conseguimento di CFU - accredito SOFIA 21983)</small></P>
              <H4 color="#000" margin="24px auto 18px">Descrizione</H4>
              <ul>
                <li>Impostare un sillabo per padronanza, valutare le competenze CUSL.</li>
                <li>I nuovi strumenti digitali alla luce delle criticità della didattica del latino con l’avvento di Internet, delle novità metodologiche mutuate dalle nuove tecnologie e delle tradizioni logo-didattiche di area anglosassone e nord europea.</li>
                <li>L’apprendimento per padronanza, i compiti di realtà e le competenze digitali postulate dalla legge 107/2017 applicati alla didattica del latino.</li>
                <li>La Certificazione delle competenze di Lingua Latina nel dispositivo CUSL (Consulta Universitaria degli Studi Latini): sillabo, modelli, metodologia e didattica.</li>
                <li>La preparazione alla Certificazione delle competenze di Lingua Latina: gli esercizi di Alatin Lyceum.</li>
              </ul>
              <H4 color="#000" margin="24px auto 18px">Obiettivi</H4>
              <p>Il corso ha natura laboratoriale e si prefigge di fornire ai docenti partecipanti i rudimenti metodologici del <strong>Mastery Learning</strong> (apprendimento per padronanza) e del <strong>Digital Authentic Learning</strong> (le competenze digitali previste dalla legge 107/2017) applicati alla didattica del latino, nonché di fornire loro suggerimenti per conciliare la didattica del triennio con la novità rappresentata a livello nazionale dalla Certificazione delle competenze di Lingua Latina (CLL).</p>
              <H4 color="#000" margin="42px auto 16px">Programma</H4>
              <p>Il programma è articolato in <strong>4​ moduli</strong>,​ sia per il biennio (Academy) sia per il triennio (Lyceum):</p>
              <ol>
                <li>Lezione mattutina con le classi (1 ora): durante l’incontro si invitano i ragazzi a iscriversi e provare la piattaforma in una situazione informale, cimentandosi con un argomento o un autore svolto di recente.</li>
                <li>Lezione pomeridiana con i docenti (2 ore).</li>
                <li>Laboratorio online (22 ore): si svolge online nelle settimane successive all’incontro in presenza, e consiste nella somministrazione di (minimo) 11 unità di apprendimento (da scegliere tra argomenti grammaticali, versioni, prove per competenza) a scelta dei docenti, seguendo la propria programmazione.</li>
                <li>Esportazione griglia di valutazione delle unità affrontate.</li>
              </ol>
              <H4 color="#000" margin="42px auto 16px">Breve profilo del formatore</H4>
              <p><strong>Matteo Boero</strong>, ​1978, l​inguista. È stato editor e multimedia consultant per Loescher, Mondadori Education, Zanichelli. Project manager per la Fondazione Agnelli e l’Ansas, l’Agenzia Nazionale per l’Autonomia Scolastica del MIUR (attuale INDIRE). Collaboratore di Rai Educational. Nel 2012 insieme ad Adriano Allora e Ivan Molineris ha fondato i Maieutical Labs, “laboratori maieutici”, primo centro di ricerca in Italia per webapp e tutoring sulle lingue classiche. Ideatore e creatore tra gli altri di Cloudschooling, Alatin, Itaca (Accademia di Italiano), piattaforme di apprendimento con oltre 25.000 studenti attivi e 100.000 sessioni di lavoro mensili. Da anni si occupa di digitalizzazione della didattica nell’ambito umanistico.</p>
              <H4 color="#000" margin="42px auto 16px">Mappatura delle competenze</H4>
              <ul>
                <li>Impostare un sillabo per padronanza, valutare le competenze CUSL.</li>
                <li>Riconoscere le basi del cloudcomputing e del Digital Authentic Learning.</li>
                <li>Gestire una programmazione per padronanza.</li>
                <li>Leggere i dati raccolti e valutare per competenze.</li>
              </ul>
              <H4 color="#000" margin="42px auto 16px">Destinatari</H4>
              <p>Docenti classi A11, 12, 13 (ex A50, 51, 52)</p>
              <H4 color="#000" margin="42px auto 16px">Durata ore</H4>
              <p>25h</p>
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
