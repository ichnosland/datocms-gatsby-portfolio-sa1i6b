/**
*
* StatsElements
*
*/

import styled, { css } from 'styled-components';

import Div from 'components/Div';
import FlexBox from 'components/FlexBox';
import { NoStyleButton } from 'components/Button';
import media from 'style/mediainjector';
import { colore } from 'style/color';

export const ChartBoxStyle = css`
  position: relative;
  background-color: ${colore.ui.contrast};
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0,0,0,.3);
  .context {
     color: #ff6400;
     ${media.print`
      border-bottom: 1px dotted black;
    `}
   }
   ${media.print`
    box-shadow: none;
    border: 1px solid #ccc;
    border-radius: 0;
    page-break-inside: avoid;
  `}
`;

export const WrapReportistica = styled(Div)`
  ${(props) => props.isDocente && css`
    width: 74%;
    float: right;
  `}
  position: relative;
  user-select: none;
  ${media.lt768`
    width: 100%;
  `}
  ${media.print`
    width: 100%;
    * {
      color: black !important;
      background: none !important;
    }
  `}
`;

export const ChartBox = styled(Div)`
  ${ChartBoxStyle}
  margin-bottom: 16px;
  padding-bottom: 20px;
`;

export const LegendaChartBox = styled(FlexBox)`
  padding: 10px 10px 20px;
  justify-content: space-between;
`;

export const ReportCard = styled(Div)`
  ${ChartBoxStyle}
  margin-bottom: 32px;
  overflow: hidden;
`;

export const CardContent = styled(Div)`
  position: relative;
  padding-left: 32px;
  border-bottom: none;
  background-color: ${colore.ui.neutralBg};
  ${media.print`
    border-top: 2px solid #ccc;
    padding-left: 0;
  `}
`;

export const ReportCardToolbar = styled(Div)`
  position: relative;
  color: ${colore.ui.contrast};
  padding: 10px 38px;
  background-color: ${(props) => props.theme.brand};
  ${({ inattiva }) => inattiva && css`
    background-color: #ccc;
  `}
  ${media.print`
    font-size: 1.3em;
    font-weight: bold;
    padding: 10px;
  `}
`;

ReportCardToolbar.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const CardToolbox = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 10px 16px;
  border-left: 1px solid ${(props) => props.theme.darken};
  svg {
    fill: ${colore.ui.contrast};
  }
  ${media.print`
    border: none;
  `}
`;

CardToolbox.defaultProps = {
  theme: {
    darken: '#1588AA',
  },
};

export const ToggleDomanda = styled(FlexBox)`
  width: 32px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  ${({ risultato }) => risultato === 'bene' && css`
    background-color: ${colore.stats.pie.good};
  `}
  ${({ risultato }) => risultato === 'media' && css`
    background-color: ${colore.stats.pie.medium};
  `}
  ${({ risultato }) => risultato === 'male' && css`
    background-color: ${colore.stats.pie.bad};
  `}
  svg {
    fill: ${colore.ui.contrast};
    width: 14px;
    height: 14px;
  }
`;

export const DomandaRisposta = styled(Div)`
  padding: 20px;
  background-color: ${colore.ui.contrast};
  ${({ risultato }) => risultato === 'bene' && css`
    color: ${colore.stats.pie.good};
  `}
  ${({ risultato }) => risultato === 'media' && css`
    color: ${colore.stats.pie.medium};
  `}
  ${({ risultato }) => risultato === 'male' && css`
    color: ${colore.stats.pie.bad};
  `}
  svg {
    fill: ${colore.ui.contrast};
  }
`;

export const Risposta = styled(Div)`
  position: relative;
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px 80px 10px 20px;
  background-color: ${colore.ui.contrast};
  ${media.print`
    display: block !important;
  `}
`;

export const ToggleRisposta = styled(Div)`
  color: ${(props) => props.theme.darken};
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.pale};
  padding: 6px 8px;
  text-align: center;
  svg {
    fill: ${(props) => props.theme.darken};
    width: 14px;
    height: 14px;
    margin-left: 5px;
    vertical-align: baseline;
  }
  span {
    display: inline-block;
    margin: 5px 0;
  }
`;

ToggleRisposta.defaultProps = {
  theme: {
    darken: '#1588AA',
    pale: 'rgb(199, 231, 245)',
  },
};

export const Swatch = styled(Div)`
  display: inline-block;
  width: 20px;
  height: 12px;
`;

export const SwatchLabel = styled(Div)`
  position: relative;
  display: inline-block;
  color: ${colore.ui.lightTxt};
  font-family: sans-serif;
  font-size: 12px;
  margin-right: 6px;
  top: -1px;
`;

export const SideBarReportistica = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  ${media.gt768`
    width: 24%;
    float: left;
    overflow: hidden;
    ${ChartBoxStyle}
  `}
  ${media.lt768`
    position: fixed;
    top: 0;
    left: -50%;
    z-index: 100;
    width: 50%;
    height: 100%;
    float: none;
    background-color: ${colore.ui.contrast};
    overflow: auto;
    transition: all 0.3s;
     ${({ active }) => active && css`
      left: 0;
      box-shadow: 3px 6px 14px rgba(0,0,0,0.3);
    `}
  `}
  ${media.print`
    display: none;
  `}
  ${(props) => !props.isDocente && css`
    display: none;
  `}
`;

export const Studente = styled.li`
  position: relative;
  border-bottom: 1px solid rgba(212, 211, 211, 0.7);
  button {
    display: block;
    width: 100%;
    ${NoStyleButton}
    padding: 12px 16px;
    text-align: left;
    &:active,
    &:focus {
      outline: none;
    }
    &:active{
      background-color: ${colore.ui.neutralBg};
      span {
        color: ${(props) => props.theme.brand};
      }
    }
  }
  ${({ attivo }) => attivo && css`
    button {
      background-color: ${colore.ui.neutralBg};
    }
    span {
      color: ${(props) => props.theme.brand};
    }
  `}
  ${({ ennecci }) => ennecci && css`
    pointer-events: none;
    button {
      pointer-events: none;
      color: ${colore.ui.darkBg};
    }
    span {
      color: ${colore.stats.pie.bad};
    }
  `}
  span {
    display: block;
    font-size: 14px;
    text-align: right;
    padding: 2px 16px 4px 4px;
  }
  ${media.gt768`
    button {
      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
      }
    }
    &:last-child {
      border-bottom: none;
    }
    ${({ attivo }) => attivo && css`
      button {
        color: ${colore.ui.contrast};
        background-color: ${(props) => props.theme.brand};
        &:hover {
          color: ${colore.ui.txt};
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    `}
  `}
`;

export const CloseSideBarBtn = styled.button`
  ${NoStyleButton}
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 6px solid rgba(0, 0, 0, 0.1);
  &:active,
  &:focus {
    outline: none;
  }
  svg {
    width: 22px;
    height:13px;
    display:block;
    transform: rotate(-360deg) scaleX(-1);
    fill: ${(props) => props.theme.brand}
  }
  ${media.gt768`
    display: none;
  `}
  ${media.print`
    display: none;
  `}
`;

export const StatsCurrentUser = styled(FlexBox)`
  display: none;
  ${(props) => !props.isDocente && css`
    display: flex;
  `}
  ${ChartBoxStyle}
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  transition: all 0.3s;
  overflow: hidden;
  ${media.lt768`
    display: flex;
  `}
  button {
    appearance: none;
    background: ${(props) => props.theme.brand};
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 42px;
    &:active,
    &:focus {
      outline: none;
    }
    svg {
      display:block;
    }
    ${(props) => !props.isDocente && css`
    display: none;
  `}
    ${media.print`
      display: none;
    `}
  }
  ${media.print`
    display: block;
    margin-bottom: 20px;
    text-align: center;
    font-size: 28pt;
    font-weight: bold;
    border: none;
    .studente__score {
      font-size: 24pt;
      border: 2px solid #ccc;
      border-radius: 3px;
      color: 'black';
    }
    span {
      padding: 0 10px;
    }
  `}
`;

export const VotoSelectedUser = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 42px;
  padding: 0 10px;
  color: ${(props) => props.theme.brand};
  border-left: 1px solid ${colore.ui.neutralBg};
  ${media.print`
    position: relative;
    font-size: 24pt;
    border: 2px solid #ccc;
    border-radius: 3px;
    color: 'black';
  `}
`;
