import React from 'react'
import { reduxForm } from 'redux-form'
import { FlatForm } from '~client/ux/components'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { Button } from '~client/ux/components'
import { Summary } from '.'

const ActivistSegmentationForm = ({
  fields: {
    message,
    quick_reply: quickReply,
    date_interval_start: dateIntervalStart,
    date_interval_end: dateIntervalEnd
  },
  totalActivists,
  ...formProps
}) => (
  <FlatForm
    {...formProps}
    hideButton
    buttonText='Buscar'
    style={{ paddingTop: '.5rem' }}
    submit={values => {
      console.log('values', values)
    }}
  >
    <FormGroup className='mb2' controlId='message' {...message}>
      <ControlLabel>Mensagem</ControlLabel>
      <FormControl
        type='text'
        placeholder='Digite aqui a mensagem que o usuário enviou'
      />
    </FormGroup>

    <FormGroup className='mb2' controlId='quickReply' {...quickReply}>
      <ControlLabel>Quick Reply</ControlLabel>
      <FormControl
        type='text'
        placeholder='Ex: QUICK_REPLY_A'
      />
    </FormGroup>

    <div className='clearfix col-12' style={{ marginBottom: '1.5rem' }}>
      <FormGroup className='col col-6' controlId='dateIntervalStart' {...dateIntervalStart}>
        <ControlLabel>Data de início</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: DD/MM/AAAA'
        />
      </FormGroup>

      <FormGroup className='col col-4 ml3' controlId='dateIntervalEnd' {...dateIntervalEnd}>
        <ControlLabel>Data limite</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: DD/MM/AAAA'
        />
      </FormGroup>
    </div>

    <Summary value={totalActivists} />

    <Button>Escrever mensagem</Button>
  </FlatForm>
)

export const form = 'facebookBotActivistSegmentationForm'
export const fields = ['message', 'quick_reply', 'date_interval_start', 'date_interval_end']
export default reduxForm({ form, fields })(ActivistSegmentationForm)
