import * as React from 'react'
import DiagramContext from '../Context'

class Zoom extends React.Component {
  static contextType = DiagramContext

  render () {
    const { app } = this.context
    const engine = app.getDiagramEngine()

    return (
      <div onClick={() => engine.zoomToFit()}>
        {this.props.children}
      </div>
    )
  }
}

export default Zoom