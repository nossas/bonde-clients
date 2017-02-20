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
    mobilization: MobilizationSelectors.getCurrent(state),
    widget,
    initialValues: {
      default_donation_value: 1,
      main_color: '#54d0f6',
      recurring_period: 30,
      payment_type: 'unique',
      payment_methods: 'false',
      ...widget.settings || {}
    }
  }
}

const fields = [
  'title_text', 'button_text', 'main_color', 'default_donation_value',
  'donation_value1', 'donation_value2', 'donation_value3', 'donation_value4',
  'donation_value5', 'recurring_period', 'payment_type', 'payment_methods'
]

const validate = values => {
  const errors = {}
  if (!values.button_text) {
    errors.button_text = 'Insira o texto do botão'
  } else if (values.button_text.length > 50) {
    errors.button_text = 'O limite de caracteres foi atingido.'
  }
  return errors
}

export default provideHooks(redial)(
  connect(mapStateToProps, WidgetActions)(
    reduxForm({ form: 'widgetsDonationForm', fields, validate })(Page)
  )
)
