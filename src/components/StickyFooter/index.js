/**
*
* StickyFooter
*
*/

import styled from 'styled-components';

import Div from 'components/Div';

/*
  * Istruzioni:
  * Per ottenere in un container l'effetto 'sticky' di un elemento a fondo pagina
  * bisogna inserirlo in <StickyBottom> mentre tutto ciò che lo precede
  * e segue un flusso normale vain <StickyTop>.
  * Le due parti, top e bottom, devono a loro volta essere wrappate
  * in un elemento che restituisca un <div>
  * Schema:
  *   return (
        - StickyWrap                   <- wrap principale del container
          - StickyTop
            - (main content)    <- inserire i contenuti principali in StickyTop
          -StickyBottom
            - (Footer)          <- inserire il Footer in StickyBottom
      )
  *
*/

export const StickyWrap = styled(Div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StickyTop = styled(Div)`
  flex: 1 0 auto;
`;

export const StickyBottom = styled(Div)`
  flex-shrink: 0;
`;
