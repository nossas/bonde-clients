/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classnames from 'classnames'
import React from 'react'
// import { FormattedMessage } from 'react-intl'

class Input extends React.Component<any, any> {

  renderFieldKind(): React.ReactElement {
    const { field, uid, editable, configurable, onBlur } = this.props

    if (field.kind === 'dropdown') {
      return (
        <select
          id={`input-${uid}`}
          className='select block border border-gray94'
          style={{
            borderRadius: '2px',
            padding: '1rem',
            display: 'inline-block',
            height: 'inherit'
          }}
        >
          <option value=''>
            Selecione...
            {/* <FormattedMessage
              id='form-widget.components--input.field-dropdown.options.default'
              defaultMessage='Selecione...'
            /> */}
          </option>
          {
            field.placeholder.split(',').map((v) => <option>{v}</option>)
          }
        </select>
      );
    }

    return (
      <input
        id={`input-${uid}`}
        className='input block border border-gray94'
        style={{
          cursor: editable || configurable ? 'pointer' : undefined,
          borderRadius: '2px',
          padding: '1rem'
        }}
        onBlur={onBlur}
        placeholder={field.placeholder}
        type={field.kind === 'email' ? 'email' : 'text'}
      />
    )

  }

  render(): React.ReactElement {
    const {
      field,
      editable,
      configurable,
      mobilization: {
        body_font: bodyFont
      }
    } = this.props

    return (
      <div
        className='mb2'
        style={{
          fontFamily: bodyFont
        }}
      >
        <label
          className={classnames(
            'caps bold mb1 inline-block',
            configurable ? 'darkengray' : 'white'
          )}
          style={{
            cursor: editable || configurable ? 'pointer' : undefined,
            fontSize: '.75rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}
        >
          {field.label}{field.required === 'true' ? '*' : undefined}
        </label>
        {this.renderFieldKind()}
      </div>
    )
  }
}

export default Input
