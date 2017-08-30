import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import formatNumber from 'format-number'

import Page from './page'

const mapStateToProps = (state, props) => {
  const { goal } = props.widget

  const float = formatNumber({ integerSeparator: '', decimal: '.', padRight: 2 })
  return {
    initialValues: {
      goal: goal ? float(goal) : undefined,
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
  'title_text', 'button_text', 'goal', 'main_color', 'default_donation_value',
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

  if (values.goal && String(values.goal).replace(/\./g, '').match(/\D/g)) {
    errors.goal = 'Formato inválido. ' +
      'Utilize apenas números e ponto como separador decimal. ' +
      'Ex: 10000.50'
  }
  return errors
}

export default connect(mapStateToProps)(
  reduxForm({ form: 'widgetsDonationForm', fields, validate })(Page)
)
