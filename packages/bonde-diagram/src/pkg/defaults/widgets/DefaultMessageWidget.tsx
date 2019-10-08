import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import Textarea from 'react-textarea-autosize'
import MessageUI from '../../themes/MessageUI'
import { DefaultMessageModel } from '../models'
import EditableInput from './EditableInput'

export interface DefaultMessageWidgetProps {
  node: DefaultMessageModel,
  engine: DiagramEngine,
  theme: MessageUI,
  children?: JSX.Element[] | JSX.Element
}

class DefaultMessageWidget extends React.Component<DefaultMessageWidgetProps> {
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

export default DefaultMessageWidget