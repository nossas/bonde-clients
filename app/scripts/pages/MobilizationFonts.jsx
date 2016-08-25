import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'

import { TabMenuItem, CloseButton } from '../components'

import * as Paths from '../Paths'
import * as Selectors from '../Mobilization/MobilizationSelectors'
import * as MobilizationActions from '../MobilizationActions'

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

export default class MobilizationFonts extends React.Component {
  renderMenu() {
    const { mobilization, location } = this.props
    const fontsMobilizationPath = Paths.fontsMobilization(mobilization.id)

    return (
      <div className="bg-white px3 clearfix">
        <h2 className="mb3">Estilo da Página</h2>
        <div>
          <ul className="list-reset mb0">
            <TabMenuItem
              path={fontsMobilizationPath}
              text="Fontes"
              isActive={fontsMobilizationPath === location.pathname}
            />
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const fonts = [
      ['armata', 'Armata'], ['arvo', 'Arvo'], ['dosis', 'Dosis'], ['droid-sans', 'Droid Sans'],
      ['fjalla-one', 'Fjalla One'], ['glegoo', 'Glegoo'], ['lato', 'Lato'],
      ['merriweather', 'Merriweather'], ['merriweather-sans', 'Merriweather Sans'],
      ['open-sans', 'Open Sans'], ['oswald', 'Oswald'], ['pfdin', 'PF Din'],
      ['proxima-nova', 'Proxima Nova'], ['pt-mono', 'PT Mono'], ['ubuntu', 'Ubuntu'],
    ]
    const { fields: { header_font, body_font }, handleSubmit, submitting, error } = this.props
    const { mobilization, credentials, edit, ...props } = this.props

    return (
      <div className="flex-auto bg-silver gray relative">
        { this.renderMenu() }
        <div className="py3 px4">
          <form onSubmit={handleSubmit((values, dispatch) => dispatch(edit(credentials, { ...mobilization, ...values })))}>
            <label className="block h4 caps bold mb1">Fonte dos títulos</label>
            { header_font.error && header_font.touched && <span className="h5 red bold">{header_font.error}</span> }
            <select
              className="field-light block h3 mt1 mb2"
              style={{height: '48px'}}
              {...header_font}
            >
              {fonts.map(font => <option key={`${font[0]}-header`} value={font[0]}>font[1]</option>)}
            </select>
            <div className={classnames('bg-white border rounded p2 mb3 lg-col-6', `${header_font.value}-header`)}>
              <h1 className="m0">Os títulos ficarão assim</h1>
            </div>

            <label className="block h4 caps bold mb1">Fonte do texto</label>
            { body_font.error && body_font.touched && <span className="h5 red bold">{body_font.error}</span> }
            <select
              className="field-light block h3 mt1 mb2"
              style={{height: '48px'}}
              {...body_font}
            >
              {fonts.map(font => <option key={`${font[0]}-body`} value={font[0]}>font[1]</option>)}
            </select>
            <div className={classnames('bg-white border rounded p2 mb3 lg-col-6', `${body_font.value}-body`)}>
              <p className="m0">Os textos ficarão assim.</p>
            </div>

            <div className="clearfix">
              <input
                type="submit"
                className="caps button bg-aqua h3 mt1"
                disabled={submitting || !props.dirty}
                value={submitting ? 'Salvando...' : 'Salvar'} />
            </div>
          </form>
        </div>
        <CloseButton dirty={props.dirty} path={Paths.editMobilization(mobilization.id)} />
      </div>
    )
  }
}

MobilizationFontsPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired
}

const fields = ['headerFont', 'bodyFont']

const validate = values => {
  const errors = {}
  if (!values.header_font) {
    errors.header_font = 'Você deve escolher uma fonte para títulos'
  }
  if (!values.body_font) {
    errors.body_font = 'Você deve escolher uma fonte para textos'
  }
  return errors
}

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate
},
(state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    mobilization: mobilization,
    initialValues: mobilization || {},
    credentials: state.auth.credentials,
  }
}, { ...MobilizationActions })(MobilizationFonts)
