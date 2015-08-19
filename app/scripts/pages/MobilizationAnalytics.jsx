import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as MobilizationActions from './../actions/MobilizationActions'
import { Link } from 'react-router'
import * as Paths from '../Paths'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

function mobilizationAnalyticsValidation(data) {
  const errors = { valid: true }
  if (data.id && !/(UA|YT|MO)-\d+-\d+/i.test(data.id)) {
    errors.id = 'Informe um id do Google Analytics válido'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.mobilizationAnalytics }))
@reduxForm('mobilizationAnalytics', mobilizationAnalyticsValidation)
@reactMixin.decorate(Navigation)

export default class MobilizationAnalytics extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      error: null
    }
    props.initializeForm({id: props.mobilization.google_analytics_code})
  }

  componentWillReceiveProps(nextProps) {
    this.state.initializing && this.setState({initializing: false})
    this.state.submitting && this.setState({submitting: false})
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch, mobilization } = this.props
    this.setState({ submitting: true, error: null })
    if (valid) {
      dispatch(MobilizationActions.editMobilization({
        id: mobilization.id,
        mobilization: {google_analytics_code: data.id}
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
      data: { id },
      errors: { id: idError },
      touched: { id: idTouched },
      handleChange,
      handleBlur
    } = this.props

    return (
      <form onSubmit={::this.handleSubmit}>
        <label className="block h4 caps bold mb1">
          <span style={{cursor: "pointer"}}>Id do Google Analytics</span>
          {idError && idTouched && <span className="red ml2">{idError}</span>}
          <input
            type="text"
            placeholder="UA-42446026-2"
            className="field-light block h3 full-width mt1 mb2"
            onChange={handleChange('id')}
            onBlur={handleBlur('id')}
            value={id} />
        </label>

        <div className="clearfix">
          <button
            className="caps button bg-darken-3 h3 mt1 p2 mr2"
            disabled={this.state.submitting}
            onClick={::this.handleCancelClick}>
            Cancelar
          </button>
          <input
            type="submit"
            className="caps button bg-aqua h3 mt1 p2"
            disabled={this.state.submitting}
            value={this.state.submitting ? "Salvando..." : "Salvar"} />
        </div>

        {::this.renderErrorMessage()}
      </form>
    )
  }

  render(){
    const { mobilization } = this.props
    return(
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white px3 m0 clearfix" style={{paddingTop: '2rem'}}>
          <div className="col col-4 mt0">Configure sua mobilização</div>
          <ul className="list-reset m0 col col-8" style={{marginTop: '-25px'}}>
            <li className="inline-block mr3">
              <Link to={Paths.basicsMobilization(mobilization.id)} className="gray">1. Nome e objetivo</Link>
            </li>
            <li className="inline-block mr3">
              <Link to={Paths.cityMobilization(mobilization.id)} className="gray">2. Cidade</Link>
            </li>
            <li className="inline-block py3 border-bottom" style={{borderWidth: '3px'}}>3. Google Analytics</li>
          </ul>
        </h2>
        <div className="py3 px4">
          <div className="bg-white border rounded lg-col-6 mx-auto p3">
            { !this.state.initializing && this.renderForm() }
          </div>
        </div>
      </div>
    )
  }
}
