//
// @route /mobilizations/:mobilization_id/templates/create
//
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import * as TemplateActions from "../../../../../mobilizations/templates/action-creators"
import MobSelectors from "../../../../../mobrender/redux/selectors"
import Page from './page'

const mapStateToProperties = (state: any) => {
  const mobilization = MobSelectors(state).getMobilization()
  return {
    mobilization,
    initialValues: {
      mobilization_id: mobilization.id,
      global: false
    }
  }
}

const mapActionCreatorsToProperties = {
  submit: TemplateActions.asyncCreateTemplate
}

export default connect(mapStateToProperties, mapActionCreatorsToProperties)(
  injectIntl(
    reduxForm({
      form: 'templateCreateForm',
      validate: (values: any, { intl }: any) => {
        const errors: any = {}
        const requiredMessage = intl.formatMessage({
          id: 'page--templates-create.form.validation.required',
          defaultMessage: 'Preenchimento obrigatório'
        })

        if (!values.name) errors.name = requiredMessage
        if (!values.goal) errors.goal = requiredMessage
        return errors
      },
      fields: ['name', 'goal', 'mobilization_id', 'global']
    } as any)(Page as any)
  )
)
