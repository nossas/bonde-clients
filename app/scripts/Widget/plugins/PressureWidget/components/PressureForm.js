import React, { Component, PropTypes } from 'react'

import { isValidEmail } from '../../../../../util/validation-helper'

// TODO: Reusable Input
const controlClassname = 'px3 py1 border-top'
const inputReset = {
  border: 'none',
  padding: '0',
  height: '2rem',
  outline: 'none'
}


class PressureForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      lastname: '',
      subject: props.subject,
      body: props.body
    }
  }

  validate() {
    const requiredMsg = 'Preenchimento obrigatório'
    const errors = { valid: true }
    if (!this.state.email) {
      errors.valid = false
      errors.email = requiredMsg
    } else if (!isValidEmail(this.state.email)) {
      errors.valid = false
      errors.email = 'E-mail inválido'
    }
    if (!this.state.name) {
      errors.valid = false
      errors.name = requiredMsg
    }
    if (!this.state.lastname) {
      errors.valid = false
      errors.lastname = requiredMsg
    }
    if (!this.state.subject) {
      errors.valid = false
      errors.subject = requiredMsg
    }
    if (!this.state.body) {
      errors.valid = false
      errors.body = requiredMsg
    }
    return errors
  }

  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const errors = this.validate()
    if (!errors.valid) {
      this.setState({ errors })
    } else {
      onSubmit && onSubmit(this.state)
    }
  }

  render() {
    const { buttonColor, buttonText, children } = this.props
    const { email, name, lastname, subject, body, errors } = this.state
    const errorSpanStyle = {
      fontSize: '.95em'
    }
    return (
      <form onSubmit={::this.handleSubmit}>
        <div className="ativist-form bg-white">
          <div className={controlClassname}>
            {(errors && errors['email'] && <span className="red">{errors['email']}</span>)}
            <input
              className="col-12"
              style={inputReset}
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className={controlClassname}>
            {(errors && errors['name'] && <span className="red">{errors['name']}</span>)}
            <input
              className="col-12"
              style={inputReset}
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className={controlClassname}>
            {(errors && errors['lastname'] && <span className="red">{errors['lastname']}</span>)}
            <input
              className="col-12"
              style={inputReset}
              type="text"
              placeholder="Seu sobrenome"
              value={lastname}
              onChange={e => this.setState({ lastname: e.target.value })}
            />
          </div>
          <div className="p3 border-top">
            <button
              type="submit"
              onClick={::this.handleSubmit} // TODO: I don't undestand "the because" this line
              className="caps white col-12 py2 rounded"
              style={{backgroundColor: buttonColor}}
            >
              {buttonText}
            </button>
          </div>
        </div>
        {children}
        <div className="pressure-form mt3">
          <h4 className="rounded-top m0 center py1" style={{backgroundColor: '#222'}}>
            <span className="white bold">Texto do e-mail</span>
          </h4>
          <div className="bg-white rounded-bottom">
            <div className={controlClassname}>
              <label className="py1 gray" htmlFor="pressure-subject-id">Assunto</label>
              {(errors && errors['subject'] && <span className="red ml1" style={errorSpanStyle}>{errors['subject']}</span>)}
              <input
                id="pressure-subject-id"
                className="col-12"
                style={inputReset}
                type="text"
                value={subject}
                onChange={e => this.setState({ subject: e.target.value })}
              />
            </div>
            <div className={controlClassname}>
              <label className="py1 gray" htmlFor="pressure-body-id">E-mail</label>
              {(errors && errors['body'] && <span className="red ml1" style={errorSpanStyle}>{errors['body']}</span>)}
              <textarea
                id="pressure-body-id"
                className="col-12"
                style={{...inputReset, height: '13rem'}}
                value={body}
                onChange={e => this.setState({ body: e.target.value })}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

PressureForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string
}

PressureForm.defaultProps = {
  subject: '',
  body: ''
}


export default PressureForm
