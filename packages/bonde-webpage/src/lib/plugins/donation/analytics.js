import AnalyticsBase from '../../analytics-base'

class Analytics extends AnalyticsBase {
  
  static DONATION_STARTED = {
    category: 'Doação',
    action: 'Escolheu Valor'
  }
  
  static DONATION_FINISHED = {
    category: 'Doação',
    action: 'Servidor Recebeu Dados'
  }

  donationSetValue () {
    return this.sendEvent(Analytics.DONATION_STARTED)
  }

  donationFinishRequest (value) {
    return this.sendEvent({ ...Analytics.DONATION_FINISHED, label: value })
  }
}

export default new Analytics()
