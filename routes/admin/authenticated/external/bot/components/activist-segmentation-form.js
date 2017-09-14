import React from 'react'
import { reduxForm } from 'redux-form'

import * as graphqlQueries from '~client/graphql/queries'
import * as validationHelper from '~client/utils/validation-helper'
import { client as graphqlClient } from '~client/store'
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
  changeParentState,
  ...formProps
}) => (
  <FlatForm
    {...formProps}
    hideButton
    style={{ paddingTop: '.5rem', width: 'calc(500px - 4rem)' }}
    submit={values => {
      const {
        message: m,
        quick_reply: qr,
        date_interval_start: start,
        date_interval_end: end
      } = values

      const isOnlyMessage         =  m && !qr && !start && !end
      const isOnlyQReply          = !m &&  qr && !start && !end
      const isOnlyDateInterval    = !m && !qr &&  start &&  end
      const isQReplyDateInterval  = !m &&  qr &&  start &&  end
      const isMessageQReply       =  m &&  qr && !start && !end
      const isMessageDateInterval =  m && !qr &&  start &&  end
      const isAll                 =  m &&  qr &&  start &&  end

      changeParentState({ loading: true })
      graphqlClient().query({
        query: graphqlQueries.fetchFacebookActivistsByDateInterval({ extraFields: ['data'] }),
        variables: {
          dateIntervalStart: '2017-09-11',
          dateIntervalEnd: '2017-09-13',
          first: 50
        }
      })
        .then(({ loading, data: { query: { activists, totalCount } } }) => {
          changeParentState({
            loading,
            listActivists: activists.length ? activists.map(a => JSON.parse(a.data)) : [],
            totalActivists: totalCount
          })
        })
        .catch(err => console.error(err))
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

      <FormGroup className='col col-6' controlId='dateIntervalEnd' {...dateIntervalEnd}>
        <ControlLabel>Data limite</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: DD/MM/AAAA'
        />
      </FormGroup>
    </div>

    {totalActivists > 0 && <Summary value={totalActivists} />}

    <Button disabled={!formProps.valid || !totalActivists}>
      Escrever mensagem
    </Button>
  </FlatForm>
)

export const form = 'facebookBotActivistSegmentationForm'
export const fields = ['message', 'quick_reply', 'date_interval_start', 'date_interval_end']
export const validate = values => {
  const errors = {}
  const {
    message,
    quick_reply: quickReply,
    date_interval_start: dateIntervalStart,
    date_interval_end: dateIntervalEnd
  } = values

  const regexDateFormat = /\d{2}\/\d{2}\/\d{2}/
  if (dateIntervalStart && dateIntervalEnd) {
    if (dateIntervalStart.match(regexDateFormat) && dateIntervalEnd.match(regexDateFormat)) {
      const toDateObject = dateString => {
        const [day, month, year] = dateString.split('/')
        return new Date(`${year}-${month}-${day}`)
      }
      const start = toDateObject(dateIntervalStart)
      const end = toDateObject(dateIntervalEnd)

      if (start > end) {
        errors.date_interval_start = 'Deve ser menor'
        errors.date_interval_end = 'Deve ser maior'
      }
    }
  }

  if (dateIntervalStart) {
    if (!dateIntervalStart.match(regexDateFormat)) {
      errors.date_interval_start = 'Ex: DD/MM/AAAA'
    }
    else {
      const [day, month, year] = dateIntervalStart.split('/')
      if (!validationHelper.isValidDate({ day, month, year })) {
        errors.date_interval_start = 'Data inválida'
      }
    }
  }

  if (dateIntervalEnd) {
    if (!dateIntervalEnd.match(regexDateFormat)) {
      errors.date_interval_end = 'Ex: DD/MM/AAAA'
    }
    else {
      const [day, month, year] = dateIntervalEnd.split('/')
      if (!validationHelper.isValidDate({ day, month, year })) {
        errors.date_interval_end = 'Data inválida'
      }
    }
  }

  if (!dateIntervalStart && dateIntervalEnd) errors.date_interval_start = 'Preencha'
  if (dateIntervalStart && !dateIntervalEnd) errors.date_interval_end = 'Preencha'

  if (!message && !quickReply && !dateIntervalStart && !dateIntervalEnd) {
    errors.message = 'Preencha'
    errors.quick_reply = 'Preencha'
    errors.date_interval_start = 'Preencha'
    errors.date_interval_end = 'Preencha'
  }

  return errors
}

export default reduxForm({ form, fields, validate })(ActivistSegmentationForm)
