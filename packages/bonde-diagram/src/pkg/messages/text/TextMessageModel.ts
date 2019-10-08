import { DefaultPortModel, DefaultMessageModel } from '../../defaults/models'

class TextMessageModel extends DefaultMessageModel {
	protected _next?: DefaultPortModel

	constructor(options: any = {}) {
		super({ type: 'message', ...options })

		if (!options.ports || options.ports.length === 0) {
			// default ports
			this.generatePort({ in: true })
			this.generatePort({ in: false })
		}
	}

	generatePort(portOpts: any) {
		if (portOpts.in) {
			this._previous = new DefaultPortModel(portOpts)
			this.addPort(this._previous)
		} else {
			this._next = new DefaultPortModel(portOpts)
			this.addPort(this._next)
		}
	}

	next(): DefaultPortModel | undefined {
		return this._next
	}
}

export default TextMessageModel