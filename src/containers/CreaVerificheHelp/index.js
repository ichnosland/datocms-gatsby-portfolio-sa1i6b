/**
 *
 * CreaVerificheHelp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import Page from 'components/Page';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import P from 'components/Paragraph';
import { H2 } from 'components/Heading';
import Image from 'components/Image';
import { getImagesByProduct } from './images';


export const Img = styled(Image)`
  display: block;
  margin: 30px auto;
  border: 3px solid #D9D9D9;
`;

export class CreaVerificheHelpView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      configuration: { product },
      productName = 'MyTest',
      firma = 'La Scuola',
    } = this.props;
    const topBarProps = {
      noShadow: true,
      title: 'Aiuto',
      pinned: true,
      single: true,
      closeBtn: {
        url: '/',
        enabled: true,
      },
    };
    const helpImages = getImagesByProduct(product);

    return (
      <Page>
        <TopBar {...topBarProps} />
        <Container>
          <H2>Che cos’è {productName}?</H2>
          <P>{productName} è un’applicazione web fruibile da qualsiasi dispositivo (pc, tablet, smartphone). Uno strumento pensato per il docente, per creare e modificare una verifica sugli argomenti desiderati in pochi click.</P>
          <H2>Gli argomenti</H2>
          <P>Entrando in {productName}, trovi gli argomenti già organizzati in base al sillabo della disciplina. Un campo di ricerca, in alto, ti permette la <strong>ricerca rapida</strong>.</P>
          <Img src={helpImages.dashboard} alt="Dashboard" responsive />
          <P>Scegliendo un argomento, {productName} ti presenta la sinossi degli esercizi disponibili. L’anteprima di ogni esercizio ti consente una scelta rapida e puntuale, con la possibilità di vederne la soluzione e aggiungerlo al tuo carrello.</P>
          <Img src={helpImages.argomento} alt="Argomento scelto" responsive />
          <P>Un <strong>triangolino verde</strong> segnala gli esercizi selezionati. Puoi aggiungere o rimuovere esercizi a tuo piacimento e, volendo, puoi anche selezionare esercizi da argomenti diversi: cliccando sulla X in alto a sinistra potrai tornare all&apos;indice e da lì aprire un altro argomento. Nel <strong>carrello</strong> in alto a destra avrai sempre il conto aggiornato degli esercizi che hai scelto di mettere nella tua verifica.</P>
          <P>Quando la tua verifica è pronta, clicca sul tasto &quot;Crea verifica&quot;.</P>
          <Img src={helpImages.selezione} alt="Selezione esercizi" responsive />
          <P>Potrai ancora intervenire sul numero degli esercizi (rimuovendone alcuni o aggiungendone altri); dove previsto, potrai <strong>modificare</strong> gli esercizi scelti (la consegna, il testo, le risposte); potrai <strong>ordinare</strong> gli esercizi rinumerandoli. Infine dai un titolo alla verifica, e se ne hai bisogno aggiungi le tue note, prima di cliccare su &quot;Salva&quot;.</P>
          <Img src={helpImages.salvataggio} alt="Salvataggio verifica" responsive />
          <P>Una volta salvata, puoi stampare la verifica già pronta per la somministrazione alla classe; puoi anche <strong>stampare</strong> una versione con le <strong>soluzioni</strong> per agevolarti la correzione.</P>
          <Img src={helpImages.stampa} alt="Stampa verifica" responsive />
          <P>Nel menu principale, che apri cliccando sul pulsante in basso a destra nella pagina dell&apos;indice, alla voce &quot;Le tue verifiche&quot; troverai tutte le prove che hai creato e salvato precedentemente.</P>
          <Img src={helpImages.menu} alt="Menu" responsive />
          <P>Le tue verifiche, salvate, saranno sempre a tua disposizione per essere modificate e ristampate!</P>
          <Img src={helpImages.tueverifiche} alt="Verifiche salvate" responsive />
          <P>Buon lavoro!</P>
          <P>Il team di {productName}{firma ? ` - ${firma}` : ''}</P>
        </Container>
      </Page>
    );
  }
}

CreaVerificheHelpView.propTypes = {
  configuration: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect
)(CreaVerificheHelpView);
