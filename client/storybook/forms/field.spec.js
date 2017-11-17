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
      }
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
    expect(wrapper.find('input').props())
      .to.deep.equal(defaultContext.form.fields[fieldName])
  })

  it('should pass extraProps to component', () => {
    const inputType = 'text'
    wrapper.setProps({ type: inputType })
    expect(wrapper.find('input').props().type).to.equal(inputType)
  })
})
