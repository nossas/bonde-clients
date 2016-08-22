import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { reduxForm } from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

import { CloseButton, Loading } from '../../components'

import * as Paths from '../../Paths'
import * as MobilizationActions from '../MobilizationActions'


@reactMixin.decorate(Navigation)
class MobilizationCityPage extends React.Component {

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  render(){
    const { fields: { organization_id }, submitting, handleSubmit, error } = this.props
    const { edit, credentials, mobilization, organizations, ...props } = this.props

    const isNewMobilization = /cityNew/.test(props.location.pathname)
    const next = isNewMobilization ? (mobilization) => this.transitionTo(Paths.editMobilization(mobilization.id)) : undefined

    if (submitting && !mobilization) {
      return <Loading />
    }

    return (
      <div className="p3">
        {isNewMobilization ? <h3 className="h2 mt0 mb3 center">Qual é a sua cidade?</h3> : null}
        <div className="bg-white border rounded lg-col-6 mx-auto p3">
          <form onSubmit={handleSubmit((values, dispatch) => dispatch(edit(credentials, { ...mobilization, ...values }, next)))}>
            <label className="block h4 caps bold mb1">Cidade</label>
            {organization_id.error && organization_id.touched && <span className="red ml2">{organization_id.error}</span>}
            <select
              className="field-light block h3 full-width mt1 mb2"
              style={{height: '48px'}}
              {...organization_id}
            >
              {organizations.data.map((organization) => <option key={organization.id} value={organization.id}>{organization.city}</option>)}
            </select>
            <div className="clearfix">
              {!isNewMobilization ?
                <button className="caps button bg-darken-3 h3 mt1 p2 mr2" disabled={submitting} onClick={::this.handleCancelClick}>Cancelar</button>
                : null
              }
              <input
                type="submit"
                className={classnames("caps button bg-aqua h3 mt1 p2", (isNewMobilization ? 'full-width' : null))}
                disabled={submitting || !props.dirty}
                value={submitting ? "Salvando..." : (isNewMobilization ? 'Continuar' : 'Salvar')}
              />
            </div>
            {error && <div className="red center mt2">{error}</div>}
          </form>
        </div>
        {!isNewMobilization && <CloseButton dirty={props.dirty} path={Paths.editMobilization(mobilization.id)} />}
      </div>
    )
  }
}

MobilizationCityPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object,
  organizations: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
}

const fields = ['organization_id']

const validate = values => {
  const errors = {}
  if (!values.organization_id) {
    errors.organization_id = 'Você deve escolher uma cidade'
  }
  return errors
}

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate
},
(state, onwProps) => ({
  initialValues: onwProps.mobilization || {},
  credentials: state.auth.credentials
}), { ...MobilizationActions })(MobilizationCityPage)
