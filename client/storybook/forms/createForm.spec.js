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

  describe('third apps', () => {
    // Mock connect of react-redux for test config
    let reactReduxConfig
    const reactRedux = (mapStateToProps, mapActionsToProps) => () => {
      reactReduxConfig = { mapStateToProps, mapActionsToProps }
    }
    let reduxFormConfig // eslint-disable-line
    const reduxForm = (config) => () => {
      reduxFormConfig = config
    }
    const createForm = connectCreateForm(reactRedux, reduxForm)

    describe('react-redux', () => {
      it('should receive a mapStateToProps with initialValues mapped', () => {
        const initialValues = { buttonText: 'Submit!' }
        createForm({ initialValues })
        const { mapStateToProps } = reactReduxConfig
        expect(mapStateToProps(state, ownProps)).to.deep.equal({ initialValues })
      })
      it('should receive a mapActionsToProps with submit action mapped', () => {
        const dispatch = 'dispatch'
        const submit = (values, dispatch) => [values, dispatch]
        createForm({ submit })
        const { mapActionsToProps } = reactReduxConfig
        const actions = mapActionsToProps(dispatch)
        expect(actions.submit({ buttonText })).to.deep.equal([{ buttonText }, dispatch])
      })
    })

    describe('redux-form', () => {
      // Config variables
      const error = { name: 'required' }
      const name = 'testForm'
      const fields = ['name', 'email']
      const validate = (values) => {
        if (!values.name) {
          return error
        }
      }
      const config = { name, fields, validate }
      it('should receive a start config form', () => {
        createForm(config)
        expect(reduxFormConfig).to.deep.equal({ form: name, fields, validate })
      })
    })
  })
})
