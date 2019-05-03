/**
*
* Profilo test
*
*/

import React from 'react';
import { shallow } from 'enzyme';

import { ClearAnchor } from 'components/Text';
import WhatsAppBanner from '../WhatsAppBanner';

describe('<WhatsAppBanner />', () => {
  it('should render a expect(renderedComponent.find(Bounce).length).toEqual(3);', () => {
    const renderedComponent = shallow(<WhatsAppBanner />);
    expect(renderedComponent.find(ClearAnchor).length).toEqual(1);
  });

  it('should render its props href', () => {
    const href = '#';
    const renderedComponent = shallow(<WhatsAppBanner href={href} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props legal', () => {
    const legal = true;
    const renderedComponent = shallow(<WhatsAppBanner legal={legal} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
