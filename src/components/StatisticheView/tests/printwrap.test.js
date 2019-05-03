import React from 'react';
import { shallow } from 'enzyme';

import PrintWrap, { OnlyPrint } from '../PrintWrap';

describe('<PrintWrap />', () => {
  it('should render its props children w/ props childrenvisible', () => {
    const children = <span>Ciao sono un children</span>;
    const renderedComponent = shallow(
      <PrintWrap childrenvisible>
        {children}
      </PrintWrap>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the wrap OnlyPrint w/ props !childrenvisible', () => {
    const childrenvisible = false;
    const renderedComponent = shallow(<PrintWrap childrenvisible={childrenvisible} />);
    expect(renderedComponent.find(OnlyPrint).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
