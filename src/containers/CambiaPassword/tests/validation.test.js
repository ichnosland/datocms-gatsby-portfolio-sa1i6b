import { Map } from 'immutable';

import validator from '../validator';

describe('Validator', () => {
  it('Not accept empty object', () => {
    expect(validator(Map())).toEqual({
      password_new_1: 'Campo obbligatorio',
      password_new_2: 'Campo obbligatorio',
    });
  });

  it('Not accept empty password_new_1', () => {
    const values = Map({
      password_new_1: '',
    });
    const validate = validator(values);
    expect(validate.password_new_1).toEqual('Campo obbligatorio');
  });

  it('Not accept password_new_1.length < 10', () => {
    const values = Map({
      password_new_1: 'pass',
    });
    const validate = validator(values);
    expect(validate.password_new_1).toEqual('Deve essere di almeno 10 caratteri');
  });

  it('Not accept empty password_new_2', () => {
    const values = Map({
      password_new_2: '',
    });
    const validate = validator(values);
    expect(validate.password_new_2).toEqual('Campo obbligatorio');
  });

  it('Not accept password_new_2.length < 10', () => {
    const values = Map({
      password_new_2: 'pass',
    });
    const validate = validator(values);
    expect(validate.password_new_2).toEqual('Deve essere di almeno 10 caratteri');
  });

  it('Not accept password_new_2 != password_new_2', () => {
    const values = Map({
      password_new_1: 'aaaaaaaaaaaaaa',
      password_new_2: 'password123456',
    });
    const validate = validator(values);
    expect(validate.password_new_2).toEqual('Le due password devono essere uguali');
  });

  it('Accept correct form', () => {
    const values = Map({
      password_new_1: 'nuovapassword',
      password_new_2: 'nuovapassword',
    });
    const validate = validator(values);
    expect(validate).toEqual({});
  });
});
