/**
*
* ContattiMl
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Section } from 'components/Section';
import { H2, H3 } from 'components/Heading';
import { FlexSwitch, Image, CardBox } from 'components/LandingCard';
import media from 'style/mediainjector';

const HalfBox = styled.div`
  color: white;
  width: 50%;
  float: left;
  p {
    font-size: 0.9em;
  }
  ${media.lt480`
    width: 100%;
  `}
`;

class ContattiMl extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      bgcolor,
      src,
    } = this.props;
    return (
      <Section bgcolor={bgcolor}>
        <FlexSwitch maxWidth="960px">
          <CardBox padding="0 30px 0 0">
            <H3 color="#fff" margin="0">I nostri recapiti</H3>
            <H2 color="#fff" margin="20px auto 0">Maieutical Labs</H2>
            <HalfBox>
              <p>
                <strong>Sede operativa</strong><br />
                Via Abate Vassalli Eandi 5<br />
                10138 • Torino
              </p>
              <p><strong>Sede legale</strong><br />
                Via Pietro Regis 26<br /> 10064 • Pinerolo (TO)
              </p>
              <p>
                <strong>Telefono</strong><br /> (+39) 011 19705073
              </p>
            </HalfBox>
            <HalfBox>
              <p>P. IVA 10623350013<br />
                C.F. e n. iscriz.<br />
                Reg. Imp. di TO<br />
                10623350013<br />
                REA: TO -1149034<br />
                PEC: maieuticallabs@legalmail.it<br />
                Capitale in bilancio: € 11.000
              </p>
            </HalfBox>
          </CardBox>
          <Image src={src} role="presentation" />
        </FlexSwitch>
      </Section>
    );
  }
}

ContattiMl.propTypes = {
  bgcolor: PropTypes.string,
  src: PropTypes.string,
};

export default ContattiMl;
