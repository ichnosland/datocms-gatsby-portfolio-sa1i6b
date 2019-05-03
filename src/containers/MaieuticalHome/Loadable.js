/**
 *
 * Asynchronously loads the component for MaieuticalHome
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
