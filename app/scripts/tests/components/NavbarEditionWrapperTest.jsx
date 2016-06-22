import React from 'react/addons'
import { NavbarEditionWrapper, NavbarForm, NavbarButton } from './../../components'
const { TestUtils } = React.addons

const block = {}
const mobilization = {}
const auth = {}
const dispatch = () => {}

const rawComponent = (
  <NavbarEditionWrapper
    block={block}
    mobilization={mobilization}
    auth={auth}
    dispatch={dispatch}
  />
)

describe('NavbarEditionWrapper', () => {
  it('should render form when its in the edit mode', () => {
    const component = TestUtils.renderIntoDocument(rawComponent)
    component.setState({isEditing: true})
    const navbarForm = TestUtils.scryRenderedComponentsWithType(component, NavbarForm)
    expect(navbarForm).to.have.length(1)
  })

  it('should render button when its not in the edit mode', () => {
    const component = TestUtils.renderIntoDocument(rawComponent)
    component.setState({isEditing: false})
    const navbarButton = TestUtils.scryRenderedComponentsWithType(component, NavbarButton)
    expect(navbarButton).to.have.length(1)
  })
})
