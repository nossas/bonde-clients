import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import classnames from 'classnames'
import * as Paths from '../Paths'
import * as MobilizationActions from './../actions/MobilizationActions'
import { TabMenuItem, CloseButton } from '../components'

function mobilizationFontsValidation(data) {
  const errors = { valid: true }
  if (!data.headerFont) {
    errors.headerFont = 'Você deve escolher uma fonte para títulos'
    errors.valid = false
  }
  if (!data.bodyFont) {
    errors.bodyFont = 'Você deve escolher uma fonte para textos'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ form: state.mobilizationFonts }))
@reduxForm('mobilizationFonts', mobilizationFontsValidation)

export default class MobilizationFonts extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      submitting: false,
      error: null
    }
    props.initializeForm({
      headerFont: props.mobilization.header_font,
      bodyFont: props.mobilization.body_font
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.submitting) {
      this.setState({ submitting: false })
    }
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch, mobilization } = this.props
    this.setState({ submitting: true, error: null })

    if (valid) {
      dispatch(MobilizationActions.editMobilization({
        id: mobilization.id,
        mobilization: {
          header_font: data.headerFont,
          body_font: data.bodyFont
        }
      }))
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  renderMenu() {
    const { mobilization, location } = this.props
    const fontsMobilizationPath = Paths.fontsMobilization(mobilization.id)

    return(
      <div className="bg-white px3 clearfix">
        <h2 className="mb3">Estilo da Página</h2>
        <div>
          <ul className="list-reset mb0">
            <TabMenuItem
              path={fontsMobilizationPath}
              text="Fontes"
              isActive={fontsMobilizationPath == location.pathname}
            />
          </ul>
        </div>
      </div>
    )
  }

  renderCancelButton() {
    return (
      <button
        className="caps button bg-darken-3 h3 mt1 p2 mr2"
        disabled={this.state.submitting}
        onClick={::this.handleCancelClick}>
        Cancelar
      </button>
    )
  }

  renderFontSelect(field, value) {
    const { handleChange, handleBlur } = this.props

    return (
      <select
        className="field-light block h3 mt1 mb2"
        style={{height: '48px'}}
        onChange={handleChange(field)}
        onBlur={handleBlur(field)}
        value={value}>
        <option value="armata">Armata</option>
        <option value="arvo">Arvo</option>
        <option value="dosis">Dosis</option>
        <option value="glegoo">Glegoo</option>
        <option value="lato">Lato</option>
        <option value="merriweather">Merriweather</option>
        <option value="merriweather-sans">Merriweather Sans</option>
        <option value="open-sans">Open Sans</option>
        <option value="oswald">Oswald</option>
        <option value="pt-mono">PT Mono</option>
        <option value="ubuntu">Ubuntu</option>
      </select>
    )
  }

  renderForm() {
    const {
      data: { headerFont, bodyFont },
      errors: { headerFont: headerFontError, bodyFont: bodyFontError },
      touched: { headerFont: headerFontTouched, bodyFont: bodyFontTouched }
    } = this.props

    return (
      <form onSubmit={ ::this.handleSubmit }>
        <label className="block h4 caps bold mb1">Fonte para títulos</label>
        { headerFontError && headerFontTouched && <span className="h5 red bold">{headerFontError}</span> }

        { this.renderFontSelect('headerFont', headerFont) }

        <div className={classnames("bg-white border rounded p2 mb3 lg-col-6 center", `${headerFont}-header`)}>
          <h1 className="m0">Exemplo de Título</h1>
        </div>

        <label className="block h4 caps bold mb1">Fonte para textos corridos</label>
        { bodyFontError && bodyFontTouched && <span className="h5 red bold">{bodyFontError}</span> }

        { this.renderFontSelect('bodyFont', bodyFont) }

        <div className={classnames("bg-white border rounded p2 mb3 lg-col-6", `${bodyFont}-body`)}>
          <p className="m0">Este é um exemplo de parágrafo</p>
        </div>

        <div className="clearfix">
          { this.renderCancelButton() }
          <input
            type="submit"
            className="caps button bg-aqua h3 mt1 p2"
            disabled={this.state.submitting}
            value={this.state.submitting ? 'Salvando...' : 'Salvar'} />
        </div>
      </form>
    )
  }

  render() {
    return(
      <div className="flex-auto bg-silver gray relative">
        { this.renderMenu() }
        <div className="py3 px4">
          <p className="h5">Defina as fontes da página</p>
          { this.renderForm() }
        </div>
        <CloseButton path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }
}
