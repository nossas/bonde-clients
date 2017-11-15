import React from 'react'
import FormProvider from './formProvider'

class Field extends React.Component {
  getFieldProps (fieldName) {
    const { form: { fields } } = this.context
    const field = fields[fieldName]
    return {
      name: field.name,
      value: field.value,
      onChange: field.onChange
    }
  }

  render () {
    const { name, component: Component, ...inputProps } = this.props
    return <Component {...this.getFieldProps(name)} {...inputProps} />
  }
}

Field.contextTypes = FormProvider.childContextTypes

export default Field
