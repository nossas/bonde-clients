import React, { Component, PropTypes } from 'react'
import { Entity, RichUtils } from 'draft-js'

import Link from './Link'
import linkStrategy from './linkStrategy'


export class LinkControls extends Component {

  constructor(props) {
    super(props)

    const { defaultTarget } = this.props

    this.state = { showInput: false, href: '', target: '_self' }
  }

  handleToggleInput() {
    this.setState({ showInput: !this.state.showInput })
  }

  confirmLink() {
    if (this.state.href) {
      const { editorState, setEditorState } = this.props
      const { href, target } = this.state

      const entityKey = Entity.create('LINK', 'MUTABLE', { href, target })
      setEditorState(RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey))
    }
    // reset component
    this.setState({ showInput: false, href: '', target: '_self' })
  }

  handleChangeTarget(e) {
    this.setState({ target: e.target.checked ? '_blank' : '_self' })
  }

  render() {

    const { buttonClassName, popoverClassName } = this.props

    return (
      <div className="linkControls">
        <button className={buttonClassName} onClick={this.handleToggleInput.bind(this)}>
          <i className="fa fa-link" />
        </button>
        {this.state.showInput && (
          <div className={popoverClassName} style={{ position: 'absolute' }}>
            <div className="flex flex-wrap">
              <input
                type="text"
                value={this.state.href}
                onChange={e => this.setState({ href: e.target.value })}
              />
              <button className="button" onClick={this.confirmLink.bind(this)}><i className="fa fa-check" /></button>
            </div>
            <div className="flex flex-wrap mt1">
              <input
                id="targetId"
                type="checkbox"
                onChange={this.handleChangeTarget.bind(this) }
                value={this.state.target}
                data-wysihtml5-dialog-field="target"
              />
              <label htmlFor="targetId" style={{ cursor: 'pointer', lineHeight: 'normal' }}>Abrir link em nova aba</label>
            </div>
          </div>
        )}
      </div>
    )
  }
}

LinkControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
  popoverClassName: PropTypes.string
}

const createLinkPlugin = (config = {}) => {
  return {
    decorators: [
      {
        strategy: linkStrategy,
        component: Link,
      }
    ]
  }
}

export default createLinkPlugin
