/*
 *
 * DashboardBase
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import makeSelectLivelliDashboard from './selectors';
import { calculateMenuData } from './Menu';
import { unitaFiltra, livelliFetch, dashboardMenuEggSet, dashboardSearchActiveSet } from './actions';
import { configurationChange } from 'common/applications/actions';


export class DashboardBaseView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { configuration, userAuthentication } = props;

    this.menuConfiguration = {
      vociMenu: calculateMenuData({
        configuration,
        userAuthentication,
      }),
      product: configuration.product,
      toggleEggMenu: this.toggleMenuEgg,
    };

    this.topBarConfiguration = {
      pinned: true,
      searchBox: true,
      onFiltraUnita: this.handleFiltraUnita,
      placeholder: 'Cerca',
      searchResetFunction: () => this.emptySearch(true),
      onActivateSearch: this.activateSearch,
      backArrow: {
        enabled: false,
        onClickFunction: () => this.emptySearch(false),
      },
    };
  }

  componentDidMount() {
    const { configuration } = this.props;
    this.props.loadLivelli(configuration);
    this.initSearchActive();
  }

  componentDidUpdate = (oldProps) => {
    const { menuEggStatus, onMenuEggSet } = this.props;
    if (oldProps.menuEggStatus === 'apri' && menuEggStatus === 'chiudi') {
      onMenuEggSet('');
    }
  }

  changeMateria = (e) => {
    const { onChangeTopSelect, onSetFilterUnita, configuration } = this.props;
    onSetFilterUnita('');
    onChangeTopSelect(configuration.switchMateria[e.target.value] || {}, configuration);
  }

  handleFiltraUnita = (filterUnita) => {
    this.props.onSetFilterUnita(filterUnita);
  }

  activateSearch = () => {
    const { onDashboardSearchActiveSet } = this.props;
    onDashboardSearchActiveSet(true);
  }

  initSearchActive = () => {
    const { onDashboardSearchActiveSet, filterUnita } = this.props;
    if (filterUnita !== '') {
      onDashboardSearchActiveSet(true);
    }
  }

  emptySearch = (searchActive) => {
    const { onDashboardSearchActiveSet, onSetFilterUnita } = this.props;
    onDashboardSearchActiveSet(searchActive);
    onSetFilterUnita('');
  }

  toggleMenuEgg = (status = '') => {
    const { onMenuEggSet } = this.props;
    onMenuEggSet(status);
  }

  render() {
    return <p>Creare una funzione di render nella classe ereditante</p>;
  }
}

DashboardBaseView.propTypes = {
  onSetFilterUnita: PropTypes.func.isRequired,
  loadLivelli: PropTypes.func.isRequired,
  userAuthentication: PropTypes.object,
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
    hasPremium: PropTypes.bool.isRequired,
    disciplinaId: PropTypes.number.isRequired,
  }).isRequired,
  filterUnita: PropTypes.string.isRequired,
  onMenuEggSet: PropTypes.func.isRequired,
  onDashboardSearchActiveSet: PropTypes.func.isRequired,
  menuEggStatus: PropTypes.string.isRequired,
  onChangeTopSelect: PropTypes.func,
};

export const dashboardMapDispatchToProps = (dispatch) => ({
  onSetFilterUnita: (filtro) => {
    dispatch(unitaFiltra(filtro));
  },
  loadLivelli: (configuration, isDocente, corsoId) => {
    dispatch(livelliFetch(configuration, isDocente, corsoId));
  },
  onMenuEggSet: (value) => {
    dispatch(dashboardMenuEggSet(value));
  },
  onDashboardSearchActiveSet: (value) => {
    dispatch(dashboardSearchActiveSet(value));
  },
  onChangeTopSelect: (payload, oldConfiguration) => {
    dispatch(configurationChange(payload, oldConfiguration));
  },
});

export const dashboardMapStateToProps = (state) => ({
  livelli: makeSelectLivelliDashboard(state.get('dashboard').toJS(), 'unita'),
  filterUnita: state.get('dashboard').toJS().filterUnita,
  spinner: state.get('dashboard').toJS().spinner,
  menuEggStatus: state.get('dashboard').toJS().menuEggStatus,
  searchActive: state.get('dashboard').toJS().searchActive,
  configuration: state.get('configuration').toJS(),
});
