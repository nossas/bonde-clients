import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { MobilizationDashboardContainer } from '../../containers/mobilization-dashboard-container'

const setup = (props = {}) => {
  const initialProps = {
    loading: false,
    relationshipId: undefined,
    asyncFetch: () => {},
    sidebarProps: {
      user: {},
      community: {},
      mobilization: {}
    },
    ...props
  }

  return {
    props: initialProps,
    wrapper: shallow(<MobilizationDashboardContainer {...initialProps} />)
  }
}

describe('app/modules/mobilizations/__tests__/containers/mobilization-dashboard-container', () => {
  it('should render without crashed', () => {
    const { wrapper } = setup()
    expect(wrapper).to.be.ok
  })

  it('should render <Loading /> if loading is true', () => {
    const { wrapper } = setup({ loading: true })
    expect(wrapper.find('Loading').length).to.equal(1)
  })

  it('should render <Sidebar /> and children if loading is false', () => {
    const { wrapper } = setup()
    expect(wrapper.find('Sidebar').length).to.equal(1)
  })
})
