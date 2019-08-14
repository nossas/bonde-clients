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
    return (
      <Field
        name='diagram'
        defaultValue={`{"id":"d55a4e57-c994-48af-8d15-b9e5673dfb60","offsetX":146.17740366299947,"offsetY":34.60050246278445,"zoom":61.12303094069163,"gridSize":0,"links":[{"id":"962b28c5-4719-47cf-a690-1687092789f0","type":"default","selected":false,"source":"0ad5fcde-83f0-46e8-a2a2-bee592509131","sourcePort":"ceeea1fd-2729-4a47-bdb7-0b6732b28a89","target":"e3cc9fab-4dba-478a-80a2-b137fa4c0970","targetPort":"24bc6c39-973e-455d-9c03-02072726e15b","points":[{"id":"0fa24ef4-7223-4ffe-b19b-a64b35dcf66e","selected":false,"x":335.0918451052424,"y":243.39725630105656},{"id":"1743d06b-7460-45e8-8fc5-54cb06046f0f","selected":false,"x":379.17158244394,"y":284.41270411134946}],"extras":{},"labels":[],"width":3,"color":"rgba(255,255,255,0.5)","curvyness":50}],"nodes":[{"id":"0ad5fcde-83f0-46e8-a2a2-bee592509131","type":"message","selected":true,"x":94.60034204309412,"y":199.8870720873634,"extras":{},"ports":[{"id":"ceeea1fd-2729-4a47-bdb7-0b6732b28a89","type":"default","selected":false,"name":"Out","parentNode":"0ad5fcde-83f0-46e8-a2a2-bee592509131","links":["962b28c5-4719-47cf-a690-1687092789f0"],"in":false}],"text":"Escreva sua mensagem aqui","kind":"text"},{"id":"e3cc9fab-4dba-478a-80a2-b137fa4c0970","type":"message","selected":false,"x":384.1802226150263,"y":244.4242296855004,"extras":{},"ports":[{"id":"24bc6c39-973e-455d-9c03-02072726e15b","type":"default","selected":false,"name":"In","parentNode":"e3cc9fab-4dba-478a-80a2-b137fa4c0970","links":["962b28c5-4719-47cf-a690-1687092789f0"],"in":true},{"id":"3cb9ccac-9eea-4562-a2a3-819acde4df73","type":"reply","selected":false,"name":"reply-port-3cb9ccac-9eea-4562-a2a3-819acde4df73","parentNode":"e3cc9fab-4dba-478a-80a2-b137fa4c0970","links":[],"in":false,"text":"Texto do botão"}],"text":"Escreva sua pergunta aqui","kind":"quick_reply"}]}`}
        component={DiagramField}
      />
    )
  }
}

export default CampaignDiagram
