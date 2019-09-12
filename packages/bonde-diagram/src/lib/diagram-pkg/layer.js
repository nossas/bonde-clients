import React from 'react'
import { DiagramWidget } from 'storm-react-diagrams'
import DiagramContext from './context'

class Layer extends React.Component {
  static contextType = DiagramContext

  handleDrop (evt) {
    const { app, transferKey, eventListener } = this.context
    const { onCreateNode } = this.props
    const data = JSON.parse(evt.dataTransfer.getData(transferKey))
    const size = Object.keys(
      app
        .getDiagramEngine()
        .getDiagramModel()
        .getNodes()
    ).length

    const node = onCreateNode(data, size)
    const points = app.getDiagramEngine().getRelativeMousePoint(evt)

    // update position node insert on content area
    node.x = points.x
    node.y = points.y

    app.getDiagramEngine().getDiagramModel().addNode(node)

    this.forceUpdate()
    eventListener('handleDrop')
  }

  handleDragOver (evt) {
    evt.preventDefault()
  }

  render () {
    const { app, eventListener } = this.context
    const { className } = this.props

    return (
      <div
        className={className}
        onDrop={this.handleDrop.bind(this)}
        onDragOver={this.handleDragOver.bind(this)}
      >
        <DiagramWidget
          className='srd-bonde-diagram'
          diagramEngine={app.getDiagramEngine()}
          actionStillFiring={(args) => {
            eventListener(args)
          }}
        />
      </div>
    )
  }
}

export default Layer