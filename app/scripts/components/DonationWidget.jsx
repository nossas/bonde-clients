import React, { PropTypes } from 'react'
import classnames from 'classnames'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { bindActionCreators } from 'redux'
import * as Paths from './../Paths'

@reactMixin.decorate(Navigation)

export default class FormWidget extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    configurable: PropTypes.bool,
    hasNewField: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
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

  handleMouseEnter() {
    this.setState({hasMouseOver: true})
  }

  handleMouseLeave() {
    this.setState({hasMouseOver: false})
  }

  handleClick() {
    const { mobilization, widget, editable } = this.props
    if (editable) {
      this.transitionTo(Paths.fieldsMobilizationWidget(mobilization.id, widget.id))
    }
  }


  renderButton() {
    const { configurable, widget } = this.props
    const { loading, success } = this.state

    if (!configurable) {
      return (
        <FormWidgetButton
          buttonText={(widget.settings ? (widget.settings.button_text || 'Enviar') : 'Enviar')} {...this.props}
          handleClick={::this.submit}
          loading={loading}
          success={success} />
      )
    }
  }

  renderOverlay() {
    const { editable, configurable } = this.props
    if (editable && !configurable && this.state.hasMouseOver) {
      return (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-darken-4 h1 bold flex flex-center"
          style={{zIndex: 9998}}>
          <div className="center full-width white">Clique para editar</div>
        </div>
      )
    }
  }

  renderForm() {
    const { editable, configurable } = this.props
    const className = classnames({'p3 bg-darken-3 relative': editable || !configurable})

    return (
      <div>
        <div className={className}>
          { this.renderOverlay() }
        </div>
      </div>
    )
  }

  render() {
    const {
      editable,
      mobilization: { header_font: headerFont }
    } = this.props

    const { success } = this.state

    return (
      <div>
        <div
          className={`widget ${headerFont}-header`}
          style={(editable ? {cursor: 'pointer'} : null)}
          onMouseEnter={::this.handleMouseEnter}
          onMouseLeave={::this.handleMouseLeave}
          onClick={::this.handleClick}>
          { success ? this.renderShareButtons() : this.renderForm() }
        </div>
      </div>
    )
  }
}
