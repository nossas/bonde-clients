import AnalyticsBase from '../../analytics-base'

class Analytics extends AnalyticsBase {
  
  static FORM_FILLED = {
    category: 'Formulário',
    action: 'Preenchimento Iniciado'
  }
  
  static FORM_SAVED = {
    category: 'Formulário',
    action: 'Dados Salvos com Sucesso'
  }

  formIsFilled () {
    return this.sendEvent(Analytics.FORM_FILLED)
  }

  formSavedData () {
    return this.sendEvent(Analytics.FORM_SAVED)
  }
}

export default new Analytics()
