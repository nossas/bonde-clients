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

export const adjustmentsFormExtend = ({ fields, ...config }) => ModelForm({
  form: 'adjustmentsForm',
  fields: adjustFields(fields),
  ...config
})

export const adjustmentsForm = adjustmentsFormExtend({})
