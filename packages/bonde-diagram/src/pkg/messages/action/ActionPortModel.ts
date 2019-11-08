import { DeserializeEvent } from '@projectstorm/react-canvas-core'
import DefaultPortModel, {
  DefaultPortModelOptions,
  DefaultPortModelGenerics
} from '../../defaults/models/DefaultPortModel'
import ActionMessageModel from './ActionMessageModel'

export interface ActionPortModelOptions extends DefaultPortModelOptions {
  success?: boolean
}

export interface ActionPortModelGenerics extends DefaultPortModelGenerics {
  OPTIONS: ActionPortModelOptions;
  PARENT: ActionMessageModel;
}

class ActionPortModel extends DefaultPortModel<ActionPortModelGenerics> {
  constructor(options: ActionPortModelOptions) {
    super({ type: 'action-port', ...options })
  }

  deserialize(event: DeserializeEvent<this>) {
    super.deserialize(event)
    this.options.success = event.data.success
  }

  serialize() {
    const serialized = {
      ...super.serialize(),
      success: this.options.success
    }
    return serialized
  }
}


export default ActionPortModel