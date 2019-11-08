import { DeserializeEvent } from '@projectstorm/react-canvas-core'
import DefaultMessageModel, {
	DefaultMessageModelOptions,
	DefaultMessageModelGenerics
} from '../../defaults/models/DefaultMessageModel'
import ActionPortModel from './ActionPortModel'

export interface ActionMessageModelOptions extends DefaultMessageModelOptions {
	actionId?: number,
	invalidLabel?: string,
	validLabel?: string
}

export interface ActionMessageModelGenerics extends DefaultMessageModelGenerics {
	OPTIONS: ActionMessageModelOptions
}

class ActionMessageModel extends DefaultMessageModel<ActionMessageModelGenerics> {
	protected _onSuccess?: ActionPortModel
	protected _onFail?: ActionPortModel

	constructor(options: ActionMessageModelOptions) {
		super({ type: 'action', ...options })

		if (!options.ports || !options.ports.length) {
			// Default ports
			this.generatePort({ in: true })
			this.generatePort({ in: false, text: options.validLabel, success: true })
			this.generatePort({ in: false, text: options.invalidLabel })
		}
	}

	generatePort(portOpts: any) {
		if (portOpts.in) {
			this._previous = new ActionPortModel(portOpts)
			this.addPort(this._previous)
		} else if (portOpts.success) {
			this._onSuccess = new ActionPortModel(portOpts)
			this.addPort(this._onSuccess)
		} else {
			this._onFail = new ActionPortModel(portOpts)
			this.addPort(this._onFail)
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

	getActions(): any {
		if (!!this._onSuccess && !!this._onFail) {
			return [this._onSuccess, this._onFail]
		}
		return []
	}

	changeAction(actionId: number) {
		this.options.actionId = actionId
	}
}

export default ActionMessageModel