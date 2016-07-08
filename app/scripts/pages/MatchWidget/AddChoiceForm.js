import React, { Component } from 'react'


class AddChoiceForm extends Component {

  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  handleUpdateChoices(e) {
    if (e) e.preventDefault()

    const { choices, updateChoices } = this.props
    if (this.state.value.length > 0 && choices.indexOf(this.state.value) === -1) {
      updateChoices([...choices, this.state.value])
    }
    this.setState({ value: '' })
  }

  render() {
    const { title, choices, updateChoices, label, onChangeLabel } = this.props
    return (
      <div className="sm-col sm-col-6">
        <div className="sm-col sm-col-11">
          <label>{title}</label>
          <input
            type="text"
            placeholder="Label"
            value={label}
            className="field-light block h3 full-width mt1 mb3"
            onChange={(e) => { onChangeLabel(e.target.value) }} />
        </div>
        <div className="sm-col sm-col-8">
          <input
            value={this.state.value}
            onChange={(e) => {
              this.setState({ value: e.target.value })
            }}
            type="text"
            className="field-light block h3 full-width mt1 mb3"
            placeholder="Escolha"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.handleUpdateChoices()
              }
            }} />
        </div>
        <div className="sm-col sm-col-3">
          <button className="button bg-aqua caps p2"
                  disabled={this.state.value.length === 0 ? true : null}
                  style={{marginTop: "8px"}}
                  onClick={::this.handleUpdateChoices}>
            <i class="fa fa-plus mr2"></i> Adicionar
          </button>
        </div>
        <table className="choices-block sm-col sm-col-11">
          <tbody>
          {choices.map((choice, index) => {
            return (
              <tr key={index}>
                <td><span>{choice}</span></td>
                <td><a href="#" onClick={(e) => {
                  if (e) e.preventDefault()
                  updateChoices(choices.filter((item) => {
                    return item !== choice
                  }))
                }}>Remover</a></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AddChoiceForm
