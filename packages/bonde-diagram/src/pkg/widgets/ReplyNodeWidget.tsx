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
    const { outPort: OutPort, addReply: AddReply } = theme

    const portProps = { engine }

    return (
      <TextNodeWidget engine={engine} node={node} theme={theme}>
        <div className='Replies'>
          {node.replies().map(port => (
            <OutPort key={port.getOptions().id} node={port}>
              <EditableInput
                node={port}
                component='input'
              />
              <PortWidget port={port} {...portProps} />
            </OutPort>
          ))}
          {AddReply && (
            <AddReply
              onQuickReply={(text: string) => {
                node.quickReply(text)
                engine.repaintCanvas()
              }}
            />
          )}
        </div>
      </TextNodeWidget>
    );
  }
}

export default ReplyNodeWidget