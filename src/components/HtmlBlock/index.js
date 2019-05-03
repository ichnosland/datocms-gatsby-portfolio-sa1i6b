/**
*
* HtmlBlock
*
*/

import React from 'react';

import PropTypes from 'prop-types';
import MathJax from 'react-mathjax-preview';
import styled from 'styled-components';

import Div from 'components/Div';
import { colore } from 'style/color';

export const HtmlBlockWrap = styled(Div)`
  width: 100%;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgcolor ? colore.ui.bgcolor : colore.ui.contrast};
`;

HtmlBlockWrap.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};


class HtmlBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      text,
      hasLatex,
      color,
      bgcolor,
      align,
      padding,
      margin,
      className,
    } = this.props;
    return (
      <div>
        {hasLatex ?
          <HtmlBlockWrap
            padding={padding}
            margin={margin}
            align={align}
            color={color}
            bgcolor={bgcolor}
            className={className}
          >
            <MathJax math={text} />
          </HtmlBlockWrap>
          :
          <HtmlBlockWrap
            dangerouslySetInnerHTML={{
              __html: text,
            }}
            padding={padding}
            margin={margin}
            align={align}
            color={color}
            bgcolor={bgcolor}
            className={className}
          >
          </HtmlBlockWrap>
        }
      </div>
    );
  }
}

HtmlBlock.propTypes = {
  text: PropTypes.string,
  hasLatex: PropTypes.bool,
  color: PropTypes.string,
  align: PropTypes.string,
  bgcolor: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  className: PropTypes.string,
};

export default HtmlBlock;
