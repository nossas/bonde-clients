import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, FormControl, ControlLabel } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { Box, Info } from '~client/components/notify'

const CommunitySettingsMailchimpPage = ({
  fields: {
    mailchimp_api_key: mailchimpApiKey,
    mailchimp_list_id: mailchimpListId,
    mailchimp_group_id: mailchimpGroupId
  },
  location,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <Box title='Informação'>
      A integração com o mailchimp é feita através da criação de segmentos de cada
      widget criada no BONDE. Adotamos o seguinte padrão no nome dos segmentos:
      M999P999, M999F999, M999D999
    </Box>

    <FormGroup controlId='apiKeyId' {...mailchimpApiKey}>
      <ControlLabel>Mailchimp API Key</ControlLabel>
      <Info title='Onde acho essa informação?'>
        <ol style={{ paddingLeft: '1rem', marginBottom: 5 }}>
          <li>
            No canto superior esquerdo, clique no seu nome de usuário.
            Em seguida um menu surgirá. Clique na opção <b>account</b>.
          </li>
          <li>
            Siga os passos: <b>Extras</b>{' > '}<b>API keys</b>{' > '}
            <b>Your API keys</b>{' > '}<b>Create a Key</b>
          </li>
          <li>
            Agora é só colar no campo abaixo o conteúdo de <b>API key</b>.
          </li>
        </ol>
      </Info>
      <FormControl
        type='text'
        placeholder='Insira aqui o conteúdo de "API key"'
      />
    </FormGroup>

    <FormGroup controlId='listId' {...mailchimpListId}>
      <ControlLabel>Mailchimp ID da lista</ControlLabel>
      <Info title='Onde acho essa informação?'>
        <ol style={{ paddingLeft: '1rem', marginBottom: 5 }}>
          <li>
            Siga os passos: <b>List</b> (no menu){' > '}
            (Selecione a lista de sua escolha){' > '}
            <b>Settings</b>{' > '}<b>Lists and Defaults</b>
          </li>
          <li>
            Agora é só colar no campo abaixo o conteúdo da coluna a direita,
            abaixo do título <b>LIST ID</b>
          </li>
        </ol>
      </Info>
      <FormControl
        type='text'
        placeholder='Insira aqui o "ID da lista"'
      />
    </FormGroup>

    <FormGroup controlId='groupId' {...mailchimpGroupId}>
      <ControlLabel>Mailchimp ID do grupo</ControlLabel>
      <FormControl type='text' />
    </FormGroup>
  </SettingsForm>
)

CommunitySettingsMailchimpPage.propTypes = {
  fields: PropTypes.shape({
    mailchimp_api_key: PropTypes.object.isRequired,
    mailchimp_list_id: PropTypes.object.isRequired,
    mailchimp_group_id: PropTypes.object.isRequired
  }).isRequired,
  // redux-form required props
  submit: PropTypes.func.isRequired
}

export default CommunitySettingsMailchimpPage
