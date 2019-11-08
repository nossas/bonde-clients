import * as React from 'react'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { DefaultMessageModel } from '../defaults/models'
import DiagramContext from '../Context'
import Container from './Container'

export interface LayerProps {
	onCreateMessage(kind: string, size: number): DefaultMessageModel,
  color?: string,
  background?: string
}

class Layer extends React.Component<LayerProps> {
  static contextType = DiagramContext

  handleDrop(evt: any) {
    const { app, transferKey, eventListener } = this.context
    const { onCreateMessage } = this.props
    const kind = evt.dataTransfer.getData(transferKey)
    const size = Object.keys(
      app
        .getDiagramEngine()
        .getModel()
        .getNodes()
    ).length

    const node = onCreateMessage(kind, size)
    const point = app.getDiagramEngine().getRelativeMousePoint(evt)
    // register listener to change when change node
    node.registerListener({ eventDidFire: eventListener })
    node.setPosition(point)

    app.getActiveDiagram().addNode(node)
    app.getDiagramEngine().repaintCanvas()
  }

  handleDragOver(evt: any) {
    evt.preventDefault()
  }

  render() {
    const { app } = this.context
    const { background, color } = this.props

    return (
      <Container
        onDrop={this.handleDrop.bind(this)}
        onDragOver={this.handleDragOver.bind(this)}
        background={background || 'rgb(60, 60, 60)'}
        color={color || 'rgba(255,255,255, 0.05)'}
      >
        <CanvasWidget
          className='canvas'
          engine={app.getDiagramEngine()}
        />
      </Container>
    )
  }
}

export default Layer