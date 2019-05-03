/**
*
* AlertCookies
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import P from 'components/Paragraph';
import { Button } from 'components/Button';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const AlertCookiesWrap = styled(Div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 20px 20px;
  z-index: 1;
  ${media.lt667`
    padding: 0 10px 30px;
  `}
  ${({ show }) => !show && css`
    display: none;
  `}
`;

export const CookiesBanner = styled(Div)`
  color: ${(props) => props.color ? props.color : colore.ui.txt};
  max-width: 860px;
  margin: 0 auto;
  font-size: 14px;
  border: ${(props) => props.border};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : 'rgba(255,255,255,.95)'};
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,.15);
  box-shadow: 0 2px 1px rgba(0,0,0,.25);
  p {
    padding: 20px;
    margin: 0;
    &:last-child {
      padding: 0 20px 10px;
      text-align: right;
      ${media.lt480`
        padding: 0 20px 20px;
        text-align: center;
      `}
    }
  }
  ${media.lt667`
    font-size: 12px;
  `}
`;

class AlertCookies extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { show, color, border, bgcolor, onClickFunction } = this.props;
    return (
      <AlertCookiesWrap show={show}>
        <CookiesBanner
          color={color}
          border={border}
          bgcolor={bgcolor}
        >
          <P>Al fine di offrire il miglior servizio possibile questo sito utilizza cookies tecnici e di terze parti per funzionalità quali l&apos;accesso tramite social network e/o la visualizzazione di media. Se non acconsenti all&apos;utilizzo dei cookie di terze parti, alcune di queste funzionalità potrebbero essere non disponibili. Chiudendo questo banner o proseguendo con la navigazione acconsentirai al loro impiego. Per saperne di pi&ugrave; o negare il consenso a tutti o ad alcuni cookie puoi consultare <a href="https://maieuticallabs.it/privacy" target="_blank"><span>l&apos;informativa sulla privacy</span></a>.</P>
          <P><Button actioncolor="hint" standard={1} onClick={onClickFunction}>Chiudi</Button></P>
        </CookiesBanner>
      </AlertCookiesWrap>
    );
  }
}

AlertCookies.propTypes = {
  color: PropTypes.string,
  border: PropTypes.string,
  bgcolor: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onClickFunction: PropTypes.func,
};

export default AlertCookies;
