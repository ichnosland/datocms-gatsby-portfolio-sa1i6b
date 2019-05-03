import makeSelectLivelliDashboard from '../selectors';

describe('makeSelectLivelliDashboard', () => {
  const livelli = [{
    id: 1,
    titolo: 'Livello 1',
    missioni: [{
      titolo: 'Missione 1',
      id: 10,
      unita: [{
        id: 1001,
        locked: false,
        nome: 'Unita 1',
      }, {
        id: 1002,
        locked: false,
        nome: 'Unita 2 - filtrami',
      }],
    }],
  }];

  it('ritorna i livelli non filtrati quando non è specificata una chiave di ricerca', () => {
    expect(makeSelectLivelliDashboard({
      livelli,
      filterUnita: '',
    })).toEqual(
      livelli
    );
  });

  it('ritorna i livelli filtrati con un filtro attivo con la parola "filtrami" su missioni > unita', () => {
    expect(makeSelectLivelliDashboard({
      livelli,
      filterUnita: 'filtrami',
    })).toEqual([{
      id: 1,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 10,
        unita: [{
          id: 1002,
          locked: false,
          nome: 'Unita 2 - filtrami',
        }],
      }],
    }]);
  });

  it('ritorna i livelli filtrati con un filtro attivo con la parola "filtrami" su missioni > other', () => {
    const livelliAcademy = [{
      id: 1,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 10,
        other: [{
          id: 1001,
          locked: false,
          nome: 'Unita 1',
        }, {
          id: 1002,
          locked: false,
          nome: 'Unita 2 - filtrami',
        }],
      }],
    }];

    expect(makeSelectLivelliDashboard({
      livelli: livelliAcademy,
      filterUnita: 'filtrami',
    }, 'other')).toEqual([{
      id: 1,
      titolo: 'Livello 1',
      missioni: [{
        titolo: 'Missione 1',
        id: 10,
        other: [{
          id: 1002,
          locked: false,
          nome: 'Unita 2 - filtrami',
        }],
      }],
    }]);
  });
});
