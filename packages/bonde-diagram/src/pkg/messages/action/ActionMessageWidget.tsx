import * as React from 'react'
import { PortWidget, DiagramEngine } from '@projectstorm/react-diagrams'
import { DefaultMessageWidget } from '../../defaults/widgets'
import MessageUI from '../../themes/MessageUI'
import ActionMessageModel from './ActionMessageModel'
import ActionPortModel from './ActionPortModel'

export interface ActionMessageWidgetProps {
  node: ActionMessageModel,
  engine: DiagramEngine,
  theme: MessageUI,
  children?: JSX.Element[] | JSX.Element
}

class ActionMessageWidget extends React.Component<ActionMessageWidgetProps> {
  render() {
    const { engine, node, theme } = this.props
    const { outPort: OutPort } = theme

    const portProps = { engine }
    const actions = node.getActions()

    return (
      <DefaultMessageWidget node={node} engine={engine} theme={theme}>
        <div className='Actions'>
          {actions.map((port: ActionPortModel) => {
            return (
              <OutPort key={port.getOptions().id} parent={node} node={port}>
                <span>{port.getOptions().text}</span>
                <PortWidget port={port} {...portProps} />
              </OutPort>
            )
          })}
        </div>
      </DefaultMessageWidget>
    )
  }
}

export default ActionMessageWidget