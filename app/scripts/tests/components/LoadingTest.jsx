import React from 'react/addons'
import { Loading } from './../../components'

const { TestUtils } = React.addons
let component

describe('Progress', () => {
  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <Loading />
    )
  })

  describe('#render', () => {
    it('should render divs', () => {
      const containers = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
      expect(containers.length).to.equal(2)
    })

    it('should render icon', () => {
      const containers = TestUtils.scryRenderedDOMComponentsWithTag(component, 'i')
      expect(containers.length).to.equal(1)
    })
  })
})
