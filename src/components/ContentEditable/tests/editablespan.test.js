import React from 'react';
import { shallow } from 'enzyme';

import EditableSpan, { EditableSpanView } from '../EditableSpan';

describe('<EditableSpan />', () => {
  it('should render a <span> tag', () => {
    const renderedComponent = shallow(
      <EditableSpan
        label="label"
      />
    );
    expect(renderedComponent.type()).toEqual('span');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props giusto', () => {
    const renderedComponent = shallow(
      <EditableSpan
        giusto
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a its css w/ props empty', () => {
    const renderedComponent = shallow(
      <EditableSpan
        empty
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a its css w/ props sbagliato', () => {
    const renderedComponent = shallow(
      <EditableSpan
        sbagliato
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a its css w/ props single', () => {
    const renderedComponent = shallow(
      <EditableSpan
        single
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<EditableSpanView />', () => {
  it('testo prop isEditable', () => {
    const renderedComponent = shallow(
      <EditableSpanView isEditable />
    );
    expect(renderedComponent.find(EditableSpan).props().contentEditable).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop single', () => {
    const renderedComponent = shallow(
      <EditableSpanView single />
    );
    expect(renderedComponent.find(EditableSpan).props().single).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop spellcheck', () => {
    const renderedComponent = shallow(
      <EditableSpanView spellcheck={false} />
    );
    expect(renderedComponent.find(EditableSpan).props().spellCheck).toBe(false);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop autocorrect', () => {
    const renderedComponent = shallow(
      <EditableSpanView autocorrect="off" />
    );
    expect(renderedComponent.find(EditableSpan).props().autoCorrect).toBe('off');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop autocomplete', () => {
    const renderedComponent = shallow(
      <EditableSpanView autocomplete="off" />
    );
    expect(renderedComponent.find(EditableSpan).props().autoComplete).toBe('off');
    expect(renderedComponent).toMatchSnapshot();
  });


  it('testo prop giusto', () => {
    const renderedComponent = shallow(
      <EditableSpanView giusto />
    );
    expect(renderedComponent.find(EditableSpan).props().giusto).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop sbagliato', () => {
    const renderedComponent = shallow(
      <EditableSpanView sbagliato />
    );
    expect(renderedComponent.find(EditableSpan).props().sbagliato).toBe(true);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop autocapitalize', () => {
    const renderedComponent = shallow(
      <EditableSpanView autocapitalize="none" />
    );
    expect(renderedComponent.find(EditableSpan).props().autoCapitalize).toBe('none');
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop onkeydown', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView onkeydown={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onKeyDown).toEqual(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop oninput', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView oninput={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onInput).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop onpaste', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView onpaste={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onPaste).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop prefill', () => {
    const renderedComponent = shallow(
      <EditableSpanView prefill="prefill" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop oncontextmenu', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView oncontextmenu={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onContextMenu).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop oncopy', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView oncopy={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onCopy).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop ondrag', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView ondrag={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onDrag).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop ondragstart', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView ondragstart={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onDragStart).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop ondragend', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView ondragend={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onDragEnd).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('testo prop ondrop', () => {
    const mockFx = jest.fn();
    const renderedComponent = shallow(
      <EditableSpanView ondrop={mockFx} />
    );
    expect(renderedComponent.find(EditableSpan).props().onDrop).toBe(mockFx);
    expect(renderedComponent).toMatchSnapshot();
  });
});
