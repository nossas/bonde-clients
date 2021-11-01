import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Value } from 'slate'
import { react, typeCheck } from '../../slate-editor-utils/src'
import initialEditorState from './initialEditorState'

class SlateEditor extends React.Component {
  constructor(properties) {
    super(properties)
    this.state = {
      value: this.migrateStateVersion(properties.initialState || initialEditorState),
      readOnly: false,
      uid: new Date().getUTCMilliseconds()
    }
  }

  //
  // Migrate Slate's Value object
  // From v0.25.3
  // To   v0.31.3
  migrateStateVersion(value) {
    let updatedValue = value
    if (value.kind !== 'value') {
      updatedValue = JSON.parse(
        JSON.stringify(value)
          .replaceAll('"kind":"state"', '"kind":"value"')
          .replaceAll('"ranges":[', '"leaves":[')
          .replaceAll('"kind":"range"', '"kind":"leaf"')
      )
    }
    // Upgrade to v0.32.0
    // https://github.com/ianstormtaylor/slate/blob/master/packages/slate/Changelog.md#0320--january-4-2018
    updatedValue = JSON.parse(
      JSON.stringify(updatedValue)
        .replaceAll('"kind":', '"object":')
    )
    return Value.fromJSON(updatedValue)
  }

  //
  // This function change only the Editor value object
  //
  onChange(change) {
    const { value } = change

    this.setState({ value })

    const { onChange } = this.props
    if (typeCheck.isFunction(onChange)) onChange(value)
  }

  //
  // This function change the SlateEditor state object.
  // It can be change the Editor value object too...
  //
  changeState(state) {
    this.setState(state)
  }

  render() {
    const { children, style, className, plugins } = this.props

    const childProperties = {
      plugins,
      value: this.state.value,
      outerState: this.state,
      onChange: this.onChange.bind(this),
      changeState: this.changeState.bind(this)
    }

    return (
      <div className={classnames('editor--root', className)} style={style}>
        {react.cloneElement(children, childProperties)}
      </div>
    )
  }
}

SlateEditor.propTypes = {
  initialState: PropTypes.object
}

export default SlateEditor
