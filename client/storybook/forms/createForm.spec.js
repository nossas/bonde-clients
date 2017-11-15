import React from 'react'
import { expect } from 'chai'
import {
  mapStateToProps,
  mapActionsToProps,
  connectCreateForm
} from './createForm'

describe('createForm', () => {
  const buttonText = 'Submit!'
  const dispatch = () => {}
  const state = {}
  const ownProps = {
    widget: {
      settings: {
        buttonText
      }
    }
  }

  describe('config.initialValues', () => {
    it('should call initialValues(state, ownProps) when is function', () => {
      let params
      const initialValues = (state, ownProps) => {
        params = [state, ownProps]
        return {
          buttonText
        }
      }

      expect(mapStateToProps(initialValues)(state, ownProps)).to.deep.equal({
        initialValues: { buttonText }
      })
      expect(params).to.deep.equal([state, ownProps])
    })

    it('should return initialValues when is object', () => {
      let params
      const initialValues = { buttonText }
      expect(mapStateToProps(initialValues)(state, ownProps)).to.deep.equal({
        initialValues: { buttonText }
      })
      expect(params).to.be.equal(undefined)
    })
  })

  describe('config.submit', () => {
    it('should call submit(values, dispatch)', () => {
      let params
      const submit = (values, dispatch) => {
        params = [values, dispatch]
      }

      const submitValues = { buttonText }
      const actionsToProps = mapActionsToProps(submit)(dispatch)
      actionsToProps.submit(submitValues)
      expect(params).to.deep.equal([submitValues, dispatch])
    })
  })

  describe('config.formComponent', () => {
    const connect = () => Component => Component
    const reduxForm = () => Component => Component
    const createForm = connectCreateForm(connect, reduxForm)

    it('should return a form component provider like default', () => {
      const Form = createForm({})
      expect(Form.displayName).to.equal('withForm(form)')
    })

    it('should return a custom component provider', () => {
      const CustomForm = () => <div />
      const Form = createForm({ formComponent: CustomForm })
      expect(Form.displayName).to.equal('withForm(CustomForm)')
    })
  })
})
