/**
*
* ButtonLink
*
*/
import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';
import { ButtonStyle, ActionButtonStyle } from 'components/Button';
import { lighten, transparentize } from 'polished';
import { colore } from 'style/color';

export const ButtonLink = styled(Link)`
  ${ButtonStyle}
  text-decoration: none;
  ${({ inactive }) => inactive && css`
    background-color: ${(props) => lighten(0.3, (props.bgcolor ? props.bgcolor : props.theme.brand))};
    color: ${(props) => transparentize(0.5, (props.color ? props.color : colore.ui.contrast))};
    pointer-events: none;
  `}
`;

ButtonLink.defaultProps = {
  theme: {
    brand: '#00BBEF',
    radius: {
      buttons: '6px',
    },
  },
  actioncolor: '',
};

export const ActionButtonLink = styled(ButtonLink)`
  ${ActionButtonStyle};
`;
