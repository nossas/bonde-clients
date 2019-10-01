import MessagePortModel from './MessagePortModel'
import TextNodeModel, { TextNodeModelGenerics } from './TextNodeModel'

class ReplyNodeModel extends TextNodeModel<TextNodeModelGenerics> {
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

	replies(): MessagePortModel[] {
		return this._replies
	}

	quickReply(text: string) {
		this._generatePort({ in: false, text })
	}
}

export default ReplyNodeModel