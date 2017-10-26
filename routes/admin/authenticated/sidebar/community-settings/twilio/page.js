import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'

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
        <FormattedMessage
          id='page--community-twilio.form.twilio-account-sid.label'
          defaultMessage='Twilio Account SID'
        />
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-twilio.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <br />
        <span>
          <FormattedMessage
            id='page--community-twilio.helper-text.twilio-login'
            defaultMessage='Faça login no {link}'
            values={{
              link: (
                <a href='https://www.twilio.com' target='_blank'>
                  <FormattedMessage
                    id='page--community-twilio.helper-text.twilio-login.link'
                    defaultMessage='site do Twilio'
                  />
                </a>
              )
            }}
          />
          {' > '}<b>Account Summary</b>
          {' > '}<b>ACCOUNT SID</b>
        </span>
      </HelpBlock>
      <FormControl
        type='text'
        tabIndex={1}
        placeholder='Ex: ACe4________6835_______2277_______'
      />
    </FormGroup>

    <FormGroup controlId='twilioAuthToken' {...twilioAuthToken}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-twilio.form.twilio-auth-token.label'
          defaultMessage='Twilio Auth Token'
        />
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-twilio.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <br />
        <span>
          <FormattedMessage
            id='page--community-twilio.helper-text.twilio-login'
            defaultMessage='Faça login no {link}'
            values={{
              link: (
                <a href='https://www.twilio.com' target='_blank'>
                  <FormattedMessage
                    id='page--community-twilio.helper-text.twilio-login.link'
                    defaultMessage='site do Twilio'
                  />
                </a>
              )
            }}
          />
          {' > '}<b>Account Summary</b>
          {' > '}<b>AUTH TOKEN</b>
          {' > '}
          <b>
            <FormattedMessage
              id='page--community-twilio.form.twilio-auth-token.helper-text.eye-icon'
              defaultMessage='Clicar no ícone do olho'
            />
          </b>
        </span>
      </HelpBlock>
      <FormControl
        type='text'
        tabIndex={2}
        placeholder='Ex: ecd5_______a82c_______b9c9______'
      />
    </FormGroup>

    <FormGroup controlId='twilioNumber' {...twilioNumber}>
      <ControlLabel>
        <FormattedMessage
          id='page--community-twilio.form.twilio-number.label'
          defaultMessage='Twilio Number'
        />
      </ControlLabel>
      <HelpBlock>
        <b>
          <FormattedMessage
            id='page--community-twilio.helper-text.title'
            defaultMessage='Onde buscar essa informação?'
          />
        </b>
        <br />
        <ol>
          <li>
            <FormattedMessage
              id='page--community-twilio.helper-text.twilio-login'
              defaultMessage='Faça login no {link}'
              values={{
                link: (
                  <a href='https://www.twilio.com' target='_blank'>
                    <FormattedMessage
                      id='page--community-twilio.helper-text.twilio-login.link'
                      defaultMessage='site do Twilio'
                    />
                  </a>
                )
              }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-twilio.form.twilio-number.helper-text.menu-item'
              defaultMessage={
                'Clique em {strongPhoneNumber} ' +
                '(símbolo de {strongHashtag} no menu da esquerda)'
              }
              values={{
                strongPhoneNumber: <b>Phone Number</b>,
                strongHashtag: <b>#</b>
              }}
            />
          </li>
          <li>
            <FormattedMessage
              id='page--community-twilio.form.twilio-number.helper-text.choice-number'
              defaultMessage='Escolha qual número Twilio quer usar'
            />
          </li>
        </ol>
        <span />
      </HelpBlock>
      <FormControl type='text' tabIndex={3} placeholder='Ex: +5511956781234' />
    </FormGroup>
  </SettingsForm>
)

CommunitySettingsTwilioPage.propTypes = {
  fields: PropTypes.shape({
    mailchimp_api_key: PropTypes.object.isRequired,
    mailchimp_list_id: PropTypes.object.isRequired
  }).isRequired,
  // redux-form required props
  submit: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default CommunitySettingsTwilioPage
