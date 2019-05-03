import React from 'react';
import { shallow } from 'enzyme';

import ClearLink from 'components/ClearLink';
import Spinner from 'components/Spinner';
import ContentEditable from 'components/ContentEditable';
import Div from 'components/Div';
import ButtonGroup from 'components/ButtonGroup';
import FlexBox from 'components/FlexBox';
import ListPanel, {
  PanelListWrap,
  PanelHeader,
  PanelList,
  ListItem,
  ListLink,
  ItemTitle,
  Studenti,
  ItemIcons,
} from '../index';

const children = <p>some text</p>;
const theme = {
  brand: '#000',
};
const items = [{
  id: 1,
  nome: 'Come',
  percentuale: 20,
  noPrint: true,
}, {
  id: 2,
  nome: 'fosse',
  noPrint: false,
  assigned: true,
  url: '/path',
}, {
  id: 3,
  nome: 'antani',
  locked: true,
}, {
  id: 4,
  nome: 'un bel',
  checkbox: true,
}, {
  id: 5,
  nome: 'campo',
  radio: true,
}, {
  id: 6,
  nome: 'Non ne sono tanto sicuro',
  studenti: 22,
}, {
  id: 7,
  nome: 'Testo <strong>in</strong> HTML',
  isHtml: true,
}, {
  id: 8,
  nome: 'link_bloccato',
  assigned: true,
  locked: true,
  url: '/path',
}, {
  id: 9,
  nome: 'nome',
  options: [{
    key: 'opzione_1',
    tipo: 'contenteditable',
    label: 'label opzione editabile',
    content: 'contenuto',
  }],
}];

const buttons = [{
  id: 1,
  label: 'Vedi',
  icona: 'eye',
}, {
  id: 2,
  label: 'Modifica',
  icona: 'modifica',
}];

describe('<ListPanel />', () => {
  it('should render a PanelListWrap', () => {
    const renderedComponent = shallow(<ListPanel items={items} />);
    expect(renderedComponent.find(PanelListWrap).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ListLink', () => {
    const renderedComponent = shallow(<ListPanel items={items} />);
    expect(renderedComponent.find(ListLink).length).toBe(1);
  });

  it('should render a map', () => {
    const renderedComponent = shallow(<ListPanel items={items} />);
    expect(renderedComponent.find(ListItem).length).toBe(9);
  });

  it('should render its childrens', () => {
    const renderedComponent = shallow(
      <Div>{children}</Div>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css w/ props percentuale', () => {
    const renderedComponent = shallow(<ListPanel items={items} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props unit', () => {
    const renderedComponent = shallow(<ListPanel items={items} unit />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render PanelHeader w/ props header', () => {
    const header = 'Titolo';
    const renderedComponent = shallow(<ListPanel items={items} header={header} />);
    expect(renderedComponent.find(PanelHeader).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ButtonGroup w/ props buttons', () => {
    const renderedComponent = shallow(<ListPanel items={items} buttons={buttons} />);
    expect(renderedComponent.find(ButtonGroup).length).toEqual(1);
    expect(renderedComponent.find(Spinner).length).toEqual(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ButtonGroup w/ props buttonsSpinner', () => {
    const renderedComponent = shallow(<ListPanel items={items} buttons={buttons} buttonsSpinner />);
    expect(renderedComponent.find(ButtonGroup).length).toEqual(0);
    expect(renderedComponent.find(Spinner).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a ButtonGroup w/ props ContentEditable if provided', () => {
    const renderedComponent = shallow(<ListPanel items={items} buttons={buttons} />);
    expect(renderedComponent.find(ContentEditable).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<PanelListWrap />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<PanelListWrap />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '15px';
    const renderedComponent = shallow(<PanelListWrap margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ListItem />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ListItem />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props unit', () => {
    const renderedComponent = shallow(<ListItem unit />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props locked', () => {
    const renderedComponent = shallow(<ListItem locked />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props isSelected', () => {
    const isSelected = true;
    const renderedComponent = shallow(<ListItem isSelected={isSelected} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ItemTitle />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ItemTitle />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props locked', () => {
    const renderedComponent = shallow(<ItemTitle locked />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props unit', () => {
    const renderedComponent = shallow(<ItemTitle unit />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props noPrint', () => {
    const noPrint = true;
    const renderedComponent = shallow(<ItemTitle noPrint={noPrint} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<PanelList />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<PanelList />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<PanelList />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<PanelList bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<PanelHeader />', () => {
  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<PanelHeader theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Studenti />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<Studenti />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<Studenti />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ListLink />', () => {
  it('should render a ClearLink', () => {
    const renderedComponent = shallow(<ListLink to="/#" />);
    expect(renderedComponent.find(ClearLink).length).toEqual(1);
  });
});

describe('<ItemIcons />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<ItemIcons />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });
});
