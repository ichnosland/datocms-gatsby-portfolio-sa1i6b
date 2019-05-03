import { Map } from 'immutable';

import validator from '../validator';

describe('Validator', () => {
  it('Not accept empty object', () => {
    expect(validator(Map())).toEqual({
      email: 'Campo obbligatorio',
      password: 'Campo obbligatorio',
      password2: 'Campo obbligatorio',
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

  it('Not accept empty password.len < 10', () => {
    const values = Map({
      password: 'pass',
    });
    const validate = validator(values);
    expect(validate.password).toEqual('Deve essere di almeno 10 caratteri');
  });

  it('Not accept empty passwod != password2', () => {
    const values = Map({
      password: 'pass',
      password2: 'word',
    });
    const validate = validator(values);
    expect(validate.password2).toEqual('Le password non coincidono');
  });

  it('Accept correct form', () => {
    const values = Map({
      email: 'tizio@acme.com',
      username: 'username',
      password: 'segretissima',
      password2: 'segretissima',
    });
    const validate = validator(values);
    expect(validate).toEqual({});
  });
});
