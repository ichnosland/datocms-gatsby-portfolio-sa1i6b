import React from 'react';
import { shallow } from 'enzyme';

import Svg from 'components/Svg';
import icon from 'icons/globals';
import { Button, Icon, ActionButton, TextButton, GhostButton } from '../index';

const theme = {
  brand: '#00abe5',
  light: 'rgb(109, 210, 240)',
  dark: 'rgb(0, 114, 205)',
  pale: 'rgb(199, 231, 245)',
  subtle: 'rgb(178, 208, 223)',
  fonts: {
    buttons: {
      fontFamily: 'Quicksand',
      fontWeight: '400',
    },
  },
  radius: {
    buttons: '50px',
  },
};

describe('<Button />', () => {
  it('should render a <button> tag', () => {
    const renderedComponent = shallow(<Button theme={theme} />);
    expect(renderedComponent.type()).toEqual('button');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Button theme={theme} id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <Button theme={theme} >{children}</Button>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<Button theme={theme} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'red';
    const renderedComponent = shallow(<Button theme={theme} bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<Button theme={theme} color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '30px';
    const renderedComponent = shallow(<Button theme={theme} margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '40px';
    const renderedComponent = shallow(<Button theme={theme} padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const border = '2px solid red';
    const renderedComponent = shallow(<Button theme={theme} border={border} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props radius', () => {
    const radius = '30px';
    const renderedComponent = shallow(<Button theme={theme} radius={radius} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props standard', () => {
    const renderedComponent = shallow(<Button theme={theme} standard />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props full', () => {
    const renderedComponent = shallow(<Button theme={theme} full />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props half', () => {
    const renderedComponent = shallow(<Button theme={theme} half />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props round', () => {
    const renderedComponent = shallow(<Button theme={theme} round />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its height equal to width w/ props round + width', () => {
    const width = '100px';
    const renderedComponent = shallow(<Button theme={theme} round width={width} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == okay', () => {
    const actioncolor = 'okay';
    const renderedComponent = shallow(
      <Button theme={theme} actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == help', () => {
    const actioncolor = 'help';
    const renderedComponent = shallow(
      <Button theme={theme} actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == error', () => {
    const actioncolor = 'error';
    const renderedComponent = shallow(
      <Button theme={theme} actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == action', () => {
    const actioncolor = 'action';
    const renderedComponent = shallow(
      <Button theme={theme} actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == escape', () => {
    const actioncolor = 'escape';
    const renderedComponent = shallow(
      <Button theme={theme} actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props actioncolor == hint', () => {
    const actioncolor = 'hint';
    const renderedComponent = shallow(
      <Button theme={theme} actioncolor={actioncolor} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props outline', () => {
    const renderedComponent = shallow(
      <Button theme={theme} outline />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props outline, an icon and theme', () => {
    const renderedComponent = shallow(
      <Button theme={theme} outline>
        <Icon {...icon.arrowBoldDown} />
      </Button>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props outline and fill', () => {
    const fill = 'red';
    const renderedComponent = shallow(
      <Button theme={theme} outline fill={fill}>
        <Icon {...icon.arrowBoldDown} />
      </Button>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bone', () => {
    const renderedComponent = shallow(
      <Button theme={theme} bone={1} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props admin', () => {
    const renderedComponent = shallow(
      <Button theme={theme} admin />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props shadow', () => {
    const renderedComponent = shallow(<Button theme={theme} shadow />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  it('should render a Svg', () => {
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" data-name="Livello 1" fill="#ffffff" />;
    const renderedComponent = shallow(
      <Icon
        viewBox={viewBox}
        path={path}
      />
    );
    expect(renderedComponent.find(Svg).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props size', () => {
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" />;
    const size = '24px';
    const renderedComponent = shallow(
      <Icon
        viewBox={viewBox}
        path={path}
        size={size}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" />;
    const margin = '100px auto';
    const renderedComponent = shallow(
      <Icon
        viewBox={viewBox}
        path={path}
        margin={margin}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props fill', () => {
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" />;
    const fill = 'rgb(0, 0, 0)';
    const renderedComponent = shallow(
      <Icon
        viewBox={viewBox}
        path={path}
        fill={fill}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props brandColor', () => {
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" />;
    const renderedComponent = shallow(
      <Icon
        viewBox={viewBox}
        path={path}
        theme={theme}
        brandColor
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props right', () => {
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" />;
    const renderedComponent = shallow(
      <Icon
        viewBox={viewBox}
        path={path}
        right
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props left', () => {
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" />;
    const renderedComponent = shallow(
      <Icon
        viewBox={viewBox}
        path={path}
        left
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<ActionButton theme={theme} />', () => {
  it('should render a Button theme={theme} ', () => {
    const renderedComponent = shallow(<ActionButton theme={theme} />);
    expect(renderedComponent.find(Button).length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<ActionButton theme={theme} id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <ActionButton theme={theme} >{children}</ActionButton>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render its css w/ props sectionbutton', () => {
    const renderedComponent = shallow(<ActionButton theme={theme} sectionbutton />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props color', () => {
    const color = 'blue';
    const renderedComponent = shallow(<ActionButton theme={theme} color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props bgcolor', () => {
    const bgcolor = 'yellow';
    const renderedComponent = shallow(<ActionButton theme={theme} bgcolor={bgcolor} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props border', () => {
    const myBorder = 'none';
    const renderedComponent = shallow(<ActionButton theme={theme} border={myBorder} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props shadow', () => {
    const renderedComponent = shallow(<ActionButton theme={theme} shadow />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<TextButton />', () => {
  it('should render a <button> tag', () => {
    const renderedComponent = shallow(<TextButton theme={theme} />);
    expect(renderedComponent.type()).toEqual('button');
  });

  it('should render its css w/ props color', () => {
    const color = 'red';
    const renderedComponent = shallow(<TextButton theme={theme} color={color} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<GhostButton />', () => {
  it('should render a <button> tag', () => {
    const renderedComponent = shallow(<GhostButton theme={theme} />);
    expect(renderedComponent.type()).toEqual('button');
  });

  it('should render its css w/ props fill', () => {
    const fill = 'red';
    const viewBox = '0 0 8.34 16';
    const path = <path d="M8.34.13v2.53H6.81c-.54 0-.91.11-1.06.34a1.46 1.46 0 0 0-.34 1.06v1.82h2.87l-.4 2.84H5.41V16H2.47V8.72H0V5.88h2.47V3.72a3.59 3.59 0 0 1 1-2.72 3.61 3.61 0 0 1 2.69-1 14.31 14.31 0 0 1 2.18.13z" />;
    const renderedComponent = shallow(
      <GhostButton theme={theme} fill={fill}>
        <Svg
          viewBox={viewBox}
          path={path}
        />
      </GhostButton>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props padding', () => {
    const padding = '60px';
    const renderedComponent = shallow(<GhostButton theme={theme} padding={padding} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css w/ props margin', () => {
    const margin = '30px';
    const renderedComponent = shallow(<GhostButton theme={theme} margin={margin} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
