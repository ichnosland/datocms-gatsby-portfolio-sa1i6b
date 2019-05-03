/*
 *
 * Dashboardline
 *
 */

import styled from 'styled-components';

import Div from 'components/Div';

export const DashboardLine = styled(Div)`
  position: absolute;
  top: 0;
  left: 16px;
  width: 1px;
  border-left: 1px dashed ${(props) => props.theme.brand};
  height: 100%;
  opacity: .4;
`;

DashboardLine.defaulProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export default DashboardLine;
