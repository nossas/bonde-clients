import React from 'react'

export default class PageBlockColumnContent extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      content: props.column.content
    }
  }

  onContentClick() {
    this.setState({editing: true})
  }

  onSaveClick() {
    this.setState({editing: false})
    this.props.actions.editColumnContent(
      this.props.mobilization.id,
      this.props.block.uuid,
      this.props.column.hash,
      this.state.content
    )
  }

  onContentChange(e) {
    this.setState({content: e.target.value})
  }

  render(){
    let element
    if(this.state.editing) {
      element = (
        <div>
          <textarea className="full-width field-light" value={this.state.content} onChange={::this.onContentChange} />
          <button className="button bg-blue right" onClick={::this.onSaveClick}>Salvar</button>
        </div>
      )
    } else {
      element = (
        <div onClick={::this.onContentClick}>{this.props.column.content}</div>
      )
    }

    return element
  }
}
