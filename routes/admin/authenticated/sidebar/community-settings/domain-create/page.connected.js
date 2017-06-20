import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { addNotification as notify } from 'reapop'

import { isValidDomain } from '~client/utils/validation-helper'
import DnsControlSelectors from '~client/community/dns-control-selectors'
import {
  asyncAddHostedZone,
  asyncDeleteHostedZone,
  asyncCheckHostedZone
} from '~client/community/action-creators/dns-control'
import Page from './page'

const fields = ['domain_name']

const validate = values => {
  const errors = {}
  if (!values.domain_name) {
    errors.domain_name = 'Domínio é obrigatório.'
  } else if (!isValidDomain(values.domain_name)) {
    errors.domain_name = 'Domínio inválido'
  }
  return errors
}

const mapStateToProps = state => ({
  saving: DnsControlSelectors(state).dnsHostedZones().isSaving()
})

const mapActionsToProps = {
  asyncAddHostedZone,
  asyncDeleteHostedZone,
  asyncCheckHostedZone,
  notify
}

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'createDomainForm', fields, validate })(injectIntl(Page))
)
