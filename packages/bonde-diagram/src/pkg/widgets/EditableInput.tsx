import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import DiagramContext from '../Context'
import { MessageNodeModel, ReplyNodeModel } from '../models'

export interface EditableInputProps {
  node: MessageNodeModel | ReplyNodeModel
}

export interface EditableInputState {
  value: string,
  isEditing: boolean
}

class EditableInput extends React.Component<EditableInputProps, EditableInputState> {
  static contextType = DiagramContext

  constructor(props: EditableInputProps) {
    super(props)
    this.state = {
      value: this.props.node.getOptions().text,
      isEditing: false
    }
  }

  /*
  handleCreateReply(e) {
    if (e) e.preventDefault()

    this.props.node.addQuickReply('Texto do botão')
    this.forceUpdate()
  }*/

  handleKeyPress(e: any) {
    const { node } = this.props
    const { eventListener } = this.context
    if (e.key === 'Enter' && e.ctrlKey) {
      node.changeText(e.target.value)
      this.setState({ isEditing: false })
      eventListener('changeText')
      e.stopPropagation()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      // stop propagation on backspace and delete pressed
      e.stopPropagation()
    } else if (e.key === 'Escape') {
      this.setState({
        isEditing: false,
        value: node.getOptions().text
      })
    }
  }

  handleDoubleClick() {
    this.setState({ isEditing: true })
  }

  render () {
    const { value, isEditing } = this.state

    return (
      <div onDoubleClick={this.handleDoubleClick.bind(this)}>
        {isEditing ? (
          <Textarea
            maxRows={10}
            defaultValue={value}
            onChange={(e: any) => this.setState({ value: e.target.value })}
            onKeyUp={this.handleKeyPress.bind(this)}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    )
  }
}

export default EditableInput
