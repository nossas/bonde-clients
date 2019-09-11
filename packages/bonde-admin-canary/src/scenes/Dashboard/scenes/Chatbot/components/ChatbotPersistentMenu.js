import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import { Card, Flexbox2 as Flexbox, Input, Button } from 'bonde-styleguide'
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

const SuggestCampaignsInput = ({ campaigns, onChange }) => {
  const [suggestions, setSuggestions] = useState([])
  const [value, setValue] = useState('')

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  const escapeRegexCharacters = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const getSuggestions = (input) => {
    const escapedValue = escapeRegexCharacters(input.trim())

    if (escapedValue === '') return []

    const regex = new RegExp('^' + escapedValue, 'i')

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
  const onSuggestionSelected = (evt, { suggestion }) => {
    onChange(suggestion.id)
  }

  const inputProps = {
    placeholder: 'Busque pela mensagem',
    value,
    onChange: (evt, { newValue }) => {
      setValue(newValue)
    }
  }

  return (
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
  )
}

SuggestCampaignsInput.propTypes = {
  campaigns: PropTypes.array,
  onChange: PropTypes.func.isRequired
}

const MenuFieldArray = ({ campaigns, fields, meta: { error, submitFailed } }) => (
  <Flexbox vertical>
    {fields.map((menu, index) => (
      <Card key={`menu-field-${index}`} rounded={5} padding={{ x: 40, y: 40 }} margin={{ bottom: 20 }}>
        <Flexbox vertical>
          <Field
            type='text'
            name={`${menu}.title`}
            label='Título do menu'
            component={FormField}
            inputComponent={Input}
          />
          <Field
            type='text'
            name={`${menu}.payload`}
            label='Mensagem de destino'
            component={FormField}
            inputComponent={Input}
          />
          <Field
            name={`${menu}.payload`}
            component={FormField}
            inputComponent={SuggestCampaignsInput}
            campaigns={campaigns}
          />
        </Flexbox>
        <Button flat type='button' onClick={() => fields.remove(index)}>Remover menu</Button>
      </Card>
    ))}
    <Flexbox horizontal spacing='between'>
      <SubmitButton formId='ChatbotPersistentMenu'>Salvar</SubmitButton>
      <Button type='button' onClick={() => fields.push({})}>Adicionar menu</Button>
    </Flexbox>
  </Flexbox>
)

MenuFieldArray.propTypes = {
  campaigns: PropTypes.array,
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  meta: PropTypes.object
}

const ChatbotPersistentMenu = ({ chatbot }) => {
  const campaignsFilterPersistentMenu = chatbot.campaigns
    .filter(c => !!c.diagram)
    .map(campaign => {
      const { nodes } = JSON.parse(campaign.diagram)
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
      <ContentPageComponent>
        {() => (
          <FieldArray
            name='persistent_menu'
            component={MenuFieldArray}
            props={{ campaigns: campaignsFilterPersistentMenu }} />
        )}
      </ContentPageComponent>
    </MutationForm>
  )
}

ChatbotPersistentMenu.propTypes = {
  chatbot: PropTypes.object
}

export default ChatbotPersistentMenu
