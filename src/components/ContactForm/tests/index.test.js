import React from 'react';
import { shallow } from 'enzyme';

import Container from 'components/Container';
import AlertBanner from 'components/AlertBanner';
import { ContactFormView } from '../index';

const mockProps = {
  spinner: false,
  handleSubmit: () => { },
  valid: false,
  feedback: {
    hasFeedback: false,
    tipologia: 'error',
    messaggio: 'messaggio errore',
  },
};

describe('<ContactFormView />', () => {
  it('mostro la situazione iniziale', () => {
    const renderedComponent = shallow(<ContactFormView {...mockProps} />);
    expect(renderedComponent.find(Container).length).toEqual(1);
    expect(renderedComponent.find(AlertBanner).length).toEqual(0);
    expect(renderedComponent.find('form').length).toEqual(1);
  });

  it('se ho un errore nel form', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(<ContactFormView {...props} />);
    expect(renderedComponent.find(Container).length).toEqual(1);
    expect(renderedComponent.find(AlertBanner).length).toEqual(1);
    expect(renderedComponent.find('form').length).toEqual(1);
  });

  it('se ho un messaggio di conferma nel form', () => {
    const props = {
      ...mockProps,
      feedback: {
        ...mockProps.feedback,
        tipologia: 'okay',
        hasFeedback: true,
      },
    };
    const renderedComponent = shallow(<ContactFormView {...props} />);
    expect(renderedComponent.find(Container).length).toEqual(1);
    expect(renderedComponent.find(AlertBanner).length).toEqual(1);
    expect(renderedComponent.find('form').length).toEqual(0);
  });

  it('should render its button bgColor w/ props buttonBg', () => {
    const props = {
      ...mockProps,
      buttonBg: 'red',
    };
    const renderedComponent = shallow(<ContactFormView {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its button color w/ props buttonColor', () => {
    const props = {
      ...mockProps,
      buttonColor: 'green',
    };
    const renderedComponent = shallow(<ContactFormView {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
