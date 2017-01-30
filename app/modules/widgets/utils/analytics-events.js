import ReactGA from 'react-ga'

const FORM_FILLED = { category: 'Formulário', action: 'Preenchimento Iniciado' }
const FORM_SAVED = { category: 'Formulário', action: 'Dados Salvos com Sucesso' }
const FORM_SHARED = { category: 'Formulário', action: 'Social' }

const DONATION_STARTED = { category: 'Doação', action: 'Escolheu Valor' }
const DONATION_FINISHED = { category: 'Doação', action: 'Servidor Recebeu Dados' }
const DONATION_SHARED = { category: 'Doação', action: 'Social' }

const PRESSURE_FILLED = { category: 'Pressão', action: 'Preenchimento Iniciado' }
const PRESSURE_SAVED = { category: 'Pressão', action: 'Dados Salvos com Sucesso' }
const PRESSURE_SHARED = { category: 'Pressão', action: 'Social' }

class AnalyticsEvents {

  static sendEvent (event) {
    return ReactGA.event(event)
  }

  static formIsFilled () {
    return this.sendEvent(FORM_FILLED)
  }

  static formSavedData () {
    return this.sendEvent(FORM_SAVED)
  }

  static formSocialShare (source) {
    return this.sendEvent({...FORM_SHARED, label: source})
  }

  static donationSetValue () {
    return this.sendEvent(DONATION_STARTED)
  }

  static donationFinishRequest (value) {
    return this.sendEvent({...DONATION_FINISHED, label: value})
  }

  static donationSocialShare (source) {
    return this.sendEvent({...DONATION_SHARED, label: source})
  }

  static pressureIsFilled () {
    return this.sendEvent(PRESSURE_FILLED)
  }

  static pressureSavedData () {
    return this.sendEvent(PRESSURE_SAVED)
  }

  static pressureSocialShare (source) {
    return this.sendEvent({...PRESSURE_SHARED, label: source})
  }
}

export default AnalyticsEvents
