import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { FormProvider, createFormProvider } from './createFormProvider'

describe('createFormProvider API', () => {
  let wrapper, defaultProps
  const context = {
    intl: {
      now: sinon.spy(),
      formatMessage: sinon.spy(),
      formatDate: sinon.spy(),
      formatTime: sinon.spy(),
      formatRelative: sinon.spy(),
      formatNumber: sinon.spy(),
      formatPlural: sinon.spy(),
      formatHTMLMessage: sinon.spy()
    }
  }

  beforeEach(() => {
    defaultProps = {
      handleSubmit: sinon.spy(),
      submit: sinon.spy(),
      intl: context.intl
    }
    wrapper = shallow(<FormProvider {...defaultProps} />, { context })
  })

  it('should render a form component by default', () => {
    expect(wrapper.find('form')).to.have.length(1)
  })

  it('should pass submit to handleSubmit', () => {
    const { handleSubmit, submit } = defaultProps
    expect(handleSubmit.calledWith(submit)).to.equal(true)
  })

  it('should pass submit handled to form like onSubmit', () => {
    wrapper.setProps({
      handleSubmit: submit => submit,
      submit: () => 'submit'
    })
    const formProps = wrapper.find('form').props()
    expect(formProps.onSubmit()).to.equal('submit')
  })

  it('should pass fields like child context', () => {
    const fields = 'fields'
    wrapper.setProps({ fields })
    const {
      i18n,
      i18nContext,
      ...otherProps
    } = wrapper.instance().getChildContext().form
    expect(otherProps).to.deep.equal({ fields })
  })

  it('should pass i18n function like child context', () => {
    const message = { id: 'text.label', defaultMessage: 'text' }
    const intl = { formatMessage: t => t }
    wrapper.setProps({ intl })
    expect(wrapper.instance().getChildContext().form.i18n(message))
      .to.deep.equal(message)
  })

  it('should pass i18nContext like child context', () => {
    const i18nContext = {
      fields: {
        name: {
          label: { id: 'label', defaultMessage: 'label' },
          placeholder: { id: 'placeholder', defaultMessage: 'placeholder' }
        }
      }
    }
    const intl = { formatMessage: t => t }
    wrapper.setProps({ intl, i18nContext })
    expect(wrapper.instance().getChildContext().form.i18nContext)
      .to.deep.equal(i18nContext)
  })

  it('should pass submitted false by default', () => {
    expect(wrapper.find('form').props().submitted).to.equal(false)
  })

  it('submitted should be true when submit successfully', () => {
    // requesting
    wrapper.setProps({ submitting: true })
    // requested successfully
    wrapper.setProps({ submitting: false, submitFailed: false })
    expect(wrapper.find('form').props().submitted).to.equal(true)
  })

  it('submitted should be false when submit fail', () => {
    // requesting
    wrapper.setProps({ submitting: true })
    // requested successfully
    wrapper.setProps({ submitting: false, submitFailed: true })
    expect(wrapper.find('form').props().submitted).to.equal(false)
  })

  it('should pass successMessage to form', () => {
    const successMessage = 'successMessage'
    wrapper.setProps({ successMessage })
    expect(wrapper.find('form').props().successMessage)
      .to.equal(successMessage)
  })

  it('should translate successMessage to form', () => {
    const successMessage = {
      id: 'testForm.successMessage',
      defaultMessage: 'Success Message'
    }
    const formatMessage = m => `i18n(${m.defaultMessage})`
    wrapper.setProps({
      intl: {
        ...defaultProps.intl,
        formatMessage
      },
      successMessage
    })
    expect(wrapper.find('form').props().successMessage)
      .to.equal(`i18n(${successMessage.defaultMessage})`)
  })

  it('should translate successMessage to form with i18nContext', () => {
    const successMessage = {
      id: 'testForm.successMessage',
      defaultMessage: 'Success Message'
    }
    const formatMessage = m => `i18n(${m.defaultMessage})`
    wrapper.setProps({
      i18nContext: { successMessage },
      intl: { ...defaultProps.intl, formatMessage }
    })
    expect(wrapper.find('form').props().successMessage)
      .to.equal(`i18n(${successMessage.defaultMessage})`)
  })

  describe('createFormProvider', () => {
    it('should define displayName like createForm(Component)', () => {
      const CustomFormProvider = createFormProvider('form')
      expect(CustomFormProvider.displayName).to.equal('createForm(form)')
    })

    it('should define displayName like createForm(Component.displayName)', () => {
      const CustomForm = () => <div />
      const CustomFormProvider = createFormProvider(CustomForm)
      expect(CustomFormProvider.displayName).to.equal('createForm(CustomForm)')
    })
  })
})
