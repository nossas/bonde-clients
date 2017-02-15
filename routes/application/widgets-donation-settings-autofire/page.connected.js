import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'
import { fields, validate } from '~mobilizations/widgets/components/form-autofire'

import WidgetsDonationSettingsAutofirePage from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobilizationSelectors.hasCurrent(state) && promises.push(
      dispatch(MobilizationActions.select(params.mobilization_id))
    )
    !WidgetSelectors.isLoaded(state) && promises.push(
      dispatch(WidgetActions.asyncWidgetFetch(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => {
  const widget = WidgetSelectors.getWidget(state, props)
  return {
    widget,
    mobilization: MobilizationSelectors.getCurrent(state),
    initialValues: widget.settings || {}
  }
}

export default provideHooks(redial)(
  connect(mapStateToProps, WidgetActions)(
    reduxForm({
      form: 'donationAutofireForm',
      fields,
      validate
    })(WidgetsDonationSettingsAutofirePage)
  )
)
