import React from 'react';
import { shallow } from 'enzyme';

import { SelectChevron, SelectMenu } from 'components/Select';
import Spinner from 'components/Spinner';
import { FormMessage } from '../index';
import SelectField from '../SelectField';

const props = {
  label: 'titolo',
  name: 'nome',
  id: 'id_1',
  meta: {
    asyncValidating: false,
    touched: false,
    error: '',
  },
};


describe('<SelectField />', () => {
  it('deve visualizzare SelectMenu e SelectChevron e options.length == 3', () => {
    const renderedComponent = shallow(
      <SelectField {...props}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent.find(SelectChevron).length).toEqual(1);
    expect(renderedComponent.find(SelectMenu).length).toEqual(1);
    expect(renderedComponent.find(Spinner).length).toEqual(0);
    expect(renderedComponent.find(FormMessage).length).toEqual(0);
    expect(renderedComponent.find('option').length).toEqual(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve visualizzare uno spinner se asyncValidating == true', () => {
    const mockProps = {
      ...props,
      meta: {
        ...props.meta,
        asyncValidating: true,
      },
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent.find(SelectChevron).length).toEqual(1);
    expect(renderedComponent.find(SelectMenu).length).toEqual(1);
    expect(renderedComponent.find(Spinner).length).toEqual(1);
    expect(renderedComponent.find(FormMessage).length).toEqual(0);
    expect(renderedComponent.find('option').length).toEqual(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve visualizzare un messaggio se touched == true !!error == true', () => {
    const mockProps = {
      ...props,
      meta: {
        ...props.meta,
        touched: true,
        error: 'error',
      },
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent.find(SelectChevron).length).toEqual(1);
    expect(renderedComponent.find(SelectMenu).length).toEqual(1);
    expect(renderedComponent.find(Spinner).length).toEqual(0);
    expect(renderedComponent.find(FormMessage).length).toEqual(1);
    expect(renderedComponent.find('option').length).toEqual(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('deve visualizzare un messaggio se touched == false !!error == true', () => {
    const mockProps = {
      ...props,
      meta: {
        ...props.meta,
        touched: false,
        error: 'error',
      },
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent.find(SelectChevron).length).toEqual(1);
    expect(renderedComponent.find(SelectMenu).length).toEqual(1);
    expect(renderedComponent.find(Spinner).length).toEqual(0);
    expect(renderedComponent.find(FormMessage).length).toEqual(0);
    expect(renderedComponent.find('option').length).toEqual(3);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const mockProps = {
      ...props,
      margin: '100px',
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const mockProps = {
      ...props,
      padding: '50px',
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const mockProps = {
      ...props,
      radius: '20px',
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const mockProps = {
      ...props,
      color: 'red',
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props optioncolor', () => {
    const mockProps = {
      ...props,
      optioncolor: 'yellow',
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgColor', () => {
    const mockProps = {
      ...props,
      bgColor: 'green',
    };
    const renderedComponent = shallow(
      <SelectField {...mockProps}>
        <option>uno</option>
        <option>due</option>
        <option>tre</option>
      </SelectField>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
