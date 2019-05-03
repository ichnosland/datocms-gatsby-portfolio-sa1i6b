import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import ButtonGroup, { Group, InnerButton } from '../index';

const theme = {
  brand: '#00abe5',
  light: 'rgb(109, 210, 240)',
  dark: 'rgb(0, 114, 205)',
  pale: 'rgb(199, 231, 245)',
  subtle: 'rgb(178, 208, 223)',
  fonts: {
    buttons: {
      fontFamily: 'Quicksand',
      fontWeight: '400',
    },
  },
  radius: {
    buttons: '50px',
  },
};

const button = [{
  id: 1,
  label: 'center button',
}, {
  id: 2,
  label: 'la nonna',
}, {
  id: 3,
  label: 'zio',
}, {
  id: 4,
  label: 'ezechiele',
  icona: 'eye',
}, {
  id: 5,
  label: 'con funzione',
  onClickFunction: () => {},
}, {
  id: 6,
  label: 'nascosto su mobile',
  hideOnMobile: true,
}];

describe('<ButtonGroup />', () => {
  it('should render a Group tag', () => {
    const renderedComponent = shallow(<ButtonGroup buttons={button} />);
    expect(renderedComponent.find(Group).length).toEqual(1);
  });

  it('should render its css w/ props margin', () => {
    const margin = '30px';
    const renderedComponent = shallow(<ButtonGroup buttons={button} margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props half', () => {
    const renderedComponent = shallow(<ButtonGroup buttons={button} half />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full', () => {
    const renderedComponent = shallow(<ButtonGroup buttons={button} full />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props tabs', () => {
    const renderedComponent = shallow(<ButtonGroup buttons={button} tabs />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Group />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<Group />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props full', () => {
    const renderedComponent = shallow(<Group full />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '50px';
    const renderedComponent = shallow(<Group margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props tabs', () => {
    const renderedComponent = shallow(<Group tabs />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<InnerButton />', () => {
  it('should render a button', () => {
    const renderedComponent = shallow(<InnerButton theme={theme} buttons={button} />);
    expect(renderedComponent.find('button').length).toEqual(1);
  });

  it('should render its css w/ props color', () => {
    const color = '#444';
    const renderedComponent = shallow(
      <InnerButton
        color={color}
        buttons={button}
        theme={theme}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = '#444';
    const renderedComponent = shallow(
      <InnerButton
        bgcolor={bgcolor}
        buttons={button}
        theme={theme}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor when disabled', () => {
    const bgcolor = '#ffbb00';
    const renderedComponent = shallow(
      <InnerButton
        bgcolor={bgcolor}
        buttons={button}
        disabled
        theme={theme}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props activeColor', () => {
    const activecolor = '#444';
    const renderedComponent = shallow(
      <InnerButton
        activeColor={activecolor}
        buttons={button}
        theme={theme}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props acitvebgColor', () => {
    const activebgColor = '#444';
    const renderedComponent = shallow(
      <InnerButton
        activebgColor={activebgColor}
        buttons={button}
        theme={theme}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const border = '3px solid green';
    const renderedComponent = shallow(
      <InnerButton
        border={border}
        buttons={button}
        theme={theme}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props attivo', () => {
    const renderedComponent = shallow(<InnerButton buttons={button} attivo theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props half', () => {
    const renderedComponent = shallow(<InnerButton buttons={button} half theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full', () => {
    const renderedComponent = shallow(<InnerButton buttons={button} full theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props hideOnMobile', () => {
    const hideOnMobile = true;
    const renderedComponent = shallow(<InnerButton buttons={button} hideOnMobile={hideOnMobile} theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props tabs', () => {
    const renderedComponent = shallow(<InnerButton buttons={button} tabs theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
