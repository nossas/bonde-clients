import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { notify } from '~client/utils/notifications'
import { asyncEdit, resyncMailchimp } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'

import Page from './page'

const mapStateToProps = state => ({
  initialValues: { ...CommunitySelectors.getCurrent(state) }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: (values) => dispatch(asyncEdit(values)),
  resyncMailchimp: () => {
    // dispatch notifications
    dispatch(resyncMailchimp())
      .then(({ sync_requested_at }) => {
        notify({
          status: 'success',
          message: {
            id: 'routes.admin.authenticated.sidebar.community-settings.mailchimp.resync.message',
            defaultMessage: 'Sincronia com Mailchimp solicitada com sucesso.'
          }
        }, dispatch, ownProps)
      })
      .catch((err) => {
        notify({
          status: 'error',
          title: 'Oops!',
          message: {
            id: 'routes.admin.authenticated.sidebar.community-settings.mailchimp.resync.message',
            defaultMessage: 'Houve um problema ao tentar sincronizar com mailchimp: {error}',
            context: {
              error: err.message || err
            }
          }
        }, dispatch, ownProps)
      })
  }
})

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: 'mailchimpForm',
      fields: ['id', 'mailchimp_api_key', 'mailchimp_list_id']
    })(Page)
  )
)
