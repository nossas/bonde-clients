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

export const adjustmentsFormExtend = (fields) => ModelForm({
  form: 'adjustmentsForm',
  fields: ['call_to_action', 'button_text', 'count_text', ...fields]
})

export const adjustmentsForm = adjustmentsFormExtend([])
