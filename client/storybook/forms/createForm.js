import { reduxForm } from 'redux-form'
import { withForm } from './formProvider'

export const subscribe = HOC => settings => {
  /**
   * Subscribe a form component to use `react-redux` and
   * `redux-form`, removing the third-party library coupling
   * in forms.
   */

  const {
    name,
    fields,
    validate,
    submit,
    initialValues: mapValues,
    component: FormComponent
  } = settings

  // always use a provider form, it is responsible to control
  // the behavior of form.
  const FormProvider = withForm(FormComponent || 'form')
  // redux-form configuration
  const configForm = { form: name, fields, validate }
  // react-redux configuration
  const mapStateToProps = (state, props) => ({
    initialValues: (
      typeof mapValues === 'function' ? mapValues(state, props)
        : typeof mapValues === 'object' ? mapValues
        : null
    )
  })
  const mapActionsToProps = { submit }
  // return a form component decorated
  return HOC(
    configForm,
    mapStateToProps,
    mapActionsToProps
  )(FormProvider)
}

export const createForm = subscribe(reduxForm)
