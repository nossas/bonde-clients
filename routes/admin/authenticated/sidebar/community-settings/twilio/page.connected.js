import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import * as graphqlMutations from '~client/graphql/mutations'
import * as graphqlQueries from '~client/graphql/queries'
import * as CommunityActions from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import { isValidPhoneE164 } from '~client/utils/validation-helper'

import Page from './page'

const mapStateToProps = state =>  ({
  community: CommunitySelectors.getCurrent(state),
  forceFinishSubmit: CommunitySelectors.isForcedSubmit(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  submit: values => {
    const { community, addTwilioConfiguration, isConfigPreexists } = props

    !isConfigPreexists && addTwilioConfiguration({
      variables: {
        communityId: community.id,
        twilioAccountSid: values.twilio_account_sid,
        twilioAuthToken: values.twilio_auth_token,
        twilioNumber: values.twilio_number
      }
    })
      .then(res => { dispatch(CommunityActions.setForcedSubmit(true)) })
      .catch(err => console.error('err', err))

    isConfigPreexists && console.info('update the community\'s twilio config')
    return { type: 'graphql/mutations/ADD_TWILIO_CONFIGURATION' }
  }
})

const validate = values => {
  const errors = {}
  const messageRequired = 'Preechimento obrigatório'

  if (values.twilio_account_sid || values.twilio_auth_token || values.twilio_number) {
    if (!values.twilio_account_sid) errors.twilio_account_sid = messageRequired
    if (!values.twilio_auth_token) errors.twilio_auth_token = messageRequired
    if (!values.twilio_number) errors.twilio_number = messageRequired
  }

  if (values.twilio_number && !isValidPhoneE164(values.twilio_number)) {
    errors.twilio_number = 'Formato de telefone inválido. Ex: +5511956781234'
  }

  return errors
}

export default connect(mapStateToProps)(
  compose(
    graphql(graphqlMutations.addTwilioConfiguration, { name: 'addTwilioConfiguration' }),
    graphql(graphqlQueries.fetchTwilioConfiguration, {
      options: ({ community }) => ({
        fetchPolicy: 'network-only',
        variables: { communityId: community.id },
      }),
      props: ({ ownProps, data: { configs, loading } }) => {
        const [config] = (configs && configs.list) || []
        const isConfigPreexists = !!config
        const initialValues = !config ? {} : {
          twilio_account_sid: config.twilioAccountSid,
          twilio_auth_token: config.twilioAuthToken,
          twilio_number: config.twilioNumber
        }
        return { ...ownProps, loading, initialValues, isConfigPreexists }
      }
    })
  )(
    injectIntl(reduxForm({
      form: 'communityTwilioForm',
      fields: ['twilio_account_sid', 'twilio_auth_token', 'twilio_number'],
      validate
    }, undefined, mapDispatchToProps)(Page))
  )
)
