import React, { Component, PropTypes } from 'react'

import BlockTag from './BlockTag'


class InputTag extends Component {

  constructor(props) {
    super(props)
    this.state = { error: undefined, value: '' }
  }

  componentDidMount() {
    // Direct reference to autocomplete DOM node
    // (e.g. <input ref="insert" ... />
    const node = React.findDOMNode(this.refs.insert)
    // Evergreen event listener || IE8 event listener
    const addEvent = node.addEventListener || node.attachEvent
    addEvent("keypress", this.handleKeyPress.bind(this), false)
  }

  componentWillUnmount() {
    const removeEvent = node.removeEventListener || node.detachEvent
    // Reduce any memory leaks
    removeEvent("keypress", this.handleKeyPress.bind(this))
  }

  handleKeyPress(event) {
    // [Enter] should not submit the form when choosing an address.
    if (event.keyCode === 13) {
      event.preventDefault()
      const { values, onInsertTag, validate, name } = this.props
      const value = event.target.value
      const errors = validate && validate(value)

      if (errors && !errors.valid) {
        this.setState({ error: errors.message })
      } else {
        onInsertTag && onInsertTag(value)
        this.setState({ value: '', error: undefined })
      }
    }
  }

  handleEdit(value) {
    const { onRemoveTag } = this.props
    onRemoveTag && onRemoveTag(value)
    this.setState({ value: value, error: undefined })
  }

  render() {
    const { values, label, onRemoveTag } = this.props

    return (
      <div className="mt1 mb3">
        {(label && <label style={{ cursor: "pointer" }} className="h5 bold caps" htmlFor="insert-tag-id">{label}</label>)}
        {(this.state.error && <span className="h5 red ml2">{this.state.error}</span>)}
        <input
          ref="insert"
          id="insert-tag-id"
          type="text"
          className="field-light block h3 full-width mt1 px1"
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <BlockTag
          tags={values}
          onClick={::this.handleEdit}
          onRemove={onRemoveTag} />
        <span className="h5">{"Pressione <Enter> para adicionar mais alvos"}</span>
      </div>
    )
  }
}

InputTag.propTypes = {
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  validate: PropTypes.func,
  onInsertTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
}

export default InputTag
