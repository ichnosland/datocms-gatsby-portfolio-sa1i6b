import { Map } from 'immutable';

import validator from '../validator';

describe('Validator', () => {
  it('Not accept empty object', () => {
    expect(validator(Map())).toEqual({
      nome: 'Campo obbligatorio',
      cognome: 'Campo obbligatorio',
    });
  });

  it('Not accept empty nome', () => {
    const values = Map({
      nome: '',
    });
    const validate = validator(values);
    expect(validate.nome).toEqual('Campo obbligatorio');
  });

  it('Not accept empty username.len < 2', () => {
    const values = Map({
      nome: 'n',
    });
    const validate = validator(values);
    expect(validate.nome).toEqual('Deve essere di almeno 2 caratteri');
  });

  it('Not accept empty cognome', () => {
    const values = Map({
      cognome: '',
    });
    const validate = validator(values);
    expect(validate.cognome).toEqual('Campo obbligatorio');
  });

  it('Not accept empty username.len < 2', () => {
    const values = Map({
      cognome: 'n',
    });
    const validate = validator(values);
    expect(validate.cognome).toEqual('Deve essere di almeno 2 caratteri');
  });

  it('Accept correct form', () => {
    const values = Map({
      nome: 'nome',
      cognome: 'cognome',
    });
    const validate = validator(values);
    expect(validate).toEqual({});
  });
});
