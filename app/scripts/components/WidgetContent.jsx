import React from 'react'
import WYSIHTMLToolbar from './../components/WYSIHTMLToolbar.jsx'
import classnames from 'classnames'

export default class WidgetContent extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      content: (props.widget.settings ? props.widget.settings.content : 'Clique para editar...'),
      toolbarId: "wysihtml5-toolbar-" + this.props.widget.id
    }
  }

  handleSaveClick() {
    this.props.actions.editWidget({
      id: this.props.widget.id,
      settings: {content: this.state.content}
    })
  }

  handleEditorFocus(){
    this.setState({editing: true})
  }

  handleOverlayClick(){
    this.setState({editing: false})
  }

  componentDidMount() {
    new wysihtml5.Editor(
      React.findDOMNode(this.refs.content), {
        toolbar: this.state.toolbarId,
        parserRules: wysihtml5ParserRules
      }
    ).on("focus", ::this.handleEditorFocus)
  }

  render(){
    const { toolbarId, editing } = this.state
    return (
      <div>
        <div className={classnames("full-width", {"display-none": !editing})}>
          <WYSIHTMLToolbar
            elementId={toolbarId}
            className="absolute full-width top-0 left-0 bg-silver"
            style={{zIndex: 9999}}/>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleOverlayClick}
            style={{zIndex: 9998}} />
        </div>
        <div
          style={{zIndex: editing ? 9999 : 0}}
          className="widget relative"
          dangerouslySetInnerHTML={{__html: this.state.content}}
          ref="content" />
      </div>
    )
  }
}
