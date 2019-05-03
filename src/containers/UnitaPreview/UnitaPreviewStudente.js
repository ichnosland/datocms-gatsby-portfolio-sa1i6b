/**
 *
 * UnitaPreviewStudente
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import { Button, Icon } from 'components/Button';
import Carousel from 'components/Carousel';
import icon from 'icons/globals';

const DifficultyAvatar = styled(Div)`
  position: relative;
  width: 112px;
  height: 112px;
  margin: 0 auto 40px;
  padding: 2px;
  overflow: visible;
  img {
    display: block;
    width: 112px;
    height: 112px;
    position: absolute;
    top: 0;
    right: 0;
    &.difficolta_7{
      width: 134px;
      height: 112px;
    }
  }
`;

export default class UnitaPreviewStudenteView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { lezioni, displayIndex } = this.props;

    return (
      <Carousel
        buttonWidth="40px"
        buttonHeight="112px"
        displayIndex={displayIndex}
        slides={
          lezioni.map((lezione) => (
            <Div
              key={`carosello_lezione_${lezione.buttonLabel}`}
              maxWidth="480px"
              margin="0 auto"
            >
              <DifficultyAvatar>{lezione.emoji}</DifficultyAvatar>
              <Button
                onClick={lezione.buttonFunction}
                bone={lezione.buttonLocked}
                actioncolor={!lezione.buttonLocked && 'okay'}
                standard
              >
                {lezione.buttonLocked && <Icon {...icon.lock} left />}
                {lezione.buttonCheck && <Icon {...icon.checkBold} left />}
                {lezione.buttonLabel}
              </Button>
            </Div>
          ))
        }
        iconFill="#fff"
        iconSize="32px"
      />
    );
  }
}

UnitaPreviewStudenteView.propTypes = {
  displayIndex: PropTypes.number,
  lezioni: PropTypes.arrayOf(
    PropTypes.shape({
      buttonLabel: PropTypes.string.isRequired,
      buttonFunction: PropTypes.func,
      emoji: PropTypes.object.isRequired,
      buttonLocked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
