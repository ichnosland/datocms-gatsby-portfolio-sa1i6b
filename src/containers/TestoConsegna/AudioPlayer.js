

/**
*
* AudioPlayer
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'components/Button';
import icon from 'icons/buttons';


class AudioPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      playFunction,
      pauseFunction,
      paused,
      locked,
      playing,
      disablePause,
    } = this.props;

    let titolo = 'noAudio';
    let onClickFunction = null;

    if (!locked) {
      if (playing && disablePause) {
        titolo = 'audio';
      } else if (playing && !disablePause) {
        titolo = 'pause';
      } else if (paused) {
        titolo = 'play';
      } else {
        titolo = 'audio';
      }

      if (!playing) {
        onClickFunction = playFunction;
      } else if (!disablePause) {
        onClickFunction = pauseFunction;
      }
    }

    return (
      <div>
        <Button
          disabled={locked}
          onClick={onClickFunction}
          round
          width="42px"
        >
          <Icon {...icon[titolo]} />
        </Button>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  playFunction: PropTypes.func,
  pauseFunction: PropTypes.func,
  paused: PropTypes.bool,
  locked: PropTypes.bool,
  playing: PropTypes.bool,
  disablePause: PropTypes.bool,
};

export default AudioPlayer;
