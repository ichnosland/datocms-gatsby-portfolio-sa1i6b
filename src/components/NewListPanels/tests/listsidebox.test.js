import React from 'react';
import { shallow } from 'enzyme';

import { FlexChild } from 'components/FlexBox';
import Svg from 'components/Svg';
import ProgressBar from 'components/ProgressBar';
import icon from 'icons/globals';
import ListSideBox, { SideBox, RightCareticon, Usericon, Lessonicon } from '../ListSideBox';

describe('<ListSideBox />', () => {
  it('should render a SideBox', () => {
    const renderedComponent = shallow(<ListSideBox />);
    expect(renderedComponent.find(SideBox).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 Svg when props locked is set', () => {
    const renderedComponent = shallow(
      <ListSideBox locked />
    );
    expect(renderedComponent.find(Svg).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 Svg when props assigned is set', () => {
    const renderedComponent = shallow(
      <ListSideBox assigned />
    );
    expect(renderedComponent.find(Svg).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 Svg when props assigned & retired are both set', () => {
    const renderedComponent = shallow(
      <ListSideBox assigned retired />
    );
    expect(renderedComponent.find(Svg).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 Svg when props retired is set', () => {
    const renderedComponent = shallow(
      <ListSideBox retired />
    );
    expect(renderedComponent.find(Svg).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 radio w/ props radio', () => {
    const renderedComponent = shallow(
      <ListSideBox radio />
    );
    expect(renderedComponent.find('input').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 radio w/ props radio and selected', () => {
    const renderedComponent = shallow(
      <ListSideBox radio isChecked />
    );
    expect(renderedComponent.find('input').props()).toEqual({
      checked: true,
      onChange: expect.any(Function),
      type: 'radio',
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 checkbox w/ props checkbox', () => {
    const renderedComponent = shallow(
      <ListSideBox checkbox />
    );
    expect(renderedComponent.find('input').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 checkbox w/ props checkbox and checked = true', () => {
    const renderedComponent = shallow(
      <ListSideBox checkbox isChecked />
    );
    expect(renderedComponent.find('input').props()).toEqual({
      checked: true,
      onChange: expect.any(Function),
      type: 'checkbox',
    });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 child w/ 2 svg when props studenti is >= 0', () => {
    const studenti = 1;
    const renderedComponent = shallow(
      <ListSideBox studenti={studenti} />
    );
    expect(renderedComponent.find(Usericon).length).toEqual(1);
    expect(renderedComponent.find(RightCareticon).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 child w/ 2 svg when props studenti is === 0', () => {
    const studenti = 0;
    const renderedComponent = shallow(
      <ListSideBox studenti={studenti} />
    );
    expect(renderedComponent.find(Usericon).length).toEqual(1);
    expect(renderedComponent.find(RightCareticon).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render 1 child w/ 1 svg w/ props lesson', () => {
    const renderedComponent = shallow(
      <ListSideBox lesson />
    );
    expect(renderedComponent.find(Lessonicon).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render ProgressBar when props percentuale is >= 0', () => {
    const percentuale = 3;
    const renderedComponent = shallow(
      <ListSideBox percentuale={percentuale} />
    );
    expect(renderedComponent.find(ProgressBar).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render ProgressBar when props percentuale is < 0', () => {
    const percentuale = -1;
    const renderedComponent = shallow(
      <ListSideBox percentuale={percentuale} />
    );
    expect(renderedComponent.find(ProgressBar).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render some text w/ props txt', () => {
    const txt = 'ciao';
    const renderedComponent = shallow(<ListSideBox txt={txt} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SideBox />', () => {
  it('should render a FlexChild', () => {
    const renderedComponent = shallow(<SideBox />);
    expect(renderedComponent.find(FlexChild).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props studenti', () => {
    const renderedComponent = shallow(
      <SideBox studenti />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Lessonicon />', () => {
  it('should render a Svg', () => {
    const renderedComponent = shallow(<Lessonicon {...icon.lesson} />);
    expect(renderedComponent.find(Svg).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      pale: 'rgb(199, 231, 245)',
    };
    const renderedComponent = shallow(
      <Lessonicon theme={theme} {...icon.lesson} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
