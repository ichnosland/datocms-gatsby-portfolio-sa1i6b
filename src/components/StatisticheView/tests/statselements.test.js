import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import Svg from 'components/Svg';
import {
  WrapReportistica,
  ReportCardToolbar,
  CardToolbox,
  ToggleDomanda,
  DomandaRisposta,
  ToggleRisposta,
  SideBarReportistica,
  Studente,
  CloseSideBarBtn,
  StatsCurrentUser,
  VotoSelectedUser,
} from '../StatsElements';

const theme = {
  brand: '#111',
  darken: '#222',
  pale: '#333',
};
const viewBox = '0 0 8.34 16';
const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" data-name="Livello 1" fill="#ffffff" />;

describe('<WrapReportistica />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<WrapReportistica />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props isDocente', () => {
    const renderedComponent = shallow(<WrapReportistica isDocente />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ReportCardToolbar />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ReportCardToolbar />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<ReportCardToolbar theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props inattiva', () => {
    const renderedComponent = shallow(<ReportCardToolbar inattiva />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CardToolbox />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<CardToolbox />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(<CardToolbox theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ToggleDomanda />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<ToggleDomanda />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props rops risultato === bene', () => {
    const risultato = 'bene';
    const renderedComponent = shallow(<ToggleDomanda risultato={risultato} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props rops risultato === media', () => {
    const risultato = 'media';
    const renderedComponent = shallow(<ToggleDomanda risultato={risultato} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props rops risultato === male', () => {
    const risultato = 'male';
    const renderedComponent = shallow(<ToggleDomanda risultato={risultato} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<DomandaRisposta />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<DomandaRisposta />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props rops risultato === bene', () => {
    const risultato = 'bene';
    const renderedComponent = shallow(<DomandaRisposta risultato={risultato} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props rops risultato === media', () => {
    const risultato = 'media';
    const renderedComponent = shallow(<DomandaRisposta risultato={risultato} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props rops risultato === male', () => {
    const risultato = 'male';
    const renderedComponent = shallow(<DomandaRisposta risultato={risultato} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ToggleRisposta />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ToggleRisposta />);
    expect(renderedComponent.find(Div).length).toEqual(1);
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(
      <ToggleRisposta theme={theme}>
        <Svg
          viewBox={viewBox}
          path={path}
        />
      </ToggleRisposta>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SideBarReportistica />', () => {
  it('should render a <ul> tag', () => {
    const renderedComponent = shallow(<SideBarReportistica />);
    expect(renderedComponent.type()).toEqual('ul');
  });

  it('should render its css w/ props active', () => {
    const renderedComponent = shallow(<SideBarReportistica active />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props isDocente', () => {
    const isDocente = false;
    const renderedComponent = shallow(<SideBarReportistica isDocente={isDocente} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Studente />', () => {
  it('should render a <li> tag', () => {
    const renderedComponent = shallow(<Studente />);
    expect(renderedComponent.type()).toEqual('li');
  });

  it('should render its css w/ props attivo', () => {
    const renderedComponent = shallow(<Studente attivo />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(
      <Studente attivo theme={theme}>
        <span>span</span>
        <button>button</button>
      </Studente>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props ennecci', () => {
    const renderedComponent = shallow(
      <Studente ennecci theme={theme}>
        <span>span</span>
        <button>button</button>
      </Studente>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CloseSideBarBtn />', () => {
  it('should render a <button> tag', () => {
    const renderedComponent = shallow(<CloseSideBarBtn />);
    expect(renderedComponent.type()).toEqual('button');
  });

  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(
      <CloseSideBarBtn theme={theme}>
        <Svg
          viewBox={viewBox}
          path={path}
        />
      </CloseSideBarBtn>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<StatsCurrentUser />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<StatsCurrentUser />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });
  it('should render its css w/ props theme', () => {
    const renderedComponent = shallow(
      <StatsCurrentUser theme={theme}>
        <Svg
          viewBox={viewBox}
          path={path}
        />
      </StatsCurrentUser>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  describe('<VotoSelectedUser />', () => {
    it('should render a FlexBox', () => {
      const renderedComponent = shallow(<VotoSelectedUser />);
      expect(renderedComponent.find(FlexBox).length).toEqual(1);
    });

    it('should render its css w/ props theme', () => {
      const renderedComponent = shallow(<VotoSelectedUser theme={theme} />);
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
