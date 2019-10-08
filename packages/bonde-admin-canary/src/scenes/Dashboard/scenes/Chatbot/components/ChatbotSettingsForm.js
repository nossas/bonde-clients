import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox2 as Flexbox,
  Input
} from 'bonde-styleguide'
import { graphqlApi as GraphQLAPI } from 'services/graphql'
import { Field, FormField, MutationForm, SubmitButton } from 'components/Forms'
import { required } from 'services/validations'
import {
  chatbotSettingsQuery,
  updateChatbotSettingsMutation,
  insertChatbotSettingsMutation
} from '../graphql'
import { ContentPageComponent } from 'scenes/Dashboard/components'

class ChatbotSettingsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { chatbotSettings: [], fetching: true }
  }

  componentDidMount () {
    const { chatbotId } = this.props
    GraphQLAPI.query({ query: chatbotSettingsQuery, variables: { chatbotId } })
      .then(({ data }) => {
        const { chatbot_settings: chatbotSettings } = data
        this.setState({ fetching: false, chatbotSettings })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[Chatbot] SettingsForm:', err)
        this.setState({ fetching: false })
      })
  }

  renderSubmitButton () {
    return (
      <SubmitButton formId='ChabotSettingsForm'>Salvar alterações</SubmitButton>
    )
  }

  render () {
    const { chatbotId } = this.props
    // TODO: chatbot funciona apenas com configurações do Facebook
    const mutationFormProps = {
      mutation: insertChatbotSettingsMutation,
      variables: { chatbotId, channel: 'facebook' },
      refetchQueries: [{ query: chatbotSettingsQuery, variables: { chatbotId } }],
      onSuccess: 'Pronto! Alterações salvas e publicadas no seu bot.'
    }

    if (this.state.chatbotSettings.length > 0) {
      const config = this.state.chatbotSettings.filter(c => c.channel === 'facebook')[0]
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
        <ContentPageComponent actions={this.renderSubmitButton.bind(this)}>
          {() => (
            <Card rounded={5} padding={{ x: 40, y: 40 }}>
              <Flexbox vertical>
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
          )}
        </ContentPageComponent>
      </MutationForm>
    )
  }
}

ChatbotSettingsForm.propTypes = {
  chatbotId: PropTypes.number.isRequired
}

export default ChatbotSettingsForm
