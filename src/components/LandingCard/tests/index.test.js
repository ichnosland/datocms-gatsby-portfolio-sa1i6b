import React from 'react';
import { shallow } from 'enzyme';

import { ActionButton } from 'components/Button';
import { LegalInfo } from 'components/Paragraph';
import LandingCard, { FlexSwitch, Image, CardBox, Body } from '../index';

describe('<LandingCard />', () => {
  it('should render a FlexSwitch', () => {
    const title = 'title';
    const body = 'body';
    const bgColor = '#fff';
    const src = 'IMAGE';
    const action = {
      text: 'button',
    };

    const renderedComponent = shallow(
      <LandingCard title={title} bgColor={bgColor} src={src} body={body} action={action} />
    );

    expect(renderedComponent.find(FlexSwitch).length).toEqual(1);
    expect(renderedComponent.contains(title)).toBe(true);
    expect(renderedComponent.find(Body).length).toEqual(1);
    expect(renderedComponent.contains(action.text)).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render without action', () => {
    const title = 'title';
    const body = 'body';
    const bgColor = '#fff';
    const src = 'IMAGE';
    const action = {
      text: 'button',
    };

    const renderedComponent = shallow(
      <LandingCard title={title} bgColor={bgColor} src={src} body={body} />
    );

    expect(renderedComponent.contains(title)).toBe(true);
    expect(renderedComponent.find(Body).length).toEqual(1);
    expect(renderedComponent.contains(action.text)).toBe(false);
  });
  it('should render with secondAction', () => {
    const title = 'title';
    const body = 'body';
    const bgColor = '#fff';
    const src = 'IMAGE';
    const action = {
      text: 'button 1',
    };
    const secondAction = {
      text: 'button 2',
    };

    const renderedComponent = shallow(
      <LandingCard title={title} bgColor={bgColor} src={src} body={body} action={action} secondAction={secondAction} />
    );

    expect(renderedComponent.contains(title)).toBe(true);
    expect(renderedComponent.find(Body).length).toEqual(1);
    expect(renderedComponent.contains(action.text)).toBe(true);
    expect(renderedComponent.contains(secondAction.text)).toBe(true);
  });

  it('should render with actionButton', () => {
    const title = 'title';
    const body = 'body';
    const bgColor = '#fff';
    const src = 'IMAGE';
    const action = {
      text: 'button 1',
    };
    const actionButton = {
      text: 'action button',
      richiediCodice: jest.fn(),
      props: {
        bone: 'true',
        bgcolor: 'red',
        shadow: 'true',
      },
    };
    const renderedComponent = shallow(
      <LandingCard title={title} bgColor={bgColor} src={src} body={body} action={action} actionButton={actionButton} />
    );

    expect(renderedComponent.contains(actionButton.text)).toBe(true);
    expect(actionButton.richiediCodice).not.toHaveBeenCalled();
    renderedComponent.find(ActionButton).props().onClick();
    expect(actionButton.richiediCodice).toHaveBeenCalled();
  });

  it('should render a LegalInfo w/ props footNote.text', () => {
    const title = 'title';
    const body = 'body';
    const bgColor = '#fff';
    const src = 'IMAGE';
    const action = {
      text: 'button',
    };
    const footNote = {
      text: 'Nota in calce',
      color: 'black',
    };

    const renderedComponent = shallow(
      <LandingCard
        title={title}
        bgColor={bgColor}
        src={src}
        body={body}
        action={action}
        footNote={footNote}
      />
    );

    expect(renderedComponent.find(FlexSwitch).length).toEqual(1);
    expect(renderedComponent.contains(title)).toBe(true);
    expect(renderedComponent.find(Body).length).toEqual(1);
    expect(renderedComponent.find(LegalInfo).length).toEqual(1);
    expect(renderedComponent.contains(action.text)).toBe(true);
    expect(renderedComponent.contains(footNote.text)).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Image />', () => {
  it('should render a <image> tag', () => {
    const renderedComponent = shallow(<Image />);
    expect(renderedComponent.type()).toEqual('img');
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<Image />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props flexorder', () => {
    const flexorder = '1';
    const renderedComponent = shallow(<Image flexorder={flexorder} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props alignThumb', () => {
    const alignThumb = 'flex-start';
    const renderedComponent = shallow(<Image alignThumb={alignThumb} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CardBox />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<CardBox />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<CardBox />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '0 20px 0 30px';
    const renderedComponent = shallow(<CardBox padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inverse if inverse === 2', () => {
    const renderedComponent = shallow(<CardBox inverse={2} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
