/**
*
* ElementiTesto
*
*/

import React from 'react';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import { Lessico, Contesto } from 'components/Text';
import { HtmlStyles } from 'style/HtmlStylesVerifiche';

export const HtmlWrap = styled(Div)`
  width: 100%;
  ${HtmlStyles}
  ${({ inline }) => inline && css`
    display: inline;
  `}
`;

export const generaElementiTesto = (props) => {
  const {
    elementiTesto = [],
    hasLessico = false,
    lessicoRefs,
    toggleAperti,
  } = props;

  return elementiTesto.map((t) => {
    switch (t.type) {
      default:
        return t.content.replace(/_/g, ' ');
      case 'context':
        return (
          <Contesto key={`contesto_${t.id}`}>
            {generaElementiTesto({
              elementiTesto: t.children,
              hasLessico,
              lessicoRefs,
              toggleAperti,
            })}
          </Contesto>
        );
      case 'latex':
        return (<TeX key={`${t.type}_${t.id}`} math={t.content} />);
      case 'image':
        return (
          <HtmlWrap key={`${t.type}_${t.id}`} dangerouslySetInnerHTML={{ __html: t.content }} /> // eslint-disable-line
        );

      case 'html':
        return (
          <HtmlWrap key={`${t.type}_${t.id}`} dangerouslySetInnerHTML={{ __html: t.content }} inline /> // eslint-disable-line
        );

      case 'lessico':
        if (!hasLessico || !lessicoRefs || !toggleAperti) {
          return t.parola.replace(/_/g, ' ');
        }

        return (
          <Lessico
            key={`lessico_block_${t.id}`}
            ref={(input) => { lessicoRefs[`lessico_block_${t.id}`] = input; }}
            onClick={() => toggleAperti(t)}
          >
            {t.parola.replace(/_/g, ' ')}
          </Lessico>
        );
    }
  });
};
