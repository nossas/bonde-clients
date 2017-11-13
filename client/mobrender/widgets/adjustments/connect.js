/**
 * adjustmentsForm
 *
 *  Formulário padrão de ajustes
 *
 *  - call_to_action: título do formulário
 *  - button_text: nome do botão de ação
 *  - count_text: texto do contador
 *
 * adjustamentsFormExtend
 *
 *  Função que recebe como parametro fields, lista de strings usada para
 *  extender os campos do AdjustmentsForm
 */
import { ModelForm } from '../models'

const adjustFields = (fields) => {
  let adjusts = ['call_to_action', 'button_text', 'count_text', 'main_color']
  adjusts.push.apply(adjusts, fields || [])
  return adjusts
}

const validate = (values) => {
  const errors = {}
  if (!values.button_text) {
    errors.button_text = 'Insira o texto do botão'
  } else if (values.button_text.length > 50) {
    errors.button_text = 'O limite de caracteres foi atingido.'
  }
  return errors
}

export const adjustmentsFormExtend = ({ fields, ...config }) => ModelForm({
  form: 'adjustmentsForm',
  fields: adjustFields(fields),
  ...config
})

export const adjustmentsForm = adjustmentsFormExtend({
  mapInitialValues: (widget) => ({
    // Fix field to config title on widget
    call_to_action: widget.settings
      ? widget.settings.call_to_action ||
      widget.settings.title_text : ''
  }),
  validate
})
