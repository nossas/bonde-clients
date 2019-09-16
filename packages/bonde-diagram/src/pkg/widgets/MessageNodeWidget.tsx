import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import MessageNodeModel from '../models/MessageNodeModel'
import MessageUI from '../themes/MessageUI'
import EditableInput from './EditableInput'

export interface MessageNodeWidgetProps {
  node: MessageNodeModel,
  engine: DiagramEngine,
  theme: MessageUI
}

class MessageNodeWidget extends React.Component<MessageNodeWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
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
        <Content>
          <EditableInput node={node} />
        </Content>
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