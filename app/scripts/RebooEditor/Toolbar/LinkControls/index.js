import React, { Component, PropTypes } from 'react'
import { Entity, RichUtils, SelectionState } from 'draft-js'

import Link from './Link'
import linkStrategy from './linkStrategy'

import getSelectionEntities from '../getSelectionEntities'


const getSelectionLink = (editorState) => {
  // Return entity when one and only one selected
  const entities = getSelectionEntities(editorState, 'LINK')
  return entities.length === 1 ? entities[0] : undefined
}


export class LinkControls extends Component {

  constructor(props) {
    super(props)

    const { defaultTarget } = this.props

    this.state = { showInput: false, href: '', target: '_self' }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps
    if (editorState !== this.props.editorState) {
      const entityLink = getSelectionLink(this.props.editorState)
      const nextEntityLink = getSelectionLink(editorState)
      if (nextEntityLink && nextEntityLink !== entityLink) {
        const entityInstance = Entity.get(nextEntityLink.entityKey)
        const { href, target } = entityInstance.getData()
        this.setState({ href, target })
      } else {
        this.setState({ href: '', target: '_self' })
      }
    }
  }

  handleToggleInput() {
    this.setState({ showInput: !this.state.showInput })
  }

  confirmLink() {
    if (this.state.href) {
      const { editorState, setEditorState } = this.props
      const { href, target } = this.state

      const entitySelection = getSelectionLink(editorState)

      if (!editorState.getSelection().isCollapsed()) {
        const entityKey = Entity.create('LINK', 'MUTABLE', { href, target })
        const targetSelection = editorState.getSelection()

        setEditorState(RichUtils.toggleLink(editorState, targetSelection, entityKey))
      } else if (entitySelection) {
        // Make selection to apply entity
        const selection = SelectionState.createEmpty(
          editorState.getCurrentContent().getBlockForKey(
            editorState.getSelection().getStartKey()
          )
        )

        const entityKey = Entity.create('LINK', 'MUTABLE', { href, target })
        const targetSelection = selection.merge({
          anchorKey: editorState.getSelection().getAnchorKey(),
          focusKey: editorState.getSelection().getFocusKey(),
          anchorOffset: entitySelection.start,
          focusOffset: entitySelection.end
        })

        setEditorState(RichUtils.toggleLink(editorState, targetSelection, entityKey))
      }
    }
    this.setState({ showInput: false })
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
          <div className={popoverClassName}>
            <div className="flex flex-wrap">
              <input
                type="text"
                value={this.state.href}
                onChange={e => this.setState({ href: e.target.value })}
              />
              <button className="button button-outline white mr1" onClick={this.confirmLink.bind(this)}><i className="fa fa-check" /></button>
            </div>
            <div className="flex flex-wrap mt1">
              <input
                id="targetId"
                type="checkbox"
                onChange={this.handleChangeTarget.bind(this) }
                value={this.state.target}
                checked={this.state.target === '_blank'}
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
