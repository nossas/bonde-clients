import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import * as Paths from '../Paths'
import * as MobilizationActions from './../actions/MobilizationActions'

function mobilizationBasicsValidation(data) {
  const errors = {}
  if (!data.name) {
    errors.name = 'Informe nome da mobilização'
  }
  if (!data.goal) {
    errors.goal = 'Informe o objetivo da mobilização'
  }
  return errors
}

@connect(state => ({ form: state.mobilizationBasics }))
@reduxForm('mobilizationBasics', mobilizationBasicsValidation)
@reactMixin.decorate(Navigation)

export default class NewMobilization extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      submitting: false,
      error: null
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch } = this.props
    this.setState({ submitting: true, error: null })

    if (valid) {
      dispatch(MobilizationActions.addMobilization({
        transitionTo: this.transitionTo.bind(this), 
        mobilization: {...data, color_scheme: 'meurio-scheme'}
      }))
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  renderErrorMessage() {
    if (this.state.error) {
      return (
        <div className="red center mt2">{this.state.error}</div>
      )
    }
  }

  render(){
    const {
      data: { name, goal },
      errors: { name: nameError, goal: goalError },
      touched: { name: nameTouched, goal: goalTouched },
      handleChange,
      handleBlur
    } = this.props

    return(
      <div className="flex-auto bg-silver gray">
        <h2 className="bg-white mt0 py3 px4">
          Nova mobilização
        </h2>
        <div className="p3">
          <h3 className="h2 mt0 mb3 center">Conte mais sobre sua mobilização</h3>
          <div className="bg-white border rounded lg-col-6 mx-auto p3">
            <form onSubmit={::this.handleSubmit}>

              <label className="caps bold">Nome</label>
              {nameError && nameTouched && <span className="red ml2">{nameError}</span>}
              <input
                type="text"
                className="field-light block full-width mt1 mb2"
                style={{height: '44px'}}
                value={name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')} />

              <label className="caps bold">Objetivo</label>
              {goalError && goalTouched && <span className="red ml2">{goalError}</span>}
              <textarea
                className="field-light block full-width mt1 mb2"
                style={{height: '160px'}}
                value={goal}
                onChange={handleChange('goal')}
                onBlur={handleBlur('goal')} />

              <input
                type="submit"
                className="caps button full-width bg-aqua mt1 p2"
                disabled={this.state.submitting}
                value={this.state.submitting ? "Salvando..." : "Continuar"} />

              {::this.renderErrorMessage()}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
