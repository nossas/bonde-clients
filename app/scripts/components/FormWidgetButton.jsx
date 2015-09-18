import React, { PropTypes } from 'react'
import $ from 'jquery'
import { bindActionCreators } from 'redux'
import * as FormEntryActions from './../actions/FormEntryActions'

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
      success: false
    }
  }

  componentWillReceiveProps() {
    if (this.state.loading) {
      this.setState({loading: false, success: true})
    }
  }

  handleClick() {
    if (!this.props.editable) {
      const { dispatch, mobilization, widget } = this.props
      const { settings } = widget
      const { fields } = settings
      const bindedFormEntryActions = bindActionCreators(FormEntryActions, dispatch)
      this.setState({
        loading: true
      })
      const fieldsWithValue = fields.map((field) => {
        return {...field, value: $('#input-' + field.uid).val()}
      })
      bindedFormEntryActions.addFormEntry({
        mobilization_id: mobilization.id,
        form_entry: {
          widget_id: widget.id,
          fields: JSON.stringify(fieldsWithValue)
        }
      })
    }
  }

  render() {
    return (
      <div>
        <button
          disabled={this.state.loading}
          className="caps button bg-darken-4 p2 full-width mt1"
          onClick={::this.handleClick}>
          {this.state.loading ? 'Enviando...' : this.props.buttonText }
        </button>
        { this.state.success &&
          <div className="center mt2">Muito obrigado por sua participação!</div> }
      </div>
    )
  }
}
