import { Map } from 'immutable';

import { resetPasswordValidator, passwordSetValidator, required } from '../validator';


describe('resetPasswordValidator', () => {
  it('Non deve accettare email vuote', () => {
    const values = Map({
      email: '',
    });
    const validate = resetPasswordValidator(values);
    expect(validate.email).toEqual('Campo obbligatorio');
  });

  it('Not deve accettare email mal formattate', () => {
    const values = Map({
      email: 'badly.formatted.email@',
    });
    const validate = resetPasswordValidator(values);
    expect(validate.email).toEqual('Indirizzo email non valido');
  });


  it('Non deve restituire errori se la mail è settata correttamente', () => {
    const values = Map({
      email: 'pippo@example.com',
    });
    const validate = resetPasswordValidator(values);
    expect(validate).toEqual({});
  });
});


describe('passwordSetValidator', () => {
  it('Non deve accettare password vuote', () => {
    expect(passwordSetValidator(Map())).toEqual({
      password_new_1: 'Campo obbligatorio',
      password_new_2: 'Campo obbligatorio',
    });
  });

  it('password_new_1 non deve essere vuoto', () => {
    const values = Map({
      password_new_1: '',
    });
    const validate = passwordSetValidator(values);
    expect(validate.password_new_1).toEqual('Campo obbligatorio');
  });

  it('password_new_1.length non deve essere minore di 10', () => {
    const values = Map({
      password_new_1: 'pass',
    });
    const validate = passwordSetValidator(values);
    expect(validate.password_new_1).toEqual('Deve essere di almeno 10 caratteri');
  });

  it('password_new_2 non deve essere vuoto', () => {
    const values = Map({
      password_new_2: '',
    });
    const validate = passwordSetValidator(values);
    expect(validate.password_new_2).toEqual('Campo obbligatorio');
  });

  it('password_new_2.length non deve essere minore di 10', () => {
    const values = Map({
      password_new_2: 'pass',
    });
    const validate = passwordSetValidator(values);
    expect(validate.password_new_2).toEqual('Deve essere di almeno 10 caratteri');
  });

  it('password_new_2 non deve essere diverso da password_new_2', () => {
    const values = Map({
      password_new_1: 'aaaaaaaaaaaaaa',
      password_new_2: 'password123456',
    });
    const validate = passwordSetValidator(values);
    expect(validate.password_new_2).toEqual('Le due password devono essere uguali');
  });

  it('se le password hanno almeno 10 caratteri e sono uguali, non devo avere errori', () => {
    const values = Map({
      password_new_1: 'nuovapassword',
      password_new_2: 'nuovapassword',
    });
    const validate = passwordSetValidator(values);
    expect(validate).toEqual({});
  });
});

describe('Required', () => {
  it('deve restituire undefined se è settato un valore', () => {
    expect(required('valore')).toBeUndefined();
  });
  it('deve restituire Obbligatorio se il campo è undefined', () => {
    expect(required(undefined)).toBe('Obbligatorio');
  });
  it('deve restituire Obbligatorio se il campo è vuoto', () => {
    expect(required('')).toBe('Obbligatorio');
  });
});
