import {
	NodeModel,
	NodeModelGenerics
} from '@projectstorm/react-diagrams-core'
import {
	BasePositionModelOptions,
	DeserializeEvent
} from '@projectstorm/react-canvas-core'
import MessagePortModel from './MessagePortModel'

export interface MessageNodeModelOptions extends BasePositionModelOptions {
	text: string
}

export interface MessageNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: MessageNodeModelOptions
}

class MessageNodeModel extends NodeModel<MessageNodeModelGenerics> {
	protected _next?: MessagePortModel
	protected _previous?: MessagePortModel

	constructor(options: any = {}) {
		if (typeof options === 'string') {
			options = {
				text: options
			}
		}
		super({ type: 'message', ...options })

		if (options.ports && options.ports.length > 0) {
			options.ports.forEach((portOpts: any) => {
				this._generatePort(portOpts)
			})
		} else {
			this._generatePort({ in: false })
			this._generatePort({ in: true })
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
		this.options.text = event.data.text
	}

	serialize(): any {
		return {
			...super.serialize(),
			text: this.options.text
		}
	}

	next(): MessagePortModel | undefined {
		return this._next
	}

	previous(): MessagePortModel | undefined {
		return this._previous
	}
}

export default MessageNodeModel