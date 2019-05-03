/**
*
* TopBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { ContainerFlex } from 'components/Container';
import FlexBox from 'components/FlexBox';
import LogoPlatform from 'components/LogoPlatform';
import Select from 'components/Select';
import Svg from 'components/Svg';
import { H3 } from 'components/Heading';
import { Button, Icon } from 'components/Button';
import icona from 'icons/buttons';
import icon from 'icons/globals';
import logo from 'images/logos';
import { colore } from 'style/color';
import media from 'style/mediainjector';
import { allThemes } from 'style/theme';
import SearchBox from './SearchBox';
import Bar from './Bar';
import Scores from './Scores';
import ItemCounter from './ItemCounter';

export const IconBtn = styled(FlexBox)`
  width: 36px;
  height: 36px;
  svg {
    fill: ${colore.ui.contrast};
  }
  ${(props) => props.esecuzione && css`
    svg {
      fill: ${props.theme.brand};
    }
  `};
`;

IconBtn.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

const Space = styled.div`
  width: 36px;
  height:36px;
`;

export const BarTitle = styled(H3)`
  ${(props) => !props.esecuzione && css`color:${colore.ui.contrast};`};
`;

BarTitle.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const TopBarLogoLeft = styled(LogoPlatform)`
  position: relative;
  ${(props) => props.theme.topBarLogoLeft.style};
  svg {
    fill: ${colore.ui.contrast};
  }
`;

TopBarLogoLeft.defaultProps = {
  theme: {
    topBarLogoLeft: {
      style: css`
        background-color: transparent;
      `,
    },
  },
};

export const TopBarLogoRight = styled(Svg)`
  fill: ${colore.ui.contrast};
  ${(props) => props.theme.topBarLogoRight.style};
  ${media.mobile`
    display: none;
  `};
`;

TopBarLogoRight.defaultProps = {
  theme: {
    topBarLogoRight: {
      style: css`
        background-color: transparent;
      `,
    },
  },
};

class TopBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      bgColor,
      noShadow,
      pinned,
      esecuzione,
      box,
      topSwitcher,
      closeBtn,
      backNav,
      backArrow,
      title,
      score,
      lesson,
      searchBox,
      placeholder,
      single,
      button,
      searchActive,
      onFiltraUnita,
      onActivateSearch,
      searchResetFunction,
      searchValue,
      premiumActive,
      rightBtn,
      product,
    } = this.props;
    const logoRight = !!((allThemes[product] || {}).topBarLogoRight || {}).logo;
    const logoLeft = !!((allThemes[product] || {}).topBarLogoLeft || {}).logo;
    const closeBtnTemplate = closeBtn.enabled ? (
      <IconBtn esecuzione={esecuzione} onClick={closeBtn.onClickFunction}>
        <Svg {...icon.close} />
      </IconBtn>
    ) : '';
    const backNavTemplate = backNav.enabled ? (
      <IconBtn esecuzione={esecuzione} onClick={backNav.onClickFunction}>
        <Svg {...icon.chevronLeft} />
      </IconBtn>
    ) : '';
    const lessonTemplate = lesson.enabled ? (
      <IconBtn esecuzione={esecuzione} onClick={lesson.onClickFunction}>
        <Svg {...icon.lesson} />
      </IconBtn>
    ) : '';
    const backArrowTemplate = backArrow.enabled ? (
      <IconBtn esecuzione={searchActive} onClick={backArrow.onClickFunction}>
        <Svg {...icon.arrowSlimLeft} />
      </IconBtn>
    ) : '';
    return (
      <Bar
        bgColor={bgColor}
        noShadow={noShadow}
        pinned={pinned}
        esecuzione={esecuzione}
        box={box}
        searchActive={searchActive}
      >
        <ContainerFlex justifyContent="space-between" height="100%">
          {logoLeft && !searchActive && <TopBarLogoLeft product={allThemes[product].topBarLogoLeft.logo} />}
          {topSwitcher.items.length > 0 && !searchActive && <Select
            margin="0 16px 0 0"
            selectItems={topSwitcher.items}
            selectedKey={topSwitcher.itemSelected}
            onChangeFunction={topSwitcher.onChangeFunction}
          />}
          {closeBtn.url ? <Link to={closeBtn.url} onClick={closeBtn.onClickFunction}>{closeBtnTemplate}</Link> : closeBtnTemplate}
          {backNav.url ? <Link to={backNav.url} onClick={backNav.onClickFunction}>{backNavTemplate}</Link> : backNavTemplate}
          {title && <BarTitle esecuzione={esecuzione}>{title}</BarTitle>}
          {score &&
            <Scores score={score} />
          }
          {lesson.url ? <Link to={lesson.url}>{lessonTemplate}</Link> : lessonTemplate}
          {rightBtn &&
            <Link to={rightBtn.url || '#'} onClick={rightBtn.onClickFunction}>
              <IconBtn esecuzione={esecuzione}><Svg {...icon[rightBtn.icon]} /></IconBtn>
            </Link>
          }
          {backArrow.url ? <Link to={backArrow.url}>{backArrowTemplate}</Link> : backArrowTemplate}
          {searchBox && <SearchBox
            placeholder={placeholder}
            searchActive={searchActive}
            onFiltraUnita={onFiltraUnita}
            onActivateSearch={onActivateSearch}
            searchResetFunction={searchResetFunction}
            value={searchValue}
            premiumActive={premiumActive}
          />}
          {logoRight && !searchActive && <TopBarLogoRight {...logo[allThemes[product].topBarLogoRight.logo]} />}
          {button && (
            <Button
              {...button}
              margin="-2px 0 0"
            >
              {button.itemCount &&
                <ItemCounter hidden={!!button.disabled}>
                  {button.itemCount}
                </ItemCounter>
              }
              {button.buttonIcon &&
                <Icon left {...icona[button.buttonIcon]} fill={button.iconFill} />
              }
              {button.label}
            </Button>
          )}
          {single && <Space></Space>}
        </ContainerFlex>
      </Bar>
    );
  }
}

TopBar.propTypes = {
  bgColor: PropTypes.string,
  noShadow: PropTypes.bool,
  pinned: PropTypes.bool,
  esecuzione: PropTypes.bool,
  box: PropTypes.bool,
  title: PropTypes.string,
  score: PropTypes.string,
  closeBtn: PropTypes.shape({
    url: PropTypes.string,
    onClickFunction: PropTypes.func,
    enabled: PropTypes.bool.isRequired,
  }),
  backNav: PropTypes.shape({
    url: PropTypes.string,
    onClickFunction: PropTypes.func,
    enabled: PropTypes.bool.isRequired,
  }),
  backArrow: PropTypes.shape({
    url: PropTypes.string,
    onClickFunction: PropTypes.func,
    enabled: PropTypes.bool.isRequired,
  }),
  lesson: PropTypes.shape({
    url: PropTypes.string,
    onClickFunction: PropTypes.func,
    enabled: PropTypes.bool.isRequired,
  }),
  rightBtn: PropTypes.shape({
    onClickFunction: PropTypes.func,
    icon: PropTypes.string.isRequired,
    url: PropTypes.string,
  }),
  feedback: PropTypes.bool,
  premiumActive: PropTypes.bool,
  single: PropTypes.bool,
  searchBox: PropTypes.bool,
  searchActive: PropTypes.bool,
  onActivateSearch: PropTypes.func,
  searchResetFunction: PropTypes.func,
  searchValue: PropTypes.string,
  placeholder: PropTypes.string,
  topSwitcher: PropTypes.shape({
    items: PropTypes.array,
    itemSelected: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    onChangeFunction: PropTypes.func,
  }),
  onFiltraUnita: PropTypes.func,
  button: PropTypes.shape({
    buttonLabel: PropTypes.string,
    buttonIcon: PropTypes.string,
    disabled: PropTypes.bool,
    itemCount: PropTypes.string,
  }),
  product: PropTypes.string,
};

TopBar.defaultProps = {
  topSwitcher: {
    items: [],
  },
  closeBtn: {
    url: '',
    enabled: false,
  },
  backNav: {
    url: '',
    enabled: false,
  },
  backArrow: {
    url: '',
    enabled: false,
  },
  lesson: {
    url: '',
    enabled: false,
  },
};

export default TopBar;
