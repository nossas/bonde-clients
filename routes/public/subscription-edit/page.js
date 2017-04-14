import React, { Component } from 'react'
import classnames from 'classnames'
import uuid from 'uuid'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Background } from '~client/components/layout'
import { CreditCardForm } from '~client/subscriptions/forms'
import { FlatForm } from '~client/ux/components'

if (require('exenv').canUseDOM) {
  require('./page.scss')
}

const CreditCardFormImplementation = CreditCardForm({
  mapDispatchToProps: {
    submit: values => (dispatch, getState, { api }) => {
      console.log('[routes/public/subscription-edit/page.connected.js] values', values)
    }
  }
})

class SubscriptionEditPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      animatedFormStack: []
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd (item = uuid()) {
    const newItems = this.state.animatedFormStack.concat([
      item
    ])
    this.setState({animatedFormStack: newItems})
  }

  handleRemove (i) {
    let newItems = this.state.animatedFormStack.slice()
    newItems.splice(i, 1)
    this.setState({animatedFormStack: newItems})
  }

  displayForm ({ form, modificationType }) {
    const add = () => {
      const { setModificationType } = this.props
      setModificationType(modificationType)
      this.handleAdd(form)
    }
    if (this.state.animatedFormStack.length) {
      this.handleRemove(0)
      setTimeout(add, 1000)
    } else add()
  }

  render () {
    const { modificationType } = this.props

    const RecurringForm = props => (
      <b className='h1 p3 center block'>RecurringForm</b>
    )

    const animatedFormStack = this.state.animatedFormStack.map(ItemComponent => (
      <div key={uuid()} style={{ overflowY: 'hidden' }}>
        <ItemComponent {...this.props} FormComponent={FlatForm} />
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
                  form: CreditCardFormImplementation,
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
              {animatedFormStack}
            </CSSTransitionGroup>
          </section>
        </Background>
      </div>
    )
  }
}

export default SubscriptionEditPage
