import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import * as CommunityActions from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'

import Page from './page'

const mapStateToProps = state => ({
  initialValues: { ...CommunitySelectors.getCurrent(state) }
})

const mapDispatchToProps = {
  submit: values => console.info('create or update with graphql mutations')
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(reduxForm({
    form: 'communityTwilioForm',
    fields: ['twilio_account_sid', 'twilio_auth_token', 'twilio_number']
  })(Page))
)
