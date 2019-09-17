import React from 'react'
import PropTypes from 'prop-types'
import {
  DiagramApplication,
  DiagramProvider,
  Layer,
  MessageNodeModel,
  ReplyNodeModel
} from 'bonde-diagram'
import { Flexbox2 as Flexbox, Icon, Spacing, Text, Title } from 'bonde-styleguide'
import * as DiagramStyleguide from 'bonde-styleguide/dist/components/diagram'
import Toolbar, { Button as ToolbarButton } from './Toolbar'
import ZoomButton from './ZoomButton'

class DiagramField extends React.Component {
  constructor (props) {
    super(props)
    this.app = new DiagramApplication({
      message: DiagramStyleguide.MessageUI,
      reply: DiagramStyleguide.MessageWithReplyUI
    }, this.handleChange.bind(this))
    // check default value received on Field
    const value = this.getFormValue()
    if (value) {
      this.deserialize(value)
    }
  }

  getFormValue () {
    const { input, defaultValue } = this.props
    return input.value || defaultValue ? JSON.parse(input.value || defaultValue) : undefined
  }

  setFormValue (value) {
    const { input } = this.props
    input.onChange(JSON.stringify(value))
  }

  serialize () {
    return this.app.getActiveDiagram().serialize()
  }

  deserialize (value) {
    console.log('deserialize', value)
    this.app
      .getActiveDiagram()
      .deserializeModel(value, this.app.getDiagramEngine())
  }

  handleChange (evt) {
    this.setFormValue(this.serialize())
  }

  handleCreateNode (kind, size) {
    // TODO: add translate
    switch (kind) {
      case 'message':
        return new MessageNodeModel('Escreva sua mensagem aqui')
      case 'reply':
        const node = new ReplyNodeModel('Escreva sua mensagem aqui')
        node.quickReply('Texto do botão')
        return node
      default:
        // eslint-disable-next-line
        throw new Exception(`Model kind ${model.kind} isnt mapped on diagram.`)
    }
  }

  render () {
    return (
      <DiagramProvider app={this.app}>
        <Flexbox vertical>
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Layer
              background='rgba(255,255,255,0.5)'
              color='rgba(0,0,0,0.05)'
              onCreateNode={this.handleCreateNode.bind(this)} />
            <ZoomButton />
          </div>
          <Flexbox horizantal spacing='between'>
            <Toolbar>
              <ToolbarButton kind='message'>
                <Icon size={30} name='ballon-text' />
                <Title.H4>Criar mensagem</Title.H4>
              </ToolbarButton>
              <ToolbarButton kind='reply'>
                <Icon size={30} name='ballon' />
                <Title.H4>Criar resposta</Title.H4>
              </ToolbarButton>
            </Toolbar>
            <Spacing margin={{ top: 10 }}>
              <ul>
                <li><Text fontSize={12}>[DOUBLE-CLICK]: Editar conteúdo</Text></li>
                <li><Text fontSize={12}>[CTRL + ENTER]: Salvar edição</Text></li>
                <li><Text fontSize={12}>[ESC]: Cancelar edição</Text></li>
                <li><Text fontSize={12}>[DELETE]: Remover mensagem</Text></li>
              </ul>
            </Spacing>
          </Flexbox>
        </Flexbox>
      </DiagramProvider>
    )
  }
}

DiagramField.propTypes = {
  defaultValue: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  })
}

export default DiagramField