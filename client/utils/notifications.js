export const genericRequestError = () => ({
  title: 'Ops!',
  status: 'error',
  message:
    'Parece que teve algum problema técnico nessa última requisição. ' +
    'Pedimos que tente de novo daqui a pouco.',
  dismissAfter: 0,
  dismissible: true,
  closeButton: false
})

export const genericSaveSuccess = () => ({
  title: 'Oba!',
  status: 'success',
  message: 'A requisição foi feita com sucesso e, os seus dados estão salvos em segurança.',
  dismissAfter: 7000,
  dismissible: true,
  closeButton: false
})

export const slugUpdatedMessage = intl => ({
  title: intl.formatMessage({
    id: 'notification--slug-updated-message.title',
    defaultMessage: 'Importante'
  }),
  status: 'warning',
  message: intl.formatMessage({
  id: 'notification--slug-updated-message.message',
  defaultMessage: 'O slug da sua mobilização foi alterado. ' +
    'Se você faz algum redirecionamento de DNS via ' +
    'CNAME, não se esqueça de atualizá-lo.'
  }),
  dismissAfter: 0,
  dismissible: true,
  closeButton: false
})

export const messagePressureTargetsRemoveAll = intl => ({
  title: intl.formatMessage({
    id: 'notification--message-pressure-targets-remove-all.title',
    defaultMessage: 'Lembre-se...'
  }),
  status: 'info',
  message: intl.formatMessage({
    id: 'notification--message-pressure-targets-remove-all.message',
    defaultMessage:
      'Não se esqueça que é necessário clicar no botão salvar, no canto superior direito ' +
      'da tela pra que a ação se torne permanente. Se quiser reverter os alvos removidos, ' +
      'basta atualizar a página. (:'
  }),
  dismissAfter: 7000,
  dismissible: true,
  closeButton: false
})
