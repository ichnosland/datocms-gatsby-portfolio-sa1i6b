import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { API_BASE_PATH } from 'configuration';
import { modalSetData } from 'containers/ModalBox/actions';
import { DOWNLOAD_PROTETTI_URL, DOWNLOAD_PROTETTI_FETCH } from '../constants';
import { downloadProtettiFetchSaga, watchDownloadProtetti } from '../saga';


/* eslint-disable redux-saga/yield-effects */
describe('downloadProtettiFetchSaga', () => {
  it('testo che funzioni il fetch del file in caso di successo', () => {
    const close = jest.fn();
    const gen = downloadProtettiFetchSaga({
      slug: 'slug',
      window: {
        location: '',
        close,
      },
    });

    expect(gen.next().value).toEqual(
      call(axios.get, `${API_BASE_PATH}${DOWNLOAD_PROTETTI_URL}slug`)
    );

    expect(
      gen.next({ status: 200, data: { url: 'url' } }).value
    ).toEqual(undefined);
  });

  it('testo che funzioni il fetch del file in caso di status != 200', () => {
    const close = jest.fn();
    const gen = downloadProtettiFetchSaga({
      slug: 'slug',
      window: {
        location: '',
        close,
      },
    });

    expect(gen.next().value).toEqual(
      call(axios.get, `${API_BASE_PATH}${DOWNLOAD_PROTETTI_URL}slug`)
    );

    expect(
      gen.next({ status: 300, data: { url: 'url' } }).value
    ).toEqual(put(modalSetData({
      contenuto: 'Questo documento non è disponibile',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });

  it('testo che funzioni il fetch del file in caso di errore', () => {
    const close = jest.fn();
    const gen = downloadProtettiFetchSaga({
      slug: 'slug',
      window: {
        location: '',
        close,
      },
    });

    expect(gen.next().value).toEqual(
      call(axios.get, `${API_BASE_PATH}${DOWNLOAD_PROTETTI_URL}slug`)
    );

    expect(
      gen.next().value
    ).toEqual(put(modalSetData({
      contenuto: 'Questo documento non è disponibile',
      closeButton: {
        text: 'Ok',
      },
      show: true,
    })));
  });
});


describe('watchDownloadProtetti', () => {
  it('testo avanzamento', () => {
    const gen = watchDownloadProtetti();

    expect(gen.next().value).toEqual(
      takeEvery(DOWNLOAD_PROTETTI_FETCH, downloadProtettiFetchSaga)
    );
  });
});
