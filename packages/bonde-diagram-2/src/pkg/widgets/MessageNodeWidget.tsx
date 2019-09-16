import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import MessageNodeModel from '../models/MessageNodeModel'
import MessageUI from '../themes/MessageUI'

export interface MessageNodeWidgetProps {
  node: MessageNodeModel,
  engine: DiagramEngine,
  theme: MessageUI
}

class MessageNodeWidget extends React.Component<MessageNodeWidgetProps> {
  constructor(props: MessageNodeWidgetProps) {
    super(props)
    this.state = {
      value: this.props.node.getOptions().text,
      isEditing: false
    }
  }

  /*generatePort(port) {
    if (port.type === 'default') {
      return <DefaultPortWidget node={port.getParent()} model={port} key={port.id} />
    } else if (port.type === 'reply') {
      return <ReplyPortWidget node={port.getParent()} model={port} key={port.id} />
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      this.props.node.changeText(e.target.value)

      this.setState({ isEditing: false })
      this.forceUpdate()
      e.stopPropagation()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      // stop propagation on backspace and delete pressed
      e.stopPropagation()
    } else if (e.key === 'Escape') {
      this.setState({ isEditing: false, value: this.props.node.name })
    }
  }

  handleDoubleClick(e) {
    this.setState({ isEditing: true })
  }

  handleCreateReply(e) {
    if (e) e.preventDefault()

    this.props.node.addQuickReply('Texto do botão')
    this.forceUpdate()
  }

  getClassName() {
    return super.getClassName() + this.props.node.kind
  }*/

  render() {
    const { engine, node, theme } = this.props
    const { text } = node.getOptions()
    const { layer: Layer, inPort: InPort, content: Content, outPort: OutPort } = theme

    const portProps = { engine, style: { height: '100%' } }
    const previousPort = node.previous()
    const nextPort = node.next()
    return (
      <Layer node={node}>
        {previousPort && (
          <InPort parent={node} node={previousPort}>
            <PortWidget port={previousPort} {...portProps} />
          </InPort>
        )}
        <Content>{text}</Content>
        {nextPort && (
          <OutPort parent={node} node={nextPort}>
            <PortWidget port={nextPort} {...portProps} />
          </OutPort>
        )}
      </Layer>
    );
  }
}

export default MessageNodeWidget