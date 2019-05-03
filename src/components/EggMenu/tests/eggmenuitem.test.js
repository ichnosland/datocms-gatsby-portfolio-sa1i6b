import React from 'react';
import { shallow } from 'enzyme';

import ClearLink from 'components/ClearLink';
import icon from 'icons/globals';
import EggMenuItem, { EggItem, EggLink, EggLinkLabel } from '../EggMenuItem';

const icone = 'feedback';
const theme = {
  radius: {
    buttons: '50px',
  },
  menu: {
    itemBorder: '2px solid green',
    itemWidth: '32px',
    itemHeight: '32px',
  },
};

describe('<EggMenuItem />', () => {
  it('counts EggMenuItem with one child and no url attribute', () => {
    const renderedComponent = shallow(
      <EggMenuItem
        titolo="Questo è un titolo"
        icona={icon[icone]}
        fill="#000"
        theme={theme}
      />
    );
    expect(renderedComponent.find(EggLink).length).toBe(0);
    expect(renderedComponent.find(EggItem).length).toBe(1);
    expect(renderedComponent.find(EggLinkLabel).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('counts EggMenuItem children with url attribute', () => {
    const renderedComponent = shallow(
      <EggMenuItem
        titolo="Questo è un titolo"
        icona={icon[icone]}
        fill="#000"
        url="/path"
        onOpen={() => { }}
        theme={theme}
      />
    );
    expect(renderedComponent.find(EggItem).length).toBe(1);
    expect(renderedComponent.find(EggLink).length).toBe(1);
    expect(renderedComponent.find(EggLinkLabel).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('counts EggMenuItem children with empty url attribute', () => {
    const renderedComponent = shallow(
      <EggMenuItem
        titolo="Questo è un titolo"
        icona={icon[icone]}
        fill="#000"
        onOpen={() => { }}
        theme={theme}
      />
    );
    expect(renderedComponent.find(EggItem).length).toBe(1);
    expect(renderedComponent.find(EggLink).length).toBe(1);
    expect(renderedComponent.find(EggLinkLabel).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<EggItem />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<EggItem theme={theme} />);
    expect(renderedComponent.find('Div').length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<EggLink />', () => {
  it('should render a ClearLink', () => {
    const renderedComponent = shallow(<EggLink to="/#" theme={theme} />);
    expect(renderedComponent.find(ClearLink).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props fill', () => {
    const fill = '#000';
    const renderedComponent = shallow(
      <EggLink to="/#" theme={theme} fill={fill} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/ props iconbg', () => {
    const iconbg = 'red';
    const renderedComponent = shallow(
      <EggLink to="/#" theme={theme} iconbg={iconbg} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its css w/o props border if not defined in theme', () => {
    const themeNoBorder = {
      radius: {
        buttons: '50px',
      },
      menu: {
        itemWidth: '32px',
        itemHeight: '32px',
      },
    };
    const renderedComponent = shallow(
      <EggLink
        to="/#"
        theme={themeNoBorder}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
