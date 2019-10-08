import { DefaultMessageModel, DefaultPortModel } from '../../defaults/models'

class ReplyNodeModel extends DefaultMessageModel {
	protected _replies?: DefaultPortModel[]

	constructor(options: any = {}) {
		super({ type: 'reply', ...options })

		if (!options.ports || !options.ports.length) {
			// default ports
			this.generatePort({ in: true })
			if (!!options.replies) {
				options.replies.forEach(
					(replyText: string) => this.generatePort({ in: false, text: replyText }))
			}
		}
	}

	generatePort(portOpts: any) {
		if (portOpts.in) {
			this._previous = new DefaultPortModel(portOpts)
			this.addPort(this._previous)
		} else {
			const reply = new DefaultPortModel(portOpts)

			if (!this._replies) this._replies = []
			this._replies.push(reply)

			this.addPort(reply)
		}
	}

	replies(): DefaultPortModel[] {
		return this._replies || [] as DefaultPortModel[]
	}

	quickReply(text: string) {
		this.generatePort({ in: false, text })
	}
}

export default ReplyNodeModel