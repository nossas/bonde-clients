import { expect } from 'chai'
import { shallow } from 'enzyme'
import Field from './field'

describe('<Field />', () => {
  let wrapper
  const fieldName = 'testField'
  const defaultContext = {
    form: {
      fields: {
        [fieldName]: {
          name: fieldName,
          value: 'value',
          onChange: () => `onChange(${fieldName})`
        }
      },
      i18n: m => m
    }
  }

  beforeEach(() => {
    wrapper = shallow(<Field name={fieldName} component='input' />, {
      context: defaultContext
    })
  })

  it('should render its ok', () => {
    expect(wrapper.find('input')).to.have.length(1)
  })

  it('should pass props to field obtained by form provider context', () => {
    const { i18n, ...otherProps } = wrapper.find('input').props()
    expect(otherProps)
      .to.deep.equal(defaultContext.form.fields[fieldName])
    expect(i18n('test')).to.equal('test')
  })

  it('should pass extraProps to component', () => {
    const inputType = 'text'
    wrapper.setProps({ type: inputType })
    expect(wrapper.find('input').props().type).to.equal(inputType)
  })
})
