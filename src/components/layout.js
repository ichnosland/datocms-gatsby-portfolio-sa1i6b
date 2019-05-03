import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import provideScrollPosition from 'react-provide-scroll-position';

import { StickyWrap, StickyTop, StickyBottom } from 'components/StickyFooter';
import { Section } from 'components/Section';
import Container from 'components/Container';
import SubLandingCard from 'components/LandingCard/SubLandingCard';
import { H1, H2 } from 'components/Heading';
import { ActionButtonLink } from 'components/ButtonLink';
import { DesktopImage, MobileImage } from 'components/RespImg';
import LandingMenuBar from 'components/LandingMenuBar';
import Footer from 'components/Footer';
import { colore } from 'style/color';
import { landingPageToggleMenu } from 'containers/LandingPage/actions';
/*
import libro from './images/libro.png';
import dashboard from './images/dashboard.png';
import lezione from './images/lezione.png';
import andamento from './images/andamento.png';
*/
import '../styles/index.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery query={graphql`
    query LayoutQuery
    {
      datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
        copyright
      }
      allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
        edges {
          node {
            profileType
            url
          }
        }
      }
    }
  `}
  render={data => (
    <div className="container">
      <HelmetDatoCms
        favicon={data.datoCmsSite.faviconMetaTags}
        seo={data.datoCmsHome.seoMetaTags}
      />
      <div className="container__sidebar">
        <div className="sidebar">
          <h6 className="sidebar__title">
            <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
          </h6>
          <div
            className="sidebar__intro"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
            }}
          />
          <ul className="sidebar__menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <p className="sidebar__social">
            {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target="blank"
                className={`social social--${profile.profileType.toLowerCase()}`}
              > </a>
            ))}
          </p>
          <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
        </div>
      </div>
      <div className="container__body">
        <div className="container__mobile-header">
          <div className="mobile-header">
            <div className="mobile-header__menu">
              <Link to="#" data-js="toggleSidebar" />
            </div>
            <div className="mobile-header__logo">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
    )}
  />
)

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
