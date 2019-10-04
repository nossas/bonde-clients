import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'
import { DefaultMessageModel } from '../models'

export type MessageUI = {
	layer: any,
	content: any,
	inPort: any,
	outPort: any,
	addReply?: any
}

export interface DefaultMessageFactoryOpts<T> {
	name: string,
	theme: MessageUI,
	model: T,
	widget: any
}

class DefaultMessageFactory<T extends DefaultMessageModel> extends AbstractReactFactory<T, DiagramEngine> {
	protected name: string
	protected theme: MessageUI
	protected model: T
	protected widget: any

	constructor(options: DefaultMessageFactoryOpts<T>) {
		super(options.name)
		this.name = options.name
		this.theme = options.theme
		this.model = options.model
		this.widget = options.widget
	}

	generateReactWidget(event: any): JSX.Element {
		const Widget = this.widget
		return (
			<Widget
				engine={this.engine}
				node={event.model}
				theme={this.theme}
			/>
		)
	}

	generateModel(event: any): T {
		const DefaultModel = this.model as DefaultMessageModel
		// @ts-ignore
		return new DefaultModel({ type: this.name, ...event.initialConfig })
	}
}

export default DefaultMessageFactory