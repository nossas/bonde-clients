import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'
import ActionNodeWidget from '../widgets/ActionNodeWidget'
import ActionNodeModel from '../models/ActionNodeModel'

export class ActionNodeFactory extends AbstractReactFactory<ActionNodeModel, DiagramEngine> {
	protected theme: any

	constructor(theme: any) {
		super('action')
		this.theme = theme
	}

	generateReactWidget(event: any): JSX.Element {
		return <ActionNodeWidget engine={this.engine} node={event.model} theme={this.theme} />
	}

	generateModel(event: any): ActionNodeModel {
		return new ActionNodeModel(event.initialConfig)
	}
}

export default ActionNodeFactory