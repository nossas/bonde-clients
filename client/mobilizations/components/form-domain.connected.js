import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { asyncUpdateMobilization } from '~client/mobrender/redux/action-creators'
import { isValidDomain } from '~client/utils/validation-helper'
import FormDomain from './form-domain'

const fields = ['advancedConfig', 'domain', 'subdomain', 'externalDomain']

export const validate = (values, props) => {
  const errors = {}

  if (props.requiredField) {
    if (values.advancedConfig === true && !values.externalDomain) {
      errors.externalDomain = 'Obrigatório'
    }
    if (!values.advancedConfig && !values.subdomain) {
      errors.subdomain = 'Obrigatório'
    }
    if (!values.advancedConfig && !values.domain) {
      errors.domain = 'Obrigatório'
    }
  }

  if (values.externalDomain && !isValidDomain(values.externalDomain)) {
    errors.externalDomain = 'Informe um domínio válido'
  }

  return errors
}

const mapStateToProps = (state, props) => {
  const { custom_domain: customDomain } = props.mobilization
  if (customDomain) {
    // eslint-disable-next-line
    const hasWWW = customDomain.startsWith('www.')
    const reDomain = hasWWW ? /^www.[\w\-]+\.(.*)/ : /^[\w\-]+\.(.*)/
    const reSubdomain = hasWWW ? /^www\.([\w-]*).[\w-.]*/ : /^([\w-]*).[\w-.]*/
    
    const domain = customDomain.match(reDomain)[1] 
    const subdomain = customDomain.match(reSubdomain)[1]
    if (props.hostedZones.find(h => h.domain_name === domain) !== undefined) {
      return {
        initialValues: { domain, subdomain, advancedConfig: false }
      }
    }
    return {
      initialValues: {
        externalDomain: hasWWW ? customDomain.replace('www.', '') : customDomain,
        advancedConfig: true
      }
    }
  }
  return {
    initialValues: {
      domain: props.hostedZones.length > 0 ? props.hostedZones[0].domain_name : undefined
    }
  }
}

const mapActionsToProps = (dispatch, props) => ({
  ...props,
  submit: ({ advancedConfig, domain, subdomain, externalDomain }) => {
    const mobilization = { ...props.mobilization, custom_domain: null }
    if (advancedConfig && externalDomain) {
      const www = externalDomain.startsWith('www.')
      mobilization.custom_domain = www ? externalDomain : `www.${externalDomain}`
    } else if (!advancedConfig && subdomain) {
      const www = subdomain.startsWith('www.')
      mobilization.custom_domain = www ? `${subdomain}.${domain}` : `www.${subdomain}.${domain}`
    }
    return dispatch(asyncUpdateMobilization(mobilization))
  }
})

export default connect(mapStateToProps, mapActionsToProps)(
  reduxForm({ form: 'formDomain', fields, validate })(FormDomain)
)
