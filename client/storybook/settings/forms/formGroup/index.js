import React from 'react'
import { controlLabelStyle, formGroupStyle } from './styles'
import HelpBlock from '../helpBlock'

const ControlLabel = ({ children, htmlFor }) => (
  <label style={controlLabelStyle} htmlFor={htmlFor}>
    {children}
  </label>
)

export default (InputComponent) => ({
  id,
  touched,
  error,
  name,
  i18n,
  i18nContext,
  ...otherProps
}) => {
  let { label, placeholder, help, ...inputProps } = otherProps
  if (i18nContext && i18nContext[name]) {
    label = i18nContext[name].label
    placeholder = i18nContext[name].placeholder
    help = i18nContext[name].help
  }

  return (
    <div style={formGroupStyle}>
      {label && (<ControlLabel htmlFor={`${name}-id`}>{i18n(label)}</ControlLabel>)}
      {help && <HelpBlock level='warning'>{i18n(help)}</HelpBlock>}
      <InputComponent
        id={`${name}-id`}
        name={name}
        {...inputProps}
        placeholder={i18n(placeholder)}
      />
      {touched && error && (
        <HelpBlock level='error'>{i18n(error)}</HelpBlock>
      )}
    </div>
  )
}
