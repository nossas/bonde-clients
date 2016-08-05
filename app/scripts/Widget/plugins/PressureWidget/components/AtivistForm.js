import React, { Component, PropTypes } from 'react'

// TODO: Reusable Input
const controlClassname = 'px3 py1 border-top'
const inputReset = {
  border: 'none',
  padding: '0',
  height: '2rem'
}


class AtivistForm extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', name: '', lastName: '' }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    onSubmit && onSubmit(this.state)
  }

  render() {
    const { buttonColor } = this.props
    return (
      <form className="ativist-form bg-white" onSubmit={::this.handleSubmit}>
        <div className={controlClassname}>
          <label className="flex">E-mail</label>
          <input
            className="col-12"
            style={inputReset}
            type="email"
            placeholder="exemplo@email.com"
            onChange={e => this.setState({ email: e.target.value})} />
        </div>
        <div className={controlClassname}>
          <label className="flex">Seu nome</label>
          <input
            className="col-12"
            style={inputReset}
            type="text"
            placeholder="Nome"
            onChange={e => this.setState({ name: e.target.value})} />
        </div>
        <div className={controlClassname}>
          <label className="flex" htmlFor="last_nameId">Seu sobrenome</label>
          <input
            className="col-12"
            style={inputReset}
            type="text"
            placeholder="Sobrenome"
            onChange={e => this.setState({ lastName: e.target.value})} />
        </div>
        <div className="p3 border-top">
          <button type="submit" className="caps white col-12 py2 rounded" style={{backgroundColor: buttonColor}}>Enviar email</button>
        </div>
      </form>
    )
  }
}

AtivistForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonColor: PropTypes.string
}


export default AtivistForm
