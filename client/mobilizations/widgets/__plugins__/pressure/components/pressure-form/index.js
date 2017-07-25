import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import * as pressureHelper from '~client/mobilizations/widgets/utils/pressure-helper'
import { isValidEmail, isValidPhoneE164 } from '~client/utils/validation-helper'
import AnalyticsEvents from '~client/mobilizations/widgets/utils/analytics-events'

if (require('exenv').canUseDOM) require('./index.scss')

// TODO: Reusable Input
const controlClassname = 'px3 py1'
const inputReset = {
  border: 'none',
  padding: '0',
  height: '2rem',
  outline: 'none'
}

class PressureForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      phone: '',
      name: '',
      lastname: '',
      city: '',
      subject: props.subject,
      body: props.body,
      pressureType: pressureHelper.getType(props.targetList) || undefined
    }
  }

  validate () {
    const { targetList, widget: { settings: { show_city: showCity } } } = this.props
    const requiredMsg = 'Preenchimento obrigatório'
    const errors = { valid: true }

    if (this.state.pressureType === pressureHelper.PRESSURE_TYPE_EMAIL) {
      if (!this.state.email) {
        errors.email = requiredMsg
      } else if (!isValidEmail(this.state.email)) {
        errors.email = 'E-mail inválido'
      } else if (targetList && targetList.some(target => target.match(`<${this.state.email}>`))) {
        errors.email = 'O email que você está tentando usar é de um dos alvos da mobilização.'
      }
      if (!this.state.subject) {
        errors.subject = requiredMsg
      }
      if (!this.state.body) {
        errors.body = requiredMsg
      }
    }
    if (this.state.pressureType === pressureHelper.PRESSURE_TYPE_PHONE) {
      const { phone } = this.state
      const phoneE164 = /^\+/.test(phone) ? phone : `+${phone}`
      if (!phone) {
        errors.phone = requiredMsg
      } else if (!isValidPhoneE164(phoneE164)) {
        if ([11, 12].includes(phoneE164.length)) {
          errors.phone = 'Informe o código do país e o DDD com dois dígitos. Ex: +5511'
        } else {
          errors.phone = 'Telefone inválido'
        }
      } else if (
        targetList &&
        targetList.some(
          target => target.replace(/\D/g, '')
            .match(`${this.state.phone.replace(/\D/g, '')}`)
        )
      ) {
        errors.phone = 'O telefone que você está tentando usar é de um dos alvos da mobilização.'
      }
    }
    if (!this.state.name) {
      errors.name = requiredMsg
    }
    if (!this.state.lastname) {
      errors.lastname = requiredMsg
    }
    if (showCity === 'city-true' && !this.state.city) {
      errors.city = requiredMsg
    }

    if (Object.keys(errors).length > 1) {
      errors.valid = false
    }
    return errors
  }

  handleSubmit (e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const errors = this.validate()

    this.setState({ errors })
    if (errors.valid) onSubmit && onSubmit(this.state)
  }

  render () {
    const { buttonColor, buttonText, children, widget, disabled } = this.props
    const { email, phone, name, lastname, city, subject, body, errors } = this.state
    return (
      <form className='pressure-form' onSubmit={::this.handleSubmit}>
        <div className={classnames('activist-form bg-white', !children ? 'rounded-bottom' : null)}>
          <div className='form bg-white rounded-bottom'>
            {this.state.pressureType === 'email' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-sender-email-id'>
                  E-mail
                  {(errors && errors['email'] && <span className='error'>{errors['email']}</span>)}
                </label>
                <input
                  id='pressure-sender-email-id'
                  className='col-12'
                  style={inputReset}
                  onBlur={::AnalyticsEvents.pressureIsFilled}
                  type='email'
                  placeholder='Insira seu e-mail'
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
            )}
            {this.state.pressureType === 'phone' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-sender-phone-id'>
                  Telefone
                  {(errors && errors['phone'] && <span className='error'>{errors['phone']}</span>)}
                </label>
                <input
                  id='pressure-sender-phone-id'
                  className='col-12'
                  style={inputReset}
                  onBlur={::AnalyticsEvents.pressureIsFilled}
                  type='text'
                  placeholder='Insira seu telefone. Ex: +5511987654321'
                  value={phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                />
              </div>
            )}
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-sender-firstname-id'>
                Nome
                {(errors && errors['name'] && <span className='error'>{errors['name']}</span>)}
              </label>
              <input
                id='pressure-sender-firstname-id'
                className='col-12'
                style={inputReset}
                type='text'
                placeholder='Insira seu nome'
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-sender-lastname-id'>
                Sobrenome
                {(errors && errors['lastname'] && <span className='error'>{errors['lastname']}</span>)}
              </label>
              <input
                id='pressure-sender-lastname-id'
                className='col-12'
                style={inputReset}
                type='text'
                placeholder='Insira seu sobrenome'
                value={lastname}
                onChange={e => this.setState({ lastname: e.target.value })}
              />
            </div>
            {
              !widget.settings.show_city || widget.settings.show_city !== 'city-true' ? null : (
                <div className={classnames('form-group', controlClassname)}>
                  <label className='py1 gray' htmlFor='pressure-sender-city-id'>
                    Cidade
                    {(errors && errors['city'] && <span className='error'>{errors['city']}</span>)}
                  </label>
                  <input
                    className='col-12'
                    style={inputReset}
                    type='text'
                    placeholder='Insira sua cidade'
                    value={city}
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </div>
              )
            }
            {this.state.pressureType === 'email' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-subject-id'>
                  Assunto
                  {(errors && errors['subject'] && <span className='error'>{errors['subject']}</span>)}
                </label>
                <input
                  id='pressure-subject-id'
                  className='col-12'
                  style={inputReset}
                  type='text'
                  value={subject}
                  disabled={disabled}
                  onChange={e => this.setState({ subject: e.target.value })}
                />
              </div>
            )}
            {this.state.pressureType === 'email' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-body-id'>
                  Corpo do e-mail
                  {(errors && errors['body'] && <span className='error'>{errors['body']}</span>)}
                </label>
                <textarea
                  id='pressure-body-id'
                  className='col-12 mt1'
                  style={{...inputReset, height: '7rem'}}
                  value={body}
                  disabled={disabled}
                  onChange={e => this.setState({ body: e.target.value })}
                />
              </div>
            )}
          </div>
          <div className='pt1 pb3 px3'>
            <button
              type='submit'
              onClick={::this.handleSubmit}
              className='btn caps white col-12 py2 rounded'
              style={{ backgroundColor: buttonColor }}
            >
              {buttonText}
            </button>
          </div>
        </div>
        {children}
      </form>
    )
  }
}

PressureForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string,
  widget: PropTypes.object
}

PressureForm.defaultProps = {
  subject: '',
  body: ''
}

export default PressureForm
