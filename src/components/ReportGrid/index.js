/**
 *
 * ReportGrid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Container from 'components/Container';
import { Grid, GridItem } from 'components/Grid';
import { Icon } from 'components/Button';
import { FlexChild } from 'components/FlexBox';
import buttonicon from 'icons/buttons';
import { colore } from 'style/color';

export const FlexCell = styled(FlexChild)`
  margin: 0;
  &:not(:first-child) {
    margin-left: 6px;
  }
  ${(props) => props.primo && css`
    &:first-child {
      flex-grow: 1;
      justify-content: flex-start;
      cursor: pointer;
    }
  `}
`;

class ReportGrid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      intestazioniColonna,
      righe,
      sortingFunction,
      filtriAttivi,
      primo,
      mono,
    } = this.props;
    const numeroColonne = intestazioniColonna.length;

    return (
      <Container>
        <Grid
          list={1}
          templateColumns={mono ? mono && '1fr auto' : Array.from({ length: numeroColonne }, () => ('auto')).join(' ')}
        >
          {intestazioniColonna.map((intestazione) => (
            <GridItem
              list={1}
              header
              active={filtriAttivi.field === intestazione.field}
              onClick={sortingFunction ? () => sortingFunction(righe, {
                field: intestazione.field,
                sort: filtriAttivi.field === intestazione.field &&
                  filtriAttivi.sort === 'asc' ?
                  'desc' : 'asc',
                type: intestazione.type,
              }) : null}
              {...(intestazione.style || {})}
              key={`intestazione_${intestazione.field}`}
            >
              {intestazione.label} {sortingFunction && filtriAttivi.field === intestazione.field && <Icon
                className="mediumUp"
                fill={colore.alatin.subtle}
                {...buttonicon[filtriAttivi.field === intestazione.field && filtriAttivi.sort === 'desc' ? 'descending' : 'ascending']}
              />}
            </GridItem>
          ))}
          {righe.map((riga) => (
            intestazioniColonna.map((intestazione) => (
              <GridItem
                list={1}
                key={`studente_${riga.key}_grid_${intestazione.field}`}
                {...(intestazione.style || {})}
                {...(intestazione.styleRiga || {})}
              >
                {intestazione.fieldsDisplay.map((f) => (
                  <FlexCell
                    onClick={riga[f.function]}
                    role="presentation"
                    key={`studente_${riga.key}_grid_${intestazione.field}_${f.field}`}
                    primo={primo}
                    {...(intestazione.styleCell || {})}
                  >
                    {typeof riga[f.field] === 'number' ? riga[f.field] : riga[f.field] || ' - '}
                  </FlexCell>
                ))}
              </GridItem>
            ))
          ))}
        </Grid>
      </Container>
    );
  }
}

ReportGrid.propTypes = {
  intestazioniColonna: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.any.isRequired,
      fieldsDisplay: PropTypes.arrayOf(PropTypes.shape({
        field: PropTypes.string.isRequired,
      })),
    })
  ).isRequired,
  filtriAttivi: PropTypes.shape({
    field: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  sortingFunction: PropTypes.func,
  righe: PropTypes.arrayOf(PropTypes.object).isRequired,
  primo: PropTypes.bool,
  mono: PropTypes.bool,
};

export default ReportGrid;
