import React, { PropTypes } from 'react'
import $ from 'jquery'
import { bindActionCreators } from 'redux'
import * as FormEntryActions from './../actions/FormEntryActions'

const emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

export default class FormWidgetButton extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    buttonText: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false,
      success: false,
      errors: []
    }
  }

  componentWillReceiveProps() {
    if (this.state.loading) {
      this.setState({loading: false, success: true})
    }
  }

  validate(fieldsWithValue) {
    const errors = []
    fieldsWithValue.forEach((field) => {
      if (field.required && field.value === '') {
        errors.push(`${field.label} não pode ficar em branco`)
      } else if (field.value !== '' && field.kind === 'email' && !field.value.match(emailRegEx)) {
        errors.push(`${field.label} inválido`)
      }
    })
    return errors
  }

  handleClick() {
    if (!this.props.editable) {
      const { dispatch, mobilization, widget } = this.props
      const { settings } = widget
      const { fields } = settings
      const bindedFormEntryActions = bindActionCreators(FormEntryActions, dispatch)
      const fieldsWithValue = fields.map((field) => {
        return {...field, value: $('#input-' + field.uid).val()}
      })
      const errors = this.validate(fieldsWithValue)
      this.setState({errors: errors})

      if (errors.length === 0) {
        this.setState({loading: true})
        bindedFormEntryActions.addFormEntry({
          mobilization_id: mobilization.id,
          form_entry: {
            widget_id: widget.id,
            fields: JSON.stringify(fieldsWithValue)
          }
        })
      }
    }
  }

  render() {
    const {errors} = this.state

    return (
      <div>
        {
          this.state.errors.length > 0 &&
          <div className="red bold mb1">
            {
              errors.map((error) => {
                return <div className="p1 border-left border-red mb1 rounded-right" style={{backgroundColor: '#F9CACE', borderWidth: '8px'}}>{error}</div>
              })
            }
          </div>
        }
        <button
          disabled={this.state.loading}
          className="caps button bg-darken-4 p2 full-width mt1 mb2"
          onClick={::this.handleClick}>
          {this.state.loading ? 'Enviando...' : this.props.buttonText }
        </button>
        { this.state.success &&
          <div className="center">Sua ação foi registrada com sucesso!</div> }
      </div>
    )
  }
}
