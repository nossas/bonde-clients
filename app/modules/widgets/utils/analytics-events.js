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

const sendEvent = (event) => {
  ReactGA.event(event)
}

const formIsFilled = () => { sendEvent(FORM_FILLED) }
const formSavedData = () => { sendEvent(FORM_SAVED) }
const formSocialShare = (source) => {
  sendEvent({...FORM_SHARED, label: source})
}

const donationSetValue = () => { sendEvent(DONATION_STARTED) }
const donationFinishRequest = (value) => {
  sendEvent({...DONATION_FINISHED, label: value})
}

const donationSocialShare = (source) => {
  sendEvent({...DONATION_SHARED, label: source})
}

const pressureIsFilled = () => { sendEvent(PRESSURE_FILLED) }
const pressureSavedData = () => { sendEvent(PRESSURE_SAVED) }
const pressureSocialShare = (source) => {
  sendEvent({...PRESSURE_SHARED, label: source})
}

export default {
  formIsFilled,
  formSavedData,
  formSocialShare,
  donationSetValue,
  donationFinishRequest,
  donationSocialShare,
  pressureIsFilled,
  pressureSavedData,
  pressureSocialShare
}
