/**
 *
 * WhatsAppBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FlexChild } from 'components/FlexBox';
import AlertBanner from 'components/AlertBanner';
import { ClearAnchor } from 'components/Text';
import { LegalInfo } from 'components/Paragraph';
import WhatsApp from 'images/whatsapplogo.png';
import { colore } from 'style/color';

export class WhatsAppBanner extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { href, legal } = this.props;
    return (
      <ClearAnchor href={href}>
        <AlertBanner padding="0" margin="0 0 20px 0" justifyContent="flex-start">
          <FlexChild padding=".5em 1em">
            <img src={WhatsApp} width="60" alt="WhatsApp" />
          </FlexChild>
          <FlexChild padding="20px" align="left" borderstyle="solid" borderwidth="0 0 0 1px" bordercolor={colore.ui.neutralBg}>
            <span>
              L&apos;assistenza docenti su WhatsApp è attiva dal lunedì al venerdì dalle 10 alle 17 al <strong>3209120894</strong>
            </span>
          </FlexChild>
        </AlertBanner>
        {legal && [
          <LegalInfo align="center" key="legal_1">L&apos;assistenza via whatsapp è <strong>un servizio dedicato esclusivamente ai docenti</strong>. Se riceveremo richieste di aiuto dagli studenti tramite questo canale non potranno essere recepite. Vi preghiamo dunque di non diffondere questo numero di telefono al di fuori del corpo docente.</LegalInfo>,
          <LegalInfo align="center" key="legal_2">Grazie per la collaborazione!</LegalInfo>,
        ]}
      </ClearAnchor>
    );
  }
}

WhatsAppBanner.propTypes = {
  href: PropTypes.string,
  legal: PropTypes.bool,
};

export default WhatsAppBanner;
