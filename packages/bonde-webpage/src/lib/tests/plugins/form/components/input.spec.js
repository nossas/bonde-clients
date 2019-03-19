import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Input } from '../../../../plugins/form/components'

describe('@bonde-webpage/plugins/form/components Input', () => {

  describe('when render input form', () => {
    let props = {
      name: 'field-name-1',
      onChange: () => 'field-name-1-clicked',
      mobilization: { body_font: '' }
    }

    it('should call renderFieldKind', () => {
      props.field = { }
      sinon.spy(Input.prototype, 'renderFieldKind')

      shallow(<Input {...props} />)
      expect(Input.prototype.renderFieldKind.calledOnce).to.equal(true)
    })

    it('should render a select input when field kind equals dropdown', () => {
      props.field = { kind: 'dropdown', placeholder: '1,2,3' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('select')).to.have.length(1)
    })

    it('should render a input text when field kind not equals dropdown or greetings', () => {
      props.field = { kind: 'dummy', placeholder: '' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('input')).to.have.length(1)
    })

    /*it('should render success message when field kind equals greetings', () => {
      props.field = { kind: 'greetings', placeholder: 'new message' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('p')).to.have.length(1)

      let node = wrapper.find('p').at(0)
      expect(node.text()).to.have.string(props.field.placeholder)
    })*/
  })
})
