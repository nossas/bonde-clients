import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

import { CloseButton, Loading } from '../../components'

import * as Paths from '../../Paths'
import * as MobilizationActions from '../MobilizationActions'

function mobilizationCityValidation(data) {
  const errors = { valid: true }
  if (!data.organizationId) {
    errors.organizationId = 'Você deve escolher uma cidade'
    errors.valid = false
  }
  return errors
}


@connect((globalState, ownProps) => {
  return {
    form: globalState.mobilizationCity,
    auth: globalState.auth,
  }
})
@reduxForm('mobilizationCity', mobilizationCityValidation)
@reactMixin.decorate(Navigation)

export default class MobilizationCityPage extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      error: null
    }
    if (props.mobilization !== undefined) {
      props.initializeForm({organizationId: props.mobilization.organization_id})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.initializing && this.setState({initializing: false})
    if(this.state.submitting) {
      this.newMobilization() && this.transitionTo(Paths.editMobilization(this.props.mobilization.id))
      this.setState({submitting: false})
    }
  }

  static propTypes = {
    mobilization: PropTypes.object,  // NewMobilizationContainer
    saving: PropTypes.bool.isRequired,  // NewMobilizationContainer
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    organizations: PropTypes.object.isRequired
  }

  newMobilization() {
    return /cityNew/.test(this.props.location.pathname)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch, mobilization, auth } = this.props

    this.setState({ submitting: true, error: null })
    if (valid) {
      dispatch(MobilizationActions.editMobilization({
        id: mobilization.id,
        mobilization: {organization_id: data.organizationId},
        credentials: auth.credentials
      }))
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  renderErrorMessage() {
    if (this.state.error) {
      return (
        <div className="red center mt2">{this.state.error}</div>
      )
    }
  }

  renderForm() {
    const {
      data: { organizationId },
      errors: { organizationId: organizationIdError },
      touched: { organizationId: organizationIdTouched },
      handleChange,
      handleBlur,
      organizations
    } = this.props
    const submitText = (this.newMobilization() ? 'Continuar' : 'Salvar')

    return (
      <form onSubmit={::this.handleSubmit}>
        <label className="block h4 caps bold mb1">
          Cidade
        </label>
        {organizationIdError && organizationIdTouched && <span className="red ml2">{organizationIdError}</span>}
        <select
          className="field-light block h3 full-width mt1 mb2"
          style={{height: '48px'}}
          onChange={handleChange('organizationId')}
          onBlur={handleBlur('organizationId')}
          value={organizationId}>
          {
            organizations.data.map((organization) => {
              return <option value={organization.id}>{organization.city}</option>
            })
          }
        </select>
        <div className="clearfix">
          { this.renderCancelButton() }
          <input
            type="submit"
            className={classnames("caps button bg-aqua h3 mt1 p2", (this.newMobilization() ? 'full-width' : null))}
            disabled={this.state.submitting}
            value={this.state.submitting ? "Salvando..." : submitText} />
        </div>

        {::this.renderErrorMessage()}
      </form>
    )
  }

  renderCancelButton() {
    if(!this.newMobilization()) {
      return (
        <button
          className="caps button bg-darken-3 h3 mt1 p2 mr2"
          disabled={this.state.submitting}
          onClick={::this.handleCancelClick}>
          Cancelar
        </button>
      )
    }
  }

  renderTitle() {
    if(this.newMobilization()) {
      return (
        <h3 className="h2 mt0 mb3 center">Qual é a sua cidade?</h3>
      )
    }
  }

  render(){
    const { mobilization, dirty, saving } = this.props

    if (saving && !mobilization) {
      return <Loading />
    }

    return (
      <div className="p3">
        { this.renderTitle() }
        <div className="bg-white border rounded lg-col-6 mx-auto p3">
          { !this.state.initializing && this.renderForm() }
        </div>
        {!this.newMobilization() && <CloseButton dirty={dirty} path={Paths.editMobilization(mobilization.id)} />}
      </div>
    )
  }
}
