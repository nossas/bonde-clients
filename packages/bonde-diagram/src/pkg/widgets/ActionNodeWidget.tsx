import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import { ActionNodeModel } from '../models'
import MessageUI from '../themes/MessageUI'
import TextNodeWidget from './TextNodeWidget'

export interface ActionNodeWidgetProps {
  node: ActionNodeModel,
  engine: DiagramEngine,
  theme: MessageUI,
  children?: JSX.Element[] | JSX.Element
}

class ActionNodeWidget extends React.Component<ActionNodeWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
    const { outPort: OutPort } = theme

    const portProps = { engine }
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

export default ActionNodeWidget