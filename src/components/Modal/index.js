/**
*
* Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import Image from 'components/Image';
import TopBar from 'components/TopBar';
import { Button, Icon } from 'components/Button';
import media from 'style/mediainjector';
import buttonicon from 'icons/buttons';
import { colore } from 'style/color';

export const ModalOverlay = styled(FlexBox)`
  background-color: ${(props) => props.overlaybg ? props.overlaybg : props.theme.modalbg};
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  z-index: 16;
  overflow: auto;
  ${({ show }) => !show && css`
    display: none;
  `}
  ${({ topbar }) => topbar && css`
    align-items: flex-start;
    overflow: scroll;
  `}
`;

ModalOverlay.defaultProps = {
  theme: {
    modalbg: 'rgba(0, 0, 0, 0.75)',
  },
};

export const ModalContent = styled(Div)`
  max-width: ${(props) => props.maxWidth ? props.maxWidth : '860px'};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  box-shadow: 0px 2px 11px -2px rgba(0,0,0,0.5);
  border-radius: 6px;
  ${media.mobile`
    margin: 10px;
  `}
  ${({ topbar }) => topbar && css`
    box-shadow: none;
  `}
  ${(props) => props.formBox && css`
    width: 100%;
    background-color: ${props.bgcolor ? props.bgcolor : props.theme.brand};
    color: ${props.color ? props.color : colore.ui.contrast};
    h2 {
      color: currentColor;
      margin-top: 0;
    }
    p {
      margin-bottom: 6px;
    }
    ${media.lt480`
      height: 100%;
      margin: 0;
      overflow-y: auto;
      border-radius: 0;
    `}
  `}
`;

ModalContent.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const ModalHeader = styled.h3`
  color: ${(props) => props.theme.brand};
  margin: 0;
  padding: 30px 30px 10px;
`;

ModalHeader.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const ModalFooter = styled(Div)`
  padding: 10px 30px 20px;
`;

export default class Modal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      show,
      topbar,
      formBox,
      maxWidth,
      titolo,
      image,
      contenuto,
      overlaybg,
      bgcolor,
      color,
      barcolor,
      closeButton,
    } = this.props;
    return (
      <ModalOverlay show={show} overlaybg={overlaybg} topbar={topbar}>
        <ModalContent bgcolor={bgcolor} topbar={topbar} formBox={formBox} color={color} maxWidth={maxWidth}>
          {topbar &&
            <TopBar
              pinned
              title={titolo}
              single
              bgColor={barcolor}
              closeBtn={{
                url: '#',
                enabled: true,
                onClickFunction: closeButton.onClick,
              }}
            />
          }
          {titolo && !topbar && <ModalHeader>{titolo}</ModalHeader>}
          {image &&
            <Image src={image.src} widht={image.width} height={image.height} alt={image.alt} />
          }
          {contenuto}
          {closeButton && !topbar && (
            <ModalFooter>
              {closeButton && (
                <Button
                  actioncolor={closeButton.actionColor || ''}
                  onClick={closeButton.onClick}
                >
                  {closeButton.icon && <Icon {...buttonicon[closeButton.icon]} left />}
                  {closeButton.text || 'Chiudi'}
                </Button>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalOverlay >
    );
  }
}

Modal.propTypes = {
  closeButton: PropTypes.shape({
    actioncolor: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string,
  }),
  show: PropTypes.bool,
  topbar: PropTypes.bool,
  formBox: PropTypes.bool,
  maxWidth: PropTypes.string,
  image: PropTypes.object,
  contenuto: PropTypes.any,
  overlaybg: PropTypes.string,
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  barcolor: PropTypes.string,
  titolo: PropTypes.string,
};
