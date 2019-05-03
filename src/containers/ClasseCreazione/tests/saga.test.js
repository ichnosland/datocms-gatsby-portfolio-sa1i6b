import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_PATH } from 'configuration';

import { modalSetData } from 'containers/ModalBox/actions';
import {
  classeCreazioneFetchComuniSaga,
  classeCreazioneFetchProvinceSaga,
  classeCreazioneScuolePostSaga,
  classeCreazioneScuoleAttiveFetchSaga,
  watchClasseCreazione,
} from '../saga';
import {
  classeCreazioneScuoleAttiveSet,
  classeCreazioneSpinnerSet,
  classeCreazioneReset,
  classeCreazioneGeoSet,
  classeCreazioneDataSet,
  classeCreazioneGeoComuneSet,
  classeCreazioneGeoScuoleSet,
} from '../actions';
import {
  CLASSE_CREAZIONE_URL_FETCH_SCUOLE_DOCENTE,
  CLASSE_CREAZIONE_URL_POST,
  CLASSE_CREAZIONE_URL_GEO_PROVINCE,
  CLASSE_CREAZIONE_URL_SCUOLE_PROVINCIA,
  CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH,
  CLASSE_CREAZIONE_DATA_POST,
  CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH,
  CLASSE_CREAZIONE_GEO_COMUNI_FETCH,
} from '../constants';

/* eslint-disable redux-saga/yield-effects */
describe('classeCreazioneFetchComuniSaga saga', () => {
  const mockClassiResponse = [
    {
      pk: 14005,
      nome: 'NORBERTO BOBBIO',
      tipologia: 'SS2',
      comune: 'CARIGNANO',
      provincia: 'TO',
      indirizzo_di_studio: 'IST PROF PER I SERVIZI ALBERGHIERI E RISTORAZIONE',
      classi: [
        {
          nome: '1 I',
          pk: 8790,
        },
        {
          nome: '1 I Recupero',
          pk: 9398,
        },
        {
          nome: '2 H su',
          pk: 8075,
        },
        {
          nome: '2 H Recupero',
          pk: 8441,
        },
      ],
    },
    {
      pk: 14017,
      nome: 'PREVER',
      tipologia: 'SS2',
      comune: 'PINEROLO',
      provincia: 'TO',
      indirizzo_di_studio: 'IST PROF PER I SERVIZI ALBERGHIERI E RISTORAZIONE',
      classi: [],
    },
  ];

  it('faccio il parsing dei dati relativi alle classi della provincia, in caso di successo', () => {
    const gen = classeCreazioneFetchComuniSaga({ sigla: 'TO' });

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_SCUOLE_PROVINCIA}TO`
      )
    );

    expect(
      gen.next({
        data: mockClassiResponse,
      }).value
    ).toEqual(
      put(
        classeCreazioneGeoSet({
          indirizziDiStudio: [
            'ist prof per i servizi alberghieri e ristorazione',
          ],
        })
      )
    );

    expect(
      gen.next({
        data: mockClassiResponse,
      }).value
    ).toEqual(
      put(
        classeCreazioneGeoComuneSet({
          TO: ['CARIGNANO', 'PINEROLO'],
        })
      )
    );

    expect(
      gen.next({
        data: mockClassiResponse,
      }).value
    ).toEqual(
      put(
        classeCreazioneGeoScuoleSet({
          TO: {
            CARIGNANO: {
              'ist prof per i servizi alberghieri e ristorazione': [
                {
                  pk: mockClassiResponse[0].pk,
                  nome: mockClassiResponse[0].nome,
                  classi: mockClassiResponse[0].classi,
                },
              ],
            },
            PINEROLO: {
              'ist prof per i servizi alberghieri e ristorazione': [
                {
                  pk: mockClassiResponse[1].pk,
                  nome: mockClassiResponse[1].nome,
                  classi: [],
                },
              ],
            },
          },
        })
      )
    );

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
  });

  describe('classeCreazioneFetchProvinceSaga saga', () => {
    const mockResponseProvince = [
      {
        key: 'OI',
        label: 'Out of Italy',
      },
      {
        key: 'AG',
        label: 'Agrigento',
      },
      {
        key: 'AL',
        label: 'Alessandria',
      },
    ];

    it('faccio il fetch della lista delle province, in caso di successo', () => {
      const gen = classeCreazioneFetchProvinceSaga();

      expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));

      expect(gen.next().value).toEqual(
        call(axios.get, `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_GEO_PROVINCE}`)
      );

      expect(
        gen.next({
          data: mockResponseProvince,
        }).value
      ).toEqual(
        put(
          classeCreazioneGeoSet({
            province: [
              {
                nome: mockResponseProvince[0].label,
                pk: mockResponseProvince[0].key,
              },
              {
                nome: mockResponseProvince[1].label,
                pk: mockResponseProvince[1].key,
              },
              {
                nome: mockResponseProvince[2].label,
                pk: mockResponseProvince[2].key,
              },
            ],
            isProvinceLoaded: true,
          })
        )
      );

      expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
    });

    it('faccio il fetch della lista delle province, in caso di insuccesso', () => {
      const gen = classeCreazioneFetchProvinceSaga();

      expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));

      expect(gen.next().value).toEqual(
        call(axios.get, `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_GEO_PROVINCE}`)
      );

      expect(gen.next().value).toEqual(
        put(
          classeCreazioneDataSet({
            display: 'scuoleAttive',
          })
        )
      );

      expect(gen.next().value).toEqual(
        put(
          modalSetData({
            contenuto: 'Non ho potuto caricare l\'elenco delle province',
            show: true,
          })
        )
      );

      expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
    });
  });

  it('faccio il parsing dei dati relativi alle classi della provincia, in caso di errore', () => {
    const gen = classeCreazioneFetchComuniSaga({ sigla: 'TO' });

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_SCUOLE_PROVINCIA}TO`
      )
    );

    expect(gen.next().value).toEqual(
      put(
        classeCreazioneDataSet({
          display: 'scuoleAttive',
        })
      )
    );

    expect(gen.next().value).toEqual(
      put(
        modalSetData({
          contenuto: 'Non ho potuto caricare l\'elenco delle province',
          show: true,
        })
      )
    );

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
  });
});

describe('classeCreazioneScuolePostSaga saga', () => {
  const mockData = {
    history: {
      push: () => {},
    },
    payload: {
      anno: 1,
      nome: 'nomeclasse',
      disciplina: 33,
      nuova: true,
      pk: 0,
      scuola: 123,
    },
  };

  it('esegue la creazione di una nuova classe', () => {
    const gen = classeCreazioneScuolePostSaga(mockData);

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      call(
        axios.post,
        `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_POST}`,
        mockData.payload
      )
    );

    expect(gen.next({ data: { pk: 11 } }).value).toEqual(
      put(classeCreazioneReset())
    );

    expect(gen.next({ data: { pk: 11 } }).value).toEqual(
      call(mockData.history.push, '/classe-dettaglio/11')
    );

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
  });

  it('esegue la creazione di una nuova classe in caso di errore', () => {
    const gen = classeCreazioneScuolePostSaga(mockData);

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));

    expect(gen.next().value).toEqual(
      call(
        axios.post,
        `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_POST}`,
        mockData.payload
      )
    );

    expect(gen.next().value).toEqual(put(classeCreazioneReset()));

    expect(gen.next().value).toEqual(
      put(
        modalSetData({
          contenuto: 'Non ho potuto creare questa classe',
          show: true,
        })
      )
    );

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
  });
});

describe('classeCreazioneScuoleAttiveFetchSaga saga', () => {
  const classiDocente = [
    {
      pk: 5504,
      nome: 'EVANGELISTA TORRICELLI',
      tipologia: 'SS2',
      comune: 'FAENZA',
      provincia: 'RA',
      indirizzo_di_studio: 'LICEO CLASSICO',
      classi: [
        {
          nome: '5 Ac',
          pk: 6228,
        },
      ],
    },
    {
      pk: 13976,
      nome: 'LC C. CAVOUR',
      tipologia: 'SS2',
      comune: 'TORINO',
      provincia: 'TO',
      indirizzo_di_studio: 'LICEO CLASSICO',
      classi: [
        {
          nome: '5 RIPASSO',
          pk: 6724,
        },
        {
          nome: '4 nuoooova ',
          pk: 9869,
        },
      ],
    },
  ];

  it('esegue la creazione di una nuova classe', () => {
    const gen = classeCreazioneScuoleAttiveFetchSaga();

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classeCreazioneReset()));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_FETCH_SCUOLE_DOCENTE}`
      )
    );

    expect(gen.next({ data: classiDocente }).value).toEqual(
      put(
        classeCreazioneScuoleAttiveSet({
          list: classiDocente,
          isLoaded: true,
        })
      )
    );

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
  });

  it('esegue la creazione di una nuova classe', () => {
    const gen = classeCreazioneScuoleAttiveFetchSaga();

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(true)));
    expect(gen.next().value).toEqual(put(classeCreazioneReset()));

    expect(gen.next().value).toEqual(
      call(
        axios.get,
        `${API_BASE_PATH}${CLASSE_CREAZIONE_URL_FETCH_SCUOLE_DOCENTE}`
      )
    );

    expect(gen.next().value).toEqual(
      put(
        modalSetData({
          contenuto:
            'Non ho potuto leggere l\'elenco delle scuole di questo docente',
          show: true,
        })
      )
    );

    expect(gen.next().value).toEqual(put(classeCreazioneSpinnerSet(false)));
  });
});

describe('watchClasseCreazione saga', () => {
  it('procedura in caso di successo', () => {
    const gen = watchClasseCreazione();

    expect(gen.next().value).toEqual(
      takeEvery(
        CLASSE_CREAZIONE_SCUOLE_ATTIVE_FETCH,
        classeCreazioneScuoleAttiveFetchSaga
      )
    );

    expect(gen.next().value).toEqual(
      takeEvery(CLASSE_CREAZIONE_DATA_POST, classeCreazioneScuolePostSaga)
    );

    expect(gen.next().value).toEqual(
      takeEvery(
        CLASSE_CREAZIONE_GEO_PROVINCIA_FETCH,
        classeCreazioneFetchProvinceSaga
      )
    );

    expect(gen.next().value).toEqual(
      takeEvery(
        CLASSE_CREAZIONE_GEO_COMUNI_FETCH,
        classeCreazioneFetchComuniSaga
      )
    );
  });
});
