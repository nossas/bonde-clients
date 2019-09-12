import React from 'react'
import { BondeDiagramApplication } from './lib'
import { DiagramProvider, Draggable, Layer } from './lib/diagram-pkg'
import { MessageNodeModel } from './lib/bot'
import './lib/sass/main.scss'

const getDefaultValue = () => {
  return {
    "gridSize": 0,
    "id": "e8cc2e50-c5dc-40e5-bb43-45177c0ea200",
    "links": [
      {
        "color": "rgba(255,255,255,0.5)",
        "curvyness": 50,
        "extras": {},
        "id": "86cc432d-4095-4a56-91ad-b6b06f32f17c",
        "labels": [],
        "points": [
          {
            "id": "b8a0981f-f3d9-4249-9c18-8239d0033a21",
            "selected": false,
            "x": 417.83539209335635,
            "y": 86.20865273582326
          },
          {
            "id": "6b45119e-3c63-43e7-8fa1-7f77780ca5f6",
            "selected": false,
            "x": 562.566138771516,
            "y": 198.5686739442921
          }
        ],
        "selected": false,
        "source": "ce13793c-3a0c-4c2c-a6b7-fe945b283b19",
        "sourcePort": "ae18df0b-1fc6-45d0-a0c5-416c5beeb8a0",
        "target": "00e7e9fb-3ca0-49f8-a65a-fa0c12571af8",
        "targetPort": "8606128e-b10f-4f38-a9c1-ed22c7a983a1",
        "type": "default",
        "width": 3
      }
    ],
    "nodes": [
      {
        "extras": {},
        "id": "ce13793c-3a0c-4c2c-a6b7-fe945b283b19",
        "kind": "text",
        "ports": [
          {
            "id": "ae18df0b-1fc6-45d0-a0c5-416c5beeb8a0",
            "in": false,
            "links": [
              "86cc432d-4095-4a56-91ad-b6b06f32f17c"
            ],
            "name": "Out",
            "parentNode": "ce13793c-3a0c-4c2c-a6b7-fe945b283b19",
            "selected": false,
            "type": "default"
          }
        ],
        "selected": false,
        "text": "Escreva sua mensagem aqui",
        "type": "message",
        "x": 177.3353905264421,
        "y": 42.70865476975658
      },
      {
        "extras": {},
        "id": "00e7e9fb-3ca0-49f8-a65a-fa0c12571af8",
        "kind": "quick_reply",
        "ports": [
          {
            "id": "8606128e-b10f-4f38-a9c1-ed22c7a983a1",
            "in": true,
            "links": [
              "86cc432d-4095-4a56-91ad-b6b06f32f17c"
            ],
            "name": "In",
            "parentNode": "00e7e9fb-3ca0-49f8-a65a-fa0c12571af8",
            "selected": false,
            "type": "default"
          },
          {
            "id": "3126dc11-351a-4be4-8512-bec7c2faebd6",
            "in": false,
            "links": [],
            "name": "reply-port-3126dc11-351a-4be4-8512-bec7c2faebd6",
            "parentNode": "00e7e9fb-3ca0-49f8-a65a-fa0c12571af8",
            "selected": false,
            "text": "Texto do botão",
            "type": "reply"
          }
        ],
        "selected": true,
        "text": "Escreva sua pergunta aqui",
        "type": "message",
        "x": 567.5718901966659,
        "y": 158.5811475656553
      }
    ],
    "offsetX": 96.79068932131936,
    "offsetY": 34.25384784423312,
    "zoom": 68.57445151905218
  }
}

function App() {

  const app = new BondeDiagramApplication()
  const defaultValue = getDefaultValue()
  if (defaultValue) {
    console.log('defaultValue', defaultValue)
    const model = app.getActiveDiagram()
    model.deSerializeDiagram(defaultValue, app.getDiagramEngine())
    app.getDiagramEngine().setDiagramModel(model)
  }

  const serialize = () => {
    console.log('Diagram', app.getActiveDiagram().serializeDiagram())
  }

  const handleCreateMessage = (model, nodesCount) => {
    // TODO: add translate
    let node
    if (nodesCount === 0 && model.kind === 'text') {
      // when the first message on diagram model should only has output port
      node = new MessageNodeModel('Escreva sua mensagem aqui', model.kind)
      node.addOutPort('Out')
    } else if (model.kind === 'text') {
      node = new MessageNodeModel('Escreva sua mensagem aqui', model.kind)
      node.addOutPort('Out')
      node.addInPort('In')
    } else if (model.kind === 'quick_reply') {
      node = new MessageNodeModel('Escreva sua pergunta aqui', model.kind)
      node.addInPort('In')
      node.addQuickReply('Texto do botão')
    } else {
      // eslint-disable-next-line
      throw new Exception(`Model kind ${model.kind} isnt mapped on diagram.`)
    }

    return node
  }

  return (
    <DiagramProvider className='diagram-app' app={app}>
      <div className='diagram-tools'>
        <Draggable className='draggable-item' data={{ kind: 'text' }}>
          texto qualquer
        </Draggable>
      </div>
      <Layer className='diagram-layer' onCreateNode={handleCreateMessage} />
    </DiagramProvider>
  )
}

export default App
