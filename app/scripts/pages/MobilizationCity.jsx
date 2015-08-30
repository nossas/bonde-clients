import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import * as MobilizationActions from './../actions/MobilizationActions'
import { Link } from 'react-router'
import * as Paths from '../Paths'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { ConfigurationsMenu } from './../components'

function mobilizationCityValidation(data) {
  const errors = { valid: true }
  if (!data.colorScheme) {
    errors.colorScheme = 'Você deve escolher uma cidade'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.mobilizationCity, auth: state.auth }))
@reduxForm('mobilizationCity', mobilizationCityValidation)
@reactMixin.decorate(Navigation)

export default class MobilizationCity extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      error: null
    }
    props.initializeForm({colorScheme: props.mobilization.color_scheme})
  }

  componentWillReceiveProps(nextProps) {
    this.state.initializing && this.setState({initializing: false})
    if(this.state.submitting) {
      this.newMobilization() && this.transitionTo(Paths.editMobilization(this.props.mobilization.id))
      this.setState({submitting: false})
    }
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
        mobilization: {color_scheme: data.colorScheme},
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
      data: { colorScheme },
      errors: { colorScheme: colorSchemeError },
      touched: { colorScheme: colorSchemeTouched },
      handleChange,
      handleBlur
    } = this.props
    const submitText = (this.newMobilization() ? 'Continuar' : 'Salvar')

    return (
      <form onSubmit={::this.handleSubmit}>
        <label className="block h4 caps bold mb1">
          Cidade
        </label>
        {colorSchemeError && colorSchemeTouched && <span className="red ml2">{colorSchemeError}</span>}
        <select
          className="field-light block h3 full-width mt1 mb2"
          style={{height: '48px'}}
          onChange={handleChange('colorScheme')}
          onBlur={handleBlur('colorScheme')}
          value={colorScheme}>
          <option value="minhablumenau-scheme">Blumenau</option>
          <option value="minhacampinas-scheme">Campinas</option>
          <option value="minhacuritiba-scheme">Curitiba</option>
          <option value="minhagaropaba-scheme">Garopaba</option>
          <option value="minhaouropreto-scheme">Ouro Preto</option>
          <option value="minhaportoalegre-scheme">Porto Alegre</option>
          <option value="meurecife-scheme">Recife</option>
          <option value="meurio-scheme">Rio de Janeiro</option>
          <option value="minhasampa-scheme">São Paulo</option>
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

  renderMenu() {
    if(this.newMobilization()) {
      return (
        <h2 className="bg-white px4 m0 clearfix" style={{paddingTop: '2rem'}}>
          <div className="col col-4 mt0">Nova mobilização</div>
          <ul className="list-reset m0 col col-8" style={{marginTop: '-25px'}}>
            <li className="inline-block mr3 muted">1. Nome e objetivo</li>
            <li className="inline-block py3 border-bottom" style={{borderWidth: '3px'}}>2. Cidade</li>
          </ul>
        </h2>
      )
    } else {
      return(
        <ConfigurationsMenu {...this.props} />
      )
    }
  }

  render(){
    const { mobilization } = this.props
    return(
      <div className="flex-auto bg-silver gray">
        { this.renderMenu() }
        <div className="py3 px4">
          { this.renderTitle() }
          <div className="bg-white border rounded lg-col-6 mx-auto p3">
            { !this.state.initializing && this.renderForm() }
          </div>
        </div>
      </div>
    )
  }
}
