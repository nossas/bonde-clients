import * as SRD from '@projectstorm/react-diagrams'
import MessageNodeFactory from './factories/MessageNodeFactory'
import ReplyNodeFactory from './factories/ReplyNodeFactory'
import MessagePortFactory from './factories/MessagePortFactory'
import MessageUI from './themes/MessageUI'

export type ThemeUI = {
	message: MessageUI,
	reply: MessageUI
}

class Application {
	protected theme: ThemeUI
	protected activeModel: SRD.DiagramModel
	protected diagramEngine: SRD.DiagramEngine
	protected eventListener: any

	constructor(theme: ThemeUI, eventListener?: any) {
		this.theme = theme
		this.eventListener = eventListener
		this.diagramEngine = SRD.default()
		// install bonde-diagram default factories
		this.diagramEngine.getNodeFactories().registerFactory(new MessageNodeFactory(this.theme.message))
		this.diagramEngine.getNodeFactories().registerFactory(new ReplyNodeFactory(this.theme.reply))
		this.diagramEngine.getPortFactories().registerFactory(new MessagePortFactory())

		this.activeModel = new SRD.DiagramModel()
		this.activeModel.registerListener({
			eventDidFire: this.eventListener
		})
		this.diagramEngine.setModel(this.activeModel)
	}

	public newModel() {
		this.activeModel = new SRD.DiagramModel()
		this.diagramEngine.setModel(this.activeModel)
	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine
	}

	public getEventListener(): any {
		return this.eventListener
	}
}

export default Application