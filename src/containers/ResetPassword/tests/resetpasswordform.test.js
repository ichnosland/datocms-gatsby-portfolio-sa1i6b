import React from 'react';
import { shallow } from 'enzyme';

import { CardForm } from 'components/FormElements';
import { ResetPassword } from '../ResetPasswordForm';

const product = 'product';

describe('<ResetPassword />', () => {
  it('should render a CardForm', () => {
    const renderedComponent = shallow(
      <ResetPassword
        handleSubmit={() => { }}
        responseFacebookFunction={() => { }}
        product={product}
        backFunction={() => { }}
      />
    );
    expect(renderedComponent.find(CardForm).length).toBe(1);
    expect(renderedComponent).toMatchSnapshot();
  });
});
