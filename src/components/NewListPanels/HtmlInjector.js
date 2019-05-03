/**
*
* HtmlInjector
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import MathJax from 'react-mathjax-preview';

import media from 'style/mediainjector';
import { HtmlBlockWrap } from 'components/HtmlBlock';
import { colore } from 'style/color';
import { ListItem, ItemTextStyle } from './index';
import { HtmlStyles } from 'style/HtmlStylesVerifiche';

export const HtmlBlock = styled(HtmlBlockWrap)`
  ${ItemTextStyle};
  background-color: ${(props) => props.note ? colore.ui.note : colore.ui.contrast};
  ${media.print`
    border:none;
  `}
  ${(props) => props.solution && css`
    color: #0a6b06;
    background-color: #d0ffc8;
  `};
  ${HtmlStyles};
`;

HtmlBlock.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};


class HtmlInjector extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      text,
      hasLatex,
      solution,
      note,
      color,
      align,
    } = this.props;
    return (
      <ListItem>
        {hasLatex ?
          <HtmlBlock
            align={align}
            note={note}
            color={color}
            solution={solution}
          >
            <MathJax math={text} />
          </HtmlBlock>
          :
          <HtmlBlock
            dangerouslySetInnerHTML={{
              __html: text,
            }}
            align={align}
            note={note}
            color={color}
            solution={solution}
          >
          </HtmlBlock>
        }
      </ListItem>
    );
  }
}

HtmlInjector.propTypes = {
  text: PropTypes.string,
  hasLatex: PropTypes.bool,
  solution: PropTypes.bool,
  color: PropTypes.string,
  align: PropTypes.string,
  note: PropTypes.bool,
};

export default HtmlInjector;
