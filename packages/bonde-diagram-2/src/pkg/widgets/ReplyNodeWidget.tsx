import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import ReplyNodeModel from '../models/ReplyNodeModel'
import MessageUI from '../themes/MessageUI'

export interface ReplyNodeWidgetProps {
  node: ReplyNodeModel,
  engine: DiagramEngine,
  theme: MessageUI
}

class ReplyNodeWidget extends React.Component<ReplyNodeWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
    const { text } = node.getOptions()
    const {
      layer: Layer,
      inPort: InPort,
      content: Content,
      outPort: OutPort
    } = theme

    const portProps = { engine }
    const previousPort = node.previous()

    return (
      <Layer node={node}>
        {previousPort && (
          <InPort node={previousPort}>
            <PortWidget style={{ height: '100%' }} port={previousPort} engine={engine} />
          </InPort>
        )}
        <Content>
          <p>{text}</p>
          {node.replies().map(port => (
            <OutPort key={port.getOptions().id} node={port}>
              <span>{port.getOptions().label}</span>
              <PortWidget port={port} {...portProps} />
            </OutPort>
          ))}
        </Content>
      </Layer>
    );
  }
}

export default ReplyNodeWidget