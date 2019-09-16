import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import ReplyNodeModel from '../models/ReplyNodeModel'
import MessageUI from '../themes/MessageUI'
import TextNodeWidget from './TextNodeWidget'
import EditableInput from './EditableInput'

export interface ReplyNodeWidgetProps {
  node: ReplyNodeModel,
  engine: DiagramEngine,
  theme: MessageUI
}

class ReplyNodeWidget extends React.Component<ReplyNodeWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
    const { outPort: OutPort } = theme

    const portProps = { engine }

    return (
      <TextNodeWidget engine={engine} node={node} theme={theme}>
        {node.replies().map(port => (
          <OutPort key={port.getOptions().id} node={port}>
            <EditableInput
              node={port}
              component='input'
            />
            <PortWidget port={port} {...portProps} />
          </OutPort>
        ))}
      </TextNodeWidget>
    );
  }
}

export default ReplyNodeWidget