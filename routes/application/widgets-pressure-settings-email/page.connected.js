import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'

import Page from './page'

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
    initialValues: {
      ...widget.settings || {},
      targets: widget.settings && widget.settings.targets
    }
  }
}

const validate = values => {
  const errors = {}
  if (!values.pressure_subject) {
    errors.pressure_subject = 'Preenchimento obrigatório'
  }
  if (!values.pressure_body) {
    errors.pressure_body = 'Preenchimento obrigatório'
  }
  return errors
}

export default provideHooks(redial)(
  connect(mapStateToProps, WidgetActions)(
    reduxForm({
      form: 'widgetsPressureSettingsEmailForm',
      fields: ['pressure_subject', 'pressure_body', 'targets'],
      validate
    })(Page)
  )
)
