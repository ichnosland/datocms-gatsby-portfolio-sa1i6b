/*
 *
 * CreaVerificheList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListPanel from 'components/ListPanel';
import FlexRow, { FlexChild } from 'components/FlexBox';
import EmptyBox from 'components/EmptyBox';
import { colore } from 'style/color';

export const InfoTag = styled(FlexChild)`
  padding: 0.5em 1em;
  border: 1px solid ${colore.ui.neutralBg};
  background-color: ${colore.ui.contrast};
  flex-grow: 0;
  border-radius: 3px;
`;

export class CreaVerificheList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      buttonText,
      itemsList,
    } = this.props;

    return (
      <div>
        <FlexRow justifyContent="flex-end" margin="0 0 10px 0">
          {buttonText && (
            <InfoTag
              actioncolor="okay"
            >
              {buttonText}
            </InfoTag>
          )}
        </FlexRow>
        {(itemsList.length > 0) && itemsList.map((item) => (<ListPanel
          key={item.key}
          items={item.elementi}
          buttons={item.pulsanti}
          buttonsSpinner={item.buttonsSpinner}
          bgcolor={colore.ui.softBg}
        />))}
        {(itemsList.length === 0) &&
          <EmptyBox
            text="Non sono presenti elementi selezionati"
          />
        }
      </div>
    );
  }
}

CreaVerificheList.propTypes = {
  buttonText: PropTypes.string,
  itemsList: PropTypes.array.isRequired,
};

export default CreaVerificheList;
