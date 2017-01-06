import React from 'react'
import { reduxForm } from 'redux-form'
import MobilizationBasicsForm, { fields, validate } from '../../components/mobilization-basics-form'
import { asyncUpdate } from '../../action-creators'
import * as MobilizationSelectors from '../../selectors'


const MobilizationBasicsPage = props => (
  <MobilizationBasicsForm floatSubmit={true} {...props} />
)


const mapStateToProps = state => {
  const mobilization = MobilizationSelectors.getCurrent(state)
  return {
    initialValues: mobilization,
  }
}

const mapActionCreatorsToProps = { submit: asyncUpdate }

export default reduxForm({
  form: 'mobilizationBasicsForm',
  fields: [...fields, 'id'],
  validate
}, mapStateToProps, mapActionCreatorsToProps)(MobilizationBasicsPage)
