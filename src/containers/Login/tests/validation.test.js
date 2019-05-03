import { Map } from 'immutable';

import validator from '../validator';

describe('Validator', () => {
  it('Not accept empty object', () => {
    expect(validator(Map())).toEqual({
      email: 'Campo obbligatorio',
      password: 'Campo obbligatorio',
    });
  });

  it('Not accept empty email', () => {
    const values = Map({
      email: '',
    });
    const validate = validator(values);
    expect(validate.email).toEqual('Campo obbligatorio');
  });

  it('Not accept invalid email', () => {
    const values = Map({
      email: 'badly.formatted.email',
    });
    const validate = validator(values);
    expect(validate.email).toEqual('Indirizzo email non valido');
  });

  it('Not accept empty password', () => {
    const values = Map({
      password: '',
    });
    const validate = validator(values);
    expect(validate.password).toEqual('Campo obbligatorio');
  });

  it('Accept correct form', () => {
    const values = Map({
      email: 'tizio@acme.com',
      password: 'segreta',
    });
    const validate = validator(values);
    expect(validate).toEqual({});
  });
});
