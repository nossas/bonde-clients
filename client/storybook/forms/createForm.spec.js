import { expect } from 'chai'
import { shallow } from 'enzyme'
import { subscribe, createForm } from './createForm'

describe('createForm API', () => {
  describe('subscribe', () => {
    const callToAction = 'CALL_TO_ACTION'
    const globalState = {}
    const globalOwnProps = { widget: { settings: { callToAction } } }

    describe('should map initialValues in HOC props when', () => {
      let param
      const HOC = (configForm, mapStateToProps) => () => {
        param = mapStateToProps
      }

      it('is function', () => {
        const initialValues = (state, ownProps) => ({
          ...ownProps.widget.settings
        })
        subscribe(HOC)({ initialValues })
        expect(param(globalState, globalOwnProps)).to.deep.equal({
          initialValues: globalOwnProps.widget.settings
        })
      })

      it('is object', () => {
        const initialValues = {
          ...globalOwnProps.widget.settings
        }
        subscribe(HOC)({ initialValues })
        expect(param()).to.deep.equal({ initialValues: globalOwnProps.widget.settings })
      })
    })

    it('should map submit in HOC props', () => {
      let param
      const HOC = (configForm, mapStateToProps, mapActionsToProps) => () => {
        param = mapActionsToProps
      }
      const submit = () => 'submit'
      subscribe(HOC)({ submit })
      expect(param.submit()).to.equal('submit')
    })

    it('should map form props like name, fields and validate', () => {
      let param
      const HOC = (configForm) => () => {
        param = configForm
      }
      const settings = {
        name: 'testForm',
        fields: ['name', 'email'],
        validate: () => 'validate'
      }
      subscribe(HOC)(settings)
      expect(param.form).to.equal(settings.name)
      expect(param.fields).to.deep.equal(settings.fields)
      expect(param.validate()).to.equal('validate')
    })

    describe('decorate component like FormProvider', () => {
      const HOC = () => Component => Component

      it('should decorate a form like default', () => {
        const Form = subscribe(HOC)({})
        expect(Form.displayName).to.equal('createForm(form)')
      })

      it('should decorate configured component', () => {
        const CustomForm = () => <div />
        const Form = subscribe(HOC)({ component: CustomForm })
        expect(Form.displayName).to.equal('createForm(CustomForm)')
      })
    })
  })
  describe('createForm', () => {
    it('should connect with reduxForm', () => {
      const Form = createForm({
        name: 'testForm',
        fields: ['name'],
        submit: () => 'submit'
      })
      const wrapper = shallow(<Form />)
      expect(wrapper.name()).to.equal('ReduxFormConnector(createForm(form))')
    })
  })
})
