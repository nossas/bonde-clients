import ReactGA from 'react-ga'

class AnalyticsEvents {
  constructor () {
    this.FORM_FILLED = { category: 'Formulário', action: 'Preenchimento Iniciado' }
    this.FORM_SAVED = { category: 'Formulário', action: 'Dados Salvos com Sucesso' }

    this.DONATION_STARTED = { category: 'Doação', action: 'Escolheu Valor' }
    this.DONATION_FINISHED = { category: 'Doação', action: 'Servidor Recebeu Dados' }

    this.PRESSURE_FILLED = { category: 'Pressão', action: 'Preenchimento Iniciado' }
    this.PRESSURE_SAVED = { category: 'Pressão', action: 'Dados Salvos com Sucesso' }

    this.SOCIAL_SHARED = { category: 'Redes Sociais', action: 'Compartilhou no ' }
  }
  static sendEvent (event) {
    return ReactGA.event(event)
  }

  static formIsFilled () {
    return this.sendEvent(this.FORM_FILLED)
  }

  static formSavedData () {
    return this.sendEvent(this.FORM_SAVED)
  }

  static donationSetValue () {
    return this.sendEvent(this.DONATION_STARTED)
  }

  static donationFinishRequest (value) {
    return this.sendEvent({...this.DONATION_FINISHED, label: value})
  }

  static pressureIsFilled () {
    return this.sendEvent(this.PRESSURE_FILLED)
  }

  static pressureSavedData () {
    return this.sendEvent(this.PRESSURE_SAVED)
  }

  static socialShared (source, text) {
    let evt = { ...this.SOCIAL_SHARED }
    evt.action = evt.action + source
    evt.label = text
    return this.sendEvent(evt)
  }
}

export default AnalyticsEvents
