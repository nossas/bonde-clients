import {
	NodeModel,
	NodeModelGenerics
} from '@projectstorm/react-diagrams-core'
import {
	BasePositionModelOptions,
	DeserializeEvent
} from '@projectstorm/react-canvas-core'
import DefaultPortModel from './DefaultPortModel'

export interface DefaultMessageModelOptions extends BasePositionModelOptions {
	text: string,
	ports?: [DefaultPortModel]
}

export interface DefaultMessageModelGenerics extends NodeModelGenerics {
	OPTIONS: DefaultMessageModelOptions
}

class DefaultMessageModel<T extends DefaultMessageModelGenerics = DefaultMessageModelGenerics> extends NodeModel<T> {
	protected _previous?: DefaultPortModel

	constructor(options: DefaultMessageModelOptions) {
		super(options)

		if (options.ports && options.ports.length > 0) {
			options.ports.forEach((portOpts: any) => this.generatePort(portOpts))
		}
	}

	generatePort(portOptions: any) {
		console.log('generatePort not implemented:', portOptions)
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event)
		this.options.text = event.data.text
	}

	serialize(): any {
		return {
			...super.serialize(),
			text: this.options.text
		}
	}

	previous(): DefaultPortModel | undefined {
		return this._previous
	}

	setPrevious(port: DefaultPortModel): void {
		this._previous = port
	}

	changeText(text: string): DefaultMessageModel<T> {
		this.options.text = text
		return this
	}

	locked(): DefaultMessageModel<T> {
		this.options.locked = true
		return this
	}

	unlocked(): DefaultMessageModel<T> {
		this.options.locked = false
		return this
	}
}

export default DefaultMessageModel