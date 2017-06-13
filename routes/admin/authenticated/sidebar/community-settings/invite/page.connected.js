import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { asyncInvite } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import { isValidFromEmail } from '~client/utils/validation-helper'

import Page from './page'

const mapStateToProps = state => ({
  communityId: CommunitySelectors.getCurrentId(state)
})
const mapDispatchToProps = { asyncInvite }
const mergeProps = ({ communityId }, { asyncInvite }) => ({
  submit: values => asyncInvite(communityId, values)
})

const fields = ['email']

const validate = ({ email }) => {
  const errors = {}

  if (!email) {
    errors.email = 'Obrigatório'
  }
  return errors
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({ form: 'communityInviteForm', fields, validate })(Page)
)
