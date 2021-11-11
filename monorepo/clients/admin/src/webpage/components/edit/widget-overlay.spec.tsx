/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { mount } from 'enzyme'
import WidgetOverlay from './widget-overlay'

describe('client/mobrender/components/widget-overlay', () => {
  const properties: any = {
    widget: { id: 1, kind: 'content' },
    hasMouseOver: false,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn()
  }
  let over

  beforeEach(() => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    over = mount(<WidgetOverlay {...properties} />)
  })

  it('should render without crashed', () => {
    expect(over).to.be.ok
  })

  it('should render children', () => {
    const over2 = mount(
      // eslint-disable-next-line react/jsx-props-no-spreading
      <WidgetOverlay {...properties}>
        <h1>Children</h1>
      </WidgetOverlay>
    )
    expect(over2.find('h1').length).to.equal(1)
  })

  it('should call onMouseOver passing ("widget", widget.id) when mouse enter', () => {
    let result
    over.setProps({ onMouseOver: (key, id) => { result = [key, id] } })
    over.find('div.relative').simulate('mouseenter')
    expect(result).to.deep.equal(['widget', properties.widget.id])
  })

  it('should call onMouseOut passing ("widget") when mouse leave', () => {
    let result
    over.setProps({ onMouseOut: key => { result = [key] } })
    over.find('div.relative').simulate('mouseleave')
    expect(result).to.deep.equal(['widget'])
  })

  it('should render cursor pointer', () => {
    expect(over.find('div.relative').props().style).to.deep.equal({
      cursor: 'pointer'
    })
  })

  it('should call onEdit when click edit button', () => {
    let result
    over.setProps({
      hasMouseOver: true,
      onEdit: () => { result = true }
    })
    over.find('button.btn-edit').simulate('click')
    expect(result).to.equal(true)
  })

  it('should call onDelete when click remove button', () => {
    let result
    over.setProps({
      hasMouseOver: true,
      onDelete: () => { result = true }
    })
    over.find('button.btn-remove').simulate('click')
    expect(result).to.equal(true)
  })

  it('should render over div when has mouse over', () => {
    over.setProps({ hasMouseOver: true })
    expect(over.find('div.overlay').length).to.equal(1)
  })
})
