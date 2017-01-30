import ReactGA from 'react-ga'

const FORM_FILLED = { category: 'Formulário', action: 'Preenchimento Iniciado' }
const FORM_SAVED = { category: 'Formulário', action: 'Dados Salvos com Sucesso' }
const FORM_SHARED = { category: 'Formulário', action: 'Social' }

const DONATION_STARTED = { category: 'Doação', action: '' }
const DONATION_FINISHED = { category: 'Doação', action: '' }
const DONATION_SHARED = { category: 'Doação', action: '' }

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

export default {
  formIsFilled,
  formSavedData,
  formSocialShare,
  donationSetValue,
  donationFinishRequest,
  donationSocialShare
}
