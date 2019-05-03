/**
*
* ResponseViewElements
*
*/

import styled, { css } from 'styled-components';

import FlexBox, { FlexChild } from 'components/FlexBox';
import Div from 'components/Div';
import LogoPlatform from 'components/LogoPlatform';
import { ContainerStyle } from 'components/Container';
import { colore } from 'style/color';
import media from 'style/mediainjector';

export const FeedbackSteps = styled(Div)`
  display: inline-block;
  text-align: center;
  margin-bottom: 20px;
  p {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    display: inline-block;
    padding: 0;
    text-align: center;
  }
  li {
    color: ${colore.ui.contrast};
    display: inline-block;
    width: 34px;
    height: 34px;
    margin: 2px;
    padding: 8px;
    border-radius: 3px;
    transition: all 1s linear 0s;
    &.stepsDone {
      color: ${colore.actions.okay};
      background-color: ${colore.ui.mainBg};
    }
    ${(props) => props.stepsDone && css`
      color: ${colore.actions.okay};
      background-color: ${colore.ui.mainBg};
    `}
  }
  ${media.mobile`
    width: 100%;
    margin-bottom: 0;
  `}
`;

export const ResponseWrap = styled(FlexBox)`
  color: ${colore.ui.contrast};
  height: 100%;
  flex-direction: column;
  background: ${({ votoFinale }) => votoFinale >= 6 ?
    colore.actions.okay
    :
    '#ed5b53'};
`;

export const ResponseContainer = styled(FlexChild)`
  ${ContainerStyle}
  img {
    width: 50%;
  }
  ${media.lt480`
    flex-direction: column;
  `}
`;

export const ResponseBanner = styled(Div)`
  width: 50%;
  text-align: center;
  ${media.lt480`
    width: 100%;
  `}
  h2 {
    font-size: 3em;
    margin: 0.3em auto;
  }
`;

export const ResponseLogo = styled(LogoPlatform)`
  ${media.lt480`
    display: none;
  `}
`;
