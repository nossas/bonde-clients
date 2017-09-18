import React from 'react'
import axios from 'axios'
import { reduxForm } from 'redux-form'
import { FlatForm } from '~client/ux/components'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { Button } from '~client/ux/components'
import { Summary } from '.'

var styles = require('exenv').canUseDOM ? require('./facebook-bot-mass-message-form.scss') : {}

const FacebookBotMassMessageForm = ({
  fields: {
    message,
    quick_reply_redirect: quickReplyRedirect,
    quick_reply_button_text: quickReplyButtonText
  },
  totalActivists,
  changeParentState,
  segmentation,
  ...formProps
}) => (
  <FlatForm
    {...formProps}
    buttonText='Enviar mensagem'
    style={{ paddingTop: '.5rem', position: 'relative' }}
    submit={values => {
      const url = `${process.env.BOT_URL}/enqueue-mass-messages`
      const payload = {
        ...segmentation,
        text: values.message,
        quickReplyRedirect: values.quick_reply_redirect,
        quickReplyButtonText: values.quick_reply_button_text
      }
      axios.post(url, payload)
    }}
  >
    <button
      type='button'
      title='Voltar'
      className={styles.backButton}
      onClick={e => {
        e.preventDefault()
        changeParentState({ searchFinished: false })
      }}
    >
      <i className='fa fa-chevron-left' />
    </button>
    <FormGroup className='mb2' controlId='message' {...message}>
      <ControlLabel>Mensagem</ControlLabel>
      <FormControl
        rows='10'
        componentClass='textarea'
        placeholder='Digite aqui a mensagem que você deseja enviar para os usuários segmentados.'
        style={{ height: 90 }}
      />
    </FormGroup>

    <div className='clearfix col-12 mb2'>
      <FormGroup className='col col-6' controlId='quickReplyRedirect' {...quickReplyRedirect}>
        <ControlLabel>Quick Reply</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: QUICK_REPLY_C'
        />
      </FormGroup>

      <FormGroup className='col col-6' controlId='quickReplyButtonText' {...quickReplyButtonText}>
        <ControlLabel>Texto do botão</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: #SemRodeios'
        />
      </FormGroup>
    </div>

    <Summary value={totalActivists} />
  </FlatForm>
)

export const form = 'facebookBotMassMessageForm'
export const fields = ['message', 'quick_reply_redirect', 'quick_reply_button_text']
export const validate = values => {
  const errors = {}
  const {
    message,
    quick_reply_redirect: quickReplyRedirect,
    quick_reply_button_text: quickReplyButtonText
  } = values

  if (!message) errors.message = 'Obrigatório'

  if (quickReplyRedirect && !quickReplyButtonText) {
    errors.quick_reply_button_text = 'Preencha'
  }
  if (!quickReplyRedirect && quickReplyButtonText) {
    errors.quick_reply_redirect = 'Preencha'
  }

  return errors
}
export default reduxForm({ form, fields, validate })(FacebookBotMassMessageForm)
