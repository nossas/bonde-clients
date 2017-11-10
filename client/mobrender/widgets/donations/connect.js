/**
 * donationForm
 *
 *  Formulário padrão de doação, extende formulário de ajuste
 */
import { adjustmentsFormExtend } from '../adjustments'
import * as formatNumberHelper from '~client/utils/format-number-helper'
import * as validationHelper from '~client/utils/validation-helper'

export const donationForm = adjustmentsFormExtend({
  fields: [
    'goal', 'goal_date_limit', 'main_color',
    'default_donation_value', 'donation_value1', 'donation_value2',
    'donation_value3', 'donation_value4', 'donation_value5',
    'recurring_period', 'payment_type', 'payment_methods'
  ],
  mapInitialValues: (widget) => ({
    goal: widget.goal ? formatNumberHelper.integer(widget.goal) : undefined,
    default_donation_value: 1,
    recurring_period: 30,
    payment_type: 'unique',
    payment_method: 'false',
    // Fix field to config title on widget
    call_to_action: widget.settings ? widget.settings.call_to_action || widget.settings.title_text : '',
    // TODO: add on ajustsForm
    main_color: '#54d0f6'
  }),
  validate: (values) => {
    const hasAlphanumerics = value => value && String(value).match(/\D/g)

    const errors = {}
    if (!values.button_text) {
      errors.button_text = 'Insira o texto do botão'
    } else if (values.button_text.length > 50) {
      errors.button_text = 'O limite de caracteres foi atingido.'
    }

    if (hasAlphanumerics(values.donation_value1)) errors.donation_value1 = 'Inválido.'
    if (hasAlphanumerics(values.donation_value2)) errors.donation_value2 = 'Inválido.'
    if (hasAlphanumerics(values.donation_value3)) errors.donation_value3 = 'Inválido.'
    if (hasAlphanumerics(values.donation_value4)) errors.donation_value4 = 'Inválido.'
    if (hasAlphanumerics(values.donation_value5)) errors.donation_value5 = 'Inválido.'

    if (hasAlphanumerics(values.goal)) errors.goal = 'Insira o valor desse jeito, ó: 1000'

    if (values.goal_date_limit) {
      if (!values.goal_date_limit.match(/\d{2}\/\d{2}\/\d{2}/)) {
        errors.goal_date_limit = 'Insira a data desse jeito, ó: DD/MM/AAAA'
      } else {
        const [day, month, year] = values.goal_date_limit.split('/')
        if (!validationHelper.isValidDate({ day, month, year })) {
          errors.goal_date_limit = 'Data inválida.'
        }
      }
    }
    return errors
  }
})
