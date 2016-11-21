import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import * as Paths from '../../../Paths'
import * as MobilizationActions from '../../MobilizationActions'
import { Loading } from '../../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormDropdown
} from '../../../Dashboard/Forms'

class MobilizationCityForm extends Component {
  render() {
    const {
      fields: { organization_id: organizationId },
      submitting,
      mobilization,
      organizations,
      next,
      // Actions
      editMobilizationAsync,
      ...rest
    } = this.props

    const handleSubmit = values => editMobilizationAsync({ ...mobilization, ...values }, next)

    return submitting && !mobilization ? <Loading /> : (
      <FormRedux {...rest} onSubmit={handleSubmit}>
        <FormGroup controlId="organizationId" {...organizationId}>
          <ControlLabel>Cidade</ControlLabel>
          <FormDropdown>
            <option value="0">Selecione uma cidade...</option>
            {
              organizations.data.map(organization => (
                <option key={organization.id} value={organization.id}>
                  {organization.city}
                </option>
              ))
            }
          </FormDropdown>
        </FormGroup>
      </FormRedux>
    )
  }
}

MobilizationCityForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired,
  fields: PropTypes.shape({
    organization_id: PropTypes.object.isRequired
  }).isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired
      }).isRequired
    )
  }).isRequired,
  // Actions
  editMobilizationAsync: PropTypes.func.isRequired
}

const fields = ['organization_id']
const validate = values => {
  const errors = {}
  if (!parseInt(values.organization_id, 10)) {
    errors.organization_id = 'Você deve escolher uma cidade'
  }
  return errors
}
const mapStateToProps = (state, onwProps) => ({
  initialValues: onwProps.mobilization || {}
})

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate
}, mapStateToProps, MobilizationActions)(MobilizationCityForm)
