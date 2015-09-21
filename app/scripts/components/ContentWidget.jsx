import React, { PropTypes } from 'react'
import { WYSIHTMLToolbar, Loading } from './'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class ContentWidget extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      editor: null,
      content: props.widget.settings.content,
      toolbarId: 'wysihtml5-toolbar-' + this.props.widget.id,
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.editable) {
      const editor = new wysihtml5.Editor(
        React.findDOMNode(this.refs.content), {
          toolbar: this.state.toolbarId,
          parserRules: wysihtml5ParserRules
        }
      ).on('focus', ::this.handleEditorFocus)
      this.setState({editor: editor})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.props.widget.settings.content !== nextProps.widget.settings.content) {
      this.setState({loading: false})
    }
  }

  enableEditor() {
    this.setState({editing: true})
    this.props.onEdit && this.props.onEdit()
    window.addEventListener('keyup', ::this.handleEscapePress)
  }

  disableEditor() {
    this.setState({editing: false})
    this.props.onCancelEdit && this.props.onCancelEdit()
    window.removeEventListener('keyup', ::this.handleEscapePress)
    React.findDOMNode(this.refs.content).blur()
  }

  handleEditorFocus() {
    this.enableEditor()
  }

  handleEscapePress(e) {
    if (e.keyCode === 27) {
      this.save()
    }
  }

  handleOverlayClick() {
    this.save()
  }

  save() {
    const { editor, content } = this.state
    const hasChanged = editor.getValue() !== content
    this.setState({content: editor.getValue()})
    this.disableEditor()

    if (hasChanged) {
      const { dispatch, auth } = this.props
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      this.setState({loading: true})
      bindedWidgetActions.editWidget({
        mobilization_id: this.props.mobilization.id,
        widget_id: this.props.widget.id,
        credentials: auth.credentials,
        widget: {
          settings: {
            content: this.state.editor.getValue()
          }
        }
      })
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  render() {
    const { toolbarId, editing } = this.state
    const { mobilization: { header_font: headerFont, body_font: bodyFont } } = this.props
    return (
      <div>
        <div className={classnames('full-width', {'display-none': !editing})}>
          <WYSIHTMLToolbar
            elementId={toolbarId}
            className="absolute full-width top-0 left-0 bg-darken-4"
            buttonClassName="button button-transparent white p2"
            style={{zIndex: 10000}}/>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleOverlayClick}
            style={{zIndex: 9998}} />
        </div>
        <div style={{zIndex: editing ? 9999 : 0}} className="relative">
          <div
            className={classnames('widget', `${headerFont}-header`, `${bodyFont}-body`)}
            dangerouslySetInnerHTML={{__html: this.state.content}}
            ref="content" />
          <div className={classnames('right mt1', {'display-none': !editing})}>
            <button
              onClick={::this.save}
              className="button button-transparent caps bg-darken-4 white rounded">
              Salvar
            </button>
          </div>
        </div>
        {this.renderLoading()}
      </div>
    )
  }
}
