import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { FormProvider, createFormProvider } from './createFormProvider'

describe('createFormProvider API', () => {
  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      handleSubmit: sinon.spy(),
      submit: sinon.spy()
    }
    wrapper = shallow(<FormProvider {...defaultProps} />)
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
    expect(wrapper.instance().getChildContext()).to.deep.equal({
      form: { fields }
    })
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
