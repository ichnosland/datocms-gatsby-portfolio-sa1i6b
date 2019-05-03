/**
*
* LandingCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import StyledButtonGroup from 'components/StyledButtonGroup';
import media from 'style/mediainjector';
import { H2 } from 'components/Heading';
import { ActionButton } from 'components/Button';
import { ActionButtonLink } from 'components/ButtonLink';
import { LegalInfo } from 'components/Paragraph';

export const FlexSwitch = styled(FlexBox)`
  width: 100%;
  padding: 0;
  justify-content: space-between;
  ${media.lt667`
    flex-direction: column;
  `}
`;

export const Image = styled.img`
  width: 25%;
  order: ${(props) => props.flexorder ? props.flexorder : 'auto'};
  align-self: ${(props) => props.alignThumb};
  ${media.lt667`
    width: 65%;
    margin: 10px 30px 30px;
    align-self: center;
  `}
`;

export const CardBox = styled.div`
  width: 80%;
  max-width: 640px;
  padding: ${(props) => props.padding ? props.padding : '0 0 0 30px'};
  ${({ inverse }) => inverse === 2 && css`
    padding: 0 30px 0 0;
  `};
  ${media.lt667`
    width: 100%;
    max-width: 100%;
    padding: 0;
    h2 {
      font-size: 2.4em;
      line-height: 1em;
    }
  `}
`;

export const Body = styled(Div)`
  margin: 1em auto 1.5em;
  a {
    color: inherit;
  }
`;

class LandingCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      flexorder,
      title,
      src,
      body,
      actionButton,
      action,
      secondAction,
      color,
      titleColor,
      footNote,
      alignThumb,
    } = this.props;
    return (
      <FlexSwitch maxWidth="820px">
        <Image src={src} role="presentation" flexorder={flexorder} alignThumb={alignThumb} />
        <CardBox inverse={flexorder}>
          <H2 color={titleColor} margin="0">{title}</H2>
          {body &&
            <Body
              color={color}
              dangerouslySetInnerHTML={{
                __html: body,
              }}
            />
          }
          <StyledButtonGroup bottomSpace="30px" justifyContent="flex-start">
            {actionButton &&
              <ActionButton
                sectionbutton={1}
                bone={actionButton.props.bone}
                bgcolor={actionButton.props.bgcolor}
                shadow={actionButton.props.shadow}
                onClick={actionButton.richiediCodice}
              >
                {actionButton.text}
              </ActionButton>
            }
            { action && action.text ?
              <ActionButtonLink sectionbutton={1} bone={1} to={action.link}>{action.text}</ActionButtonLink>
              : ''
            }
            {secondAction && secondAction.text ?
              <ActionButtonLink sectionbutton={1} bone={1} to={secondAction.link}>{secondAction.text}</ActionButtonLink>
              : ''
            }
          </StyledButtonGroup>
          {footNote &&
            <LegalInfo margin="12px 12px 0 12px" color={footNote.color}>
              {footNote.text}
            </LegalInfo>
          }
        </CardBox>
      </FlexSwitch>
    );
  }
}

LandingCard.defaultProps = {
  action: {},
};

LandingCard.propTypes = {
  color: PropTypes.string,
  titleColor: PropTypes.string,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  flexorder: PropTypes.number,
  alignThumb: PropTypes.string,
  action: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string,
  }),
  secondAction: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string,
  }),
  actionButton: PropTypes.shape({
    text: PropTypes.string,
    richiediCodice: PropTypes.func,
    props: PropTypes.shape({
      bone: PropTypes.string,
      bgcolor: PropTypes.string,
      shadow: PropTypes.string,
    }),
  }),
  footNote: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
  }),
};

export default LandingCard;
