import React from 'react'
import {
  DiagramApplication,
  DiagramProvider,
  Draggable,
  Layer
} from './pkg'
import MessageNodeModel from './pkg/models/MessageNodeModel'
import ReplyNodeModel from './pkg/models/ReplyNodeModel'
import * as StyleguideDiagram from 'bonde-styleguide/dist/components/diagram'

class App extends React.Component {
  app: DiagramApplication

  constructor(props: any) {
    super(props)
    this.app = new DiagramApplication({
      message: StyleguideDiagram.MessageUI,
      reply: StyleguideDiagram.MessageWithReplyUI
    })
  }

  handleCreateNode(kind: string, size: number) {
    if (kind === 'message') {
      return new MessageNodeModel(`Message #${size}`)
    }
    const message = new ReplyNodeModel(`Reply #${size}`)
    message.quickReply('quick_reply 1')
    message.quickReply('quick_reply 2')
    return message
  }

  serialize() {
    console.log('Serilized', this.app.getActiveDiagram().serialize())
  }

  render() {
    return (
      <DiagramProvider app={this.app}>
        <div className="App">
          <button onClick={this.serialize.bind(this)}>Serialize</button>
          <div>
            <Draggable kind='message'>Mensagem</Draggable>
            <Draggable kind='reply'>Pergunta</Draggable>
          </div>
          <div style={{ height: '600px' }}>
            <Layer background='rgba(255,255,255,0.5)' color='rgba(0,0,0,0.05)' onCreateNode={this.handleCreateNode.bind(this)} />
          </div>
        </div>
      </DiagramProvider>
    );
  }
}

export default App;
