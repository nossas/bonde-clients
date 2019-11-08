import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import DiagramContext from '../../Context'
import { DefaultMessageModel, DefaultPortModel } from '../models'

export interface EditableInputProps {
  node: DefaultMessageModel | DefaultPortModel,
  component: any,
  props: any
}

export interface EditableInputState {
  value: string,
  isEditing: boolean
}

class EditableInput extends React.Component<EditableInputProps, EditableInputState> {
  static contextType = DiagramContext
  static defaultProps = { props: {} }
  private input: React.RefObject<HTMLInputElement>

  constructor(props: EditableInputProps) {
    super(props)
    this.input = React.createRef()
    this.state = {
      value: this.props.node.getOptions().text || '',
      isEditing: false
    }
  }

  componentDidUpdate(_: any, prevState: EditableInputState) {
    if (this.input.current && !prevState.isEditing && this.state.isEditing) {
      const { value } = this.state

      this.input.current.selectionStart = this.input.current.selectionEnd = value.length
      this.input.current.focus()
    }
  }

  handleKeyPress(e: any) {
    if (e.key === 'Enter' && e.ctrlKey) {
      this.changeText(e.target.value)
      e.stopPropagation()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      // stop propagation on backspace and delete pressed
      e.stopPropagation()
    } else if (e.key === 'Escape') {
      const { node } = this.props
      this.setState({ isEditing: false, value: node.getOptions().text || '' })
      node.unlocked()
    }
  }

  handleDoubleClick() {
    this.props.node.locked()
    this.setState({ isEditing: true })
  }

  changeText(value: string) {
    const { node } = this.props
    const { app, eventListener } = this.context

    node.changeText(value).unlocked()

    this.setState({ isEditing: false })

    eventListener('changeText')
    app.getDiagramEngine().repaintCanvas()
  }

  handleOnBlur() {
    this.changeText(this.state.value)
  }

  render () {
    const { value, isEditing } = this.state
    const { component: InputComponent, props: extraProps } = this.props
    const { style, ...componentProps } = extraProps

    const defaultStyle = Object.assign({}, style, {
      display: isEditing ? 'block' : 'none',
    })
    // TODO: check this code snippet dependency
    if (InputComponent === Textarea) {
      componentProps['inputRef'] = this.input
    } else {
      componentProps['ref'] = this.input
    }

    return (
      <div onDoubleClick={this.handleDoubleClick.bind(this)}>
        <InputComponent
          value={value}
          onChange={(e: any) => this.setState({ value: e.target.value })}
          onKeyUp={this.handleKeyPress.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          style={defaultStyle}
          {...componentProps}
        />
        {!isEditing && (<span>{value}</span>)}
      </div>
    )
  }
}

export default EditableInput
