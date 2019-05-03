/**
*
* EditableSpan
*
*/
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import media from 'style/mediainjector';
import { EditableFieldStyle } from './index';

const EditableSpan = styled.span`
  display: inline-block;
  min-height: 30px;
  line-height: 0.9;
  vertical-align: middle;
  margin: -1px 6px 0;
  min-width: 30px;
  ${EditableFieldStyle}
  ${({ single }) => single && css`
  display: block;
  margin: 10px auto;
  `}
  ${media.lt667`
    line-height: 1;
  `}
`;

export default EditableSpan;


export class EditableSpanView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(...args) {
    super(...args);
    this.node = null;
  }

  componentDidMount = /* istanbul ignore next */ () => {
    const { prefill } = this.props;

    if (this.node && prefill) {
      this.node.innerText = prefill;
    }
  }

  render() {
    const {
      isEditable,
      single,
      spellcheck,
      autocomplete,
      autocorrect,
      autocapitalize,
      onpaste,
      giusto,
      sbagliato,
      onkeydown,
      oninput,
      onfocus,
      onblur,
      oncontextmenu,
      oncopy,
      ondrag,
      ondrop,
      ondragstart,
      ondragend,
    } = this.props;

    return (
      <EditableSpan
        innerRef={/* istanbul ignore next */(node) => { this.node = node; }}
        contentEditable={isEditable}
        single={single}
        spellCheck={spellcheck}
        autoComplete={autocomplete}
        autoCorrect={autocorrect}
        giusto={giusto}
        sbagliato={sbagliato}
        autoCapitalize={autocapitalize}
        onKeyDown={onkeydown}
        onInput={oninput}
        onPaste={onpaste}
        onFocus={onfocus}
        onBlur={onblur}
        onContextMenu={oncontextmenu}
        onCopy={oncopy}
        onDrag={ondrag}
        onDragStart={ondragstart}
        onDragEnd={ondragend}
        onDrop={ondrop}
      />
    );
  }
}

EditableSpanView.propTypes = {
  isEditable: PropTypes.bool,
  single: PropTypes.bool,
  spellcheck: PropTypes.bool,
  autocomplete: PropTypes.string,
  autocorrect: PropTypes.string,
  autocapitalize: PropTypes.string,
  onpaste: PropTypes.func,
  giusto: PropTypes.bool,
  sbagliato: PropTypes.bool,
  onkeydown: PropTypes.func,
  oninput: PropTypes.func,
  onfocus: PropTypes.func,
  onblur: PropTypes.func,
  prefill: PropTypes.string,
  oncontextmenu: PropTypes.func,
  oncopy: PropTypes.func,
  ondrag: PropTypes.func,
  ondragstart: PropTypes.func,
  ondragend: PropTypes.func,
  ondrop: PropTypes.func,
};
