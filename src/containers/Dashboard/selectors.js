import { createSelector } from 'reselect';

function applyFilter(livelli, filterUnita, fieldName, subFieldName) {
  if (filterUnita !== '') {
    const filter = new RegExp(filterUnita, 'i');
    return livelli.reduce((levels, l) => {
      const livello = {
        ...l,
        missioni: l.missioni.reduce((missioni, m) => {
          const missione = {
            ...m,
            [fieldName]: m[fieldName].filter(
              (singolaUnita) => singolaUnita[subFieldName].search(filter) > -1
            ),
          };

          if (missione[fieldName].length) {
            return [...missioni, missione];
          }
          return missioni;
        }, []),
      };

      if (livello.missioni.length) {
        return [...levels, livello];
      }
      return levels;
    }, []);
  }
  return livelli;
}

const selectTestDomain = (state, fieldName = 'unita', subFieldName = 'nome') => ({
  livelli: state.livelli,
  filtro: state.filterUnita,
  fieldName,
  subFieldName,
});

const makeSelectLivelliDashboard = createSelector(
  selectTestDomain,
  (substate) => (applyFilter(substate.livelli, substate.filtro, substate.fieldName, substate.subFieldName))
);

export default makeSelectLivelliDashboard;
