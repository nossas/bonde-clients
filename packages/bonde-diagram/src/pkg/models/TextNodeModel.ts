import {
	NodeModel,
	NodeModelGenerics
} from '@projectstorm/react-diagrams-core'
import {
	BasePositionModelOptions,
	DeserializeEvent
} from '@projectstorm/react-canvas-core'
import MessagePortModel from './MessagePortModel'

export interface TextNodeModelOptions extends BasePositionModelOptions {
	text: string
}

export interface TextNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: TextNodeModelOptions
}

class TextNodeModel extends NodeModel<TextNodeModelGenerics> {
	public _previous?: MessagePortModel

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

	changeText(text: string): TextNodeModel {
		this.options.text = text
		return this
	}

	locked(): TextNodeModel {
		this.options.locked = true
		return this
	}

	unlocked(): TextNodeModel {
		this.options.locked = false
		return this
	}
}

export default TextNodeModel