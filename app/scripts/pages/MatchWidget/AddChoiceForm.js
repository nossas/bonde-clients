import React, { Component } from 'react'


class AddChoiceForm extends Component {

  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange(e) {
    this.setState({ value: e.target.value})
  }

  render() {
    const { titleForm, choices, updateChoices } = this.props
    return (
      <div className="sm-col sm-col-6">
        <div className="sm-col sm-col-8">
          <label>{titleForm}</label>
          <input
            value={this.state.value}
            onChange={::this.handleChange}
            type="text"
            className="field-light block h3 full-width mt1 mb3"
            placeholder="Escolha" />
        </div>
        <div className="sm-col sm-col-3">
          <button className="button bg-aqua caps p2" style={{marginTop: "32px"}} onClick={(e) => {
            if (e) e.preventDefault()
              updateChoices([...choices, this.state.value])
              this.setState({ value: '' })
          }}>
            <i class="fa fa-plus mr2"></i> Adicionar
          </button>
        </div>
        <table className="choices-block sm-col sm-col-11">
          {choices.map((choice) => {
            return (
              <tr>
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
        </table>
      </div>
    )
  }
}

export default AddChoiceForm
