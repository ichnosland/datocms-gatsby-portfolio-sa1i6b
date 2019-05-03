
import { downloadProtettiFetch } from '../actions';
import { DOWNLOAD_PROTETTI_FETCH } from '../constants';

describe('DownloadProtetti actions', () => {
  it('DOWNLOAD_PROTETTI_FETCH', () => {
    const expected = {
      type: DOWNLOAD_PROTETTI_FETCH,
      slug: 'slug',
      window: { close: () => { } },
    };
    expect(downloadProtettiFetch(
      'slug', expected.window
    )).toEqual(expected);
  });
});
