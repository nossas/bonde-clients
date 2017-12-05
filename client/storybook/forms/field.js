import React from 'react'
import { FormProvider } from './createFormProvider'

const deepGet = (obj, path) =>
  path.split('.').reduce((xs, x) =>
    (xs && xs[x]) ? xs[x] : null, obj)

class Field extends React.Component {
  /**
   * Component responsible to manage the behavior of field. It get
   * a context received by FormProvider and pass like props to
   * render component.
   */

  getFieldProps (fieldName) {
    const { form: { fields, i18n } } = this.context
    const field = deepGet(fields, fieldName)
    return {
      i18n,
      ...field,
      value: field.value || ''
    }
  }

  getI18nProps (fieldName) {
    const { form: { i18n, i18nKeys } } = this.context
    let { label, placeholder, helpText } = this.props
    if (i18nKeys && i18nKeys.fields && i18nKeys.fields[fieldName]) {
      const fieldContext = i18nKeys.fields[fieldName]
      label = label || fieldContext.label
      placeholder = placeholder || fieldContext.placeholder
      helpText = helpText || fieldContext.helpText
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
        {...inputProps}
        {...this.getFieldProps(name)}
        {...this.getI18nProps(name)}
      />
    )
  }
}

Field.contextTypes = FormProvider.childContextTypes

export default Field
