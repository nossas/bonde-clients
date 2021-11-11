/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

import NavbarForm from './navbar-form';

const handleCloseForm = jest.fn()
const mobilization: any = {}
const block = {name: 'My block'}
const blockUpdate = jest.fn()

describe('client/components/navigation/navbar/navbar-form', () => {
  it('should initialize state with a name', () => {
    const wrapper: any = mount(
      <NavbarForm
        handleCloseForm={handleCloseForm}
        mobilization={mobilization}
        block={block}
        blockUpdate={blockUpdate}
        defaultValue={block.name}
      />
    )
    expect(wrapper.state().name).to.be.eq(block.name)
  })

  describe('#componentDidMount', () => {
    it.skip('should add an event listenter for the window', () => {
      sinon.spy(window, 'addEventListener')
      mount(
        <NavbarForm
          handleCloseForm={handleCloseForm}
          mobilization={mobilization}
          block={block}
          blockUpdate={blockUpdate}
          defaultValue={block.name}
        />
      )
      expect(window.addEventListener).to.have.been.calledOnce
    })
  })

  describe('#componentWillUnmount', () => {
    it.skip('should remove an event listenter from the window', () => {
      sinon.spy(window, 'removeEventListener')
      expect(window.removeEventListener).to.have.been.calledOnce
    })
  })

  describe('#handleKeyUp', () => {
    it.skip('should call submit when ESC is pressed', () => {
      const wrapper: any = mount(
        <NavbarForm
          handleCloseForm={handleCloseForm}
          mobilization={mobilization}
          block={block}
          blockUpdate={blockUpdate}
          defaultValue={block.name}
        />
      )
      sinon.spy(wrapper.instance(), 'submit')
      wrapper.simulate('keyUp', { preventDefault: () => {}, keyCode: 27 })
      expect(wrapper.instance().submit).to.have.been.calledOnce
    })
  })

  describe('#submit', () => {

    it.skip('should call close form callback', () => {
      const mockedHandleCloseForm = sinon.spy()
      const wrapper: any = mount(
        <NavbarForm
          handleCloseForm={mockedHandleCloseForm}
          mobilization={mobilization}
          block={block}
          blockUpdate={blockUpdate}
          defaultValue={block.name}
        />
      )
      wrapper.instance().submit({ preventDefault: () => {} })
      expect(mockedHandleCloseForm).to.have.been.calledOnce
    })
  })
})
