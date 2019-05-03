/**
*
* ResponseView
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/Button';
import { colore } from 'style/color';
import { H2 } from 'components/Heading';

import {
  FeedbackSteps,
  ResponseWrap,
  ResponseBanner,
  ResponseContainer,
  ResponseLogo,
} from './ResponseViewElements';

export class ResponseView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      votoApprossimato,
      goodSrc,
      badSrc,
      resetFunction,
      product,
      nascondiVoto,
      titolo,
      steps,
      lezioniTotali,
      lezioniCompletate,
    } = this.props;

    let titoloVisualizzato = '';
    if (!nascondiVoto) {
      titoloVisualizzato = 'Il tuo voto è';
    } else if (!steps) {
      titoloVisualizzato = titolo;
    }

    return (
      <ResponseWrap
        votoFinale={votoApprossimato}
      >
        <ResponseContainer>
          {votoApprossimato >= 6 ?
            <img src={goodSrc} alt="Ottimo" /> :
            <img src={badSrc} alt="Risultato insufficiente" />
          }
          <ResponseBanner>
            {steps &&
              <FeedbackSteps>
                <p>Hai completato {lezioniCompletate} di {lezioniTotali} lezioni</p>
                <ul>
                  {Array.from({ length: lezioniTotali }, (_, i) => (
                    <li key={`li_${i}`} className={lezioniCompletate >= (i + 1) ? 'stepsDone' : ''}>{i + 1}</li>
                  ))}
                </ul>
              </FeedbackSteps>
            }
            <p>{titoloVisualizzato}</p>
            {!nascondiVoto && <H2 color={colore.ui.contrast}>{votoApprossimato}</H2>}
            <Button
              bone={1}
              standard
              onClick={resetFunction}
            >Ok
            </Button>
          </ResponseBanner>
        </ResponseContainer>
        <ResponseLogo width="100%" inverse product={product} execLogo />
      </ResponseWrap>
    );
  }
}

ResponseView.propTypes = {
  votoApprossimato: PropTypes.number.isRequired,
  goodSrc: PropTypes.string,
  badSrc: PropTypes.string,
  product: PropTypes.string,
  steps: PropTypes.bool,
  resetFunction: PropTypes.func.isRequired,
  nascondiVoto: PropTypes.bool,
  titolo: PropTypes.string,
};

export default ResponseView;
