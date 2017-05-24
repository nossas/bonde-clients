export default {
  // page account login
  // filepath: /routes/admin/not-authenticated/account-login/page.js
  'page--account-login.label.email': 'E-mail',
  'page--account-login.label.password': 'Senha',
  'page--account-login.placeholder.email': 'exemplo@email.com',
  'page--account-login.loading': 'Carregando...',
  'page--account-login.signin': 'Entrar',
  'page--account-login.ask-register': 'Ainda não é cadastrado?',
  'page--account-login.cta-signup': 'Clique para criar uma conta.',

  // page account register
  // filepath: /routes/admin/not-authenticated/account-register/page.js
  'page--account-register.title': 'Crie sua conta no Bonde.',
  'page--account-register.form.name.label': 'Nome',
  'page--account-register.form.name.placeholder': 'Seu nome',
  'page--account-register.form.name.validation.required': 'Informe seu nome',
  'page--account-register.form.lastname.label': 'Sobrenome',
  'page--account-register.form.lastname.placeholder': 'Sobrenome',
  'page--account-register.form.email.label': 'E-mail',
  'page--account-register.form.email.placeholder': 'exemplo@email.com.br',
  'page--account-register.form.email.validation.required': 'Informe seu e-mail',
  'page--account-register.form.email.validation.invalid-email-format': 'E-mail inválido',
  'page--account-register.form.password.label': 'Senha',
  'page--account-register.form.password.label.validation.required': 'Informe uma senha',
  'page--account-register.form.password.label.validation.min-length': 'Sua senha precisa ter um minímo de 8 caracteres.',
  'page--account-register.form.password-confirm.label': 'Confirme sua senha',
  'page--account-register.form.password-confirm.label.validation.match': 'Senha não confere',
  'page--account-register.form.submit-button.default': 'Criar conta',
  'page--account-register.form.submit-button.saving': 'Salvando...',

  // page account edit
  // filepath: /routes/admin/authenticated/sidebar/account-edit/page.js
  'page--account-edit.header.title': 'Minha conta',
  'page--account-edit.header.tabs.user': 'Usuário',
  'page--account-edit.form.name.label': 'Nome',
  'page--account-edit.form.lastname.label': 'Sobrenome',
  'page--account-edit.form.email.label': 'E-mail',
  'page--account-edit.form.submit-button.default': 'Salvar',
  'page--account-edit.form.submit-button.success-message': 'Dados editados com sucesso.',

  // page subscription edit
  // filepath: /routes/public/subscription-edit/page.js
  'page--subscription-edit.title': 'Dados da Doação',
  'page--subscription-edit.helper-text': 'Selecione abaixo qual informação da sua doação quer alterar:',
  'page--subscription-edit.button.creditcard': 'Cartão de crédito',
  'page--subscription-edit.button.recurring': 'Data da doação',

  // form subscription credit card
  // filepath: /client/subscriptions/forms/credit-card-form.js
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
  // filepath: /client/subscriptions/forms/recurring-form.js
  'form--subscription-recurring.helper-text': 'Preencha os campos abaixo para alterar a data em que a cobrança da sua doação é efetuada. Sua doação continuará a mesma mas, a partir do momento em que salvar os dados abaixo, o valor será cobrado neste novo cartão ; )',
  'form--subscription-recurring.form.process-at.label': 'Nova data de cobrança',
  'form--subscription-recurring.form.process-at.placeholder': 'Ex: DD/MM/AAAA',
  'form--subscription-recurring.form.submit-button.text': 'Salvar',
  'form--subscription-recurring.form.validation.required': 'Obrigatório',
  'form--subscription-recurring.form.validation.invalid-date-format': 'Formato de data inválido',

  // notifications
  // filepath: /client/utils/notifications.js
  'notification--generic-request-error.title': 'Ops!',
  'notification--generic-request-error.message': 'Parece que teve algum problema técnico nessa última requisição. Pedimos que tente de novo daqui a pouco.',
  'notification--generic-save-success.title': 'Oba!',
  'notification--generic-save-success.message': 'A requisição foi feita com sucesso e, os seus dados estão salvos em segurança.',

  // page community list
  // filepath: /routes/admin/authenticated/external/community-list/page.js
  'page--community-list.title': 'Olá {userFirstName},',
  'page--community-list.subtitle': 'Escolha uma das suas comunidades',
  'page--community-list.new': 'Crie uma nova comunidade',

  // component community settings menu
  // filepath: /client/community/components/settings-menu.js
  'community.components--settings-menu.title': 'Configurações da comunidade',
  'community.components--settings-menu.tabs.info': 'Informações',
  'community.components--settings-menu.tabs.mailchimp': 'Mailchimp',
  'community.components--settings-menu.tabs.recipient': 'Recebedor',
  'community.components--settings-menu.tabs.report': 'Relatório',
  'community.components--settings-menu.tabs.domains': 'Domínios',

  // component community domain preview
  // filepath: /client/community/components/dns/dns-preview/domain-preview.js
  'community.components--domain-preview.li.domain.header': 'Domínio da comunidade',

  // component community subdomain preview
  // filepath: /client/community/components/dns/dns-preview/subdomain-preview.js
  'community.components--subdomain-preview.li.subdomain.header': 'Subdomínio',
  'community.components--subdomain-preview.li.record-type.header': 'Tipo',
  'community.components--subdomain-preview.li.redirect-to.header': 'Redirecionar para',

  // component community subdomain form
  // filepath: /client/community/components/dns/subdomain-form/index.js
  'community.components--subdomain-form.subdomain.label': 'Subdomínio',
  'community.components--subdomain-form.record-type.label': 'Tipo',
  'community.components--subdomain-form.redirect-to.label': 'Redirecionar para',
  'community.components--subdomain-form.button.text': 'Adicionar',

  // page community domain
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain/page.js
  'page--community-domain.form.validation.required': 'Preenchimento obrigatório',

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
  // filepath: /client/ux/components/dialog/index.js
  'ux.components--dialog.button.confirm.text': 'Confirmar',
  'ux.components--dialog.button.cancel.text': 'Cancelar',

  // page community domain create
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain-create/page.js
  'page--community-domain-create.title': 'Domínio da comunidade',

  'page--community-domain-create.step-add.title': 'Insira o domínio desejado',
  'page--community-domain-create.step-add.form.domain-name.label': 'Domínio da sua comunidade',
  'page--community-domain-create.step-add.form.domain-name.placeholder': 'Ex. minhacomunidade.org',
  'page--community-domain-create.step-add.form.domain-name.validation.required': 'Domínio é obrigatório.',
  'page--community-domain-create.step-add.form.domain-name.validation.invalid-domain-format': 'Domínio inválido',
  'page--community-domain-create.step-add.form.button.text': 'Adicionar',

  'page--community-domain-create.step-dns-servers.title': 'Altere os servidores do seu provedor DNS',
  'page--community-domain-create.step-dns-servers.first-paragraph': '1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)',
  'page--community-domain-create.step-dns-servers.second-paragraph': '2. Encontre a página de {dnsManager}, e altere os {serversName} para os servidores do Bonde:',
  'page--community-domain-create.step-dns-servers.second-paragraph.dns-manager': 'gerenciador de DNS',
  'page--community-domain-create.step-dns-servers.second-paragraph.servers-name': 'nomes de servidor',
  'page--community-domain-create.step-dns-servers.button.text': 'Continuar',

  'page--community-domain-create.step-check.title': 'Teste a conexão',
  'page--community-domain-create.step-check.first-paragraph': 'Clique no botão abaixo para verificar se tudo está certo.',
  'page--community-domain-create.step-check.second-paragraph': 'Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.',
  'page--community-domain-create.step-check.button.text': 'Testar',

  // page community info
  // filepath: /routes/admin/authenticated/sidebar/community-settings/info/page.js
  'page--community-info.form.name.label': 'Nome',
  'page--community-info.form.name.validation.required': 'Informe o nome da comunidade',
  'page--community-info.form.description.label': 'Descrição',
  'page--community-info.form.city.label': 'Cidade',
  'page--community-info.form.city.validation.required': 'Informe em qual cidade sua comunidade atua',
  'page--community-info.form.custom-from-email.label': 'E-mail de resposta para notificações',
  'page--community-info.form.custom-from-email.helper-text': 'Você deve preencher seguindo o formato padrão: Nome do contato <contato@provedor.com>',
  'page--community-info.form.custom-from-email.validation.invalid-email-format': 'E-mail de resposta fora do formato padrão',

  // component settings form
  // filepath: /client/ux/components/settings-form/index.js
  'ux.components--settings-form.button.text': 'Salvar',
  'ux.components--settings-form.success-message': 'Dados editados com sucesso',

  // page community mailchimp
  // filepath: /routes/admin/authenticated/sidebar/community-settings/mailchimp/page.js
  'page--community-mailchimp.form.api-key.label': 'Mailchimp API Key',
  'page--community-mailchimp.form.list-id.label': 'Mailchimp ID da lista',
  'page--community-mailchimp.form.group-id.label': 'Mailchimp ID do grupo',

  // page community new
  // filepath: /routes/admin/authenticated/external/community-new/page.js
  'page--community-new.title': 'Crie uma comunidade',
  'page--community-new.subtitle': 'Comunidades do Bonde são grupos de ação que trabalham juntos por uma causa.',

  'page--community-new.form.name.label': 'Nome da comunidade',
  'page--community-new.form.name.placeholder': 'Exemplo: Movimento 90º São Paulo',
  'page--community-new.form.city.label': 'Cidade da comunidade',
  'page--community-new.form.city.placeholder': 'Exemplo: São Paulo',
  'page--community-new.form.submit-button.text.default': 'Criar comunidade',
  'page--community-new.form.submit-button.text.saving': 'Salvando...',

  // page community new (connected)
  // filepath: /routes/admin/authenticated/external/community-new/page.connected.js
  'page--community-new.form.name.validation.required': 'Informe o nome da comunidade',
  'page--community-new.form.city.validation.required': 'Informe em qual cidade sua comunidade atua',

  // page community recipient
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.js
  'page--community-recipient.form.transfer-interval.label': 'Intervalo',
  'page--community-recipient.form.transfer-interval.value.weekly': 'Semanalmente',
  'page--community-recipient.form.transfer-interval.value.monthly': 'Mensalmente',
  'page--community-recipient.form.transfer-day.label': 'Dia de transferência',

  'page--community-recipient.section--account.header': 'Conta bancária',
  'page--community-recipient.form.bank-code.label': 'Banco',
  'page--community-recipient.form.bank-code.value.default': 'Selecione o banco',
  'page--community-recipient.form.bank-account-type.label': 'Tipo de conta',
  'page--community-recipient.form.bank-account-type.value.checking-account': 'Corrente',
  'page--community-recipient.form.bank-account-type.value.savings-account': 'Poupança',
  'page--community-recipient.form.bank-agency.label': 'Agência',
  'page--community-recipient.form.bank-agency-dv.label': 'Dígito',
  'page--community-recipient.form.bank-account.label': 'Conta',
  'page--community-recipient.form.bank-account-dv.label': 'Dígito',
  'page--community-recipient.form.bank-legal-name.label': 'Nome / Razão Social',
  'page--community-recipient.form.bank-document-number.label': 'CPF / CNPJ',

  // page community recipient (connected)
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.connected.js
  'page--community-recipient.form.validation.required': 'Campo obrigatório',
  'page--community-recipient.form.bank-agency.validation.max-length': 'Deve conter no máximo 5 digitos',
  'page--community-recipient.form.bank-agency-dv.validation.length': 'Deve conter apenas 1 digito',
  'page--community-recipient.form.bank-account.validation.max-length': 'Deve conter no máximo 13 digitos',
  'page--community-recipient.form.bank-account-dv.validation.max-length': 'Deve conter no máximo 2 caracteres',
  'page--community-recipient.form.bank-document-number.validation.cnpj-length': 'CNPJ deve conter 14 digitos',
  'page--community-recipient.form.bank-document-number.validation.cpf-length': 'CPF deve conter 11 digitos',
  'page--community-recipient.form.bank-document-number.validation.invalid-cpf-format': 'CPF inválido',
  'page--community-recipient.form.bank-document-number.validation.invalid-cnpj-format': 'CNPJ inválido',

  // page community report
  // filepath: /routes/admin/authenticated/sidebar/community-settings/report/page.js
  'page--community-report.section-button.donation.title': 'RELATÓRIO DE DOAÇÕES',
  'page--community-report.section-button.donation.helper-text': 'Clique no botão abaixo para baixar o relatório de doações da comunidade.',
  'page--community-report.section-button.donation.text': 'Baixar',

  'page--community-report.section-button.actions.title': 'RELATÓRIO DE AÇÕES',
  'page--community-report.section-button.actions.helper-text': 'Clique no botão abaixo para baixar o relatório de ações feitas na comunidade.',
  'page--community-report.section-button.actions.text': 'Baixar',

  'page--community-report.section-button.activists.title': 'RELATÓRIO DE ATIVISTAS',
  'page--community-report.section-button.activists.helper-text': 'Clique no botão abaixo para baixar o relatório dos ativistas da comunidade.',
  'page--community-report.section-button.activists.text': 'Baixar',

  // component sidebar
  // filepath: /client/components/navigation/sidebar/sidebar.js
  'components.navigation--sidebar.community-settings.item.mobilizations': 'Minhas Mobilizações',
  'components.navigation--sidebar.community-settings.item.info': 'Informações',
  'components.navigation--sidebar.community-settings.item.mailchimp': 'Mailchimp',
  'components.navigation--sidebar.community-settings.item.recipient': 'Recebedor',
  'components.navigation--sidebar.community-settings.item.report': 'Relatório',
  'components.navigation--sidebar.community-settings.item.domains': 'Domínios',

  'components.navigation--sidebar.mobilization-settings.item.launch': 'PUBLICAR BONDE',
  'components.navigation--sidebar.mobilization-settings.item.launched': 'BONDE público',
  'components.navigation--sidebar.mobilization-settings.item.edit': 'Editar mobilização',
  'components.navigation--sidebar.mobilization-settings.item.add-block': 'Adicionar conteúdo',
  'components.navigation--sidebar.mobilization-settings.item.open-at-new-tab': 'Ver em uma nova aba',
  'components.navigation--sidebar.mobilization-settings.item.config': 'Configurações',

  'components.navigation--sidebar.footer.account': 'Minha Conta',
  'components.navigation--sidebar.footer.sign-out': 'Sair',

  // component sidenav
  // filepath: /client/components/navigation/sidenav/sidenav.js
  'components.navigation--sidenav.config': 'Configurações',
  'components.navigation--sidenav.change-community': 'Trocar',

  // page mobilizations list
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-list/page.js
  'page--mobilizations-list.page-header.title': 'Suas Mobilizações',
  'page--mobilizations-list.more-menu-action.open': 'Abrir página',
  'page--mobilizations-list.more-menu-action.create-template': 'Criar template',

  // component mobilizations page header
  // filepath: /client/mobilizations/components/page-header.js
  'mobilizations.components--page-header.button.text': 'Nova mobilização',
  'mobilizations.components--tabs.actives': 'Ativas',
  'mobilizations.components--tabs.templates': 'Templates',

  // component mobilizations list item: name
  // filepath: /client/mobilizations/components/list/items/name/index.js
  'mobilizations.components--list.items.name.header.text': 'Nome',

  // component mobilizations list item: created at
  // filepath: /client/mobilizations/components/list/items/created-at.js
  'mobilizations.components--list.items.created-at.header.text': 'Criada em',

  // component mobilizations list item: users
  // filepath: /client/mobilizations/components/list/items/users.js
  'mobilizations.components--list.items.users.header.text': 'Usuários',

  // component mobilizations list item: fund raising
  // filepath: /client/mobilizations/components/list/items/fund-raising.js
  'mobilizations.components--list.items.fund-raising.header.text': 'Arrecadações',
  'mobilizations.components--list.items.fund-raising.currency': 'R$',

  // component mobilizations page tab layout
  // filepath: /client/mobilizations/components/page-tab-layout.js
  'mobilizations.components--page-tab-layout.title': 'Nova mobilização',
  'mobilizations.components--tabs.goal': 'Objetivo',
  'mobilizations.components--tabs.templates': 'Templates',

  // page mobilizations new
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-new/page.js
  'page--mobilizations-new.title': 'Qual o objetivo da sua mobilização?',
  'page--mobilizations-new.footer': 'Fique tranquil@ vc poderá editar depois se achar necessário.',

  // component mobilizations mobilization basics form
  // filepath: /client/mobilizations/components/mobilization-basics-form.js
  'mobilizations.components--basics-form.name.label': 'Nome',
  'mobilizations.components--basics-form.name.placeholder': 'Ex: Pela criação de uma delegacia de desaparecidos',
  'mobilizations.components--basics-form.name.validation.required': 'Insira o nome da mobilização',
  'mobilizations.components--basics-form.name.validation.max-length': 'Seu título está muito longo!',
  'mobilizations.components--basics-form.goal.label': 'Objetivo',
  'mobilizations.components--basics-form.goal.placeholder': 'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.',
  'mobilizations.components--basics-form.goal.validation.required': 'Insira o objetivo da mobilização',
  'mobilizations.components--basics-form.goal.validation.max-length': 'O limite de caracteres foi atingido.',

  // component control buttons
  // filepath: /client/components/forms/control-buttons.js
  'components--control-buttons.input.value.default': 'Continuar',
  'components--control-buttons.input.value.saving': 'Salvando...',

  // page mobilizations templates choose
  // filepath: /routes/admin/authenticated/sidebar/templates-choose/page.js
  'page--mobilizations.templates-choose.title': 'Como você deseja começar?',
  'page--mobilizations.templates-choose.browsable-list-item.blank': 'Criar mobilização do zero',
  'page--mobilizations.templates-choose.browsable-list-item.templates-custom': 'Meus templates',
  'page--mobilizations.templates-choose.browsable-list-item.templates-global': 'Templates globais',

  // component mobilizations templates selectable list
  // filepath: /client/mobilizations/templates/components/template-selectable-list.js
  'templates.components--selectable-list.filterable-search-bar.placeholder': 'Busque um template',
  'templates.components--selectable-list.empty-list-text': 'Não existe nenhum template com esse nome',
  'templates.components--selectable-list.button.back': 'Voltar',
  'templates.components--selectable-list.button.next': 'Continuar',

  // page mobilizations templates choose custom
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-custom/page.js
  'page--mobilizations.templates-choose-custom.title': 'Meus Templates',

  // page mobilizations templates choose global
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-global/page.js
  'page--mobilizations.templates-choose-global.title': 'Templates Globais',

  // component mobilizations settings menu
  // filepath: /client/mobilizations/components/settings-menu.js
  'mobilizations.components--settings-menu.title': 'Configure sua mobilização',
  'mobilizations.components--settings-menu.tabs.info': 'Informações básicas',
  'mobilizations.components--settings-menu.tabs.sharing': 'Compartilhamento',
  'mobilizations.components--settings-menu.tabs.domain': 'Domínio',

  // page mobilizations settings analytics
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.js
  'page--mobilizations-analytics.first-paragraph': 'Para acompanhar os resultados da sua mobilização, você precisa configurar uma conta no Google Analytics.',
  'page--mobilizations-analytics.second-paragraph': 'Siga os passos abaixo:',
  'page--mobilizations-analytics.ol.create-analytics-account': ' Crie uma conta no Google Analytics {link}',
  'page--mobilizations-analytics.ol.create-analytics-account.link': 'clicando aqui',
  'page--mobilizations-analytics.ol.keep-up-with': 'Obtenha sua ID de acompanhamento no Google Analytics. É um código que começa sempre com as letras UA, que você verá após criar sua conta lá.',
  'page--mobilizations-analytics.ol.paste-ga-code': 'Copie a ID de acompanhamento e cole no campo abaixo:',
  'page--mobilizations-analytics.ol.form.ga-code.label': 'ID do Google Analytics',
  'page--mobilizations-analytics.ol.done': 'Pronto! Você já pode acompanhar as estatísticas da sua mobilização no Google Analytics!',

  // page mobilizations settings analytics (connected)
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.connected.js
  'page--mobilizations-analytics.ol.form.ga-code.validation.invalid.ga-code.format': 'Informe uma ID válida',

  // page block create
  // filepath: /routes/admin/authenticated/sidebar/blocks-create/page.js
  'page--block-create.title': 'Adicione um bloco de conteúdo',
  'page--block-create.tabs.blank-blocks': 'Blocos em branco',
  'page--block-create.helper-text': 'Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento',
  'page--block-create.type.label': 'Tipo de bloco',
  'page--block-create.background.label': 'Fundo',
  'page--block-create.background.image.placeholder.text': 'Selecione a imagem de fundo',
  'page--block-create.button-add.text': 'Adicionar',

  // page mobilizations domain
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-domain/page.js
  'page--mobilizations-domain.form-domain.success-message': 'Dados de domínio salvos com sucesso',

  // component mobilizations form domain
  // filepath: /client/mobilizations/components/form-domain.js
  'mobilizations.components--form-domain.basic.header-toggle.use-existing-domain': 'Quero usar o domínio principal da minha comunidade',
  'mobilizations.components--form-domain.basic.header-toggle.create-domain': 'Quero cadastrar um domínio principal na minha comunidade',
  'mobilizations.components--form-domain.basic.helper-text': 'Preencha abaixo o subdomínio e escolha o domínio que deseja configurar como endereço da sua mobilização',
  'mobilizations.components--form-domain.basic.form.subdomain.label': 'Subdomínio',
  'mobilizations.components--form-domain.basic.form.subdomain.placeholder': 'nomedamob',
  'mobilizations.components--form-domain.basic.form.domain.label': 'Domínio Principal',
  'mobilizations.components--form-domain.basic.create-domain.helper-text': 'Ops, você ainda não tem um domínio configurado na sua comunidade. Se quiser cadastar, {link}. Senão você pode, abaixo, usar um domínio externo para configurar o endereço da sua mobilização.',
  'mobilizations.components--form-domain.basic.create-domain.helper-text.link': 'clique aqui',

  'mobilizations.components--form-domain.advanced.header-toggle': 'Quero usar um domínio externo',
  'mobilizations.components--form-domain.advanced.helper-text': 'Se você quer usar um domínio que comprou mas não está cadastrado na sua comunidade aqui, pode fazer isso. Por exemplo, se você já comprou www.meudominio.com.br você pode usá-lo para este BONDE. Demais, né? Preencha o campo abaixo e siga as orientações:',
  'mobilizations.components--form-domain.advanced.form.external-domain.label': 'Domínio personalizado',
  'mobilizations.components--form-domain.advanced.form.external-domain.placeholder': 'meudominio.com.br',

  'mobilizations.components--form-domain.cname-table.helper-text': '{strong}: você vai precisar configurar este domínio no seu servidor de registro para que o endereço seja redirecionado à página da sua mobilização. Pra isso, você vai precisar dessas informações aqui embaixo, anote aí:',
  'mobilizations.components--form-domain.cname-table.helper-text.strong': 'Não esqueça',
  'mobilizations.components--form-domain.cname-table.header.name': 'Nome',
  'mobilizations.components--form-domain.cname-table.header.record-type': 'Tipo',
  'mobilizations.components--form-domain.cname-table.header.data': 'Dados',
  'mobilizations.components--form-domain.cname-table.footer.helper-text': 'Se tiver alguma dúvida, dá uma olhada no tópico "Configurando seu domínio no BONDE", no nosso tutorial, o {link}.',

  // component mobrender mobilization
  // filepath: /client/mobrender/components/mobilization.js
  'mobrender.components--mobilization.footer.slogan': 'Feito pra causar. Feito com',

  // component mobrender block config menu
  // filepath: /client/mobrender/components/block-config-menu.js
  'mobrender.components--block-config-menu.item.change-background': 'Alterar fundo',
  'mobrender.components--block-config-menu.item.toggle-visibility.show': 'Mostrar',
  'mobrender.components--block-config-menu.item.toggle-visibility.hide': 'Esconder',
  'mobrender.components--block-config-menu.item.remove': 'Remover',
  'mobrender.components--block-config-menu.item.remove.confirm': 'Você tem certeza que quer remover este bloco?',
  'mobrender.components--block-config-menu.item.move-up': 'Mover para cima',
  'mobrender.components--block-config-menu.item.move-down': 'Mover para baixo',

  // component mobrender block change background
  // filepath: /client/mobrender/components/block-change-background.js
  'mobrender.components--block-change-background.button.save': 'Salvar',
  'mobrender.components--block-change-background.button.cancel': 'Cancelar',

  // component navigation navbar edition wrapper
  // filepath: /client/components/navigation/navbar/navbar-edition-wrapper.js
  'components.navigation--navbar-edition-wrapper.block': 'Bloco',
}
