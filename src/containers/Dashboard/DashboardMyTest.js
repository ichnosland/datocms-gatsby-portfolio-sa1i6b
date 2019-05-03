/*
 *
 * DashboardMyTest
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { googleAnalyticsWrapper } from 'common/utils';
import { ModalOverlay } from 'components/Modal';
import TopBar from 'components/TopBar';
import Container from 'components/Container';
import Dashboard from 'components/Dashboard';
import EggMenu from 'components/EggMenu';
import Spinner from 'components/Spinner';
import DashboardLine from 'components/Dashboard/DashboardLine';
import dashboardReducer from 'containers/Dashboard/reducer';
import { watchDashboard } from 'containers/Dashboard/sagas';

import {
  DashboardBaseView,
  dashboardMapStateToProps,
  dashboardMapDispatchToProps,
} from './DashboardBase';


export class DashboardViewMyTest extends DashboardBaseView { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { configuration, loadLivelli } = this.props;
    loadLivelli(configuration);
    this.initSearchActive();

    googleAnalyticsWrapper('event', {
      category: 'Visualizzazione dashboard',
      action: `Visualizzazione dashboard ${configuration.title}`,
    });
  }

  render() {
    const {
      menuEggStatus,
      searchActive,
      configuration,
      spinner,
      livelli,
      filterUnita,
    } = this.props;

    const topBarConfiguration = {
      ...this.topBarConfiguration,
      product: configuration.product,
      noShadow: true,
      topSwitcher: configuration.switchMateria ? {
        items: Object.keys(configuration.switchMateria).map(
          (key) => ({
            key,
            name: configuration.switchMateria[key].title,
            pos: configuration.switchMateria[key].pos || 0,
          })
        ).sort((a, b) => (a.pos - b.pos)),
        itemSelected: Object.keys(configuration.switchMateria)
          .filter((key) => (
            configuration.switchMateria[key].disciplinaId === configuration.disciplinaId
          ))[0],
        onChangeFunction: (e) => this.changeMateria(e),
      } : { items: [] },
    };

    return (
      <div>
        <ModalOverlay show={menuEggStatus === 'apri'} />
        <TopBar
          {...{
            ...topBarConfiguration,
            backArrow: {
              ...topBarConfiguration.backArrow,
              enabled: searchActive,
            },
          }}
          searchActive={searchActive}
          searchValue={filterUnita}
        />
        {spinner ?
          <Container>
            <Spinner />
          </Container> :
          <Container padding="64px 20px 30px 34px">
            <DashboardLine display="none" />
            <Dashboard
              livelli={livelli}
              product={configuration.product}
              searchActive={searchActive}
            />
          </Container>
        }
        <EggMenu
          {...this.menuConfiguration}
          active={menuEggStatus === 'apri'}
          animate={menuEggStatus !== ''}
        />
      </div>
    );
  }
}

DashboardViewMyTest.propTypes = {
  livelli: PropTypes.array.isRequired,
  spinner: PropTypes.bool.isRequired,
  onSetFilterUnita: PropTypes.func.isRequired,
  loadLivelli: PropTypes.func.isRequired,
  configuration: PropTypes.shape({
    product: PropTypes.string.isRequired,
    hasPremium: PropTypes.bool.isRequired,
    disciplinaId: PropTypes.number.isRequired,
  }).isRequired,
  onChangeTopSelect: PropTypes.func,
  filterUnita: PropTypes.string.isRequired,
  menuEggStatus: PropTypes.string.isRequired,
  searchActive: PropTypes.bool.isRequired,
};

const withDashboardReducer = injectReducer({ key: 'dashboard', reducer: dashboardReducer });
const withDashboardSaga = injectSaga({ key: 'dashboard', saga: watchDashboard });

const DashboardConnect = connect(
  dashboardMapStateToProps,
  dashboardMapDispatchToProps
);

const DashboardComposed = compose(
  withDashboardReducer,
  withDashboardSaga,
  DashboardConnect
)(DashboardViewMyTest);

export default DashboardComposed;
