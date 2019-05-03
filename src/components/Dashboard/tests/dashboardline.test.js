import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import DashboardLine from '../DashboardLine';

describe('<DashboardLine />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(
      <DashboardLine />
    );
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
