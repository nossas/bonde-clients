import React from 'react'
import PropTypes from 'prop-types'
import WebFont from 'webfontloader'
import { DiagramWidget } from 'storm-react-diagrams'
import { DraggableItem } from './components'
import { IconMessage, IconQuickReply } from './components/icons'


class Diagram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entitySelected: undefined
    }
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
      }
    })
  }

  handleDrop(event) {
    const model = JSON.parse(event.dataTransfer.getData('srd-diagram-model'))
    const nodesCount = Object.keys(
      this.props.app
        .getDiagramEngine()
        .getDiagramModel()
        .getNodes()
    ).length

    const node = this.props.createMessage(model, nodesCount)
    const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event)

    node.x = points.x
    node.y = points.y

    this.props.app
      .getDiagramEngine()
      .getDiagramModel()
      .addNode(node)

    this.forceUpdate()
    this.props.onUpdate('handleDrop')
  }

  handleDragOver(event) {
    event.preventDefault()
  }

  handleDragStart(model, event) {
    event.dataTransfer.setData('srd-diagram-model', JSON.stringify(model))
  }

  render() {
    return (
      <div className='diagram-app'>
        <div className='diagram-tools'>
          <DraggableItem
            model={{ kind: 'text' }}
            onDragStart={this.handleDragStart.bind(this)}
          >
            <IconMessage />
            <span>Criar mensagem</span>
          </DraggableItem>
          <DraggableItem
            model={{ kind: 'quick_reply' }}
            onDragStart={this.handleDragStart.bind(this)}
          >
            <IconQuickReply />
            <span>Fazer uma pergunta</span>
          </DraggableItem>
        </div>
        <div
          className='diagram-layer'
          onDrop={this.handleDrop.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}
        >
          <DiagramWidget
            className='srd-bonde-diagram'
            diagramEngine={this.props.app.getDiagramEngine()}
            actionStillFiring={(args) => {
              this.props.onUpdate(args)
            }}
          />
        </div>
      </div>
    )
  }
}

Diagram.propTypes = {
  createMessage: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
}

Diagram.defaultProps = {
  onUpdate: () => {}
}

export default Diagram