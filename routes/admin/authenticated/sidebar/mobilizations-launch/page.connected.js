import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { fields, validate as abstractValidate } from '~client/mobilizations/components/form-domain'
import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobSelectors(state).hasCurrentMobilization() && promises.push(
      dispatch(MobActions.selectMobilization(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => {
  const mobilization = MobSelectors(state).getMobilization()
  return {
    initialValues: mobilization,
    mobilization
  }
}

const mapActionCreatorsToProps = {
  submit: MobActions.asyncUpdateMobilization
}

const validate = values => {
  const errors = abstractValidate(values)
  if (Object.keys(errors).length) return errors

  if (!values.custom_domain) {
    errors.custom_domain = 'Campo obrigatório'
  }
  return errors
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(
    reduxForm({ form: 'mobilizationLaunchForm', fields, validate })(Page)
  )
)
