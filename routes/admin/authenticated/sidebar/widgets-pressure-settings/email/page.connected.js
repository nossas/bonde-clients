import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { addNotification as notify } from 'reapop'
import { messagePressureTargetsRemoveAll } from '~client/utils/notifications'

import Page from './page'

const mapStateToProps = (state, props) => ({
  initialValues: {
    ...props.widget.settings || {},
    targets: props.widget.settings && props.widget.settings.targets
  }
})

const mapDispatchToProps = (dispatch, props) => ({
  notifyAllTargetsRemoval: () => dispatch(notify(messagePressureTargetsRemoveAll(props.intl)))
})

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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'widgetsPressureSettingsEmailForm',
    fields: ['pressure_subject', 'pressure_body', 'targets', 'disable_edit_field'],
    validate
  })(Page)
))
