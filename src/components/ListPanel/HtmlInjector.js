/**
*
* HtmlInjector
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MathJax from 'react-mathjax-preview';
import CKEditor from 'react-ckeditor-component';

import media from 'style/mediainjector';
import Div from 'components/Div';
import { colore } from 'style/color';
import { HtmlStyles } from 'style/HtmlStylesVerifiche';

export const HtmlBlock = styled(Div)`
  color: ${(props) => props.color ? props.color : props.theme.brand};
  background-color: ${(props) => props.note ? colore.ui.note : colore.ui.contrast};
  border-top: 1px solid ${colore.ui.neutralBg};
  padding: 16px;
  ${media.print`
    border:none;
  `}
  ${HtmlStyles};
  overflow-y: ${(props) => props.overflowy};
  table {
    th {
      background: ${colore.ui.neutralBg};
    }
    td,
    th {
      padding: 0.62em;
      border: 1px solid ${colore.ui.neutralBg};
      vertical-align: middle;
    }
  }
  .numero-esercizio {
    float: right;
    background-color: ${colore.ui.darkBg};
    color: ${colore.ui.contrast};
    padding: 3px 6px;
    border-radius: 3px;
    text-align: right;
  }
`;

HtmlBlock.defaultProps = {
  theme: {
    brand: '#00BBEF',
  },
};

export const Solution = styled(HtmlBlock)`
  color: ${(props) => props.color ? props.color : '#0a6b06'};
  background-color: ${(props) => props.bgcolor ? props.bgcolor : '#d0ffc8'};
`;

export const HtmlBlockFooter = styled(Div)`
  color: ${colore.ui.darkTxt};
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid ${colore.ui.neutralBg};
  ${media.print`
    border:none;
  `}
`;

class HtmlInjector extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      text,
      hasLatex,
      solution,
      note,
      color,
      align,
      esercizi,
      data,
      editor = {},
    } = this.props;
    return (
      <Div>
        {text && editor.show &&
          <Div padding="16px" border="1px dashed rgb(251, 91, 111)" >
            <CKEditor
              activeClass="activeConsegnaEditor"
              content={editor.editorConsegnaHTML}
              events={{
                change: editor.onChangeConsegna,
              }}
              config={editor.config}
            />
          </Div>}
        {text && !editor.show && (!hasLatex ?
          <HtmlBlock
            dangerouslySetInnerHTML={{
              __html: text,
            }}
            align={align}
            note={note}
            color={color}
          >
          </HtmlBlock>
          :
          <HtmlBlock
            align={align}
            note={note}
            color={color}
            overflowy="auto"
          >
            <MathJax math={text} />
          </HtmlBlock>
        )}
        {solution && !editor.show && (!hasLatex ?
          <Solution
            dangerouslySetInnerHTML={{
              __html: solution,
            }}
          />
          :
          <Solution>
            <MathJax math={solution} />
          </Solution>
        )}
        {solution && editor.show &&
          <Solution>
            {<CKEditor
              activeClass="activeSoluzioneEditor"
              content={editor.editorSoluzioneHTML}
              events={{
                change: editor.onChangeSoluzione,
              }}
              config={editor.config}
            />}
          </Solution>}
        {(esercizi || data) &&
          <HtmlBlockFooter>
            {typeof esercizi !== 'undefined' &&
              <span>{`${esercizi} ${esercizi !== 1 ? 'ESERCIZI' : 'ESERCIZIO'}`}</span>
            }
            {data &&
              <span>{data}</span>
            }
          </HtmlBlockFooter>
        }
      </Div>
    );
  }
}

HtmlInjector.propTypes = {
  text: PropTypes.string,
  hasLatex: PropTypes.bool,
  solution: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string,
  note: PropTypes.bool,
  esercizi: PropTypes.number,
  data: PropTypes.string,
  editor: PropTypes.shape({
    show: PropTypes.bool,
    editorConsegnaState: PropTypes.string,
    editorSoluzioneState: PropTypes.string,
    onChangeConsegna: PropTypes.func,
    onChangeSoluzione: PropTypes.func,
  }),
};

export default HtmlInjector;
