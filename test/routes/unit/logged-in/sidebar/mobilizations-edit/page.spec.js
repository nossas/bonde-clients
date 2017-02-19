import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Mobilization from '~client/mobrender/components/mobilization.connected'
import { Loading } from '~components/await'
import Page from '~routes/logged-in/sidebar/mobilizations-edit/page'

describe('routes/application/mobilizations-edit/page', () => {
  let page
  const defaultProps = {
    mobilization: {},
    blocksIsLoaded: true,
    blocksIsLoading: false,
    widgetsIsLoaded: true,
    widgetsIsLoading: false,
    blocks: []
  }
  const context = { router: {} }

  beforeEach(() => {
    page = shallow(<Page {...defaultProps} />, { context })
  })

  it('should render without crashed', () => {
    expect(page).to.be.ok
  })

  it('should render mobilization with editable true', () => {
    expect(page.find(Mobilization).props()).to.deep.equal({ editable: true })
  })
})
