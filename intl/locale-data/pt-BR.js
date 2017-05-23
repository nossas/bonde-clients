export default {
  // page account login
  'page--account-login.label.email': 'E-mail',
  'page--account-login.label.password': 'Senha',
  'page--account-login.placeholder.email': 'exemplo@email.com',
  'page--account-login.loading': 'Carregando...',
  'page--account-login.signin': 'Entrar',
  'page--account-login.ask-register': 'Ainda não é cadastrado?',
  'page--account-login.cta-signup': 'Clique para criar uma conta.'

  // page account register
  'page--account-register.title': 'Crie sua conta no Bonde.',
  'page--account-register.form.name.label': 'Nome',
  'page--account-register.form.name.placeholder': 'Seu nome',
  'page--account-register.form.lastname.label': 'Sobrenome',
  'page--account-register.form.lastname.placeholder': 'Sobrenome',
  'page--account-register.form.email.label': 'E-mail',
  'page--account-register.form.email.placeholder': 'exemplo@email.com.br',
  'page--account-register.form.password.label': 'Senha',
  'page--account-register.form.password-confirm.label': 'Confirme sua senha',
  'page--account-register.form.submit-button.default': 'Criar conta',
  'page--account-register.form.submit-button.saving': 'Salvando...',

  // page account edit
  'page--account-edit.header.title': 'Minha conta',
  'page--account-edit.header.tabs.user': 'Usuário',
  'page--account-edit.form.name.label': 'Nome',
  'page--account-edit.form.lastname.label': 'Sobrenome',
  'page--account-edit.form.email.label': 'E-mail',
  'page--account-edit.form.submit-button.default': 'Salvar',
  'page--account-edit.form.submit-button.success-message': 'Dados editados com sucesso.',

  // page subscription edit
  'page--subscription-edit.title': 'Dados da Doação',
  'page--subscription-edit.helper-text': 'Selecione abaixo qual informação da sua doação quer alterar:',
  'page--subscription-edit.button.creditcard': 'Cartão de crédito',
  'page--subscription-edit.button.recurring': 'Data da doação',

  // form subscription credit card
  'form--subscription-creditcard.helper-text': 'Altere os dados do seu cartão de crédito preenchendo os campos abaixo. Sua doação continuará a mesma mas, a partir do momento em que salvar os dados abaixo, o valor será cobrado neste novo cartão ; )',
  'form--subscription-creditcard.previous-data.title': 'Dados do último cartão',
  'form--subscription-creditcard.previous-data.name': 'Nome',
  'form--subscription-creditcard.previous-data.expiration-date': 'Validade',
  'form--subscription-creditcard.form.number.label': 'Número',
  'form--subscription-creditcard.form.number.placeholder': 'Ex: 0000 0000 0000 0000',
  'form--subscription-creditcard.form.name.label': 'Nome',
  'form--subscription-creditcard.form.name.placeholder': '(igual ao que aparece no cartão)',
  'form--subscription-creditcard.form.expiration-date.label': 'Validade',
  'form--subscription-creditcard.form.expiration-date.placeholder': '00/00',
  'form--subscription-creditcard.form.cvv.label': 'CVV',
  'form--subscription-creditcard.form.cvv.placeholder': 'Ex: 000',
  'form--subscription-creditcard.form.submit-button.text': 'Salvar',
  'form--subscription-creditcard.form.validation.required': 'Obrigatório',

  // form subscription recurring
  'form--subscription-recurring.helper-text': 'Preencha os campos abaixo para alterar a data em que a cobrança da sua doação é efetuada. Sua doação continuará a mesma mas, a partir do momento em que salvar os dados abaixo, o valor será cobrado neste novo cartão ; )',
  'form--subscription-recurring.form.process-at.label': 'Nova data de cobrança',
  'form--subscription-recurring.form.process-at.placeholder': 'Ex: DD/MM/AAAA',
  'form--subscription-recurring.form.submit-button.text': 'Salvar',
  'form--subscription-recurring.form.validation.required': 'Obrigatório',
  'form--subscription-recurring.form.validation.invalid-date-format': 'Formato de data inválido',

  // notifications
  'notification--generic-request-error.title': 'Ops!',
  'notification--generic-request-error.message': 'Parece que teve algum problema técnico nessa última requisição. Pedimos que tente de novo daqui a pouco.',
  'notification--generic-save-success.title': 'Oba!',
  'notification--generic-save-success.message': 'A requisição foi feita com sucesso e, os seus dados estão salvos em segurança.',

  // page community list
  'page--community-list.title': 'Olá {userFirstName},',
  'page--community-list.subtitle': 'Escolha uma das suas comunidades',
  'page--community-list.new': 'Crie uma nova comunidade',

  // component community settings menu
  'community.components--settings-menu.title': 'Configurações da comunidade',
  'community.components--settings-menu.tabs.info': 'Informações',
  'community.components--settings-menu.tabs.mailchimp': 'Mailchimp',
  'community.components--settings-menu.tabs.recipient': 'Recebedor',
  'community.components--settings-menu.tabs.report': 'Relatório',
  'community.components--settings-menu.tabs.domains': 'Domínios',

  // component community domain preview
  'community.components--domain-preview.li.domain.header': 'Domínio da comunidade',

  // component community subdomain preview
  'community.components--subdomain-preview.li.subdomain.header': 'Subdomínio',
  'community.components--subdomain-preview.li.record-type.header': 'Tipo',
  'community.components--subdomain-preview.li.redirect-to.header': 'Redirecionar para',

  // page community domain
  'page--community-domain.section--dns-hosted-zone.title': 'Domínios da comunidade',
  'page--community-domain.section--dns-hosted-zone.add': 'Adicionar novo domínio',
  'page--community-domain.section--dns-hosted-zone.menu.subdomains': 'Subdomínios',
  'page--community-domain.section--dns-hosted-zone.menu.remove': 'Remover domínio',
  'page--community-domain.section--dns-hosted-zone.menu.remove.dialog.text': 'Tem certeza que deseja remover o domínio {domainName}?',
  'page--community-domain.section--dns-hosted-zone.menu.check-dns': 'Verificar DNS',
  'page--community-domain.section--dns-records.title': 'Subdomínios externos',
  'page--community-domain.section--dns-records.add': 'Adicionar novo subdomínio externo',
  'page--community-domain.section--dns-records.menu.remove': 'Remover subdomínio',
  'page--community-domain.section--dns-records.menu.remove.dialog.text': 'Tem certeza que deseja remover o subdomínio {subdomainName}?',

  // component dialog
  'ux.components--dialog.button.confirm.text': 'Confirmar',
  'ux.components--dialog.button.cancel.text': 'Cancelar',
}
