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
