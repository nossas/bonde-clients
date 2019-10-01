import { DeserializeEvent } from '@projectstorm/react-canvas-core'
import MessagePortModel from './MessagePortModel'
import TextNodeModel, { TextNodeModelOptions, TextNodeModelGenerics } from './TextNodeModel'

export interface ActionNodeModelOptions extends TextNodeModelOptions {
	actionId: number,
	ports?: [MessagePortModel]
}

export interface ActionNodeModelGenerics extends TextNodeModelGenerics {
	OPTIONS: ActionNodeModelOptions
}

class ActionNodeModel extends TextNodeModel<ActionNodeModelGenerics> {
	protected _next?: MessagePortModel

	constructor(options: ActionNodeModelOptions) {
		super({ type: 'action', ...options })

		if (options.ports && options.ports.length > 0) {
			options.ports.forEach((portOpts: any) => {
				this._generatePort(portOpts)
			})
		} else {
			this._generatePort({ in: true })
			this._generatePort({ in: false, text: 'Mensagem de sucesso' })
		}
	}

	_generatePort(portOpts: any) {
		if (portOpts.in) {
			this._previous = new MessagePortModel(portOpts)
			this.addPort(this._previous)
		} else {
			this._next = new MessagePortModel(portOpts)
			this.addPort(this._next)
		}
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event)
		this.options.actionId = event.data.actionId
		this.options.text = event.data.text
	}

	serialize(): any {
		return {
			...super.serialize(),
			actionId: this.options.actionId,
			text: this.options.text
		}
	}

	next(): MessagePortModel | undefined {
		return this._next
	}
}

export default ActionNodeModel