import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import { DefaultMessageWidget, EditableInput } from '../../defaults/widgets'
import MessageUI from '../../themes/MessageUI'
import ReplyMessageModel from './ReplyMessageModel'

export interface ReplyMessageWidgetProps {
  node: ReplyMessageModel,
  engine: DiagramEngine,
  theme: MessageUI
}

class ReplyMessageWidget extends React.Component<ReplyMessageWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
    const { outPort: OutPort, addReply: AddReply } = theme

    const portProps = { engine }

    return (
      <DefaultMessageWidget engine={engine} node={node} theme={theme}>
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
      </DefaultMessageWidget>
    );
  }
}

export default ReplyMessageWidget