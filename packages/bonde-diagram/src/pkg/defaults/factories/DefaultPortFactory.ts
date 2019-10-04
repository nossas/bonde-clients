import { AbstractModelFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'
import { DefaultPortModel } from '../models'

export interface DefaultPortFactoryOptions<T extends DefaultPortModel> {
	name: string,
	model: T
}

class DefaultPortFactory<T extends DefaultPortModel = DefaultPortModel> extends AbstractModelFactory<T, DiagramEngine> {
	protected name: string
	protected model: T

  constructor(options: DefaultPortFactoryOptions<T>) {
    super(options.name)
    this.name = options.name
    this.model = options.model
  }

  generateModel(event: any): T {
    const Model = this.model
    return new Model({ type: this.name, ...event.initialConfig })
  }
}

export default DefaultPortFactory