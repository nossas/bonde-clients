import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import classnames from 'classnames'

import { WYSIHTMLToolbar, Loading } from '../../../components'
import * as WidgetActions from '../../actions'

import Editor from '../../../RebooEditor'


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
      content: props.widget.settings.content,
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.props.widget.settings.content !== nextProps.widget.settings.content) {
      this.setState({ loading: false })
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  handleSave(rawContent) {
    const { widget: { settings } } = this.props

    if (settings.content !== rawContent) {
      const { dispatch, widget } = this.props
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      this.setState({loading: true})

      const data = { ...widget, settings: { content: JSON.stringify(rawContent) } }
      bindedWidgetActions.editWidgetAsync(data)
    }
  }

  render() {
    const { editable, mobilization, widget: { settings } } = this.props

    const theme = (
      mobilization && mobilization.color_scheme ?
      mobilization.color_scheme.replace('-scheme', '') :
      null
    )

    let content
    try {
      content = JSON.parse(settings.content)
    } catch (e) {
      content = settings.content
    }

    return (
      <div className={classnames('widget', `${mobilization.headerFont}-header`, `${mobilization.bodyFont}-body`)}>
        <Editor
          value={content}
          theme={theme}
          readOnly={!editable}
          handleSave={this.handleSave.bind(this)}
        />
      </div>
    )
  }
}
