import React from 'react'
import PropTypes from 'prop-types'
import {
  Flexbox2 as Flexbox,
  Header as HeaderStyleguide,
  IconColorful,
  Navbar,
  Spacing
} from 'bonde-styleguide'
// Components
import ActionButton from './ActionButton'
import Tabs, { Tab } from './Tabs'
import Title from './Title'
import UserDropdown from './UserDropdown'

const RenderElement = ({ component }) => {
  switch (typeof component) {
    case 'string':
      return <Title>{component}</Title>
    case 'function':
      return component()
    case 'object':
      return component
    default:
      return <div className='render-element-undefined' />
  }
}

const RightNavbar = ({ dropdown }) => (
  <Spacing margin={{ right: 15, bottom: 10 }}>
    {dropdown
      ? <RenderElement component={dropdown} />
      : <IconColorful name='bonde' size={85} inverted />}
  </Spacing>
)

const Header = ({
  title,
  actions,
  tabs,
  dropdown
}) => {
  return (
    <HeaderStyleguide>
      <Navbar renderBrand={() => <RightNavbar dropdown={dropdown} />}>
        <Flexbox horizontal end>
          <UserDropdown />
        </Flexbox>
      </Navbar>

      {actions && (
        <Spacing margin={{ top: 16 }}>
          <Navbar>
            <Flexbox horizontal end>
              <RenderElement component={actions} />
            </Flexbox>
          </Navbar>
        </Spacing>
      )}

      {title ? (
        <Spacing margin={{ y: 20 }}>
          <RenderElement component={title} />
        </Spacing>
      ) : <div />}

      {tabs && (
        <Spacing margin={{ top: 22, bottom: -22 }}>
          <Tabs>
            <RenderElement component={tabs} />
          </Tabs>
        </Spacing>
      )}
    </HeaderStyleguide>
  )
}

const { oneOfType, func, string, object } = PropTypes

RenderElement.propTypes = {
  component: oneOfType([func, string, object])
}

RightNavbar.propTypes = {
  dropdown: oneOfType([func, string, object])
}

Header.propTypes = {
  title: oneOfType([func, string, object]),
  actions: oneOfType([func, string, object]),
  tabs: oneOfType([func, string, object]),
  dropdown: oneOfType([func, string, object])
}

Header.ActionButton = ActionButton

Header.ActionButtonGroup = Flexbox

Header.Tab = Tab

Header.Title = Title

export default Header
