/*
 *
 * Testimonials
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import provideScrollPosition from 'react-provide-scroll-position';
import styled, { css } from 'styled-components';

import '!file-loader?name=[name].[ext]!static/landing-alatin/intervista_redana.pdf';
import '!file-loader?name=[name].[ext]!static/landing-alatin/handout_convegno.pdf';

import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import LandingMenuBar from 'components/LandingMenuBar';
import { Section } from 'components/Section';
import Container from 'components/Container';
import { ClearAnchor } from 'components/Text';
import { H1, H4 } from 'components/Heading';
import ZigZagBorder from 'components/ZigZagBorder';
import RespImg from 'components/RespImg';
import Footer from 'components/Footer';
import media from 'style/mediainjector';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';

import larepubblica from './images/repubblica.png';
import lastampa from './images/lastampa.png';
import pdf from './images/pdf-icon.png';

const ColWrap = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

export const Col = styled.div`
  display: inline-block;
  padding: 0 10px;
  vertical-align: top;
  ${media.lt667`
    display: block;
    width: 100%;
  `}
  ${({ due }) => due && css`
    width: 50%;
  `}
  ${({ tre }) => tre && css`
    width: 33.33333%;
  `}
`;

const A = styled(ClearAnchor)`
  display: inline;
`;
const VideoBox = styled.div`
  border: 4px solid #000;
  border-radius: 6px;
  overflow: hidden;
`;

const FlexMedia = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 55.5%;
  overflow: hidden;
  .widescreen {
    padding-bottom: 57.25%;
  }
  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media  only screen and (max-device-width: 800px),
          only screen and (device-width: 1024px) and (device-height: 600px),
          only screen and (width: 1280px) and (orientation: landscape),
          only screen and (device-width: 800px),
          only screen and (max-width: 767px) {
          padding-top: 0;
  }
`;

const Caption = styled.p`
  color: #fff;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  padding: 0.2em 0.8em;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.3);
`;


export class Testimonials extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      configuration,
      landingPage: { isMenuOpened },
      onlandingPageToggleMenu,
      match: { path },
    } = this.props;
    const LandingMenuComponent = /* istanbul ignore next */ ({ scrollTop }) => (
      <LandingMenuBar
        configuration={configuration}
        start={scrollTop < 60 ? 1 : 0}
        openNav={isMenuOpened}
        toggleNavFunction={onlandingPageToggleMenu}
        loadedPath={path}
      />
    );
    const WrappedLandingMenuBar = provideScrollPosition(LandingMenuComponent);
    return (
      <StickyWrap>
        <StickyTop>
          <WrappedLandingMenuBar />
          <Section
            first
            bgColor={colore.alatin.brand}
            direction="column"
          >
            <Container align="center">
              <H1 margin="20px 0 0" color="#fff">Testimonianze</H1>
            </Container>
            <Container align="center">
              <H4 color="#000" padding="36px 0" >I video del Convegno:</H4>
              <ColWrap>
                <Col tre>
                  <VideoBox>
                    <FlexMedia>
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/W6Oqv9AaTvo?rel=0" frameBorder="0" allowFullScreen title="Lo stato del latino in Italia: i dati"></iframe>
                    </FlexMedia>
                  </VideoBox>
                  <Caption>Lo stato del latino in Italia: i dati</Caption>
                </Col>
                <Col tre>
                  <VideoBox>
                    <FlexMedia>
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/5inrptQIBSw?rel=0" frameBorder="0" allowFullScreen title="Alatin al liceo Classico"></iframe>
                    </FlexMedia>
                  </VideoBox>
                  <Caption>Alatin al liceo Classico</Caption>
                </Col>
                <Col tre>
                  <VideoBox>
                    <FlexMedia>
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/fO7ZMkpln4U?rel=0" frameBorder="0" allowFullScreen title="Alatin al liceo Scentifico"></iframe>
                    </FlexMedia>
                  </VideoBox>
                  <Caption>Alatin al liceo Scentifico</Caption>
                </Col>
              </ColWrap>
            </Container>
          </Section>
          <Section bgColor={colore.alatin.brand}>
            <Container align="center">
              <ColWrap>
                <Col tre>
                  <VideoBox>
                    <FlexMedia>
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/dhHJIW6m8-E?rel=0" frameBorder="0" allowFullScreen title="Alatin per il triennio: Testimonials"></iframe>
                    </FlexMedia>
                  </VideoBox>
                  <Caption>Alatin per il triennio: Testimonials</Caption>
                </Col>
                <Col tre>
                  <VideoBox>
                    <FlexMedia>
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/I8LATKc-8C0?rel=0" frameBorder="0" allowFullScreen title="Intervista TGR"></iframe>
                    </FlexMedia>
                  </VideoBox>
                  <Caption>Intervista TGR</Caption>
                </Col>
              </ColWrap>
            </Container>
          </Section>
          <Section bgColor={colore.alatin.brand}>
            <Container align="center">
              <H4 color="#000" padding="36px 0">I materiali:</H4>
              <ColWrap>
                <Col due>
                  <A href="handout_convegno.pdf" target="_blank">
                    <div>
                      <RespImg src={pdf} maxWidth="30%" />
                    </div>
                    <Caption>Handout convegno</Caption>
                  </A>
                </Col>
                <Col due>
                  <A href="intervista_redana.pdf" target="_blank">
                    <div>
                      <RespImg src={pdf} maxWidth="30%" />
                    </div>
                    <Caption>Intervista al professore</Caption>
                  </A>
                </Col>
              </ColWrap>
            </Container>
          </Section>
          <Section bgColor={colore.alatin.brand}>
            <Container padding="0 0 60px 0" align="center">
              <H4 color="#000" padding="36px 0">Rassegna stampa:</H4>
              <ColWrap>
                <Col due>
                  <A href="http://www.lastampa.it/2018/02/26/societa/sfregando-la-lampada-di-alatin-il-latino-diventa-un-gioco-online-z9gSIKOefTv9XW0IpNTyWL/pagina.html" target="_blank">
                    <div>
                      <RespImg src={lastampa} maxWidth="90%" />
                    </div>
                    <Caption>La Stampa.it</Caption>
                  </A>
                </Col>
                <Col due>
                  <A href="http://torino.repubblica.it/cronaca/2018/02/27/news/ora_i_latino_a_scuola_si_studia_con_lo_smartphone_e_copiare_i_compiti_non_conviene-189916501" target="_blank">
                    <div>
                      <RespImg src={larepubblica} maxWidth="90%" />
                    </div>
                    <Caption>Repubblica.it</Caption>
                  </A>
                </Col>
              </ColWrap>
            </Container>
          </Section>
        </StickyTop>
        <StickyBottom>
          <ZigZagBorder />
          <Footer />
        </StickyBottom>
      </StickyWrap>
    );
  }
}

Testimonials.propTypes = {
  configuration: PropTypes.object.isRequired,
  landingPage: PropTypes.shape({
    isMenuOpened: PropTypes.bool.isRequired,
  }).isRequired,
  onlandingPageToggleMenu: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  configuration: state.get('configuration').toJS(),
  landingPage: state.get('landingPage').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    onlandingPageToggleMenu: (enable) => {
      dispatch(landingPageToggleMenu(enable));
    },
  };
}

const TestimonialsConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const TestimonialsComposed = compose(
  TestimonialsConnect
)(Testimonials);

export default TestimonialsComposed;
