/**
*
* TabelleList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Div from 'components/Div';
import { Table } from 'components/Tables';
import { ModalTableStyle } from './ModalTableStyle';

export const ModalTable = styled(Table)`
  ${ModalTableStyle}
`;

class TabelleList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { tabelle, radius, margin, className, userSelect } = this.props;

    return ([
      tabelle.map((tabella, key) => (
        <Div
          radius={radius}
          overflow="hidden"
          margin={margin}
          key={`wrap_tabella_${key + 1}`}
          className={className}
        >
          <ModalTable
            key={`tabella_${key + 1}`}
            userSelect={userSelect}
          >
            {tabella.intestazione && (
              <thead>
                <tr>
                  <th colSpan={tabella.righe[0].length}>
                    {tabella.intestazione}
                  </th>
                </tr>
              </thead>
            )}
            {tabella.righe && (
              <tbody>
                {tabella.righe.map((riga, rigaKey) => (
                  <tr key={`tabella_${key + 1}_Tr_${rigaKey + 1}`}>
                    {riga.map((colonna, colTdKey) => (
                      <td
                        key={`tabella_Tr_${key + 1}_td_${colTdKey + 1}`}
                        dangerouslySetInnerHTML={{ __html: colonna.titolo }} // eslint-disable-line
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </ModalTable>
        </Div>
      )),
    ]);
  }
}

TabelleList.propTypes = {
  tabelle: PropTypes.arrayOf(PropTypes.shape({
    intestazione: PropTypes.sTring,
    righe: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.shape({
        titolo: PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.number.isRequired,
        ]),
      }))
    ),
  })).isRequired,
  radius: PropTypes.string,
  margin: PropTypes.string,
  userSelect: PropTypes.string,
  className: PropTypes.string,
};

export default TabelleList;
