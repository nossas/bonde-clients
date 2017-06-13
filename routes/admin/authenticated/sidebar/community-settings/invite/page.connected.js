import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { asyncEdit } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import { isValidFromEmail } from '~client/utils/validation-helper'

import Page from './page'

const mapDispatchToProps = { submit: asyncEdit }

const fields = ['inviteEmail']

const validate = ({ inviteEmail }) => {
  const errors = {}

  if (!inviteEmail) {
    errors.inviteEmail = 'Obrigatório'
  } else if (inviteEmail && !isValidFromEmail(inviteEmail)) {
    errors.inviteEmail = 'Formato de email inválido'
  }
  return errors
}

export default connect(undefined, mapDispatchToProps)(
  reduxForm({ form: 'communityInviteForm', fields, validate })(Page)
)
