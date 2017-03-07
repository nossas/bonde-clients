import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import MobSelectors from '~client/mobrender/redux/selectors'
import { selectMobilization, asyncFetchWidgets, asyncUpdateWidget } from '~client/mobrender/redux/action-creators'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const promises = []
    const selectors = MobSelectors(getState())

    !selectors.getMobilization() && promises.push(
      dispatch(selectMobilization(params.mobilization_id))
    )
    !selectors.widgetsIsLoaded() && promises.push(
      dispatch(asyncFetchWidgets(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const fields = ['call_to_action', 'button_text', 'count_text']

const mapStateToProps = (state, props) => {
  const { params: { widget_id } } = props
  const selectors = MobSelectors(state, props)
  const widget = selectors.getWidget(widget_id)
  return {
    mobilization: selectors.getMobilization(),
    widget,
    initialValues: widget.settings || {}
  }
}

const mapActionsToProps = { asyncWidgetUpdate: asyncUpdateWidget }

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionsToProps)(
    reduxForm({ form: 'widgetsFormSettingsPageForm', fields })(Page)
  )
)
