/**
 *
 * ModalBox testing
 *
 */

import React from 'react';
import { shallow } from 'enzyme';

import configureStore from 'configureStore';

import Modal from 'components/Modal';
import PopUp from 'components/PopUp';
import ModalBox, { ModalBoxView } from '../index';
import * as actions from '../actions';

const store = configureStore({}, {});
const props = {
  modal: {
    show: true,
    titolo: 'titolo',
    contenuto: 'contenuto',
    isPopup: false,
  },
  onModalEmptyData: () => { },
  history: {
    listen: () => { },
  },
};

describe('<ModalBoxView />', () => {
  it('should render one Modal when modal is active', () => {
    const renderedComponent = shallow(
      <ModalBoxView {...props} />
    );
    expect(renderedComponent.find(Modal).length).toBe(1);
    expect(renderedComponent.find(PopUp).length).toBe(0);
  });

  it('should call history.listen on mount', () => {
    const mockProps = {
      ...props,
      history: {
        listen: jest.fn(),
      },
      onModalEmptyData: jest.fn(),
    };
    shallow(<ModalBoxView {...mockProps} />);
    expect(mockProps.history.listen).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call history.listen() on Unmount', () => {
    const cancelFx = jest.fn();
    const mockProps = {
      ...props,
      history: {
        listen: () => cancelFx,
      },
      onModalEmptyData: jest.fn(),
    };

    const renderedComponent = shallow(<ModalBoxView {...mockProps} />);
    const instance = renderedComponent.instance();
    expect(cancelFx).not.toHaveBeenCalled();
    instance.componentWillUnmount();
    expect(cancelFx).toHaveBeenCalled();
  });

  it('should render one PopUp when modal is active', () => {
    const mockProps = {
      ...props,
      modal: {
        ...props.modal,
        isPopup: true,
      },
    };
    const renderedComponent = shallow(
      <ModalBoxView
        {...mockProps}
      />
    );
    expect(renderedComponent.find(Modal).length).toBe(0);
    expect(renderedComponent.find(PopUp).length).toBe(1);
  });

  it('should render one Modal when modal is not active', () => {
    const renderedComponent = shallow(
      <ModalBoxView
        {...{
          ...props,
          modal: {
            ...props.modal,
            show: false,
          },
        }}
      />
    );
    expect(renderedComponent.find(Modal).length).toBe(0);
  });

  it('should not send to Modal closeButton if disableClose == true', () => {
    const renderedComponent = shallow(
      <ModalBoxView
        {...{
          ...props,
          modal: {
            ...props.modal,
            disableClose: true,
          },
        }}
      />
    );
    expect(renderedComponent.find(Modal).length).toBe(1);
    expect(renderedComponent.find(Modal).props().closeButton).toBe(null);
  });
});

describe('<ModalBox />', () => {
  it('should render its default props', () => {
    const renderedComponent = shallow(
      <ModalBox history={props.history} />, { context: { store } }
    ).dive().dive();

    const instance = renderedComponent.instance();
    expect(instance.props.modal).toEqual({
      acceptButton: undefined,
      closeButton: undefined,
      contenuto: '',
      titolo: '',
      disableClose: false,
      show: false,
      isPopup: true,
    });
  });

  it('onModalEmptyData function should call modalSetEmptyData', () => {
    const renderedComponent = shallow(
      <ModalBox history={props.history} />, { context: { store } }
    ).dive().dive();

    const instance = renderedComponent.instance();
    const spy = jest.spyOn(actions, 'modalSetEmptyData');

    expect(spy).not.toHaveBeenCalled();
    instance.props.onModalEmptyData();
    expect(spy).toHaveBeenCalled();
  });
});
