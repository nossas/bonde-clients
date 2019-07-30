import React, { Component } from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Page, Header } from 'components/PageLogged'
import { BondeDiagram, BondeDiagramApplication } from 'bonde-diagram'
import { MessageNodeModel } from 'bonde-diagram/lib/beta/models'
// set style of diagram
import 'bonde-diagram/lib/sass/main.scss'

class EditCampaign extends Component {
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
      <I18n ns='home'>
        {t => (
          <Page renderTitle={() => (<Header.Title>Chatbot</Header.Title>)}>
            <Flexbox vertical>
              <Grid>
                <Cell size={[12, 12, 12]}>
                  <BondeDiagram
                    app={this.app}
                    createMessage={this.handleCreateMessage.bind(this)}
                  />
                </Cell>
              </Grid>
            </Flexbox>
          </Page>
        )}
      </I18n>
    )
  }
}

export default EditCampaign
