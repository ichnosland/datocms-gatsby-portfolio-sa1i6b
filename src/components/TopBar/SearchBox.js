/**
*
* SearchBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import FlexBox from 'components/FlexBox';
import { Input } from 'components/FormElements/Field';
import { Button } from 'components/Button';
import Svg from 'components/Svg';
import { colore } from 'style/color';
import icon from 'icons/buttons';
import globalicon from 'icons/globals';
import media from 'style/mediainjector';

export const SearchBoxWrap = styled(FlexBox)`
  flex-grow: 1;
  min-width: 80px;
  height: 56px;
  transition: all 0.5s;
  ${({ searchActive }) => searchActive && css`
    z-index: 100;
    width: 100%;
    margin-left: 10px;
  `};
`;

const searchBoxIconStyle = css`
  height: 100%;
  position: absolute;
  top: 0;
  svg {
    display: block;
    width: 18px;
    height: 18px;
  }
`;

export const Lens = styled(FlexBox)`
  ${searchBoxIconStyle}
  width: 36px;
  left:0;
  svg {
    fill: ${colore.ui.darkBg};
  }
`;

export const CancelBtn = styled(Button)`
  ${searchBoxIconStyle}
  width: 36px;
  right:0;
  margin: 0;
  padding: 0;
  background: none;
  visibility: hidden;
  ${media.iphone4`
    padding: 0;
    svg {
      margin: 0;
    }
  `}
  ${({ searchActive }) => searchActive && css`
    visibility: visible;
  `};
`;

export const SearchField = styled(Input)`
  color: ${colore.ui.txt};
  padding-left: 32px;
  padding-right: 26px;
  margin: 0;
  border: none;
  font-size: 18px;
  &::placeholder {
    color: ${colore.ui.darkBg};
  }
  &:active,
  &:focus {
    outline: none;
  }
`;

export const PremiumIcon = styled(FlexBox)`
  width: 32px;
  height: 32px;
  margin: 2px 2px 2px 12px;
  background-color: ${colore.actions.action};
  border-radius: 300px;
  svg {
    fill: ${colore.ui.contrast};
  }
`;

export default class SearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      value,
      className,
      placeholder,
      onFiltraUnita,
      searchActive,
      onActivateSearch,
      searchResetFunction,
      premiumActive,
    } = this.props;

    return (
      <SearchBoxWrap searchActive={searchActive}>
        <Lens>
          <Svg {...icon.lens} />
        </Lens>
        <SearchField
          type="search"
          value={value}
          className={className}
          placeholder={placeholder}
          onChange={(e) => onFiltraUnita(e.target.value)}
          onFocus={onActivateSearch}
        />
        {searchResetFunction && (
          <CancelBtn
            searchActive={searchActive && value}
            onClick={searchResetFunction}
          >
            <Svg {...icon.cancel} />
          </CancelBtn>)}
        {premiumActive &&
          <PremiumIcon>
            <Svg {...globalicon.starCircle} />
          </PremiumIcon>
        }
      </SearchBoxWrap>
    );
  }
}

SearchBox.propTypes = {
  onFiltraUnita: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  searchActive: PropTypes.bool.isRequired,
  onActivateSearch: PropTypes.func.isRequired,
  searchResetFunction: PropTypes.func,
  premiumActive: PropTypes.bool,
};
