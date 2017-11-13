import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'

import Page from './page'

const mapStateToProps = (state, { widget, intl }) => {
  return {
    initialValues: {
      show_counter: 'false',
      show_city: 'city-false',
      count_text: intl.formatMessage({
        id: 'page--pressure-widget.form.counter-text.placeholder',
        defaultMessage: 'pressões feitas'
      }),
      main_color: '#f23392',
      ...widget.settings || {}
    }
  }
}

const fields = [
  'title_text', 'button_text', 'show_counter', 'show_city', 'count_text', 'main_color'
]

const validate = (values, { intl }) => {
  const errors = {}
  if (!values.title_text || values.title_text === '') {
    errors.title_text = intl.formatMessage({
      id: 'page--pressure-widget.form.validation.title-text.required',
      defaultMessage: 'Insira um título para o formulário'
    })
  }
  if (!values.button_text) {
    errors.button_text = intl.formatMessage({
      id: 'page--pressure-widget.form.validation.button-text.required',
      defaultMessage: 'Insira um texto para o botão'
    })
  }
  return errors
}

export default injectIntl(connect(mapStateToProps)(
  reduxForm({
    form: 'widgetsPressureSettingsForm',
    fields,
    validate
  })(Page)
))
