import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WidgetActions from './../actions/WidgetActions'
import * as Paths from '../Paths'
import { FormWidgetMenu, Loading, CloseButton } from './../components'
import reduxForm from 'redux-form'

function widgetFormValidation(data) {
  const errors = { valid: true }
  return errors
}

@connect(state => ({ widgets: state.widgets, form: state.widgetForm }))
@reduxForm('widgetForm', widgetFormValidation)
export default class FormWidgetForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      hasSubmitted: false,
      error: null
    }
    this.props.initializeForm({callToAction: null, buttonText: null, countText: null, emailText: null })
  }

  componentDidMount(){
    const { mobilization, dispatch } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    bindedWidgetActions.fetchWidgets({mobilization_id: mobilization.id})
  }

  componentWillReceiveProps(nextProps) {
    const widget = this.widget(nextProps)
    if(widget) {
      if(this.state.initializing) {
        const { call_to_action: callToAction, button_text: buttonText, count_text: countText, email_text: emailText } = (widget.settings || {call_to_action: null, button_text: null, count_text: null, email_text: null})
        this.props.initializeForm({callToAction, buttonText, countText, emailText })
        this.setState({initializing: false})
      }
      this.state.submitting && this.setState({submitting: false})
      this.state.submitting && this.setState({hasSubmitted: true})
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  widget(props = this.props) {
    const { widgets } = props
    return widgets[widgets.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  }

  handleSubmit(event) {
    event.preventDefault()
    const widget = this.widget()
    const { settings } = widget
    const { data, touchAll, valid, dispatch, mobilization, auth } = this.props
    this.setState({ submitting: true, hasSubmitted: false, error: null })
    if (valid) {
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      bindedWidgetActions.editWidget({
        mobilization_id: mobilization.id,
        widget_id: widget.id,
        credentials: auth.credentials,
        widget: { settings: {
          ...settings,
          call_to_action: data.callToAction,
          button_text: data.buttonText,
          count_text: data.countText,
          email_text: data.emailText
        } }
      })
      this.props.initializeForm({callToAction: data.callToAction, buttonText: data.buttonText, countText: data.countText, emailText: data.emailText })
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

  renderForm() {
    const {
      data: { callToAction, buttonText, countText, emailText },
      errors: { callToAction: callToActionError, buttonText: buttonTextError, countText: countTextError, emailText: emailTextError },
      touched: { callToAction: callToActionTouched, buttonText: buttonTextTouched, countText: countTextTouched, emailText: emailTextTouched },
      handleChange,
      handleBlur,
      dirty
    } = this.props

    return (
      <form onSubmit={::this.handleSubmit}>
        <label className="block h4 caps bold mb1">Texto acima do formulário</label>
        {callToActionError && callToActionTouched && <span className="red ml2">{callToActionError}</span>}
        <textarea
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Chamada para ação que irá aparecer acima do seu formulário."
          style={{height: '160px'}}
          value={callToAction}
          onChange={handleChange('callToAction')}
          onBlur={handleBlur('callToAction')} />

        <label className="block h4 caps bold mb1">Texto do botão de envio</label>
        {buttonTextError && buttonTextTouched && <span className="red ml2">{buttonTextError}</span>}
        <input
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Texto que irá aparecer no botão de envio do seu formulário."
          style={{height: '48px'}}
          value={buttonText}
          onChange={handleChange('buttonText')}
          onBlur={handleBlur('buttonText')} />

        <label className="block h4 caps bold mb1">Texto do contador de envios</label>
        {countTextError && countTextTouched && <span className="red ml2">{countTextError}</span>}
        <input
          type="text"
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Texto que irá aparecer abaixo do seu formulário no contador de envios."
          style={{height: '48px'}}
          value={countText}
          onChange={handleChange('countText')}
          onBlur={handleBlur('countText')} />

        <label className="block h4 caps bold mb1">Texto do email</label>
        {emailTextError && emailTextTouched && <span className="red ml2">{emailTextError}</span>}
        <textarea
          className="field-light block h3 full-width mt1 mb3"
          placeholder="Texto do email enviado para os assinantes do formulário."
          style={{height: '160px'}}
          value={emailText}
          onChange={handleChange('emailText')}
          onBlur={handleBlur('emailText')} />

        <div className="clearfix">
          <button
            className="caps button bg-darken-3 h3 mt1 p2 mr2"
            disabled={this.state.submitting}
            onClick={::this.handleCancelClick}>
            Cancelar
          </button>
          <input
            type="submit"
            className={classnames("caps button bg-aqua h3 mt1 p2")}
            disabled={this.state.submitting || (!dirty)}
            value={this.state.submitting ? "Salvando..." : "Salvar"} />
        </div>

        {::this.renderErrorMessage()}
        { this.state.hasSubmitted && !dirty &&
          <div className="green mt2">Configurações do formulário atualizadas!</div> }
      </form>
    )
  }

  renderPage() {
    const { widgets, dirty } = this.props
    const widget = widgets[widgets.map((widget) => { return widget.id.toString()}).indexOf(this.props.params.widget_id)]
    return(
      <div className="flex-auto bg-silver gray relative">
        <FormWidgetMenu {...this.props} widget={widget} />
        <div className="py3 px3">
          { !this.state.initializing && this.renderForm() }
        </div>
        <CloseButton dirty={dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }

  renderLoading(){
    return(
      <Loading />
    )
  }

  render() {
    return(this.props.widgets.length > 0 ? this.renderPage() : this.renderLoading())
  }
}
