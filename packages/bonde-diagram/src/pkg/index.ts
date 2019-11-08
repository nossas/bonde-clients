export { default as DiagramApplication } from "./Application"
export { default as DiagramProvider } from "./Provider"

export { default as Draggable } from "./components/Draggable"
export { default as Zoom } from "./components/Zoom"
export { default as Layer } from "./components/Layer"

export { default as ActionMessageModel } from "./messages/action/ActionMessageModel"
export { default as ReplyMessageModel } from "./messages/reply/ReplyMessageModel"
export { default as TextMessageModel } from "./messages/text/TextMessageModel"

import DiagramApplication from "./Application"
import Layer from "./components/Layer"
import TextMessageModel from "./messages/text/TextMessageModel"

export const createFirstMessage = (text: string): any => {
  const DummyUI = {
    addReply: Layer,
    content: Layer,
    inPort: Layer,
    layer: Layer,
    outPort: Layer,
  }
  const DummyThemeUI = {
    action: DummyUI,
    message: DummyUI,
    reply: DummyUI,
  }

  const node = new TextMessageModel({ text })
  node.setPosition(200, 50)

  const app = new DiagramApplication(DummyThemeUI)

  app.getActiveDiagram().addNode(node)
  app.getDiagramEngine().repaintCanvas()

  return app.getActiveDiagram().serialize()
}
