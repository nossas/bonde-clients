import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import { DefaultMessageWidget } from '../../defaults/widgets'
import MessageUI from '../../themes/MessageUI'
import TextMessageModel from './TextMessageModel'

export interface TextMessageWidgetProps {
  node: TextMessageModel,
  engine: DiagramEngine,
  theme: MessageUI
}

class TextMessageWidget extends React.Component<TextMessageWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
    const { outPort: OutPort } = theme

    const portProps = { engine, style: { height: '100%' } }
    const nextPort = node.next()
    return (
      <DefaultMessageWidget node={node} engine={engine} theme={theme}>
        {nextPort ? (
          <OutPort parent={node} node={nextPort}>
            <PortWidget port={nextPort} {...portProps} />
          </OutPort>
        ) : <div />}
      </DefaultMessageWidget>
    )
  }
}

export default TextMessageWidget