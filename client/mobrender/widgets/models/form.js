import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

export const mapStateToProps = (mapInitialValues) => (state, ownProps) => {
  const { settings } = ownProps.widget
  const initialValues = {
    ...settings || {}
  }
  if (typeof mapInitialValues === 'function') {
    return {
      initialValues: {
        ...initialValues,
        ...mapInitialValues(ownProps.widget)
      }
    }
  }
  return { initialValues }
}

export default (config) => (Component) => {
  /**
   * Config
   *
   * - mapInitialValues: função que recebe o widget e deve retornar um objeto
   *   com os valores iniciais do formulário, este objeto sobrescreve os
   *   valores adicionados pelo padrão `props.widget.settings`.
   *
   * - { form, field, validate }: redux form props
   *
   */

  const { mapInitialValues, form, fields, validate } = config

  return connect(mapStateToProps(mapInitialValues))(
    reduxForm({ form, fields, validate })(Component)
  )
}
