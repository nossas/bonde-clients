import React from 'react'
import classnames from 'classnames'
import uuid from 'uuid'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Background } from '~client/components/layout'
import { CreditCardForm, RecurringForm } from '~client/subscriptions/forms'
import { FlatForm } from '~client/ux/components'
import * as SubscriptionActions from '~client/subscriptions/redux/action-creators'

if (require('exenv').canUseDOM) {
  require('./page.scss')
}

const CreditCardFormImplementation = CreditCardForm({
  mapDispatchToProps: {
    submit: SubscriptionActions.asyncSubscriptionRecharge
  }
})

const RecurringFormImplementation = RecurringForm({
  mapDispatchToProps: {
    submit: SubscriptionActions.asyncSubscriptionRecharge
  }
})

const SubscriptionEditPage = props => {
  const {
    modificationType,
    animationStack,
    setModificationType,
    appendAnimationStack,
    removeAnimationStack
  } = props

  const displayForm = (form, type) => {
    const append = () => {
      setModificationType(type)
      appendAnimationStack(form)
    }

    if (animationStack.length) {
      removeAnimationStack(0)
      setTimeout(append, 1000)
    } else append()
  }

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
              onClick={() => displayForm(CreditCardFormImplementation, 'creditcard')}
            >
              Cartão de crédito
            </button>
            <button
              className={classnames(
                'button--recurring button',
                { active: modificationType === 'recurring' }
              )}
              onClick={() => displayForm(RecurringFormImplementation, 'recurring')}
            >
              Data da doação
            </button>
          </div>
          <CSSTransitionGroup
            transitionName={`transition--form-${modificationType}`}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            {animationStack.map(ItemComponent => (
              <div key={uuid()} style={{ overflowY: 'hidden' }}>
                <ItemComponent {...props} FormComponent={FlatForm} />
              </div>
            ))}
          </CSSTransitionGroup>
        </section>
      </Background>
    </div>
  )
}

export default SubscriptionEditPage
