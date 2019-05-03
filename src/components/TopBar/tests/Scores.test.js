import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import Scores, { ScoresWrap } from '../Scores';

const theme = {
  brand: '#00abe5',
};

const score = '350';

describe('<Scores />', () => {
  it('should render a <ScoresWrap>', () => {
    const renderedComponent = shallow(<Scores score={score} />);
    expect(renderedComponent.find(ScoresWrap).length).toEqual(1);
  });

  it('should render its props score', () => {
    const renderedComponent = shallow(<Scores score={score} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<Scores theme={theme} score={score} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ScoresWrap />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ScoresWrap />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });
});
