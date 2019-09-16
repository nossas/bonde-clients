import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'
import MessageNodeWidget from '../widgets/MessageNodeWidget'
import MessageNodeModel from '../models/MessageNodeModel'

export class MessageNodeFactory extends AbstractReactFactory<MessageNodeModel, DiagramEngine> {
	protected theme: any

	constructor(theme: any) {
		super('message')
		this.theme = theme
	}

	generateReactWidget(event: any): JSX.Element {
		return <MessageNodeWidget engine={this.engine} node={event.model} theme={this.theme} />
	}

	generateModel(event: any): MessageNodeModel {
		return new MessageNodeModel(event.initialConfig)
	}
}

export default MessageNodeFactory