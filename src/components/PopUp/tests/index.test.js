import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import { ModalOverlay, ModalHeader } from 'components/Modal';
import { Button } from 'components/Button';
import Image from 'components/Image';
import scrivi from 'images/infocard-icn_scrivi.png';
import PopUp, {
  PopUpContent,
  PopUpBody,
  PopUpHeader,
  PopUpFooter,
} from '../index';


const popUpMock = {
  titolo: 'Questo è un titolo',
  contenuto: 'Questo è un contenuto',
  show: true,
  closeButton: {
    onClick: () => {},
  },
  enableOnClose: true,
};

describe('<PopUp />', () => {
  it('checks PopUp props with at least one button', () => {
    const renderedComponent = shallow(
      <PopUp
        {...popUpMock}
      />
    );
    expect(renderedComponent.find(PopUpContent).length).toBe(1);
    expect(renderedComponent.find(PopUpHeader).length).toBe(1);
    expect(renderedComponent.find(PopUpBody).length).toBe(1);
    expect(renderedComponent.find(PopUpFooter).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(1);
  });

  it('checks PopUp props when no buttons provided', () => {
    const props = {
      ...popUpMock,
      closeButton: undefined,
    };
    const renderedComponent = shallow(
      <PopUp
        {...props}
      />
    );
    expect(renderedComponent.find(PopUpContent).length).toBe(1);
    expect(renderedComponent.find(PopUpHeader).length).toBe(1);
    expect(renderedComponent.find(PopUpBody).length).toBe(1);
    expect(renderedComponent.find(PopUpFooter).length).toBe(0);
  });

  it('checks PopUp props when acceptButton provided too', () => {
    const props = {
      ...popUpMock,
      acceptButton: {
        onClick: () => {},
      },
    };
    const renderedComponent = shallow(
      <PopUp
        {...props}
      />
    );
    expect(renderedComponent.find(PopUpContent).length).toBe(1);
    expect(renderedComponent.find(PopUpHeader).length).toBe(1);
    expect(renderedComponent.find(PopUpBody).length).toBe(1);
    expect(renderedComponent.find(PopUpFooter).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('checks PopUp props when acceptButton provided too when label is provided', () => {
    const props = {
      ...popUpMock,
      acceptButton: {
        onClick: () => {},
        text: 'accept',
      },
      closeButton: {
        ...popUpMock.closeButton,
        text: 'cancella',
      },
    };
    const renderedComponent = shallow(
      <PopUp
        {...props}
      />
    );
    expect(renderedComponent.find(PopUpContent).length).toBe(1);
    expect(renderedComponent.find(PopUpHeader).length).toBe(1);
    expect(renderedComponent.find(PopUpBody).length).toBe(1);
    expect(renderedComponent.find(PopUpFooter).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(2);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('checks PopUp props with empty title', () => {
    const renderedComponent = shallow(
      <PopUp
        {...{
          ...popUpMock,
          titolo: '',
        }}
      />
    );
    expect(renderedComponent.find(ModalHeader).length).toBe(0);
  });

  it('checks PopUp props with an image', () => {
    const renderedComponent = shallow(
      <PopUp
        {...{
          ...popUpMock,
          image: {
            src: scrivi,
            width: '180px',
            height: '130px',
            alt: 'Traduci',
          },
        }}
      />
    );
    expect(renderedComponent.find(Image).length).toBe(1);
  });

  it('checks PopUp props with empty content', () => {
    const renderedComponent = shallow(
      <PopUp
        {...{
          ...popUpMock,
          contenuto: '',
        }}
      />
    );
    expect(renderedComponent.find(PopUpBody).length).toBe(0);
  });

  it('checks ModalOverlay must be show=true when must be shown', () => {
    const renderedComponent = shallow(
      <PopUp
        {...{ ...popUpMock }}
      />
    );
    expect(renderedComponent.find(ModalOverlay).props().show).toBe(true);
  });

  it('checks ModalOverlay must be show=false when must not be shown', () => {
    const renderedComponent = shallow(
      <PopUp
        {...{ ...popUpMock, show: false }}
      />
    );
    expect(renderedComponent.find(ModalOverlay).props().show).toBe(false);
  });
});

describe('<PopUpHeader />', () => {
  it('should render a <h4> tag', () => {
    const renderedComponent = shallow(<PopUpHeader />);
    expect(renderedComponent.type()).toEqual('h4');
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: 'red',
    };
    const renderedComponent = shallow(<PopUpHeader theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<PopUpBody />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<PopUpBody />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'yellow';
    const renderedComponent = shallow(<PopUpBody color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
