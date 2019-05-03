import React from 'react';
import { shallow } from 'enzyme';

import { CardForm } from 'components/FormElements';
import { ConfirmPassword } from '../ConfirmPasswordForm';

const product = 'product';

describe('<ConfirmPassword />', () => {
  it('should render a CardForm', () => {
    const renderedComponent = shallow(
      <ConfirmPassword
        handleSubmit={() => { }}
        responseFacebookFunction={() => { }}
        product={product}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
