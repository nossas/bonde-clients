import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'

import { asyncInvite } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import { isValidEmail } from '~client/utils/validation-helper'

import Page from './page'

const mapStateToProps = state => ({
  communityId: CommunitySelectors.getCurrentId(state)
})
const mapDispatchToProps = { asyncInvite }
const mergeProps = ({ communityId }, { asyncInvite }) => ({
  submit: values => asyncInvite(communityId, values)
})

const fields = ['email']

const validate = ({ email }, { intl }) => {
  const errors = {}

  if (!email) {
    errors.email = intl.formatMessage({
      id: 'page--community-invite.form.email.validation.required',
      defaultMessage: 'Obrigatório'
    })
  } else if (!isValidEmail(email)) {
    errors.email = intl.formatMessage({
      id: 'page--community-invite.form.email.validation.invalid',
      defaultMessage: 'Informe um email válido'
    })
  }
  return errors
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  injectIntl(reduxForm({ form: 'communityInviteForm', fields, validate })(Page))
)
