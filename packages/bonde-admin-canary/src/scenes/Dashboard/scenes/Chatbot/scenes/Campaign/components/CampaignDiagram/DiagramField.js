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
import AddReply from './AddReply'
import ZoomButton from './ZoomButton'

const CustomReplyUI = {
  ...DiagramStyleguide.MessageWithReplyUI,
  addReply: AddReply
}

class DiagramField extends React.Component {
  constructor (props) {
    super(props)
    this.app = new DiagramApplication({
      message: DiagramStyleguide.MessageUI,
      reply: CustomReplyUI
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
    this.app
      .getActiveDiagram()
      .deserializeModel(value, this.app.getDiagramEngine())
  }

  handleChange (evt) {
    const value = this.serialize()
    console.log('DiagramField.handleChange', value)
    this.setFormValue(value)
  }

  handleCreateNode (kind, size) {
    // TODO: add translate
    if (kind === 'message') {
      return new MessageNodeModel('Escreva sua mensagem aqui')
    } else if (kind === 'reply') {
      const node = new ReplyNodeModel('Escreva sua mensagem aqui')
      node.quickReply('Texto do botão')
      return node
    }
    // eslint-disable-next-line
    throw new Exception(`Model kind ${model.kind} isnt mapped on diagram.`)
  }

  render () {
    return (
      <DiagramProvider app={this.app}>
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          <Toolbar>
            <ToolbarButton kind='message'>
              <Icon size={30} name='ballon-text' />
              <Title.H5 align='center'>MSG</Title.H5>
            </ToolbarButton>
            <ToolbarButton kind='reply'>
              <Icon size={30} name='ballon' />
              <Title.H5 align='center'>BOTÃO</Title.H5>
            </ToolbarButton>
          </Toolbar>
          <Layer
            background='rgba(255,255,255,0.5)'
            color='rgba(0,0,0,0.05)'
            onCreateNode={this.handleCreateNode.bind(this)} />
          <ZoomButton />
        </div>
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
