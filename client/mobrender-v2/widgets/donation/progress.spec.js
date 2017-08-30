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
    expect(progress.find('progress.progress').props().max).to.be.equal(100)
  })

  it('should render with `is-primary` class when the value is >= 50', () => {
    progress = shallow(<Progress value={50} />)
    expect(progress.find('progress.progress').props().className).to.be.equal('progress is-primary')
  })

  it('should render with `is-warning` class when the value is >= 30', () => {
    progress = shallow(<Progress value={30} />)
    expect(progress.find('progress.progress').props().className).to.be.equal('progress is-warning')
  })

  it('should render with `is-danger` class when the value is < 30', () => {
    progress = shallow(<Progress value={29} />)
    expect(progress.find('progress.progress').props().className).to.be.equal('progress is-danger')
  })

  it('should render the `valueTopLeft` prop value in .progress-top-left properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueTopLeft={text} />)
    expect(progress.find('.progress-top > .progress-top-left').text()).to.be.equal(text)
  })

  it('should render the `valueTopRight` prop value in .progress-top-right properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueTopRight={text} />)
    expect(progress.find('.progress-top > .progress-top-right').text()).to.be.equal(text)
  })

  it('should render the `valueBottomLeft` prop value in .progress-bottom-left properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueBottomLeft={text} />)
    expect(progress.find('.progress-bottom > .progress-bottom-left').text()).to.be.equal(text)
  })

  it('should render the `valueBottomRight` prop value in .progress-bottom-right properly', () => {
    const text = 'Foo'
    progress = shallow(<Progress value={50} valueBottomRight={text} />)
    expect(progress.find('.progress-bottom > .progress-bottom-right').text()).to.be.equal(text)
  })
})
