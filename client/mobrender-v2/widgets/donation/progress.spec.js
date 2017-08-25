import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Progress } from '~client/mobrender-v2/widgets/donation'

describe('client/mobrender-v2/widgets/donation/progress', () => {
  let progress

  it('should render without crash', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress).to.be.ok
  })

  it('should render a <progress> element', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.find('progress')).to.have.length(1)
  })

  it('should render a <progress> element with `progress` class', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.find('progress.progress')).to.have.length(1)
  })

  it('should render a <progress> element as `max` prop with 100 by default', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.props().max).to.be.equal(100)
  })

  it('should render with `is-primary` class when the value is >= 50', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.props().className).to.be.equal('progress is-primary')
  })

  it('should render with `is-warning` class when the value is >= 30', () => {
    progress = shallow(<Progress value={30} />)
    expect(progress.props().className).to.be.equal('progress is-warning')
  })

  it('should render with `is-danger` class when the value is < 30', () => {
    progress = shallow(<Progress value={29} />)
    expect(progress.props().className).to.be.equal('progress is-danger')
  })
})
