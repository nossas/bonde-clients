import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { BlockTag } from '~client/mobilizations/widgets/components'
import * as array from '~client/utils/array'

class InputTag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: undefined,
      value: ''
    }
  }

  handleKeyPress (event) {
    // [Enter] should not submit the form when choosing an address.
    if (event.charCode === 13) {
      event.preventDefault()
      const { onInsertTag, validate } = this.props
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

  handleEdit (value) {
    const { onRemoveTag } = this.props
    onRemoveTag && onRemoveTag(value)
    this.setState({ value: value, error: undefined })
  }

  render () {
    const { values, label, onRemoveTag, helperText } = this.props

    return (
      <div className='input-tag'>
        {label && (
          <label
            style={{ cursor: 'pointer' }}
            className='h5 bold caps'
            htmlFor='insert-tag-id'
          >
            {label}
            {(this.state.error && <span className='red'> - {this.state.error}</span>)}
          </label>
        )}
        {helperText}
        <input
          ref='insert'
          id='insert-tag-id'
          type='text'
          className='input block h3 col-12 mt1 px1'
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyPress={::this.handleKeyPress}
        />
        <label className='h5 bold caps mt3'>
          <FormattedMessage
            id='widgets.components--input-tag.tags.label'
            defaultMessage='Alvos cadastrados ({targetsCount})'
            values={{ targetsCount: String(array.clean(values).length) }}
          />
        </label>
        <BlockTag
          tags={values}
          onClick={::this.handleEdit}
          onRemove={onRemoveTag}
        />
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
  helperText: PropTypes.node.isRequired
}

export default InputTag
