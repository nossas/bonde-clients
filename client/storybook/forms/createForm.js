import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withForm } from './formProvider'

export const mapStateToProps = (initialValues) => (state, ownProps) => {
  if (typeof initialValues === 'function') {
    return { initialValues: initialValues(state, ownProps) }
  } else if (typeof initialValues === 'object') {
    return { initialValues }
  }
}

export const mapActionsToProps = (submit) => (dispatch) => ({
  submit: (values) => {
    return submit(values, dispatch)
  }
})

export const connectCreateForm = (connectRedux, connectReduxForm) =>
  (config) => {
    /**
     * 1. Redux-form simple api
     * 2. React-intl simple api
     */

    const { initialValues, name, fields, validate, submit } = config

    const { formComponent: FormComponent } = config
    const Form = withForm(FormComponent || 'form')

    const reduxHOC = connectRedux(
      initialValues ? mapStateToProps(initialValues) : undefined,
      mapActionsToProps(submit)
    )
    const reduxFormHOC = connectReduxForm({ form: name, fields, validate })

    return reduxHOC(reduxFormHOC(Form))
  }

export const createForm = connectCreateForm(connect, reduxForm)
