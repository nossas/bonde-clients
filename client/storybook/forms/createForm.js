import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import FormProvider from './formProvider'

export const mapStateToProps = (initialValues) => (state, ownProps) => {
  if (typeof initialValues === 'function') {
    return {
      ...initialValues(state, ownProps)
    }
  } else if (typeof initialValues === 'object') {
    return {
      ...initialValues
    }
  }
}

export const mapActionsToProps = (submit) => (dispatch) => ({
  submit: (values) => {
    return submit(values, dispatch)
  }
})


export const createForm = (config) => {
  /**
   * 1. Redux-form simple api
   * 2. React-intl simple api
   */

  const { initialValues, name, fields, validate, submit } = config

  return connect(
    initialValues ? mapStateToProps(initialValues) : undefined,
    mapActionsToProps(submit)
  )(
    reduxForm({ form: name, fields, validate })(FormProvider)
  )
}
