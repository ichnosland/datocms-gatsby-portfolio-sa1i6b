import React from 'react';
import { shallow } from 'enzyme';

import FlexBox, { FlexChild } from 'components/FlexBox';
import OpzioniBlocchi, { WrapOpzioniBlocchi, OpzioneBlocchi } from '../OpzioniBlocchi';

const titolo = 'Titolo';

const theme = {
  radius: {
    general: '80px',
  },
};

const opzioni = [{
  id: 1,
  indiceEtichetta: 1,
  etichetta: '',
  titolo: 'titolo',
  etichettaComposita: '',
}];

const indiceBlocco = 3;

const selectFunction = () => { };

describe('<OpzioniBlocchi /> ', () => {
  it('should render an <div>', () => {
    const renderedComponent = shallow(
      <OpzioniBlocchi
        titolo={titolo}
        opzioni={opzioni}
        indiceBlocco={indiceBlocco}
        selectFunction={selectFunction}
      />
    );
    expect(renderedComponent.find(WrapOpzioniBlocchi).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should work with latex', () => {
    const mockProps = {
      titolo: [<span key="k">titolo</span>],
      opzioni: [{
        etichetta: 'etichetta 1',
        etichettaComposita: [<span key="k">etichetta 1</span>],
        indiceEtichetta: 1,
      }, {
        etichetta: 'etichetta 2',
        etichettaComposita: [<span key="l">etichetta 1</span>],
        indiceEtichetta: 2,
      }],
      selectFunction: jest.fn(),
      indiceBlocco: 123,
    };

    const renderedComponent = shallow(
      <OpzioniBlocchi {...mockProps} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('il click dell\'opzione deve chiamare la selectFunction', () => {
    const mockProps = {
      titolo: 'titolo',
      opzioni: [{
        etichetta: 'etichetta 1',
        etichettaComposita: 'etichetta 1',
        indiceEtichetta: 1,
      }, {
        etichetta: 'etichetta 2',
        etichettaComposita: 'etichetta 2',
        indiceEtichetta: 2,
      }],
      selectFunction: jest.fn(),
      indiceBlocco: 123,
    };

    const renderedComponent = shallow(
      <OpzioniBlocchi {...mockProps} />
    );

    expect(mockProps.selectFunction).not.toHaveBeenCalled();
    renderedComponent.find(OpzioneBlocchi).at(0).simulate('click');
    expect(mockProps.selectFunction).toHaveBeenCalledWith({
      123: {
        indiceLabel: 1,
        labelOpzione: 'etichetta 1',
      },
    });
  });
});

describe('<WrapOpzioniBlocchi /> ', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<WrapOpzioniBlocchi />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its props w/ theme', () => {
    const renderedComponent = shallow(<WrapOpzioniBlocchi theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<OpzioneBlocchi /> ', () => {
  it('should render an FlexChild', () => {
    const renderedComponent = shallow(<OpzioneBlocchi />);
    expect(renderedComponent.find(FlexChild).length).toEqual(1);
  });

  it('should render its props w/ theme', () => {
    const renderedComponent = shallow(<OpzioneBlocchi theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props dragColor', () => {
    const dragColor = 'red';
    const renderedComponent = shallow(<OpzioneBlocchi theme={theme} dragColor={dragColor} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
