import React from 'react';
import { shallow } from 'enzyme';

import ContentEditable, { EditableField } from '../index';

const props = {
  label: 'label',
};

describe('<ContentEditable />', () => {
  it('should render a EditableField', () => {
    const renderedComponent = shallow(
      <ContentEditable
        content="contenuto"
        label="label"
        mustBeNumeric
      />
    );
    expect(renderedComponent.find(EditableField).length).toBe(1);
  });

  it('should render the placeholder if label is provided', () => {
    const renderedComponent = shallow(
      <ContentEditable
        content="contenuto"
        label="label"
        mustBeNumeric
      />
    );
    expect(renderedComponent.find(EditableField).prop('placeholder')).toBe(props.label);
  });

  it('should render input type=number if mustBeNumeric is provided ', () => {
    const renderedComponent = shallow(
      <ContentEditable
        content="contenuto"
        mustBeNumeric
      />
    );
    expect(renderedComponent.find('[type="number"]').length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render input type=text if mustBeNumeric is not provided ', () => {
    const renderedComponent = shallow(
      <ContentEditable
        content="contenuto"
      />
    );
    expect(renderedComponent.find('[type="text"]').length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(
      <ContentEditable
        content="contenuto"
        giusto
      />
    );
    expect(renderedComponent.find('[type="text"]').length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props sbagliato', () => {
    const renderedComponent = shallow(
      <ContentEditable
        content="contenuto"
        sbagliato
      />
    );
    expect(renderedComponent.find('[type="text"]').length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<EditableField />', () => {
  it('should render a <input> tag', () => {
    const renderedComponent = shallow(
      <EditableField
        content="contenuto"
        label="label"
      />
    );
    expect(renderedComponent.type()).toEqual('input');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(
      <EditableField
        content="contenuto"
        label="label"
        color={color}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a its css w/ props padding', () => {
    const padding = '30px';
    const renderedComponent = shallow(
      <EditableField
        content="contenuto"
        label="label"
        padding={padding}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a its css w/ props radius', () => {
    const radius = '6px';
    const renderedComponent = shallow(
      <EditableField
        content="contenuto"
        label="label"
        radius={radius}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a its css w/ props bgcolor', () => {
    const bgcolor = 'green';
    const renderedComponent = shallow(
      <EditableField
        content="contenuto"
        label="label"
        bgcolor={bgcolor}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
