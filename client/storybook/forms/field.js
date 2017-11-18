import React from 'react'
import { FormProvider } from './createFormProvider'

class Field extends React.Component {
  /**
   * Component responsible to manage the behavior of field. It get
   * a context received by FormProvider and pass like props to
   * render component.
   */

  getFieldProps (fieldName) {
    const { form: { fields, i18n } } = this.context
    const field = fields[fieldName]
    return {
      i18n,
      ...field,
      value: field.value || ''
    }
  }

  render () {
    const { name, component: Component, ...inputProps } = this.props
    return <Component {...this.getFieldProps(name)} {...inputProps} />
  }
}

Field.contextTypes = FormProvider.childContextTypes

export default Field
