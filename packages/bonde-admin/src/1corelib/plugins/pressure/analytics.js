import AnalyticsBase from '../../analytics.base'

class Analytics extends AnalyticsBase {
  
  static PRESSURE_FILLED = {
    category: 'Pressão',
    action: 'Preenchimento Iniciado'
  }
  
  static PRESSURE_SAVED = {
    category: 'Pressão',
    action: 'Dados Salvos com Sucesso'
  }

  pressureIsFilled () {
    return this.sendEvent(Analytics.PRESSURE_FILLED)
  }

  pressureSavedData () {
    return this.sendEvent(Analytics.PRESSURE_SAVED)
  }
}

export default new Analytics()
