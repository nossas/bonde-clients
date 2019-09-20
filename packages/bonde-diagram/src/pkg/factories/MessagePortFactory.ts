import { AbstractModelFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'
import MessagePortModel from '../models/MessagePortModel'

class MessagePortFactory extends AbstractModelFactory<MessagePortModel, DiagramEngine> {
  constructor() {
    super('port')
  }

  generateModel(event: any): MessagePortModel {
    return new MessagePortModel(event.initialConfig)
  }
}

export default MessagePortFactory