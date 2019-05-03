import React from 'react';
import { shallow } from 'enzyme';

import { FormElement } from 'components/FormElements';
import { ButtonLink } from 'components/ButtonLink';
import { Button } from 'components/Button';
import { FlexChild } from 'components/FlexBox';
import SelectField from 'components/FormElements/SelectField';

import {
  UnitaPreviewDocenteView,
  SelectBtn,
  UnitButton,
  UnitBlock,
} from '../UnitaPreviewDocente';


const mockProps = {
  buttonAssegnaIcon: 'bell',
  buttonAssegnaLabel: 'label button assegnazione',
  buttonAssegnaDisabled: false,
  unitaId: 555,
  invalid: false,
  lezioni: [{
    optionLabel: 'lezione1',
    optionKey: 0,
  }, {
    optionLabel: 'lezione2',
    optionKey: 1,
  }, {
    optionLabel: 'lezione3',
    optionKey: 2,
  }],
  tempoEsecuzione: 40,
  eseguiUnitaFunction: () => { },
  buttonAssegnaFunction: () => { },
};

describe('<UnitaPreviewDocenteView />', () => {
  it('visualizzo elementi di gestione della classe', () => {
    const renderedComponent = shallow(
      <UnitaPreviewDocenteView {...mockProps} />
    );
    expect(renderedComponent.find('form').length).toBe(1);
    expect(renderedComponent.find(FormElement).length).toBe(1);
    expect(renderedComponent.find(ButtonLink).length).toBe(0);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<SelectBtn />', () => {
  it('should render its css w/ props theme', () => {
    const theme = {
      brand: 'red',
    };
    const renderedComponent = shallow(
      <SelectBtn theme={theme}>
        <option value="value 1">Value1</option>
        <option value="Value 2">Value 2</option>
      </SelectBtn>
    );
    expect(renderedComponent.find(SelectField).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<UnitButton />', () => {
  it('should render its css w/ props theme if disabled', () => {
    const theme = {
      brand: 'green',
    };
    const renderedComponent = shallow(
      <UnitButton theme={theme} disabled>
        <span>Button</span>
      </UnitButton>
    );
    expect(renderedComponent.find(Button).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('<UnitBlock />', () => {
  it('should render its last-child css w/ props theme', () => {
    const theme = {
      light: 'yellow',
    };
    const renderedComponent = shallow(
      <UnitBlock theme={theme} disabled>
        <div>div 1</div>
        <div>div 2</div>
        <div>div 3</div>
      </UnitBlock>
    );
    expect(renderedComponent.find(FlexChild).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
