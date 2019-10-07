import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import {
  Button,
  Card,
  Flexbox2 as Flexbox,
  Grid,
  Cell,
  Icon,
  Input,
  Text,
  Title
} from 'bonde-styleguide'
import { MutationForm, Field, FieldArray, FormField, SubmitButton } from 'components/Forms'
import { ContentPageComponent } from 'scenes/Dashboard/components'
import { updateChatbotMutation } from '../graphql'

import './chatbot-persistent-menu.css'

const Suggestion = (suggestion) => (
  <span>{suggestion.text}</span>
)

const SectionTitle = (campaign) => (
  <strong>{campaign.name}</strong>
)

const findMessageById = (campaigns, id) => {
  const filtered = campaigns
    .map(c => ({ ...c, messages: c.messages.filter(m => m.id === id) }))
    .filter(c => c.messages.length > 0)

  if (filtered.length > 0) return filtered[0].messages[0].text

  return ''
}

const SuggestCampaignsInput = ({ campaigns, minLength, value: inputValue, onChange }) => {
  const [suggestions, setSuggestions] = useState([])
  const [value, setValue] = useState(findMessageById(campaigns, inputValue))

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  const escapeRegexCharacters = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const getSuggestions = (input) => {
    const escapedValue = escapeRegexCharacters(input.trim())

    if (escapedValue === '' || escapedValue.length < minLength) return []

    const regex = new RegExp(escapedValue, 'i')
    return campaigns.map(campaign => ({
      ...campaign,
      messages: campaign.messages.filter(message => regex.test(message.text))
    })).filter(campaign => campaign.messages.length > 0)
  }

  const getSuggestionValue = (message) => {
    return message.text
  }
  const getSectionSuggestions = (campaign) => {
    return campaign.messages
  }
  const onSuggestionSelected = (evt, { suggestion, method }) => {
    if (method === 'enter') {
      evt.preventDefault()
    }
    onChange(suggestion.id)
    setValue(suggestion.text)
  }

  const inputProps = {
    placeholder: 'Busque pela mensagem',
    value,
    onChange: (evt, { newValue }) => {
      setValue(newValue)
    }
  }

  return (
    <Flexbox vertical>
      <Autosuggest
        multiSection
        suggestions={suggestions}
        onSuggestionsFetchRequested={(message) => setSuggestions(getSuggestions(message.value))}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={Suggestion}
        getSectionSuggestions={getSectionSuggestions}
        renderSectionTitle={SectionTitle}
        inputProps={inputProps}
      />
      <Text fontSize={12}>{inputValue}</Text>
    </Flexbox>
  )
}

SuggestCampaignsInput.propTypes = {
  value: PropTypes.string,
  campaigns: PropTypes.array,
  minLength: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

SuggestCampaignsInput.defaultProps = {
  minLength: 3
}

const MenuFieldArray = ({ campaigns, fields, meta: { error, submitFailed }, history }) => {
  const contentProps = {
    title: 'Voltar',
    // eslint-disable-next-line react/display-name
    backward: () => { history.goBack() },
    // eslint-disable-next-line react/display-name
    actions: () => (
      <div>
        <Button type='button' light onClick={() => fields.push({})} margin={{ right: '18px' }}>
          <Icon name='plus' /> Novo menu
        </Button>
        <SubmitButton formId='ChatbotPersistentMenu'>Salvar</SubmitButton>
      </div>
    )
  }
  return (
    <ContentPageComponent fixRender {...contentProps}>
      <Grid>
        {fields.map((menu, index) => (
          <Cell key={`menu-field-${index}`} size={[4, 6, 12]}>
            <Card rounded={5} padding={{ x: 40, y: 40 }} margin={{ bottom: 20 }}>
              <Flexbox horizontal spacing='between'>
                <Title.H3>{`Menu #${index}`}</Title.H3>
                <Button flat type='button' onClick={() => fields.remove(index)}>
                  <Icon name='trash' size={25} color='red' />
                </Button>
              </Flexbox>
              <Flexbox vertical>
                <Field
                  type='text'
                  name={`${menu}.title`}
                  label='Título do menu'
                  component={FormField}
                  inputComponent={Input}
                />
                <Field
                  name={`${menu}.payload`}
                  label='Mensagem de destino'
                  component={FormField}
                  inputComponent={SuggestCampaignsInput}
                  campaigns={campaigns}
                />
              </Flexbox>
            </Card>
          </Cell>
        ))}
      </Grid>
    </ContentPageComponent>
  )
}

MenuFieldArray.propTypes = {
  campaigns: PropTypes.array,
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  meta: PropTypes.object,
  history: PropTypes.object
}

const ChatbotPersistentMenu = ({ chatbot, history }) => {
  const campaignsFilterPersistentMenu = chatbot.campaigns
    .filter(c => !!c.diagram && c.status === 'active')
    .map(campaign => {
      const { layers } = campaign.diagram
      const nodes = Object.values(
        layers
          .filter(m => m.type === 'diagram-nodes')[0]
          .models
      )

      return {
        id: campaign.id,
        name: campaign.name,
        messages: nodes.map((n) => ({ id: n.id, text: n.text }))
      }
    })

  return (
    <MutationForm
      formId='ChatbotPersistentMenu'
      mutation={updateChatbotMutation}
      variables={{ id: chatbot.id }}
      values={{ persistent_menu: chatbot.persistent_menu }}
    >
      <FieldArray
        name='persistent_menu'
        component={MenuFieldArray}
        props={{ campaigns: campaignsFilterPersistentMenu, history }} />
    </MutationForm>
  )
}

ChatbotPersistentMenu.propTypes = {
  chatbot: PropTypes.object,
  history: PropTypes.object
}

export default ChatbotPersistentMenu
