import {
	NodeModel,
	NodeModelGenerics
} from '@projectstorm/react-diagrams-core'
import {
	BasePositionModelOptions,
	DeserializeEvent
} from '@projectstorm/react-canvas-core'
import MessagePortModel from './MessagePortModel'

export interface ReplyNodeModelOptions extends BasePositionModelOptions {
	text: string
}

export interface ReplyNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: ReplyNodeModelOptions
}

class ReplyNodeModel extends NodeModel<ReplyNodeModelGenerics> {
	protected _previous?: MessagePortModel
	protected _replies: MessagePortModel[]

	constructor(options: any = {}) {
		if (typeof options === 'string') {
			options = {
				text: options
			}
		}
		super({ type: 'reply', ...options })
		this._replies = []

		if (options.ports && options.ports.length > 0) {
			options.ports.forEach((portOpts: any) => {
				this._generatePort(portOpts)
			})
		} else {
			this._generatePort({ in: true })
		}
	}

	_generatePort(portOpts: any) {
		if (portOpts.in) {
			this._previous = new MessagePortModel(portOpts)
			this.addPort(this._previous)
		} else {
			const reply = new MessagePortModel(portOpts)
			this._replies.push(reply)
			this.addPort(reply)
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

	previous(): MessagePortModel | undefined {
		return this._previous
	}

	replies(): MessagePortModel[] {
		return this._replies
	}

	quickReply(text: string) {
		this._generatePort({ in: false, label: text })
	}
}

export default ReplyNodeModel