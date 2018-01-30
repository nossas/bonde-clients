import React from 'react'
import { shallow } from 'enzyme'
import Widget from './widget'

describe('package/components/widget', () => {
  let wrapper
  const props = {
    widget: {},
    readOnly: true,
    component: () => <div className='plugin' />,
    renderOverlay: () => <div className='overlay' />
  }

  describe('default', () => {
    
    beforeEach(() => {
      wrapper = shallow(<Widget {...props} />)
    })

    it('should resize column like lg_size configured in widget', () => {
      const lg_size = 8
      wrapper.setProps({ widget: { lg_size } })
      expect(wrapper.props().size).to.equal(lg_size)
    })

    it('should pass to component props like widget and readOnly', () => {
      const plugin = wrapper.find(props.component)
      expect(plugin.props().widget).to.deep.equal(props.widget)
      expect(plugin.props().readOnly).to.equal(props.readOnly)
    })

    it('when readOnly is true should not render overlay', () => {
      expect(wrapper.find(props.renderOverlay).length).to.equal(0)
    })

    it('when readOnly is false should render overlay passed widget like props', () => {
      wrapper.setProps({ readOnly: false })
      const overlay = wrapper.find(props.renderOverlay)
      expect(overlay.length).to.equal(1)
      expect(overlay.props().widget).to.deep.equal(props.widget)
    })
  }) 
})
