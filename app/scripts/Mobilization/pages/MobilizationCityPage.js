import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../Paths'
import * as MobilizationActions from '../MobilizationActions'
import { Loading } from '../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormDropdown
} from '../../Dashboard/Forms'

//
// TODO: To decorate page with Navigation without class statement, is need to upgrade react-router.
// See: http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// This is used to navigate back to history. This is still be necessary? Or manipulate
// it from <FormRedux> component may be contemplates it?
//
@reactMixin.decorate(Navigation)
class MobilizationCityPage extends Component {
  render() {
    const {
      ...rest,
      fields: { organization_id: organizationId },
      submitting,
      mobilization,
      organizations,
      location,
      // Actions
      editMobilizationAsync
    } = this.props

    const isNewMobilization = /cityNew/.test(location.pathname)
    const next = !isNewMobilization ? undefined :
      mobilization => this.transitionTo(Paths.editMobilization(mobilization.id))
    const handleSubmit = (values, dispatch) => editMobilizationAsync({ ...mobilization, ...values }, next)

    return submitting && !mobilization ? <Loading /> : (
      <div className="p3">
        {isNewMobilization ? <h3 className="h2 mt0 mb3 center">Qual é a sua cidade?</h3> : null}
        <div className="bg-white border rounded lg-col-6 mx-auto p3">
          <FormRedux onSubmit={handleSubmit} {...rest}>
            <FormGroup controlId="organizationId" {...organizationId}>
              <ControlLabel>Cidade</ControlLabel>
              <FormDropdown>
                {organizations.data.map(organization =>
                  <option key={organization.id} value={organization.id}>
                    {organization.city}
                  </option>
                )}
              </FormDropdown>
            </FormGroup>
          </FormRedux>
        </div>
      </div>
    )
  }
}

MobilizationCityPage.propTypes = {
  submitting: PropTypes.bool.isRequired,
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
  fields: PropTypes.shape({
    organization_id: PropTypes.object.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
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
  editMobilization: PropTypes.func.isRequired
}

const fields = ['organization_id']
const validate = values => {
  const errors = {}
  if (!values.organization_id) {
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
}, mapStateToProps, MobilizationActions)(MobilizationCityPage)
