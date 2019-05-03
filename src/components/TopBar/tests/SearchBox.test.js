import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'components/Button';
import FlexBox from 'components/FlexBox';
import { Input } from 'components/FormElements/Field';
import SearchBox, { SearchBoxWrap, SearchField, Lens, CancelBtn, PremiumIcon } from '../SearchBox';

const type = 'text';
const searchActive = false;

describe('<SearchBox />', () => {
  it('should render a SearchBoxWrap', () => {
    const renderedComponent = shallow(<SearchBox
      onFiltraUnita={() => { }}
      searchActive={searchActive}
      onActivateSearch={() => { }}
    />);
    expect(renderedComponent.find(SearchBoxWrap).length).toEqual(1);
  });
  it('should render its css /w props searchActive', () => {
    const renderedComponent = shallow(<SearchBox
      onFiltraUnita={() => { }}
      searchActive
      onActivateSearch={() => { }}
    />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render its props value', () => {
    const value = 'test';
    const renderedComponent = shallow(<SearchBox
      value={value}
      onFiltraUnita={() => { }}
      searchActive={searchActive}
      onActivateSearch={() => { }}
    />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should call onFiltraUnita when onChange is called', () => {
    const value = 'test';
    const props = {
      value,
      onFiltraUnita: jest.fn(),
      searchActive: false,
      onActivateSearch: () => { },
    };
    const renderedComponent = shallow(<SearchBox
      {...props}
    />);
    renderedComponent.find(SearchField).simulate('change', { target: { value: 'some value' } });
    expect(props.onFiltraUnita).toHaveBeenCalled();
  });

  it('should call onActivateSearch when onFocus is called', () => {
    const props = {
      value: '',
      onFiltraUnita: () => {},
      onActivateSearch: jest.fn(),
      searchActive: false,
    };
    const renderedComponent = shallow(<SearchBox
      {...props}
    />);
    renderedComponent.find(SearchField).simulate('focus');
    expect(props.onActivateSearch).toHaveBeenCalled();
  });

  it('should call onActivateSearch when onClick is called', () => {
    const props = {
      value: 'findme',
      onFiltraUnita: () => {},
      onActivateSearch: () => {},
      searchResetFunction: jest.fn(),
      searchActive: false,
    };
    const renderedComponent = shallow(<SearchBox
      {...props}
    />);
    renderedComponent.find(CancelBtn).simulate('click');
    expect(props.searchResetFunction).toHaveBeenCalled();
  });

  it('should render its css /w props searchResetFunction & searchActive & value', () => {
    const renderedComponent = shallow(
      <SearchBox
        onActivateSearch={() => {}}
        searchResetFunction={() => { }}
        searchActive
        value="ciao"
        onFiltraUnita={() => { }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find(CancelBtn).length).toEqual(1);
  });

  it('should render its css /w props premiumActive', () => {
    const renderedComponent = shallow(<SearchBox
      onFiltraUnita={() => { }}
      premiumActive
      searchActive={false}
      onActivateSearch={() => { }}
    />);
    expect(renderedComponent.find(PremiumIcon).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SearchBoxWrap />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<SearchBoxWrap />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });
  it('should render its css', () => {
    const renderedComponent = shallow(<SearchBoxWrap />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css /w props searchActive true', () => {
    const renderedComponent = shallow(<SearchBoxWrap searchActive />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SearchField />', () => {
  it('should render a Input', () => {
    const renderedComponent = shallow(<SearchField type={type} />);
    expect(renderedComponent.find(Input).length).toEqual(1);
  });

  it('should render its css', () => {
    const renderedComponent = shallow(<SearchField type={type} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<Lens />', () => {
  it('should render a FlexBox', () => {
    const renderedComponent = shallow(<Lens />);
    expect(renderedComponent.find(FlexBox).length).toEqual(1);
  });
  it('should render its css', () => {
    const renderedComponent = shallow(<Lens />);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<CancelBtn />', () => {
  it('should render a Button', () => {
    const renderedComponent = shallow(<CancelBtn />);
    expect(renderedComponent.find(Button).length).toEqual(1);
  });
  it('should render its css', () => {
    const renderedComponent = shallow(<CancelBtn />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render its css /w props searchActive', () => {
    const renderedComponent = shallow(<CancelBtn searchActive />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
