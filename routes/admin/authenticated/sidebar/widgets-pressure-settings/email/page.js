import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage, intlShape } from 'react-intl'

import * as os from '~client/utils/browser/os'
import { FormGroup, ControlLabel, FormControl, RadioGroup, Radio } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { InputTag } from '~client/mobilizations/widgets/components'
import { Info } from '~client/components/notify'
import { Kbd } from '~client/components/markdown'

// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
// eslint-disable-next-line
const patternTarget = /[a-zà-úA-ZÀ-Ú\s]+<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/

class PressureSettingsEmailPage extends Component {
  constructor (props) {
    super(props)
    this.state = { targets: this.getTargetList() || [] }
  }

  getTargetString (targets) {
    return targets.filter(target => !!target.trim()).join(';')
  }

  getTargetList () {
    const { fields: { targets } } = this.props
    return targets && targets.value.split(';')
  }

  handleSubmit (values) {
    const { widget, asyncWidgetUpdate } = this.props
    const settings = widget.settings || {}
    const targets = this.getTargetString(this.state.targets)

    return asyncWidgetUpdate({
      ...widget,
      settings: { ...settings, ...values, targets }
    })
  }

  render () {
    const {
      fields: {
        pressure_subject: pressureSubject,
        pressure_body: pressureBody,
        targets: targetsField,
        disable_edit_field: disableEditField
      },
      intl,
      ...props
    } = this.props
    return (
      <SettingsForm
        {...props}
        onSubmit={::this.handleSubmit}
        successMessage={
          intl.formatMessage({
            id: 'page--pressure-widget-email.success-message',
            defaultMessage: 'Email para alvo configurado com sucesso!'
          })
        }
      >
        <div className='form-group'>
          <InputTag
            label={
              intl.formatMessage({
                id: 'page--pressure-widget-email.form.input-tag.label',
                defaultMessage: 'Alvos'
              })
            }
            values={this.state.targets}
            onInsertTag={targets => {
              const targetsPushed = [...this.state.targets, ...targets]
              this.setState({ targets: targetsPushed })
              targetsField.onChange(this.getTargetString(targetsPushed))
            }}
            onRemoveTag={value => {
              const targets = this.state.targets.filter(tag => tag !== value)
              this.setState({ targets })
              targetsField.onChange(this.getTargetString(targets))
            }}
            onRemoveAll={() => {
              const targets = []
              this.setState({ targets })
              targetsField.onChange(this.getTargetString(targets))
              this.props.notifyAllTargetsRemoval()
            }}
            validate={targets => {
              const errors = { valid: true }
              if (targets.some(target => !target.match(patternTarget))) {
                errors.valid = false
                errors.message = intl.formatMessage({
                  id: 'page--pressure-widget-email.form.input-tag.validation.invalid-target-format',
                  defaultMessage: 'Alvo fora do formato padrão. Ex.: Nome do alvo <alvo@provedor.com>'
                })
              }
              return errors
            }}
            helperText={
              <Info
                title={intl.formatMessage({
                  id: 'p--pressure-widget--input-tag.info.title',
                  defaultMessage: 'Como cadastrar alvos'
                })}
              >
                <FormattedMessage
                  id='p--pressure-widget--input-tag.info.text'
                  defaultMessage={
                    'O cadastro de alvos é bem simples e pode ser feito com mais de um alvo ' +
                    'por vez. Você precisa separar os alvos, em linhas distintas e, cada ' +
                    'alvo deve seguir o formato descrito abaixo. Para cadastrar basta ' +
                    'pressionar {keyboardTrigger}. E não se esqueça de salvar, clicando ' +
                    'no botão no canto superior direito da tela.'
                  }
                  values={{
                    keyboardTrigger: (
                      <span>
                        {os.isMac() ? <Kbd>cmd</Kbd> : <Kbd>ctrl</Kbd>}
                        +<Kbd>enter</Kbd>
                      </span>
                    )
                  }}
                />
                <ul style={{ paddingLeft: 15, marginBottom: 0 }}>
                  <li>
                    <FormattedMessage
                      id='p--pressure-widget--input-tag.info.item.target-format'
                      defaultMessage={
                        'Formato do alvo: {format} (obrigatório usar os caractéres ' +
                        '{lt} e {gt} para agrupar o email)'
                      }
                      values={{
                        format: <b>{'Nome <email@provedor.com>'}</b>,
                        lt: <Kbd>{'<'}</Kbd>,
                        gt: <Kbd>{'>'}</Kbd>
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id='p--pressure-widget--input-tag.info.item.sorting'
                      defaultMessage={
                        'Os alvos serão exibidos em ordem aleatória na widget de pressão.' +
                        'Ou seja, cada vez que a mobilização for acessada, a ordem de exibição ' +
                        'será diferente.'
                      }
                    />
                  </li>
                </ul>
              </Info>
            }
          />
        </div>
        <FormGroup controlId='email-subject-id' {...pressureSubject}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget-email.form.email-subject.label'
              defaultMessage='Assunto do email'
            />
          </ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='email-body-id' {...pressureBody}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget-email.form.email-body.label'
              defaultMessage='Corpo do email que será enviado'
            />
          </ControlLabel>
          <FormControl type='text' componentClass='textarea' rows='7' />
        </FormGroup>
        <FormGroup controlId='disable-edit-field-id' {...disableEditField}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget-email.form.disable-edit-field.label'
              defaultMessage='Desabilitar edição de assuno e corpo do e-mail'
            />
          </ControlLabel>
          <RadioGroup>
            <Radio value='s'>Sim</Radio>
            <Radio value='n'>Não</Radio>
          </RadioGroup> 
        </FormGroup>
      </SettingsForm>
    )
  }
}

PressureSettingsEmailPage.propTypes = {
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
}

export default PressureSettingsEmailPage
