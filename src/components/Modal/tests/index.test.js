import React from 'react';
import { shallow } from 'enzyme';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { Button, Icon } from 'components/Button';
import TopBar from 'components/TopBar';
import Image from 'components/Image';
import scrivi from 'images/infocard-icn_scrivi.png';
import Modal, { ModalOverlay, ModalContent, ModalHeader, ModalFooter } from '../index';


const modalMock = {
  titolo: 'Questo è un titolo',
  contenuto: <p>Questo è un contenuto</p>,
  show: true,
  closeButton: {
    actionColor: 'red',
    icon: 'lock',
    onClick: jest.fn(),
  },
};

describe('<Modal />', () => {
  it('checks Modal props', () => {
    const renderedComponent = shallow(
      <Modal
        {...modalMock}
      />
    );
    expect(renderedComponent.find(ModalContent).length).toBe(1);
    expect(renderedComponent.find(ModalHeader).length).toBe(1);
    expect(renderedComponent.find(ModalFooter).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find(Icon).length).toBe(1);
  });

  it('checks Modal props if not buttons displayed', () => {
    const props = {
      ...modalMock,
      closeButton: undefined,
    };
    const renderedComponent = shallow(
      <Modal
        {...props}
      />
    );
    expect(renderedComponent.find(ModalContent).length).toBe(1);
    expect(renderedComponent.find(ModalHeader).length).toBe(1);
    expect(renderedComponent.find(ModalFooter).length).toBe(0);
    expect(renderedComponent.find(Button).length).toBe(0);
    expect(renderedComponent.find(Icon).length).toBe(0);
  });

  it('checks Modal if topbar prop is true', () => {
    const props = {
      ...modalMock,
      topbar: true,
    };
    const renderedComponent = shallow(
      <Modal
        {...props}
      />
    );
    expect(renderedComponent.find(ModalContent).length).toBe(1);
    expect(renderedComponent.find(ModalHeader).length).toBe(0);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(ModalFooter).length).toBe(0);
    expect(renderedComponent.find(Button).length).toBe(0);
    expect(renderedComponent.find(Icon).length).toBe(0);
  });

  it('if topbar prop is true it should render its css w/ props barcolor', () => {
    const props = {
      ...modalMock,
      topbar: true,
      barcolor: 'yellow',
    };
    const renderedComponent = shallow(
      <Modal
        {...props}
      />
    );
    expect(renderedComponent.find(ModalContent).length).toBe(1);
    expect(renderedComponent.find(ModalHeader).length).toBe(0);
    expect(renderedComponent.find(TopBar).length).toBe(1);
    expect(renderedComponent.find(ModalFooter).length).toBe(0);
    expect(renderedComponent.find(Button).length).toBe(0);
    expect(renderedComponent.find(Icon).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('checks Modal props if close button provided but no default values', () => {
    const props = {
      ...modalMock,
      closeButton: {
        onClick: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <Modal
        {...props}
      />
    );
    expect(renderedComponent.find(ModalContent).length).toBe(1);
    expect(renderedComponent.find(ModalHeader).length).toBe(1);
    expect(renderedComponent.find(ModalFooter).length).toBe(1);
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent.find(Icon).length).toBe(0);
  });

  it('checks Modal props with empty title', () => {
    const renderedComponent = shallow(
      <Modal
        {...{
          ...modalMock,
          titolo: '',
        }}
      />
    );
    expect(renderedComponent.find(ModalHeader).length).toBe(0);
  });

  it('checks ModalOverlay must be show=true when must be shown', () => {
    const renderedComponent = shallow(
      <Modal
        {...{ ...modalMock }}
      />
    );
    expect(renderedComponent.find(ModalOverlay).props().show).toBe(true);
  });

  it('checks ModalOverlay must be show=false when must not be shown', () => {
    const renderedComponent = shallow(
      <Modal
        {...{ ...modalMock, show: false }}
      />
    );
    expect(renderedComponent.find(ModalOverlay).props().show).toBe(false);
  });

  it('checks Modal props with an image', () => {
    const renderedComponent = shallow(
      <Modal
        {...{
          ...modalMock,
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

  it('should check if onClose event is triggered', () => {
    const mockProps = {
      ...modalMock,
      onClose: jest.fn(),
    };
    const wrapper = shallow((
      <Modal
        {...mockProps}
      />
    ));
    wrapper.find(Button).simulate('click');
    expect(mockProps.closeButton.onClick).toHaveBeenCalled();
  });
});

describe('<ModalOverlay />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<ModalOverlay />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });

  it('should render its css w/ props show', () => {
    const show = false;
    const renderedComponent = shallow(<ModalOverlay show={show} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props topbar', () => {
    const topbar = true;
    const renderedComponent = shallow(<ModalOverlay topbar={topbar} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props overlaybg', () => {
    const overlaybg = 'green';
    const renderedComponent = shallow(<ModalOverlay overlaybg={overlaybg} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      modalbg: 'yellow',
    };
    const renderedComponent = shallow(<ModalOverlay theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ModalContent />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ModalContent />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'green';
    const renderedComponent = shallow(<ModalContent bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props topbar', () => {
    const renderedComponent = shallow(<ModalContent topbar />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props formBox', () => {
    const renderedComponent = shallow(<ModalContent formBox />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props formBox & theme', () => {
    const theme = {
      brand: '#00BBEF',
    };
    const renderedComponent = shallow(<ModalContent formBox theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props formBox & props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<ModalContent formBox color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props formBox & props bgcolor', () => {
    const bgcolor = 'blu';
    const renderedComponent = shallow(<ModalContent formBox bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props maxWidth', () => {
    const maxWidth = '400px';
    const renderedComponent = shallow(<ModalContent formBox maxWidth={maxWidth} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ModalHeader />', () => {
  it('should render a <h3> tag', () => {
    const renderedComponent = shallow(<ModalHeader />);
    expect(renderedComponent.type()).toEqual('h3');
  });

  it('should render its css w/ props theme', () => {
    const theme = {
      brand: 'red',
    };
    const renderedComponent = shallow(<ModalHeader theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ModalFooter />', () => {
  it('should render a Div', () => {
    const renderedComponent = shallow(<ModalFooter />);
    expect(renderedComponent.find(Div).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
