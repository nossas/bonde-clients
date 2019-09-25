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
    const serialized = {
      ...super.serialize(),
      in: this.options.in,
      text: this.options.text
    }
    // console.log('MessagePortModel.serialize', serialized)
    return serialized
  }

  changeText(text: string): MessagePortModel {
    // console.log('MessagePortModel.changeText', text)
    this.options.text = text
    return this
  }

  link(port: PortModel): DefaultLinkModel | LinkModel | void {
    let link = this.createLinkModel()

    if (!!link) {
      link.setSourcePort(this)
      link.setTargetPort(port)
      return link
    }
  }

  canLinkToPort(port: PortModel): boolean {
    console.log('canLinkToPort', port)
    if (port instanceof MessagePortModel) {
      console.log('canLinkToPort inside', this)
      return this.options.in !== port.getOptions().in
    }
    return true
  }

  createLinkModel(): DefaultLinkModel | LinkModel | null {
    // Locked one link by port
    if (Object.values(this.links).length === 0) {
      let link = super.createLinkModel()
      return link || new DefaultLinkModel()
    }
    return null
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