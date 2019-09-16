import * as React from 'react'
import { DiagramProvider } from './Context'
import Application from './Application'


export interface ProviderProps {
  app: Application,
  className?: string,
  transferKey?: string
}

class Provider extends React.Component<ProviderProps> {
  static defaultProps = {
    transferKey: 'srd-diagram-model'
  }

  render () {
    const diagramProps = {
      app: this.props.app,
      transferKey: this.props.transferKey,
      eventListener: this.props.app.getEventListener()
    }

    return (
      <DiagramProvider value={diagramProps}>
        <div className={this.props.className}>
          {this.props.children}
        </div>
      </DiagramProvider>
    )
  }
}

export default Provider