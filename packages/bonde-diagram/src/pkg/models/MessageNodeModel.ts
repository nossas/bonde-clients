import MessagePortModel from './MessagePortModel'
import TextNodeModel from './TextNodeModel'

class MessageNodeModel extends TextNodeModel {
	protected _next?: MessagePortModel

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

	next(): MessagePortModel | undefined {
		return this._next
	}
}

export default MessageNodeModel