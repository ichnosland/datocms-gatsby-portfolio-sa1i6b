import React from 'react';
import { shallow } from 'enzyme';

import FlexBox from 'components/FlexBox';
import LogoPlatform from 'components/LogoPlatform';
import Svg from 'components/Svg';
import { Button, Icon } from 'components/Button';
import logo from 'images/logos';
import { H3 } from 'components/Heading';
import TopBar, { BarTitle, IconBtn, TopBarLogoLeft, TopBarLogoRight } from '../index';
import Bar from '../Bar';
import ItemCounter from '../ItemCounter';

const classi = [{
  classe: 10,
  nome: 'Nome 1',
}, {
  classe: 20,
  nome: 'Nome 2',
}];

const theme = {
  brand: '#00abe5',
};

const searchActive = false;

describe('<TopBar />', () => {
  it('should render a <header> tag', () => {
    const renderedComponent = shallow(
      <TopBar />
    );
    expect(renderedComponent.find(Bar).length).toEqual(1);
  });

  it('should render its css w/ props bgColor', () => {
    const bgColor = '#fff';
    const renderedComponent = shallow(
      <TopBar
        bgColor={bgColor}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props noShadow', () => {
    const renderedComponent = shallow(
      <TopBar
        noShadow
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props pinned', () => {
    const renderedComponent = shallow(
      <TopBar
        pinned
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props backNav with url', () => {
    const renderedComponent = shallow(
      <TopBar
        backNav={{
          url: '/path',
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props backNav with onClickFunction', () => {
    const renderedComponent = shallow(
      <TopBar
        backNav={{
          onClickFunction: () => { },
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props backArrow with url', () => {
    const renderedComponent = shallow(
      <TopBar
        backArrow={{
          url: '/path',
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props backArrow with onClickFunction', () => {
    const renderedComponent = shallow(
      <TopBar
        backArrow={{
          onClickFunction: () => { },
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props closeBtn with url', () => {
    const renderedComponent = shallow(
      <TopBar
        closeBtn={{
          url: '/path',
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props closeBtn with onClickFunction', () => {
    const renderedComponent = shallow(
      <TopBar
        closeBtn={{
          onClickFunction: () => { },
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props topSwitcher', () => {
    const topSwitcher = {
      items: [{
        key: '1',
        name: 'nome',
      }],
      selectedKey: '1',
      onChangeFunction: () => { },
    };
    const renderedComponent = shallow(
      <TopBar
        topSwitcher={topSwitcher}
        selectItems={classi}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props searchBox', () => {
    const renderedComponent = shallow(
      <TopBar
        searchBox
        searchActive={searchActive}
        onActivateSearch={() => { }}
        onFiltraUnita={() => { }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props searchBox & premiumActive', () => {
    const renderedComponent = shallow(
      <TopBar
        searchBox
        searchActive={searchActive}
        onActivateSearch={() => { }}
        onFiltraUnita={() => { }}
        premiumActive
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props lesson with url', () => {
    const renderedComponent = shallow(
      <TopBar
        lesson={{
          url: '/path',
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props lesson with onClickFunction', () => {
    const renderedComponent = shallow(
      <TopBar
        lesson={{
          onClickFunction: () => { },
          enabled: true,
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props rightBtn when onClickFunction is provided', () => {
    const renderedComponent = shallow(
      <TopBar
        rightBtn={{
          enabled: true,
          onClickFunction: () => { },
          icon: 'topBarFeedback',
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props rightBtn when url is provided', () => {
    const renderedComponent = shallow(
      <TopBar
        rightBtn={{
          enabled: true,
          url: '/url',
          icon: 'topBarFeedback',
        }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a title', () => {
    const title = 'title';
    const renderedComponent = shallow(
      <TopBar
        title={title}
      />
    );
    expect(renderedComponent.contains(title)).toBe(true);
  });

  it('should render its css w/ props esecuzione', () => {
    const renderedComponent = shallow(
      <TopBar
        esecuzione
        theme={theme}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props box', () => {
    const renderedComponent = shallow(
      <TopBar
        box
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props single', () => {
    const renderedComponent = shallow(
      <TopBar
        single
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props scores', () => {
    const score = '360';
    const renderedComponent = shallow(
      <TopBar
        scores
        score={score}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props button', () => {
    const button = {
      actioncolor: 'okay',
    };
    const renderedComponent = shallow(
      <TopBar
        button={button}
      />
    );
    expect(renderedComponent.find(Button).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props itemCount insidde button', () => {
    const button = {
      actioncolor: 'help',
      itemCount: '25',
    };
    const renderedComponent = shallow(
      <TopBar
        button={button}
      />
    );
    expect(renderedComponent.find(ItemCounter).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props label', () => {
    const button = {
      actioncolor: 'action',
      label: 'Push the button',
    };
    const renderedComponent = shallow(
      <TopBar
        button={button}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its props buttonIcon', () => {
    const button = {
      actioncolor: 'okay',
      label: 'stampa',
      buttonIcon: 'print',
    };
    const renderedComponent = shallow(
      <TopBar
        button={button}
      />
    );
    expect(renderedComponent.find(Icon).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render TopBarLogoLeft when !searchActive and product == mytest', () => {
    const renderedComponent = shallow(
      <TopBar product="mytest" />
    );
    expect(renderedComponent.find(TopBarLogoLeft).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render TopBarLogoLeft when searchActive and product == mytest', () => {
    const renderedComponent = shallow(
      <TopBar product="mytest" searchActive />
    );
    expect(renderedComponent.find(TopBarLogoLeft).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render TopBarLogoLeft when !searchActive and product == unknown', () => {
    const renderedComponent = shallow(
      <TopBar product="unknown" />
    );
    expect(renderedComponent.find(TopBarLogoLeft).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render TopBarLogoRight when !searchActive and product == mytest', () => {
    const renderedComponent = shallow(
      <TopBar product="mytest" />
    );
    expect(renderedComponent.find(TopBarLogoRight).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render TopBarLogoRight when searchActive and product == mytest', () => {
    const renderedComponent = shallow(
      <TopBar product="mytest" searchActive />
    );
    expect(renderedComponent.find(TopBarLogoRight).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not render TopBarLogoRight when !searchActive and product == unknown', () => {
    const renderedComponent = shallow(
      <TopBar product="unknown" />
    );
    expect(renderedComponent.find(TopBarLogoRight).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<IconBtn />', () => {
  it('should render a <FlexBox> tag', () => {
    const renderedComponent = shallow(<IconBtn />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props esecuzione', () => {
    const renderedComponent = shallow(<IconBtn esecuzione theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<IconBtn theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<BarTitle />', () => {
  it('should render an H3', () => {
    const renderedComponent = shallow(<BarTitle />);
    expect(renderedComponent.find(H3).length).toEqual(1);
  });

  it('should render its css w/ props esecuzione', () => {
    const renderedComponent = shallow(<BarTitle esecuzione />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props esecuzione == false', () => {
    const esecuzione = false;
    const renderedComponent = shallow(<BarTitle esecuzione={esecuzione} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<BarTitle theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<TopBarLogoLeft />', () => {
  const product = 'mytestitaliano';
  it('should render a LogoPlatform', () => {
    const renderedComponent = shallow(<TopBarLogoLeft product={product} />);
    expect(renderedComponent.find(LogoPlatform).length).toEqual(1);
  });
});

describe('<TopBarLogoRight />', () => {
  it('should render a Svg', () => {
    const renderedComponent = shallow(<TopBarLogoRight {...logo.alatin} />);
    expect(renderedComponent.find(Svg).length).toEqual(1);
  });
});
