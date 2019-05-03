/**
*
* AlertBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import Svg from 'components/Svg';
import { IconBtn } from 'components/TopBar';
import { H3 } from 'components/Heading';
import media from 'style/mediainjector';
import { colore } from 'style/color';
import icon from 'icons/globals';
import { ContainerStyle } from 'components/Container';

export const AlertWrap = styled(Div)`
  position: absolute;
  top: 0;
  left: 0;
  color: ${colore.ui.contrast};
  width: 100%;
  height: 56px;
  padding: 0 20px;
  background-color: ${(props) => props.theme.brand};
  ${({ giusto }) => giusto && css`background-color: ${colore.actions.okay};`}
  ${({ sbagliato }) => sbagliato && css`background-color: ${colore.actions.error};`}
  ${({ aiuto }) => aiuto && css`background-color: ${colore.actions.help};`}
  z-index: 8;
  transition: all 0.5s;
  ${media.desktop`
    border-top-left-radius: ${(props) => props.versione ? '3px' : '20px'};
    border-top-right-radius: ${(props) => props.versione ? '3px' : '20px'};
  `}
  ${({ show }) => !show && css`
    display: none;
  `}
`;

AlertWrap.defaulProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const BarContainer = styled(FlexBox)`
  ${ContainerStyle}
  height: 100%;
  ${(props) => props.helpFx && css`
    justify-content: space-between;
    &::after {
      content: "";
      display: inline;
    }
  `}
  h3 {
    color: ${colore.ui.contrast};
  }
`;

class AlertBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      giusto,
      sbagliato,
      aiuto,
      versione,
      show,
      helpFx,
    } = this.props;
    return (
      <AlertWrap
        giusto={giusto}
        sbagliato={sbagliato}
        aiuto={aiuto}
        show={show}
        versione={versione}
      >
        <BarContainer helpFx={helpFx}>
          {helpFx &&
            <IconBtn onClick={helpFx}>
              <Svg {...icon.topBarFeedback} />
            </IconBtn>
          }
          <H3>
            {giusto &&
              'Risposta corretta!'
            }
            {sbagliato &&
              'Hai sbagliato!'
            }
            {aiuto &&
              'Aiuto'
            }
          </H3>
        </BarContainer>
      </AlertWrap>
    );
  }
}

AlertBar.propTypes = {
  giusto: PropTypes.bool,
  sbagliato: PropTypes.bool,
  aiuto: PropTypes.bool,
  versione: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  helpFx: PropTypes.func,
};

export default AlertBar;
