import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox2 as Flexbox,
  Input,
  Text,
  Title,
  Spacing
} from 'bonde-styleguide'
import { useQuery } from 'bonde-core-tools'
import { Field, FormField, MutationForm, SubmitButton } from 'components/Forms'
import { required } from 'services/validations'
import {
  chatbotSettingsQuery,
  updateChatbotSettingsMutation,
  insertChatbotSettingsMutation
} from '../graphql'

const ChatbotStatus = ({ chatbot }) => {
  const endpoint = new URL(`/v2/${chatbot.id}`, process.env.REACT_APP_DOMAIN_BOT)

  return (
    <Text>Configure seu webhook no Facebook para a URL: {endpoint.href}</Text>
  )
}

ChatbotStatus.propTypes = {
  chatbot: PropTypes.object
}

const FetchChatbotSettings = ({ children, chatbotId }) => {
  const { data, error, loading } = useQuery(chatbotSettingsQuery, { variables: { chatbotId } })

  if (loading) return 'Carregando configurações...'
  if (error) return `Fetch fail: ${error}`

  return children({ chatbotSettings: data.chatbot_settings })
}

const RenderSubmitButton = () => (
  <SubmitButton formId='ChabotSettingsForm'>Salvar alterações</SubmitButton>
)

const ChatbotSettingsForm = ({ chatbotId }) => (
  <FetchChatbotSettings chatbotId={chatbotId}>
    {({ chatbotSettings }) => {
      const mutationFormProps = {
        mutation: insertChatbotSettingsMutation,
        variables: { chatbotId, channel: 'facebook' },
        refetchQueries: [{ query: chatbotSettingsQuery, variables: { chatbotId } }],
        onSuccess: 'Pronto! Alterações salvas e publicadas no seu bot.'
      }

      if (chatbotSettings.length > 0) {
        const config = chatbotSettings.filter(c => c.channel === 'facebook')[0]
        // throw exception when facebook config not exists
        if (config === undefined) throw new Error('Bonde implement only facebook webhooks')

        mutationFormProps.mutation = updateChatbotSettingsMutation
        mutationFormProps.variables = { id: config.id }

        // fill form with default values
        mutationFormProps.values = { settings: config.settings }
      } else {
        mutationFormProps.updateQuery = (readQuery, writeQuery, data) => {
          const { insert_chatbot_settings: { returning } } = data
          const { chatbot_settings: settings } = readQuery()
          settings.push(returning[0])
          writeQuery({ chatbot_settings: settings })
        }
      }

      return (
        <MutationForm formId='ChabotSettingsForm' {...mutationFormProps}>
          <Spacing margin={{ bottom: 30 }}>
            <Flexbox horizontal middle spacing='between'>
              <ChatbotStatus chatbot={{ id: chatbotId }} />
              <RenderSubmitButton />
            </Flexbox>
          </Spacing>
          <Flexbox vertical>
            <Card rounded={5} padding={{ x: 40, y: 40 }} margin={{ bottom: 10 }}>
              <Flexbox vertical>
                <Spacing margin={{ bottom: 15 }}>
                  <Title.H3>Webhook (Facebook)</Title.H3>
                </Spacing>
                <Field
                  type='text'
                  name='settings.messenger_app_secret'
                  label='Chave de acesso ao Facebook app'
                  placeholder='Informe sua chave de acesso ao Facebook app'
                  component={FormField}
                  inputComponent={Input}
                  validate={[required('Chave de acesso deve ser preenchido')]}
                />
                <Field
                  name='settings.messenger_validation_token'
                  label='Token para validação'
                  placeholder='Informe seu token para validação'
                  component={FormField}
                  inputComponent={Input}
                  validate={[required('Token para validação deve ser preenchido')]}
                />
                <Field
                  name='settings.messenger_page_access_token'
                  label='Chave de acesso ao Facebook page'
                  placeholder='Informe sua chave de acesso ao Facebook page'
                  component={FormField}
                  inputComponent={Input}
                  validate={[required('Chave de acesso ao Facebook page deve ser preenchido')]}
                />
              </Flexbox>
            </Card>
            <Flexbox horizontal>
              <div style={{ width: '100%' }}>
                <Card rounded={5} padding={{ x: 40, y: 40 }} margin={{ right: 10 }}>
                  <Spacing margin={{ bottom: 15 }}>
                    <Title.H3>Inteligência Artificial (Wit)</Title.H3>
                  </Spacing>
                  {/* Should be transform settings outside facebook */}
                  <Field
                    name='settings.wit_server_access_token'
                    label='Chave de acesso a WIT (Inteligência artificial)'
                    placeholder='Informe sua chave de acesso ao WIT (Inteligência artificial)'
                    component={FormField}
                    inputComponent={Input}
                  />
                </Card>
              </div>
              <div style={{ width: '100%' }}>
                <Card rounded={5} padding={{ x: 40, y: 40 }}>
                  <Spacing margin={{ bottom: 15 }}>
                    <Title.H3>Padrão de mensagem</Title.H3>
                  </Spacing>
                  {/* Should be transform settings outside facebook */}
                  <Field
                    name='settings.default_error_message'
                    label='Mensagem de erro'
                    placeholder='Informe uma resposta padrão para erros ocorridos no BOT'
                    component={FormField}
                    inputComponent={Input}
                  />
                </Card>
              </div>
            </Flexbox>
          </Flexbox>
        </MutationForm>
      )
    }}
  </FetchChatbotSettings>
)

ChatbotSettingsForm.propTypes = {
  chatbotId: PropTypes.number.isRequired
}

export default ChatbotSettingsForm
