import React, { PropTypes } from 'react'
import classnames from 'classnames'
import reactMixin from 'react-mixin'
import { reduxForm } from 'redux-form'
import { Navigation } from 'react-router'

import { CloseButton } from '../../components'

import * as MobilizationActions from '../MobilizationActions'
import * as Paths from '../../Paths'


@reactMixin.decorate(Navigation)
export class MobilizationBasicsFormPage extends React.Component {

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  render(){
    const { fields: { name, goal }, handleSubmit, submitting, error, mobilization, ...props } = this.props

    const submit = mobilization ? props.edit : props.add
    const next = mobilization ? undefined : mobilization => this.transitionTo(Paths.cityNewMobilization(mobilization.id))

    return(
      <div className="p3">
        {(mobilization === undefined ? <h3 className="h2 mt0 mb3 center">Qual o objetivo da sua mobilização?</h3> : null)}
        <div className="bg-white border rounded lg-col-6 mx-auto p3">
          <form onSubmit={handleSubmit((values, dispatch) => dispatch(submit(props.credentials, { ...mobilization, ...values }, next)))}>
            <label className="block h4 caps bold mb1 left">Nome</label>
            {/* TODO: change counter to validate error size */}
            {name.value && name.value.length > 0 && <div className={classnames('right h3', (name.value.length > 90 ? 'red' : null))}>{100 - name.value.length}</div>}
            {name.error && name.touched && <span className="red ml2">{name.error}</span>}
            <input
              type="text"
              className="field-light block h3 full-width mt1 mb2"
              placeholder="Ex: Pela criação de uma delegacia de desaparecidos"
              style={{height: '48px'}}
              {...name}
            />

            <label className="block h4 caps bold mb1 left">Objetivo</label>
            {goal.value && goal.value.length > 0 && <div className={classnames('right h3', (goal.value.length > 490 ? 'red' : null))}>{500 - goal.value.length}</div>}
            {goal.error && goal.touched && <span className="red ml2">{goal.error}</span>}
            <textarea
              className="field-light block h3 full-width mt1 mb2"
              placeholder="Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois."
              style={{height: '160px'}}
              {...goal}
            />


            <div className="clearfix">
              {
                mobilization &&
                <button
                  className="caps button bg-darken-3 h3 mt1 p2 mr2"
                  disabled={submitting}
                  onClick={::this.handleCancelClick}>
                  Cancelar
                </button>
              }
              <input
                type="submit"
                className={classnames("caps button bg-aqua h3 mt1 p2", (mobilization ? null : 'full-width'))}
                disabled={submitting}
                value={submitting ? "Salvando..." : (mobilization ? 'Salvar' : 'Continuar')}
              />
            </div>

            {error && <div className="red center mt2">{error}</div>}
          </form>

          { mobilization && <CloseButton dirty={props.dirty} path={Paths.editMobilization(mobilization.id)} /> }
        </div>
      </div>
    )
  }
}

MobilizationBasicsFormPage.propTypes = {
  mobilization: PropTypes.object,
  dirty: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string
}

const fields = ['name', 'goal']

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Insira o nome da mobilização'
  } else if (values.name.length > 100) {
    errors.name = 'Seu título está muito longo!'
  }

  if (!values.goal) {
    errors.goal = 'Insira o objetivo da mobilização'
  } else if (values.goal.length > 500) {
    errors.goal = 'O limite de caracteres foi atingido.'
  }
  return errors
}

export default reduxForm({
  form: 'mobilizationBasics',
  fields,
  validate
},
(state, ownProps) => ({
  initialValues: ownProps.mobilization || { color_scheme: 'meurio-scheme' },
  credentials: state.auth.credentials
}), { ...MobilizationActions })(MobilizationBasicsFormPage)
