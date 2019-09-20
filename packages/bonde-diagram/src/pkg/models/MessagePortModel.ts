import uuid from 'uuid'
import {
  LinkModel,
  PortModel,
  PortModelAlignment,
  PortModelGenerics,
  PortModelOptions
} from '@projectstorm/react-diagrams-core'
import { DefaultLinkModel } from '@projectstorm/react-diagrams-defaults'
import { DeserializeEvent } from '@projectstorm/react-canvas-core'
import { MessageNodeModel, ReplyNodeModel } from './'

export interface MessagePortModelOptions extends PortModelOptions {
  text?: string;
  in?: boolean;
}

export interface MessagePortModelGenerics extends PortModelGenerics {
  OPTIONS: MessagePortModelOptions;
  PARENT: MessageNodeModel | ReplyNodeModel;
}

class MessagePortModel extends PortModel<MessagePortModelGenerics> {
  constructor(options: any = {}) {
    if (typeof options === 'boolean') {
      options = {
        in: options
      }
    }
    super({
      alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
      type: 'port',
      name: options.name || `port-${uuid.v4()}`,
      ...options
    })
  }

  deserialize(event: DeserializeEvent<this>) {
    super.deserialize(event)
    this.options.in = event.data.in
    this.options.text = event.data.text
  }

  serialize() {
    return {
      ...super.serialize(),
      in: this.options.in,
      text: this.options.text
    }
  }

  changeText(text: string): MessagePortModel {
    this.options.text = text
    return this
  }

  link(port: PortModel): DefaultLinkModel | LinkModel {
    let link = this.createLinkModel()
    link.setSourcePort(this)
    link.setTargetPort(port)
    return link
  }

  canLinkToPort(port: PortModel): boolean {
    if (port instanceof MessagePortModel) {
      return this.options.in !== port.getOptions().in
    }
    return true
  }

  createLinkModel(): DefaultLinkModel | LinkModel {
    let link = super.createLinkModel()
    return link || new DefaultLinkModel()
  }

  locked(): MessagePortModel {
    this.parent.locked()
    return this
  }

  unlocked(): MessagePortModel {
    this.parent.unlocked()
    return this
  }
}


export default MessagePortModel