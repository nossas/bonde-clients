import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import { CloseButton } from '../../components'

import * as Paths from '../../Paths'
import * as MobilizationActions from '../MobilizationActions'
import * as Selectors from '../MobilizationSelectors'


@reactMixin.decorate(Navigation)
class MobilizationAnalyticsPage extends React.Component {

  render() {
    const { fields: { google_analytics_code }, submitting, handleSubmit, error } = this.props
    const { mobilization, edit, ...props } = this.props

    return (
      <div className="py3 px3 col col-8">
        <p className="h5">
          Para acompanhar os resultados da sua mobilização, você precisa configurar
          uma conta no Google Analytics. Siga os passos abaixo:
        </p>
        <ol className="h5">
          <li>
            Crie uma conta no Google Analytics
            <a href="http://www.google.com/analytics/" target="_blank"> clicando aqui</a>
          </li>
          <li>
            Obtenha sua ID de acompanhamento no Google Analytics. É um código
            que começa sempre com as letras UA, que você verá após criar sua conta lá.
          </li>
          <li>
            Copie a ID de acompanhamento e cole no campo abaixo:
            <form className="mt2 mb4" onSubmit={handleSubmit((values, dispatch) => dispatch(edit(props.credentials, { ...mobilization, ...values })))}>
              <div className="mb1 h5 caps bold">
                <label style={{cursor: 'pointer'}} htmlFor="ga-code-input">ID do Google Analytics</label>
              </div>
              <div className="mb1">
                <input
                  type="text"
                  id="ga-code-input"
                  placeholder="UA-00000000-0"
                  className="field-light h3 mr1"
                  {...google_analytics_code}
                />
                <input
                  type="submit"
                  className="caps button bg-aqua h4 p2"
                  disabled={submitting || !props.dirty}
                  value={submitting ? 'Salvando...' : 'Salvar'}
                />
              </div>
              {google_analytics_code.error && google_analytics_code.touched && <span className="red block">{google_analytics_code.error}</span>}
              {error && <div className="red center mt2">{error}</div>}
            </form>
          </li>
          <li>
            Pronto! Você já pode acompanhar as estatísticas da sua mobilização
            no Google Analytics!
          </li>
        </ol>
        <CloseButton dirty={props.dirty} path={Paths.editMobilization(mobilization.id)} />
      </div>
    )
  }
}

MobilizationAnalyticsPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
}

const fields = ['google_analytics_code']

const validate = values => {
  const errors = {}
  if (values.google_analytics_code && !/(UA|YT|MO)-\d+-\d+/i.test(values.google_analytics_code)) {
    errors.google_analytics_code = 'Informe uma ID válida'
  }
  return errors
}

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate,
},
(state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    initialValues: mobilization || {},
    mobilization: mobilization,
    credentials: state.auth.credentials
  }
}, { ...MobilizationActions })(MobilizationAnalyticsPage)
