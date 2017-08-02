import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import * as graphqlQueries from '~client/graphql/queries'
import * as CommunitySelectors from '~client/community/selectors'
import { isValidPhoneE164 } from '~client/utils/validation-helper'

import Page from './page'

const mapStateToProps = state => ({
  community: CommunitySelectors.getCurrent(state)
})

const mapDispatchToProps = (dispatch, { client: graphqlClient }) => ({
  submit: values => {
    console.info('create or update with graphql mutations')
    return { type: 'graphql/mutations/ADD_TWILIO_CONFIGURATION' }
  }
})

const validate = values => {
  const errors = {}

  if (values.twilio_number && !isValidPhoneE164(values.twilio_number)) {
    errors.twilio_number = 'Formato de telefone inválido. Ex: +5511956781234'
  }

  return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(graphqlQueries.fetchTwilioConfiguration, {
    options: ({ community }) => ({
      fetchPolicy: 'network-only',
      variables: { communityId: community.id },
    }),
    props: ({ ownProps, data: { configs, loading } }) => {
      const [config] = (configs && configs.list) || []
      const initialValues = !config ? {} : {
        twilio_account_sid: config.twilioAccountSid,
        twilio_auth_token: config.twilioAuthToken,
        twilio_number: config.twilioNumber,
      }
      return { ...ownProps, loading, initialValues }
    }
  })(
    injectIntl(reduxForm({
      form: 'communityTwilioForm',
      fields: ['twilio_account_sid', 'twilio_auth_token', 'twilio_number'],
      validate
    })(Page))
  )
)
