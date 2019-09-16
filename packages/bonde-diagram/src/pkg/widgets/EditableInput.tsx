import * as React from 'react'
import DiagramContext from '../Context'
import { MessageNodeModel, ReplyNodeModel, MessagePortModel } from '../models'

export interface EditableInputProps {
  node: MessageNodeModel | ReplyNodeModel | MessagePortModel,
  component: any,
  props?: object
}

export interface EditableInputState {
  value: string,
  isEditing: boolean
}

class EditableInput extends React.Component<EditableInputProps, EditableInputState> {
  static contextType = DiagramContext
  static defaultProps = {
    props: {}
  }

  constructor(props: EditableInputProps) {
    super(props)
    this.state = {
      value: this.props.node.getOptions().text || '',
      isEditing: false
    }
  }

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
        value: node.getOptions().text || ''
      })
    }
  }

  handleDoubleClick() {
    this.setState({ isEditing: true })
  }

  render () {
    const { value, isEditing } = this.state
    const { component: InputComponent, props: componentProps } = this.props

    return (
      <div onDoubleClick={this.handleDoubleClick.bind(this)}>
        <InputComponent {...{
          isEditing,
          value,
          onChange: (e: any) => this.setState({ value: e.target.value }),
          onKeyUp: this.handleKeyPress.bind(this),
          ...componentProps
        }} />
      </div>
    )
  }
}

export default EditableInput
