import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'
import ReplyNodeWidget from '../widgets/ReplyNodeWidget'
import ReplyNodeModel from '../models/ReplyNodeModel'

export class ReplyNodeFactory extends AbstractReactFactory<ReplyNodeModel, DiagramEngine> {
	protected theme: any

	constructor(theme: any) {
		super('reply')
		this.theme = theme
	}

	generateReactWidget(event: any): JSX.Element {
		return <ReplyNodeWidget engine={this.engine} node={event.model} theme={this.theme} />
	}

	generateModel(event: any): ReplyNodeModel {
		return new ReplyNodeModel(event.initialConfig)
	}
}

export default ReplyNodeFactory