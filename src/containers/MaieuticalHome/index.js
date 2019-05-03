/**
 *
 * MaieuticalHome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import Footer from 'components/Footer';
import FlexBox from 'components/FlexBox';
import { HiddenH1 } from 'components/Heading';
import Div from 'components/Div';
import ClearLink from 'components/ClearLink';
import media from 'style/mediainjector';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { sendTicket } from './actions';
import messages from './messages';
import {
  makeSelectConfirmMessage,
  makeSelectErrorMessage,
  makeSelectSpinner,
} from './selectors';

import tabletLogo from './images/tablet-logo.png';
import phoneLogo from './images/phone-logo.png';
import itacaLogo from './images/itaca-logo.png';
import alatinLogo from './images/alatin-logo.png';
import argonautaLogo from './images/argonauta-logo.png';
import csgLogo from './images/csg-logo.png';
import icnChi from './images/chi-icn.png';
import icnDigFirst from './images/dig-first-icn.png';
import logo from './images/MLMG.png';
import bg from './images/html-bg.png';

export const Logo = styled(Link)`
  display: block;
  padding: 19px;
  background-image: url(${logo});
  background-size: 38px 38px;
  background-repeat: no-repeat;
  background-position: 0 0;
`;

export const Bg = styled(Div)`
  background: #f7f7f7 url(${bg});
`;

export const MobileImage = styled.img`
  ${media.lt667`
    ${({ big }) => big && 'display: none!important;'}
    max-width: 334px;
  `}
  ${media.gt667`
    ${({ small }) => small && 'display: none!important;'}
    width: 100%;
  `}
`;

export class MaieuticalHome extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Maieutical Labs</title>
          <meta name="description" content="Maieutical Labs è un centro di ricerca privato sulla didattica online e l'e-learning" />
          <meta name="keywords" content="maieuticallabs, maieutical labs, didattica, e-learning, tutor, tutor online, ambienti di apprendimento interattivi, ambienti di apprendimento online, latino, cicero, eugenio, latin tutor, LIM, libri lim, django, python" />
          <meta name="author" content="Maieutical Labs" />
        </Helmet>
        <Bg>
          <header>
            <FlexBox padding="20px" justifyContent="space-between" maxWidth="960px" margin="0 auto">
              <HiddenH1>
                <span>Maieutical Labs</span>
              </HiddenH1>
              <Logo to="/" />
              <FlexBox maxWidth="250px" width="100%" justifyContent="space-around">
                <ClearLink to="/#prodotti"><FormattedMessage {...messages.product} /></ClearLink>
                <ClearLink to="/#chisiamo"><FormattedMessage {...messages.about} /></ClearLink>
                <ClearLink to="/#contatti"><FormattedMessage {...messages.contact} /></ClearLink>
              </FlexBox>
            </FlexBox>
          </header>
          <section>
            <FlexBox maxWidth="642px" margin="0 auto">
              <MobileImage src={tabletLogo} alt="Maieutical Labs" big />
              <MobileImage src={phoneLogo} alt="Maieutical Labs" small />
            </FlexBox>
          </section>
          <section id="prodotti">
            <div className="arrow top">
              <div className="arrow-wrap">
                <div className="outer-arrow"></div>
                <div className="inner-arrow"></div>
              </div>
            </div>
            <FlexBox justifyContent="space-between" maxWidth="960px" margin="0 auto">
              <h3><FormattedMessage {...messages.ourProduct} /></h3>
              <div className="arrow-wrap small sm-only">
                <div className="outer-arrow small"></div>
              </div>
              <a className="col col-1-3 thumb-link" href="http://itaca.academy" id="itaca" title="Itaca">
                <img className="col-icn small" src={itacaLogo} alt="Itaca" />
                <p><FormattedMessage {...messages.itaca} /></p>
              </a>
              <a className="col col-1-3 thumb-link" href="http://alatin.it" id="alatin" title="Alatin">
                <img className="col-icn small" src={alatinLogo} alt="Alatin" />
                <p><FormattedMessage {...messages.alatin} /></p>
              </a>
              <a className="col col-1-3 thumb-link" href="http://argonautavacanze.it" id="argonauta" title="Argonauta Vacanze">
                <img className="col-icn small" src={argonautaLogo} alt="Argonauta Vacanze" />
                <p><FormattedMessage {...messages.argonauta} /></p>
              </a>
              <a className="col col-1-3 thumb-link" href="http://www.cloudschooling.it" id="cloudschooling" title="Cloudschooling">
                <img className="col-icn small" src={csgLogo} alt="Cloudschooling" />
                <p><FormattedMessage {...messages.cloudschooling} /></p>
              </a>
            </FlexBox>
            <div className="arrow">
              <div className="arrow-wrap">
                <div className="inner-arrow"></div>
              </div>
            </div>
          </section>
          <section id="chisiamo" className="filler">
            <h2><FormattedMessage {...messages.motto} /></h2>
            <div className="arrow">
              <div className="arrow-wrap">
                <div className="outer-arrow"></div>
              </div>
            </div>
          </section>
          <section>
            <div className="container row">
              <div className="col col-1-2">
                <img src={icnChi} className="col-icn" alt="" />
                <p><FormattedMessage {...messages.storyCicero} /></p>
                <p><FormattedMessage {...messages.storyEugenio} /></p>
                <p><FormattedMessage {...messages.storyAlatin} /></p>
              </div>
              <div className="col col-1-2">
                <img src={icnDigFirst} className="col-icn" alt="" />
                <p><FormattedMessage {...messages.digitalFirst} /></p>
                <p><FormattedMessage {...messages.back} /></p>
              </div>
            </div>
            <div className="arrow">
              <div className="arrow-wrap">
                <div className="inner-arrow"></div>
              </div>
            </div>
          </section>
          <Footer />
        </Bg>
      </div>
    );
  }
}

MaieuticalHome.propTypes = {
  onSendTicket: PropTypes.func.isRequired,
  spinner: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  confirmMessage: PropTypes.string.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  confirmMessage: makeSelectConfirmMessage(),
  errorMessage: makeSelectErrorMessage(),
  spinner: makeSelectSpinner(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSendTicket: (data) => {
      dispatch(sendTicket(data));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'maieuticalHome', reducer });
const withSaga = injectSaga({ key: 'maieuticalHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MaieuticalHome);
