import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import * as Paths from '../Paths'
import * as MobilizationActions from './../actions/MobilizationActions'
import { TabMenuItem, CloseButton } from '../components'

/* TODO: validate form */
function mobilizationFontsValidation(data) {
  const errors = { valid: true }
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
    props.initializeForm({
      headerFont: props.mobilization.header_font,
      bodyFont: props.mobilization.body_font
    })
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch, mobilization } = this.props

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
        onClick={::this.handleCancelClick}>
        Cancelar
      </button>
    )
  }

  renderForm() {
    const {
      data: { headerFont, bodyFont },
      errors: { headerFont: headerFontError, bodyFont: bodyFontError },
      touched: { headerFont: headerFontTouched, bodyFont: bodyFontTouched },
      handleChange,
      handleBlur
    } = this.props

    return (
      <form onSubmit={::this.handleSubmit}>
        <label className="block h4 caps bold mb1">Fonte para títulos</label>
        {headerFontError && headerFontTouched &&<span className="red ml2">{headerFontError}</span>}

        <select
          className="field-light block h3 mt1 mb2"
          style={{height: '48px'}}
          onChange={handleChange('headerFont')}
          onBlur={handleBlur('headerFont')}
          value={headerFont}>
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

        <div className="bg-white border rounded p2 mb3 lg-col-6 center">
          <h1 className="m0" style={{fontFamily: this.props.data.headerFont}}>Exemplo de Título</h1>
        </div>

        <label className="block h4 caps bold mb1">Fonte para textos corridos</label>
        {bodyFontError && bodyFontTouched &&<span className="red ml2">{bodyFontError}</span>}

        <select
          className="field-light block h3 mt1 mb2"
          style={{height: '48px'}}
          onChange={handleChange('bodyFont')}
          onBlur={handleBlur('bodyFont')}
          value={bodyFont}>
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

        <div className="bg-white border rounded p2 mb3 lg-col-6">
          <p className="m0" style={{fontFamily: this.props.data.bodyFont}}>Este é um exemplo de parágrafo</p>
        </div>

        <div className="clearfix">
          { this.renderCancelButton() }
          <input
            type="submit"
            className="caps button bg-aqua h3 mt1 p2"
            value="Salvar" />
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
