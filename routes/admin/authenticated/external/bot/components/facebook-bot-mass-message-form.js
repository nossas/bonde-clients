import React from 'react'
import { reduxForm } from 'redux-form'
import { FlatForm } from '~client/ux/components'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { Button } from '~client/ux/components'
import { Summary } from '.'

const FacebookBotMassMessageForm = ({ totalActivists, fields: { message }, ...formProps }) => (
  <FlatForm
    {...formProps}
    buttonText='Enviar mensagem'
    style={{ paddingTop: '.5rem' }}
    submit={values => {
      console.log('values', values)
    }}
  >
    <FormGroup className='mb2' controlId='message' {...message}>
      <ControlLabel>Mensagem</ControlLabel>
      <FormControl
        rows='10'
        componentClass='textarea'
        placeholder={
          'Digite aqui a mensagem que você deseja enviar para os usuários segmentados.\n\n' +
          'Exemplo: \nLorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
          'Quid enim de amicitia statueris utilitatis causa expetenda vides. ' +
          'Sed quanta sit alias, nunc tantum possitne esse tanta. Non igitur de improbo, ' +
          'sed de callido improbo quaerimus, qualis Q. Sin dicit obscurari quaedam nec ' +
          'apparere, quia valde parva sint, nos quoque concedimus; Duo Reges: constructio ' +
          'interrete. Quae autem natura suae primae institutionis oblita est?'
        }
        style={{ height: '158px' }}
      />
    </FormGroup>

    <Summary value={totalActivists} />
  </FlatForm>
)

export const form = 'facebookBotMassMessageForm'
export const fields = ['message']
export default reduxForm({ form, fields })(FacebookBotMassMessageForm)
