/*
 *
 * DownloadProtetti actions
 *
 */

import {
  DOWNLOAD_PROTETTI_FETCH,
} from './constants';

export function downloadProtettiFetch(slug, window) {
  return {
    type: DOWNLOAD_PROTETTI_FETCH,
    slug,
    window,
  };
}
