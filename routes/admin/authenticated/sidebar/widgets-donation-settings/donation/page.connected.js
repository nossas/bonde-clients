import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import * as formatNumberHelper from '~client/utils/format-number-helper'
import * as validationHelper from '~client/utils/validation-helper'
import Page from './page'

const mapStateToProps = (state, props) => {
  const { goal } = props.widget

  return {
    initialValues: {
      goal: goal ? formatNumberHelper.integer(goal) : undefined,
      default_donation_value: 1,
      main_color: '#54d0f6',
      recurring_period: 30,
      payment_type: 'unique',
      payment_methods: 'false',
      ...props.widget.settings || {}
    }
  }
}

const fields = [
  'title_text', 'button_text', 'goal', 'goal_date_limit', 'main_color', 'default_donation_value',
  'donation_value1', 'donation_value2', 'donation_value3', 'donation_value4',
  'donation_value5', 'recurring_period', 'payment_type', 'payment_methods'
]

const validate = (values, { intl }) => {
  const hasAlphanumerics = value => value && String(value).match(/\D/g)
  const messageInvalid = intl.formatMessage({
    id: 'page--donation-widget.form.validation.invalid',
    defaultMessage: 'Inválido.'
  })

  const errors = {}
  if (!values.button_text) {
    errors.button_text = intl.formatMessage({
      id: 'page--donation-widget.form.validation.button-text.required',
      defaultMessage: 'Insira o texto do botão'
    })
  } else if (values.button_text.length > 50) {
    errors.button_text = intl.formatMessage({
      id: 'page--donation-widget.form.validation.button-text.max-length',
      defaultMessage: 'O limite de caracteres foi atingido.'
    })
  }

  if (hasAlphanumerics(values.donation_value1)) errors.donation_value1 = messageInvalid
  if (hasAlphanumerics(values.donation_value2)) errors.donation_value2 = messageInvalid
  if (hasAlphanumerics(values.donation_value3)) errors.donation_value3 = messageInvalid
  if (hasAlphanumerics(values.donation_value4)) errors.donation_value4 = messageInvalid
  if (hasAlphanumerics(values.donation_value5)) errors.donation_value5 = messageInvalid

  if (hasAlphanumerics(values.goal)) {
    errors.goal = intl.formatMessage({
      id: 'page--donation-widget.form.validation.goal.format',
      defaultMessage: 'Insira o valor desse jeito, ó: 1000'
    })
  }

  if (values.goal_date_limit) {
    if (!values.goal_date_limit.match(/\d{2}\/\d{2}\/\d{2}/)) {
      errors.goal_date_limit = intl.formatMessage({
        id: 'page--donation-widget.form.validation.goal-date-limit.format',
        defaultMessage: 'Insira a data desse jeito, ó: DD/MM/AAAA'
      })
    } else {
      const [day, month, year] = values.goal_date_limit.split('/')
      if (!validationHelper.isValidDate({ day, month, year })) {
        errors.goal_date_limit = intl.formatMessage({
          id: 'page--donation-widget.form.validation.goal-date-limit.invalid-date',
          defaultMessage: 'Data inválida.'
        })
      }
    }
  }
  return errors
}

export default connect(mapStateToProps)(
  injectIntl(reduxForm({ form: 'widgetsDonationForm', fields, validate })(Page))
)
