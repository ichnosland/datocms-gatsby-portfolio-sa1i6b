/**
*
* Footer
*
*/

import React from 'react';
import { APPLICATION } from 'configuration';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import ClearLink from 'components/ClearLink';
import media from 'style/mediainjector';
import { colore } from 'style/color';
import messages from './messages';

const year = new Date().getFullYear();

export const FooterBlock = styled.footer`
position: relative;
width: 100%;
background-color: ${() => {
    if (APPLICATION === 'LandingAlatin') return colore.landing.green;
    if (APPLICATION === 'LandingItaca') return colore.itaca.brand;
    return 'transparent';
  }};;
`;

export const Copy = styled.p`
  color: #fff;
  font-size: 1rem;
  text-align: center;
  padding: 20px 0;
  margin: 0 auto;
  a {
    display: inline;
    color: inherit;
    text-decoration: underline;
  }
  ${media.lt667`
    font-size: 15px;
  `}
  ${media.lt480`
    font-size: 12px;
  `}
`;
class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <FooterBlock>
        <Copy>© {year} <a href="https://maieuticallabs.it/" target="_blank">Maieutical Labs</a> • <ClearLink to="/contatti">Contatti</ClearLink> • <FormattedMessage {...messages.piva} /><span className="mediumUp"> • Tutti i diritti riservati</span>
        </Copy>
      </FooterBlock>
    );
  }
}

export default Footer;
