/**
*
* SubLandingCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { FlexSwitch, Image, CardBox } from './index';

export const SubCardContainer = styled(FlexSwitch)`
  padding: ${(props) => props.padding ? props.padding : '20px 0'};
  color: ${(props) => props.color};
  ${(props) => props.dashed && css`
    border-bottom-style: dashed;
    border-bottom-color: rgba(255, 255, 255, 0.4);
    border-bottom-width: 2px;
  `}
  ${(props) => props.single && css`
    position: relative;
    &::before {
      content: " ";
      display: block;
    }
  `}
`;

class LandingCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      padding,
      flexorder,
      dashed,
      single,
      color,
      src,
      children,
      alignThumb,
    } = this.props;
    return (
      <SubCardContainer
        maxWidth="860px"
        dashed={dashed}
        single={single}
        color={color}
        padding={padding}
      >
        {src && <Image src={src} role="presentation" flexorder={flexorder} alignThumb={alignThumb} />}
        <CardBox inverse={flexorder}>
          {children}
        </CardBox>
      </SubCardContainer>
    );
  }
}

LandingCard.propTypes = {
  src: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  dashed: PropTypes.bool,
  single: PropTypes.bool,
  flexorder: PropTypes.number,
  alignThumb: PropTypes.string,
  children: PropTypes.any,
};

export default LandingCard;
