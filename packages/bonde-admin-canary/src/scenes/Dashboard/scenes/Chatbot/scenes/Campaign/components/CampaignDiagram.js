import React from 'react'
import PropTypes from 'prop-types'
import { BondeDiagram, BondeDiagramApplication } from 'bonde-diagram'
import { MessageNodeModel } from 'bonde-diagram/lib/bot'
import { Field } from 'components/Form'
// styles bonde-diagram
import 'bonde-diagram/lib/sass/main.scss'

class DiagramField extends React.Component {
  constructor (props) {
    super(props)
    this.app = new BondeDiagramApplication()
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
    return this.app.getActiveDiagram().serializeDiagram()
  }

  deserialize (value) {
    this.app
      .getActiveDiagram()
      .deSerializeDiagram(value, this.app.getDiagramEngine())
  }

  handleChange () {
    this.setFormValue(this.serialize())
  }

  handleCreateMessage (model, nodesCount) {
    // TODO: add translate
    let node
    if (nodesCount === 0 && model.kind === 'text') {
      // when the first message on diagram model should only has output port
      node = new MessageNodeModel('Escreva sua mensagem aqui', model.kind)
      node.addOutPort('Out')
    } else if (nodesCount === 0 && model.kind === 'quick_reply') {
      // when the first message on diagram model should only has output port
      node = new MessageNodeModel('Escreva sua mensagem aqui', model.kind)
      node.addQuickReply('Texto do botão')
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
        onUpdate={this.handleChange.bind(this)}
      />
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

class CampaignDiagram extends React.Component {
  render () {
    const { campaign } = this.props

    return (
      <Field
        name='campaign.diagram'
        defaultValue={campaign.diagram}
        component={DiagramField}
      />
    )
  }
}

CampaignDiagram.propTypes = {
  campaign: PropTypes.object.isRequired
}

export default CampaignDiagram
