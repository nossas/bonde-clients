import React, { Component } from 'react'
import classnames from 'classnames'
import uuid from 'uuid'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Background } from '~client/components/layout'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { FlatForm } from '~client/ux/components'
import { Tabs, TabBorder } from '~client/components/navigation/tabs'
import { Pagarme } from '~client/components/external-services'

if (require('exenv').canUseDOM) {
  require('./page.scss')
}

class SubscriptionEditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modificationType: undefined,
      items: [],
      animatedFormStack: []
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd (item = uuid()) {
    const newItems = this.state.items.concat([
      item
    ])
    this.setState({items: newItems})
  }

  handleRemove (i) {
    let newItems = this.state.items.slice()
    newItems.splice(i, 1)
    this.setState({items: newItems})
  }

  displayForm ({ form, modificationType }) {
    const add = () => {
      this.setState({ modificationType })
      this.handleAdd(form)
    }
    if (this.state.items.length) {
      this.handleRemove(0)
      setTimeout(add, 1000)
    } else add()
  }

  render () {
    const { fields: { creditcard, name, expiration, cvv }, ...formProps } = this.props
    const { modificationType } = this.state

    const CreditCardForm = (
      <div>
        <Pagarme />
        <FlatForm
          {...formProps}
          buttonText='Salvar'
        >
          {/*<Tabs className='mb3 center'>
            <TabBorder Component='span' isActive>
              <i className='flat-mastercard' />Cartão de crédito
            </TabBorder>
            <TabBorder Component='span'>
              Data da recorrência
            </TabBorder>
          </Tabs>*/}

          <p className='mb3 lightgray'>
            Altere os dados do seu cartão de crédito preenchendo o formulário abaixo. A sua assinatura
            permanecerá a mesma porém, à partir do momento que você salvar o formulário abaixo, o valor
            será cobrado no seu novo cartão.
          </p>

          <FormGroup className='mb2' controlId='creditcard' {...creditcard}>
            <ControlLabel>Número</ControlLabel>
            <FormControl
              type='text'
              placeholder='Ex: 0000 0000 0000 0000'
            />
          </FormGroup>

          <FormGroup className='mb2' controlId='name' {...name}>
            <ControlLabel>Nome</ControlLabel>
            <FormControl
              type='text'
              placeholder='(igual no cartão)'
            />
          </FormGroup>

          <div className='clearfix col-12 mb3'>
            <FormGroup className='col col-6' controlId='expiration' {...expiration}>
              <ControlLabel>Validade</ControlLabel>
              <FormControl
                type='text'
                placeholder='00/00'
              />
            </FormGroup>

            <FormGroup className='col col-4 ml3' controlId='cvv' {...cvv}>
              <ControlLabel>CVV</ControlLabel>
              <FormControl
                type='text'
                placeholder='Ex: 000'
              />
            </FormGroup>
          </div>
        </FlatForm>
      </div>
    )
    const RecurringForm = (
      <b className='h1 p3 center block'>RecurringForm</b>
    )

    const items = this.state.items.map(item => (
      <div key={uuid()} style={{ overflowY: 'hidden' }}>
        {item}
      </div>
    ))

    return (
      <div className='routes--subscription-edit-page'>
        <Background image={
          require('exenv').canUseDOM
            ? require('~client/images/bg-login.png')
            : ''
        }>
          <section className='section--choose-type'>
            <h1 style={{
              color: '#333',
              marginTop: 0,
              fontWeight: 'bold',
              fontSize: '2em'
            }}>
              Dados da Assinatura
            </h1>
            <p className='paragraph--helper-text'>
              Selecione abaixo qual informação da sua assinatura você quer alterar.
            </p>
            <div className='container--tab-buttons'>
              <button
                className={classnames(
                  'button--creditcard button',
                  { active: modificationType === 'creditcard' }
                )}
                onClick={() => this.displayForm({
                  form: CreditCardForm,
                  modificationType: 'creditcard'
                })}
              >
                Cartão de crédito
              </button>
              <button
                className={classnames(
                  'button--recurring button',
                  { active: modificationType === 'recurring' }
                )}
                onClick={() => this.displayForm({
                  form: RecurringForm,
                  modificationType: 'recurring'
                })}
              >
                Data da doação
              </button>
            </div>
            <CSSTransitionGroup
              transitionName={`transition--form-${modificationType}`}
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >
              {items}
            </CSSTransitionGroup>
          </section>
        </Background>
      </div>
    )
  }
}

export default SubscriptionEditPage
