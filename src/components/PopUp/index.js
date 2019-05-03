/**
*
* PopUp
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ModalOverlay, ModalContent } from 'components/Modal';
import Flexbox from 'components/FlexBox';
import Image from 'components/Image';
import { Button } from 'components/Button';
import { colore } from 'style/color';
import media from 'style/mediainjector';
import Div from 'components/Div';
import HtmlStylesPopUp from 'style/HtmlStylesPopUp';

const innerMarginBottom = '20px';

export const PopUpContent = styled(ModalContent)`
  padding: 40px 30px 20px;
  max-width: 460px;
  min-width: 280px;
  ${media.lt667`
    max-width: 320px;
  `}
  img {
    display: block;
    margin: 0 auto ${innerMarginBottom};
  }
`;

export const PopUpHeader = styled.h4`
  color: ${(props) => props.theme.brand};
  text-align: center;
  margin: 0 auto ${innerMarginBottom};
`;

export const PopUpBody = styled(Div)`
  color: ${(props) => props.color ? props.color : colore.ui.txt};
  margin: 20px 0 30px;
  text-align: center;
  ${HtmlStylesPopUp}
`;

export const PopUpFooter = styled(Flexbox)`
  justify-content: center;
  margin: 30px 0 0;
  ${media.lt667`
    flex-wrap: wrap;
  `}
  button {
    flex: 1;
    border-radius: 4px;
    min-height: 42px;
    margin: 0;
    &:last-child {
      margin-left: 5px;
    }
    &:first-child {
      margin-right: 5px;
    }
    ${media.lt667`
      display: block;
      width: 100%;
      flex: auto;
      &:last-child {
        margin: 18px 0 0;
      }
      &:first-child {
        margin: 0;
      }
    `}
  }
`;

export default class PopUp extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      show,
      titolo,
      image,
      contenuto,
      bgcolor,
      closeButton,
      acceptButton,
    } = this.props;
    return (
      <ModalOverlay show={show}>
        <PopUpContent bgcolor={bgcolor}>
          {image &&
            <Image src={image.src} widht={image.width} height={image.height} alt={image.alt} />
          }
          {titolo && <PopUpHeader>{titolo}</PopUpHeader>}
          {contenuto && <PopUpBody
            dangerouslySetInnerHTML={{ // eslint-disable-line
              __html: contenuto,
            }}
          />}
          {(acceptButton || closeButton) && (
            <PopUpFooter>
              {closeButton && (
                <Button
                  outline={!!acceptButton}
                  onClick={closeButton.onClick}
                >
                  {closeButton.text || 'Annulla'}
                </Button>
              )}
              {acceptButton && (
                <Button
                  onClick={acceptButton.onClick}
                >
                  {acceptButton.text || 'Ok'}
                </Button>
              )}
            </PopUpFooter>
          )}
        </PopUpContent>
      </ModalOverlay >
    );
  }
}

PopUp.propTypes = {
  acceptButton: PropTypes.object,
  closeButton: PropTypes.object,
  show: PropTypes.bool,
  image: PropTypes.object,
  contenuto: PropTypes.string,
  bgcolor: PropTypes.string,
  titolo: PropTypes.string,
};
