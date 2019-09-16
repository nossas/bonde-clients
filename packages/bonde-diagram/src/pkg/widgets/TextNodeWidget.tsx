import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import Textarea from 'react-textarea-autosize'
import { MessageNodeModel, ReplyNodeModel } from '../models'
import MessageUI from '../themes/MessageUI'
import EditableInput from './EditableInput'

export interface TextNodeWidgetProps {
  node: MessageNodeModel | ReplyNodeModel,
  engine: DiagramEngine,
  theme: MessageUI,
  children?: JSX.Element[] | JSX.Element
}

class TextNodeWidget extends React.Component<TextNodeWidgetProps> {
  render() {
    const { children, engine, node, theme } = this.props
    const { layer: Layer, inPort: InPort, content: Content } = theme

    const portProps = { engine, style: { height: '100%' } }
    const previousPort = node.previous()

    return (
      <Layer node={node}>
        {previousPort && (
          <InPort parent={node} node={previousPort}>
            <PortWidget port={previousPort} {...portProps} />
          </InPort>
        )}
        <Content>
          <EditableInput
            node={node}
            component={Textarea}
            props={{ maxRows: 10 }}
          />
        </Content>
        {children}
      </Layer>
    );
  }
}

export default TextNodeWidget