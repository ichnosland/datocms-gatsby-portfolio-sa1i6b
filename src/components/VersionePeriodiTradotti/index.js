/**
*
* VersionePeriodiTradotti
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Container from 'components/Container';
import Div from 'components/Div';
import { H2 } from 'components/Heading';
import { colore } from 'style/color';
import { ListItem, ListItemText, ListLink } from 'components/NewListPanels';
import HtmlBlock from 'components/HtmlBlock';
import media from 'style/mediainjector';

export const HeaderRiepilogo = styled(Div)`
  position: relative;
  text-align: center;
  padding: 0;
  margin-bottom: 20px;
  overflow: hidden;
  ${({ modal }) => modal && css`
    background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
    border-radius: ${(props) => props.theme.radius.general};
    h2 {
      padding: 14px 16px 10px;
      background-color: ${colore.ui.mainBg};
    }
    div {
      padding: 16px;
    }
  `}
`;

HeaderRiepilogo.defaultProps = {
  theme: {
    radius: {
      general: '6px',
    },
  },
};

export const BranoTradotto = styled(Div)`
  position: relative;
  padding: 18px 20px;
  margin: 0 9px 9px;
  border: 2px dashed ${(props) => props.theme.brand};
  border-radius: ${(props) => props.theme.radius.general};
  background-color: ${colore.ui.note};
  div {
    background-color: inherit;
  }
`;

BranoTradotto.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      general: '6px',
    },
  },
};

export const TagTraduzione = styled.span`
  display: inline-block;
  position: absolute;
  top: -12px;
  left: 16px;
  padding: 4px 14px;
  color: ${colore.ui.contrast};
  background-color: ${(props) => props.theme.brand};
  font-size: 14px;
  border-radius: 100px;
  ${media.lt667`
    font-size: 12px;
  `}
`;

TagTraduzione.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      general: '6px',
    },
  },
};

export class VersionePeriodiTradotti extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { periodi, titolo, sottotitolo, modal } = this.props;
    return (
      <Container>
        {(titolo || sottotitolo) && (
          <HeaderRiepilogo modal={modal}>
            {titolo && <H2 margin="0" padding="0 0 10px">{titolo}</H2>}
            {sottotitolo && <div>{sottotitolo}</div>}
          </HeaderRiepilogo>)}
        {periodi.map((periodo) => {
          const testoTradotto = periodo.testoTradotto && periodo.mostraTestoTradotto && <BranoTradotto><TagTraduzione>Traduzione</TagTraduzione><HtmlBlock text={periodo.testoTradotto} /></BranoTradotto>;
          return (
            <Div key={periodo.idPeriodo} userSelect="none">
              {(periodo.goTo || {}).enable ? (
                <ListLink
                  to="#"
                  onClick={periodo.goTo.onClick}
                >
                  <ListItemText width="100%" justifyContent="flex-start">{periodo.testoDaTradurre}</ListItemText>
                </ListLink>) :
                <div>
                  <ListItem direction="column" alignItems="stretch">
                    <ListItemText width="100%" justifyContent="flex-start">{periodo.testoDaTradurre}</ListItemText>
                    {testoTradotto}
                  </ListItem>
                </div>
              }
            </Div>
          );
        })}
      </Container>
    );
  }
}

VersionePeriodiTradotti.propTypes = {
  periodi: PropTypes.arrayOf(PropTypes.shape({
    testoDaTradurre: PropTypes.string.isRequired,
    testoTradotto: PropTypes.string,
    mostraTestoTradotto: PropTypes.bool.isRequired,
    idPeriodo: PropTypes.number.isRequired,
    goTo: PropTypes.shape({
      enable: PropTypes.bool,
      onClick: PropTypes.func,
    }),
  })),
  titolo: PropTypes.string,
  sottotitolo: PropTypes.string,
  modal: PropTypes.bool,
};

export default VersionePeriodiTradotti;
