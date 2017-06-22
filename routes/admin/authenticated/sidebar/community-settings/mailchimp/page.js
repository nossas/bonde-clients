import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import { FormGroup, FormControl, ControlLabel } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { Info, Warning } from '~client/components/notify'

const CommunitySettingsMailchimpPage = ({
  fields: {
    mailchimp_api_key: mailchimpApiKey,
    mailchimp_list_id: mailchimpListId,
    mailchimp_group_id: mailchimpGroupId
  },
  location,
  intl,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <Warning
      title={
        <FormattedMessage
          id='page--community-mailchimp.warning.title'
          defaultMessage='Atenção'
        />
      }
    >
      <FormattedMessage
        id='page--community-mailchimp.warning.content.first-line'
        defaultMessage={
          'Configure a integração com o mailchimp para que seja possível a criação ' +
          'de segmentos dos usuários que interagiram com o sua mobilização nele.'
        }
      />
      <br />
      <FormattedMessage
        id='page--community-mailchimp.warning.content.second-line'
        defaultMessage={
          'Adotamos o seguinte padrão no nome dos segmentos: ' +
          'M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)'
        }
      />
    </Warning>

    <FormGroup controlId='apiKeyId' {...mailchimpApiKey}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-mailchimp.form.api-key.label'
          defaultMessage='Mailchimp API Key'
        />
      </ControlLabel>
      <Info
        title={
          <FormattedMessage
            id='page--community-mailchimp.form.api-key.helper-text.title'
            defaultMessage='Onde acho essa informação?'
          />
        }
      >
        <ol style={{ paddingLeft: '1rem', marginBottom: 5 }}>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.api-key.helper-text.step-01'
              defaultMessage={
                'No canto superior esquerdo, clique no seu nome de usuário. ' +
                'Em seguida um menu surgirá. Clique na opção {accountStrong}.'
              }
              values={{ accountStrong: <b>account</b> }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.api-key.helper-text.step-02'
              defaultMessage={
                'Siga os passos: {extrasStrong} > {apiKeysStrong} > ' +
                '{yourApiKeysStrong} > {createKeyStrong}'
              }
              values={{
                extrasStrong: <b>Extras</b>,
                apiKeysStrong: <b>API keys</b>,
                yourApiKeysStrong: <b>Your API keys</b>,
                createKeyStrong: <b>Create a Key</b>
              }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.api-key.helper-text.step-03'
              defaultMessage='Agora é só colar no campo abaixo o conteúdo de {apiKeyStrong}.'
              values={{ apiKeyStrong: <b>API key</b> }}
            />
          </li>
        </ol>
      </Info>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-mailchimp.form.api-key.placeholder',
          defaultMessage: 'Insira aqui o conteúdo de "API key"'
        })}
      />
    </FormGroup>

    <FormGroup controlId='listId' {...mailchimpListId}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-mailchimp.form.list-id.label'
          defaultMessage='Mailchimp ID da lista'
        />
      </ControlLabel>
      <Info
        title={
          <FormattedMessage
            id='page--community-mailchimp.form.api-key.helper-text.title'
            defaultMessage='Onde acho essa informação?'
          />
        }
      >
        <ol style={{ paddingLeft: '1rem', marginBottom: 5 }}>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.list-id.helper-text.step-01'
              defaultMessage={
                'Siga os passos: {listStrong} (no menu) > ' +
                '(Selecione a lista de sua escolha) > ' +
                '{settingsStrong} > {listAndDefaultsStrong}'
              }
              values={{
                listStrong: <b>List</b>,
                settingsStrong: <b>Settings</b>,
                listAndDefaultsStrong: <b>Lists and Defaults</b>
              }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-mailchimp.form.list-id.helper-text.step-02'
              defaultMessage={
                'Agora é só colar no campo abaixo o conteúdo da coluna a direita, ' +
                'abaixo do título {listIdStrong}'
              }
              values={{
                listIdStrong: <b>LIST ID</b>
              }}
            />
          </li>
        </ol>
      </Info>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-mailchimp.form.list-id.placeholder',
          defaultMessage: 'Insira aqui o "ID da lista"'
        })}
      />
    </FormGroup>

    <FormGroup controlId='groupId' {...mailchimpGroupId}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-mailchimp.form.group-id.label'
          defaultMessage='Mailchimp ID do grupo'
        />
      </ControlLabel>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'page--community-mailchimp.form.group-id.placeholder',
          defaultMessage: 'Insira aqui o "ID do grupo"'
        })}
      />
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
  submit: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default CommunitySettingsMailchimpPage
