import React from 'react';
import { shallow } from 'enzyme';

import { Button, Icon } from 'components/Button';
import icon from 'icons/buttons';
import AudioPlayer from '../AudioPlayer';


const mockProps = {
  paused: false,
  locked: false,
  playing: false,
  disablePause: false,
  playFunction: () => { },
  pauseFunction: () => { },
};


describe('<AudioPlayer />', () => {
  it('audio riproducibile', () => {
    const renderedComponent = shallow(
      <AudioPlayer {...mockProps} />
    );

    expect(renderedComponent.find(Button).props()).toEqual({
      theme: expect.any(Object),
      actioncolor: '',
      round: true,
      width: '42px',
      children: (
        <Icon {...icon.audio} />
      ),
      onClick: mockProps.playFunction,
      disabled: false,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('locked', () => {
    const props = {
      ...mockProps,
      locked: true,
    };
    const renderedComponent = shallow(
      <AudioPlayer {...props} />
    );

    expect(renderedComponent.find(Button).props()).toEqual({
      theme: expect.any(Object),
      actioncolor: '',
      round: true,
      width: '42px',
      children: (
        <Icon {...icon.noAudio} />
      ),
      onClick: null,
      disabled: true,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('playing && !disablePause', () => {
    const props = {
      ...mockProps,
      playing: true,
      disablePause: false,
    };
    const renderedComponent = shallow(
      <AudioPlayer {...props} />
    );

    expect(renderedComponent.find(Button).props()).toEqual({
      theme: expect.any(Object),
      actioncolor: '',
      round: true,
      width: '42px',
      children: (
        <Icon {...icon.pause} />
      ),
      onClick: props.pauseFunction,
      disabled: false,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('playing && disablePause', () => {
    const props = {
      ...mockProps,
      playing: true,
      disablePause: true,
    };
    const renderedComponent = shallow(
      <AudioPlayer {...props} />
    );

    expect(renderedComponent.find(Button).props()).toEqual({
      theme: expect.any(Object),
      actioncolor: '',
      round: true,
      width: '42px',
      children: (
        <Icon {...icon.audio} />
      ),
      onClick: null,
      disabled: false,
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('paused', () => {
    const props = {
      ...mockProps,
      paused: true,
    };
    const renderedComponent = shallow(
      <AudioPlayer {...props} />
    );

    expect(renderedComponent.find(Button).props()).toEqual({
      theme: expect.any(Object),
      actioncolor: '',
      round: true,
      width: '42px',
      children: (
        <Icon {...icon.play} />
      ),
      onClick: props.playFunction,
      disabled: false,
    });
    expect(renderedComponent).toMatchSnapshot();
  });
});
