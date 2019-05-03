import React from 'react';
import { shallow } from 'enzyme';
import Spinner from 'components/Spinner';
import { FormMessage } from '../index';
import TextArea, { Textarea } from '../TextArea';

const props = {
  input: {},
  label: 'placeholder',
  meta: {},
};

describe('<TextArea /> ', () => {
  it('should render an Textarea', () => {
    const renderedComponent = shallow(<TextArea {...props} />);
    expect(renderedComponent.find(Textarea).length).toEqual(1);
  });

  it('should render the placeholder', () => {
    const renderedComponent = shallow(<TextArea {...props} />);
    expect(renderedComponent.find(Textarea).prop('placeholder')).toBe(props.label);
  });

  it('should render the error', () => {
    const rendered = {
      ...props,
      meta: {
        touched: true,
        error: 'un errore',
      },
    };
    const error = <FormMessage>{rendered.meta.error}</FormMessage>;
    const renderedComponent = shallow(<TextArea {...rendered} />);
    expect(renderedComponent.contains(error)).toBe(true);
  });

  it('should render the Spinner', () => {
    const rendered = {
      ...props,
      meta: {
        asyncValidating: true,
      },
    };
    const renderedComponent = shallow(<TextArea {...rendered} />);
    expect(renderedComponent.contains(<Spinner size="small" />)).toBe(true);
  });

  it('should render a its css w/ props landing', () => {
    const rendered = {
      ...props,
      landing: true,
    };
    const renderedComponent = shallow(<TextArea {...rendered} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Textarea />', () => {
  it('should render a <textarea> tag', () => {
    const renderedComponent = shallow(<Textarea />);
    expect(renderedComponent.type()).toEqual('textarea');
  });

  it('should render a its css w/ props landing', () => {
    const landing = true;
    const renderedComponent = shallow(<Textarea landing={landing} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

