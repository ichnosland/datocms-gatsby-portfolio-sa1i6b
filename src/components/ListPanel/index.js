/**
*
* ListPanel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { uniqueId } from 'lodash';

import media from 'style/mediainjector';
import { colore } from 'style/color';
import Svg from 'components/Svg';
import Div from 'components/Div';
import Spinner from 'components/Spinner';
import FlexBox, { FlexChild } from 'components/FlexBox';
import ClearLink from 'components/ClearLink';
import ButtonGroup from 'components/ButtonGroup';
import ContentEditable from 'components/ContentEditable';
import icon from 'icons/globals';
import ProgressBar from 'components/ProgressBar';
import HtmlInjector from './HtmlInjector';

const RightCareticon = styled(Svg)`
  position: relative;
  top: -1px;
  margin-left: 9px;
`;

const Usericon = styled(Svg)`
  position: relative;
  top: -2px;
  margin-right: 6px;
`;

export const PanelListWrap = styled(Div)`
  margin: ${(props) => props.margin ? props.margin : '0 0 10px 0'};
  page-break-inside: avoid;
`;

export const PanelHeader = styled.h2`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 40px 0 20px;
  color: ${(props) => props.theme.brand};
  font-weight: normal;
  text-align: center;
`;

PanelHeader.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const PanelList = styled(Div)`
  text-align: left;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : colore.ui.contrast};
  margin-bottom: 10px;
  border-radius: 3px;
  overflow: hidden;
`;

export const ListItem = styled(Div)`
  position:relative;
  border-bottom: 1px solid ${colore.ui.neutralBg};
  &:after{
    ${({ isSelected }) => isSelected && css`
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 30px 30px 0;
      border-color: transparent ${colore.actions.okay} transparent transparent;
    `}
  }
  &:last-child {
    border-bottom: none;
  }
  ${media.print`
    border:none;
  `}
`;

export const ListLink = styled(ClearLink)`
  position:relative;
  border-bottom: 1px solid ${colore.ui.neutralBg};
  &:last-child {
    border: none;
  }
  ${media.print`
    border:none;
  `}
`;

export const ItemTitle = styled(Div)`
  color: ${colore.ui.darkTxt};
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.unit ? '16px 56px 16px 12px' : '22px 16px'};
  ${(props) => props.locked && css`
    color: ${colore.ui.darkBg};
    cursor: default;
  `};

`;

export const Studenti = styled(Div)`
  max-width: 120px;
  padding-left: 6px;
  font-size: 14px;
  span{
    position: relative;
    top: 1px;
    padding: 6px 10px;
    margin-left: 4px;
    margin-bottom:-2px;
    border: 1px solid ${colore.ui.darkBg};
    color: ${colore.ui.darkBg};
    border-radius: 2px;
  }
  ${media.lt480`
      font-size: 12px;
      span {
        top: 2px;
      }
  `}
`;

export const ItemIcons = styled(FlexBox)`
  height: 100%;
  position: absolute;
  right: 16px;
  top: 0;
`;

class ListPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      header,
      unit,
      items,
      buttons,
      buttonsSpinner,
      margin,
      bgcolor,
    } = this.props;
    return (
      <PanelListWrap margin={margin}>
        {header &&
          <PanelHeader>
            {header}
          </PanelHeader>
        }
        <PanelList bgcolor={bgcolor}>
          {items.map((item) => {
            const listItem = (
              <ListItem
                key={item.id}
                isSelected={item.isSelected}
              >
                <ItemTitle
                  locked={item.locked}
                  unit={unit}
                  noPrint={item.noPrint ? item.noPrint : false}
                >
                  <FlexChild justifyContent="flex-start" flexGrow="1">{item.nome}</FlexChild>
                  {unit &&
                    <ItemIcons>
                      {item.locked &&
                        <Svg {...icon.lock} fill={colore.ui.darkBg} />
                      }
                      {item.assigned &&
                        <Svg {...icon.bell} fill={colore.actions.help} />
                      }
                      {item.percentuale >= 0 &&
                        <ProgressBar
                          steps
                          percentuale={item.percentuale}
                        />
                      }
                      {item.checkbox && <input type="checkbox"></input>}
                      {item.radio && <input type="radio"></input>}
                      {item.studenti &&
                        <Studenti>
                          <span>
                            <Usericon {...icon.smallUser} fill={colore.ui.neutralBg} />
                            {item.studenti}
                          </span>
                          <RightCareticon {...icon.caretRight} />
                        </Studenti>
                      }
                    </ItemIcons>
                  }
                  {item.options && item.options.map((opzione) => (
                    opzione.tipo === 'contenteditable' &&
                    <FlexChild justifyContent="flex-end" key={`flexchild_${opzione.id}`}>
                      <ContentEditable
                        key={`contenteditable_${opzione.id}`}
                        width="60px"
                        {...opzione}
                      />
                    </FlexChild>
                  ))}
                </ItemTitle>
                {item.isHtml && <HtmlInjector
                  text={item.text}
                  editor={item.editor || {}}
                  solution={item.solution}
                  align={item.align}
                  note={item.note}
                  esercizi={item.esercizi}
                  data={item.data}
                  hasLatex={item.hasLatex}
                />}
              </ListItem>);
            return (item.url && !item.locked ? <ListLink to={item.url} key={uniqueId()}>{listItem}</ListLink> : listItem);
          })}
        </PanelList>
        {buttons && (!buttonsSpinner ?
          <ButtonGroup
            margin="20px auto 40px auto"
            half
            buttons={buttons}
          /> : <Spinner />)
        }
      </PanelListWrap>
    );
  }
}

ListPanel.propTypes = {
  header: PropTypes.string,
  margin: PropTypes.string,
  bgcolor: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.id,
    nome: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
    locked: PropTypes.bool,
    assigned: PropTypes.bool,
    checkbox: PropTypes.bool,
    radio: PropTypes.bool,
    studenti: PropTypes.number,
    percentuale: PropTypes.number,
    url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    isHtml: PropTypes.bool,
    text: PropTypes.string,
    solution: PropTypes.string,
    align: PropTypes.string,
    note: PropTypes.bool,
    esercizi: PropTypes.number,
    data: PropTypes.string,
  })).isRequired,
  unit: PropTypes.bool,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.id,
    label: PropTypes.string.isRequired,
    icona: PropTypes.string,
    attivo: PropTypes.bool,
  })),
  buttonsSpinner: PropTypes.bool,
};

export default ListPanel;
