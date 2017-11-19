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

  getI18nProps (fieldName) {
    const { form: { i18n, i18nContext } } = this.context
    let { label, placeholder, helpText } = this.props
    if (i18nContext && i18nContext.fields && i18nContext.fields[fieldName]) {
      const fieldContext = i18nContext.fields[fieldName]
      label = fieldContext.label || label
      placeholder = fieldContext.placeholder || placeholder
      helpText = fieldContext.helpText || helpText
    }
    return {
      label: i18n(label),
      placeholder: i18n(placeholder),
      helpText: i18n(helpText)
    }
  }

  render () {
    const { name, component: Component, ...inputProps } = this.props
    return (
      <Component
        {...this.getFieldProps(name)}
        {...inputProps}
        {...this.getI18nProps(name)}
      />
    )
  }
}

Field.contextTypes = FormProvider.childContextTypes

export default Field
