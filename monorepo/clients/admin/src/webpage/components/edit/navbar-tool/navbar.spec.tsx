import { expect } from 'chai'
import { mount } from "enzyme";
// import { mountWithIntl } from '../../../intl/helpers'
import Navbar from './navbar'
import MenuItems from './menu-items'

describe('client/mobrender/components/navbar', () => {
  let wrapper
  const status: 'active' | 'archived' = "active"
  const properties = {
    editable: false,
    mobilization: {
      id: 1,
      name: "mobs",
      slug: "mobs",
      status,
      community_id: 1,
      user_id: 1,
      language: "pt-br",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    blockUpdate: jest.fn(),
    blocks: [
      {
        id: 1,
        hidden: false,
        menu_hidden: false
      },
      {
        id: 2,
        hidden: true,
        menu_hidden: false
      },
      {
        id: 3,
        menu_hidden: true
      }
    ]
  }

  beforeEach(() => {
    wrapper = mount(<Navbar {...properties} />)
  })

  it('renders absolute layout by default', () => {
    expect(wrapper.find('.absolute.col-12.z3').length).to.equal(1)
  })

  it('should render desktop and mobile version', () => {
    expect(wrapper.find(MenuItems).at(0).props().mobile).to.equal(false)
    expect(wrapper.find(MenuItems).at(1).props().mobile).to.equal(true)
  })

  describe('when is editable', () => {
    beforeEach(() => {
      wrapper.setProps({ editable: true })
    })

    it('should passed to <Menu /> visible blocks', () => {
      const blocks = properties.blocks.filter(b => !b.hidden)
      wrapper.find(MenuItems).map(menu => {
        expect(menu.props().blocks).to.deep.equal(blocks)
      })
    })
  })

  describe('when isnt editable', () => {
    beforeEach(() => {
      wrapper.setProps({ editable: false })
    })

    it('should passed to <Menu /> only visible blocks menu', () => {
      const blocks = properties.blocks.filter(b => !b.hidden && !b.menu_hidden)
      wrapper.find(MenuItems).map(menu => {
        expect(menu.props().blocks).to.deep.equal(blocks)
      })
    })
  })
})
