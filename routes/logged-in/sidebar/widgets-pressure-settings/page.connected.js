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
      show_counter: 'false',
      show_city: 'city-false',
      count_text: 'pressões feitas',
      main_color: '#f23392',
      ...widget.settings || {}
    }
  }
}

const fields = [
  'title_text', 'button_text', 'show_counter', 'show_city', 'count_text', 'main_color'
]

const validate = values => {
  const errors = {}
  if (!values.title_text || values.title_text === '') {
    errors.title_text = 'Insira um título para o formulário'
  }
  if (!values.button_text) {
    errors.button_text = 'Insira um texto para o botão'
  }
  return errors
}

export default provideHooks(redial)(
  connect(mapStateToProps, WidgetActions)(
    reduxForm({
      form: 'widgetsPressureSettingsForm',
      fields,
      validate
    })(Page)
  )
)
