import uuid from 'uuid'
import {
  PortModel,
  PortModelAlignment,
  PortModelGenerics,
  PortModelOptions
} from '@projectstorm/react-diagrams-core'
import { DefaultLinkModel } from '@projectstorm/react-diagrams-defaults'
import { DeserializeEvent } from '@projectstorm/react-canvas-core'
import DefaultMessageModel from './DefaultMessageModel'

export interface DefaultPortModelOptions extends PortModelOptions {
  text?: string;
  in?: boolean;
}

export interface DefaultPortModelGenerics extends PortModelGenerics {
  OPTIONS: DefaultPortModelOptions
  PARENT: DefaultMessageModel
}

class DefaultPortModel<T extends DefaultPortModelGenerics = DefaultPortModelGenerics> extends PortModel<T> {
  constructor(options: DefaultPortModelOptions) {
    super({
      alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
      name: options.name || `${options.type || 'port'}-${uuid.v4()}`,
      type: options.type || 'port',
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

  changeText(text: string): DefaultPortModel {
    this.options.text = text
    return this
  }

  link(port: PortModel): DefaultLinkModel | void {
    let link = this.createLinkModel()

    if (!!link) {
      link.setSourcePort(this)
      link.setTargetPort(port)
      return link
    }
  }

  canLinkToPort(port: PortModel): boolean {
    if (port instanceof DefaultPortModel) {
      return this.options.in !== port.getOptions().in
    }
    return true
  }

  createLinkModel(): DefaultLinkModel | null {
    // Locked one link by port
    if (Object.values(this.links).length === 0) {
      let link = super.createLinkModel()
      return link as DefaultLinkModel || new DefaultLinkModel()
    }
    return null
  }

  locked(): DefaultPortModel {
    this.parent.locked()
    return this
  }

  unlocked(): DefaultPortModel {
    this.parent.unlocked()
    return this
  }
}


export default DefaultPortModel