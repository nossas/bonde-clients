import * as React from "react"
import Application from "./Application"
import { DiagramProvider } from "./Context"

export interface ProviderProps {
  app: Application,
  className?: string,
  transferKey?: string
}

class Provider extends React.Component<ProviderProps> {
  public static defaultProps = {
    transferKey: "srd-diagram-model",
  }

  public render() {
    const diagramProps = {
      app: this.props.app,
      eventListener: this.props.app.getEventListener(),
      transferKey: this.props.transferKey,
    }

    return (
      <DiagramProvider value={diagramProps}>
        {this.props.children}
      </DiagramProvider>
    )
  }
}

export default Provider
