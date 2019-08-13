import React from 'react'
import { BondeDiagram, BondeDiagramApplication } from 'bonde-diagram'
import { MessageNodeModel } from 'bonde-diagram/lib/beta/models'
// styles bonde-diagram
import 'bonde-diagram/lib/sass/main.scss'

class CampaignDiagram extends React.Component {
  constructor (props) {
    super(props)
    this.app = new BondeDiagramApplication()
  }

  handleCreateMessage (model, nodesCount) {
    // TODO: add translate
    let node
    if (nodesCount === 0 && model.kind === 'text') {
      // when the first message on diagram model should only has output port
      node = new MessageNodeModel('Escreva sua mensagem aqui', model.kind)
      node.addOutPort('Out')
    } else if (model.kind === 'text') {
      node = new MessageNodeModel('Escreva sua mensagem aqui', model.kind)
      node.addOutPort('Out')
      node.addInPort('In')
    } else if (model.kind === 'quick_reply') {
      node = new MessageNodeModel('Escreva sua pergunta aqui', model.kind)
      node.addInPort('In')
      node.addQuickReply('Texto do botão')
    } else {
      // eslint-disable-next-line
      throw new Exception(`Model kind ${model.kind} isnt mapped on diagram.`)
    }

    return node
  }

  render () {
    return (
      <BondeDiagram
        app={this.app}
        createMessage={this.handleCreateMessage.bind(this)}
      />
    )
  }
}

export default CampaignDiagram
