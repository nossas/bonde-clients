/**
 * AdjustmentsForm
 *
 *  Formulário padrão de ajustes
 *
 *  - call_to_action: título do formulário
 *  - button_text: nome do botão de ação
 *  - count_text: texto do contador
 *
 * AdjustamentsFormExtend
 *
 *  Função que recebe como parametro fields, lista de strings usada para
 *  extender os campos do AdjustmentsForm
 */
import { ModelForm } from '../models'

export const AdjustmentsFormExtend = (fields) => ModelForm({
  form: 'adjustmentsForm',
  fields: ['call_to_action', 'button_text', 'count_text', ...fields]
})

export const AdjustmentsForm = AdjustmentsFormExtend([])
