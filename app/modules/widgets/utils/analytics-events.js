import ReactGA from 'react-ga'

const formIsFilled = () => {
  ReactGA.event({
    category: 'Formulário',
    action: 'Preenchimento Iniciado'
  })
}

const formSavedData = () => {
  ReactGA.event({
    category: 'Formulário',
    action: 'Dados Salvos com Sucesso'
  })
}

const formSocialShare = (source) => {
  ReactGA.event({
    category: 'Formulário',
    action: 'Social',
    label: source
  })
}

export default { formIsFilled, formSavedData, formSocialShare }
