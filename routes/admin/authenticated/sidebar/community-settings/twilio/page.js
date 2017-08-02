import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { Info, Warning } from '~client/components/notify'

const CommunitySettingsTwilioPage = ({
  fields: {
    twilio_account_sid: twilioAccountSid,
    twilio_auth_token: twilioAuthToken,
    twilio_number: twilioNumber
  },
  location,
  intl,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <FormGroup controlId='twilioAccountSid' {...twilioAccountSid}>
      <ControlLabel>
        Twilio Account SID
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-mailchimp.form.api-key.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <br />
        <span>
          Faça login no <a href='https://www.twilio.com' target='_blank'>site do Twilio</a>
          {' >'} <b>Account Summary</b>
          {' >'} <b>ACCOUNT SID</b>
        </span>
      </HelpBlock>
      <FormControl
        type='text'
        placeholder='Ex: ACe4________6835_______2277_______'
      />
    </FormGroup>

    <FormGroup controlId='twilioAuthToken' {...twilioAuthToken}>
      <ControlLabel>
        Twilio Auth Token
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-mailchimp.form.api-key.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <br />
        <span>
          Faça login no <a href='https://www.twilio.com' target='_blank'>site do Twilio</a>
          {' >'} <b>Account Summary</b>
          {' >'} <b>AUTH TOKEN</b>
          {' >'} <b>Clicar no ícone do olho</b>
        </span>
      </HelpBlock>
      <FormControl
        type='text'
        placeholder='Ex: ecd5_______a82c_______b9c9______'
      />
    </FormGroup>

    <FormGroup controlId='twilioNumber' {...twilioNumber}>
      <ControlLabel>
        Twilio Number
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-mailchimp.form.api-key.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <br />
        <ol>
          <li>
            Faça login no <a href='https://www.twilio.com' target='_blank'>site do Twilio</a>
          </li>
          <li>
            Clique em <b>Phone Number</b> (símbolo de <b>#</b> no menu da esquerda)
          </li>
          <li>
            Escolha qual número Twilio quer usar
          </li>
        </ol>
        <span>
        </span>
      </HelpBlock>
      <FormControl type='text' placeholder='Ex: +5511956781234' />
    </FormGroup>
  </SettingsForm>
)

CommunitySettingsTwilioPage.propTypes = {
  fields: PropTypes.shape({
    mailchimp_api_key: PropTypes.object.isRequired,
    mailchimp_list_id: PropTypes.object.isRequired,
  }).isRequired,
  // redux-form required props
  submit: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default CommunitySettingsTwilioPage
