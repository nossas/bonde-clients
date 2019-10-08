import * as SRD from "@projectstorm/react-diagrams"
import { DefaultMessageFactory, DefaultPortFactory } from "./defaults/factories"
import { DefaultPortModel } from "./defaults/models"
import { ActionMessageModel, ActionMessageWidget, ActionPortModel } from "./messages/action"
import { ReplyMessageModel, ReplyMessageWidget } from "./messages/reply"
import { TextMessageModel, TextMessageWidget } from "./messages/text"
import MessageUI from "./themes/MessageUI"

export interface ThemeUI {
  message: MessageUI,
  action: MessageUI,
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
    // register messages
    this.diagramEngine.getNodeFactories().registerFactory(
      new DefaultMessageFactory<TextMessageModel>({
        // @ts-ignore
        model: TextMessageModel,
        name: "message",
        theme: this.theme.message,
        widget: TextMessageWidget,
      }))
    this.diagramEngine.getNodeFactories().registerFactory(
      new DefaultMessageFactory<ReplyMessageModel>({
        // @ts-ignore
        model: ReplyMessageModel,
        name: "reply",
        theme: this.theme.reply,
        widget: ReplyMessageWidget,
      }))
    this.diagramEngine.getNodeFactories().registerFactory(
      new DefaultMessageFactory<ActionMessageModel>({
        // @ts-ignore
        model: ActionMessageModel,
        name: "action",
        theme: this.theme.action,
        widget: ActionMessageWidget,
      }))
    // register ports
    this.diagramEngine.getPortFactories().registerFactory(
      new DefaultPortFactory<DefaultPortModel>({
        // @ts-ignore
        model: DefaultPortModel,
        name: "port",
      }),
    )
    this.diagramEngine.getPortFactories().registerFactory(
      new DefaultPortFactory<ActionPortModel>({
        // @ts-ignore
        model: ActionPortModel,
        name: "action-port",
      }),
    )

    this.activeModel = new SRD.DiagramModel()
    this.activeModel.registerListener({
      eventDidFire: this.eventListener,
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
