//
// @route /community/new
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import * as CommunityActions from 'community/action-creators'

import Page from './page'

const mapStateToProps = state => {
  const { community: { list: { submitError } } } = state
  return {
    submitError
  }
}

const validate = (values, { submitError, intl }) => {
  let error = {}
  if (submitError) {
    error = {...submitError}
  }
  if (!values.name) {
    error.name = intl.formatMessage({
      id: 'page--community-new.form.name.validation.required',
      defaultMessage: 'Informe o nome da comunidade'
    })
  }
  if (!values.city) {
    error.city = intl.formatMessage({
      id: 'page--community-new.form.city.validation.required',
      defaultMessage: 'Informe em qual cidade sua comunidade atua'
    })
  }
  return error
}

export default connect(mapStateToProps)(injectIntl(reduxForm({
  form: 'communityNewForm',
  fields: ['name', 'city'],
  validate
}, undefined, CommunityActions)(Page)))
