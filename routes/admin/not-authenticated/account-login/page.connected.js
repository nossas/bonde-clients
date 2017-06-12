import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { browserHistory } from 'react-router'

import * as AccountActions from '~client/account/redux/action-creators'
import AccountSelectors from '~client/account/redux/selectors'
import { isValidEmail } from '~client/utils/validation-helper'

import authenticate from '~client/account/queries/authenticate'
import * as authType from '~client/account/redux/action-types'


import FormLogin from './page'

const fields = ['email', 'password']

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Informe seu email'
    errors.valid = false
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Email inválido'
    errors.valid = false
  }
  if (!values.password) {
    errors.password = 'Informe sua senha'
    errors.valid = false
  }
  return errors
}

const mapStateToProps = state => {
  const selectors = AccountSelectors(state)
  return {
    user: selectors.getUser(),
    errorMessage: selectors.getError()
  }
}

const mapActionsToProps = (dispatch, props) => ({...props,
  login: values => {
    props.mutate({ variables: { ...values } })
      .then(({ data: { authenticate: { jwtToken } } }) => {
        if (jwtToken) {
          dispatch({
            type: authType.LOGIN_SUCCESS,
            payload: {
              user: { id: 1, first_name: 'Igor', last_name: 'Santos', email: 'igor@nossas.org' },
              credentials: { 'access-token': `${jwtToken}` }
            }
          })
          browserHistory.push('/') 
        } else {
          dispatch({
            type: authType.LOGIN_FAILURE,
            payload: 'Ops, o email e/ou senha estão incorretos.' 
          })
        }
      })
  }
})

const FormLoginWithMutation = graphql(authenticate)(reduxForm(
  { form: 'loginForm', fields, validate },
  mapStateToProps,
  mapActionsToProps
)(injectIntl(FormLogin)))

export default FormLoginWithMutation
