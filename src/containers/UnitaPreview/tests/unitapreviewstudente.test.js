import React from 'react';
import { shallow } from 'enzyme';

import Carousel from 'components/Carousel';
import UnitaPreviewStudente from '../UnitaPreviewStudente';


const mockProps = {
  lezioni: [{
    buttonLabel: 'buttonLabel1',
    buttonFunction: () => { },
    emoji: <img alt="emoji 1" />,
    buttonLocked: false,
    buttonCheck: true,
  }, {
    buttonLabel: 'buttonLabel2',
    buttonFunction: () => { },
    emoji: <img alt="emoji 2" />,
    buttonLocked: true,
    buttonCheck: false,
  }, {
    buttonLabel: 'buttonLabel3',
    buttonFunction: () => { },
    emoji: <img alt="emoji 3" />,
    buttonLocked: true,
    buttonCheck: false,
  }],
  displayIndex: 0,
};

describe('<UnitaPreviewStudente />', () => {
  it('visualizzo carosello', () => {
    const renderedComponent = shallow(
      <UnitaPreviewStudente {...mockProps} />
    );
    expect(renderedComponent.find(Carousel).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('visualizzo carosello senza lezioni', () => {
    const props = {
      ...mockProps,
      lezioni: [],
    };
    const renderedComponent = shallow(
      <UnitaPreviewStudente {...props} />
    );
    expect(renderedComponent.find(Carousel).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
