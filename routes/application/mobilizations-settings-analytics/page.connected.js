import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { isValidCodeGA } from '~utils/validation-helper'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import MobilizationAnalyticsPage from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobilizationSelectors.hasCurrent(state) && promises.push(
      dispatch(MobilizationActions.select(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const fields = ['id', 'google_analytics_code']

const validate = values => {
  const errors = {}
  if (values.google_analytics_code && !isValidCodeGA(values.google_analytics_code)) {
    errors.google_analytics_code = 'Informe uma ID válida'
  }
  return errors
}

const mapStateToProps = state => {
  const mobilization = MobilizationSelectors.getCurrent(state)
  return {
    initialValues: mobilization,
    mobilization
  }
}

const mapActionCreatorsToProps = {
  submit: MobilizationActions.asyncUpdate
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    reduxForm({
      form: 'mobilizationAnalyticsForm',
      fields,
      validate
    })(MobilizationAnalyticsPage)
  )
)
