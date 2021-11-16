import { shallow } from 'enzyme'
import WYSIHTMLToolbar from './wysihtml-toolbar'

describe('client/components/editor-wysihtml/wysihtml-toolbar', () => {
  let wrapper
  const props = {
    elementId: 'some-id',
    className: 'some-class'
  }

  beforeAll(() => {
    wrapper = shallow(<WYSIHTMLToolbar {...props} />)
  })

  describe('#render', () => {
    it('should set the element id', () => {
      expect(wrapper.props().id).toEqual('some-id')
    })
    it('should set the element classes', () => {
      expect(wrapper.props().className).toHaveTextContent('some-class')
    })
  })
})
