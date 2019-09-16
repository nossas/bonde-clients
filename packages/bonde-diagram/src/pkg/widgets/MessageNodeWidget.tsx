import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import MessageNodeModel from '../models/MessageNodeModel'
import MessageUI from '../themes/MessageUI'
import TextNodeWidget from './TextNodeWidget'

export interface MessageNodeWidgetProps {
  node: MessageNodeModel,
  engine: DiagramEngine,
  theme: MessageUI
}

class MessageNodeWidget extends React.Component<MessageNodeWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
    const { outPort: OutPort } = theme

    const portProps = { engine, style: { height: '100%' } }
    const nextPort = node.next()
    return (
      <TextNodeWidget node={node} engine={engine} theme={theme}>
        {nextPort ? (
          <OutPort parent={node} node={nextPort}>
            <PortWidget port={nextPort} {...portProps} />
          </OutPort>
        ) : <div />}
      </TextNodeWidget>
    )
  }
}

export default MessageNodeWidget