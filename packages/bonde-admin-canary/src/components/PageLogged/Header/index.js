import React from 'react'
import PropTypes from 'prop-types'
import {
  Flexbox2 as Flexbox,
  Header as HeaderStyleguide,
  Icon,
  Navbar,
  Spacing
} from 'bonde-styleguide'
// Components
import ActionButton from './ActionButton'
import CommunitiesDropdown from './CommunitiesDropdown'
import Tabs, { Tab } from './Tabs'
import Title from './Title'
import UserDropdown from './UserDropdown'

const Bonde = () => (
  <a href='http://bonde.org' title='Bonde.org'>
    <Spacing margin={{ right: 15 }}>
      <Icon name='bonde' size={20} />
    </Spacing>
  </a>
)

const Header = ({
  renderTitle,
  renderLeftDropdown,
  renderActionButtons,
  renderTabs
}) => (
  <HeaderStyleguide>
    <Spacing margin={{ bottom: 16 }}>
      <Navbar renderBrand={Bonde}>
        <Flexbox horizontal spacing='between'>
          {renderLeftDropdown ? renderLeftDropdown() : <div />}
          <UserDropdown />
        </Flexbox>
      </Navbar>
    </Spacing>

    <Navbar>
      <Flexbox horizontal spacing='between'>
        {/* Render Title */}
        {renderTitle ? renderTitle() : <div />}
        {/* Render Action Buttons */}
        {renderActionButtons ? (
          <Flexbox>
            {renderActionButtons()}
          </Flexbox>
        ) : <div />}
      </Flexbox>
    </Navbar>

    {renderTabs && (
      <Spacing margin={{ bottom: -22 }}>
        <Tabs>
          {renderTabs()}
        </Tabs>
      </Spacing>
    )}
  </HeaderStyleguide>
)

const { func } = PropTypes

Header.propTypes = {
  renderTitle: func,
  renderLeftDropdown: func,
  renderActionButtons: func,
  renderTabs: func
}

Header.ActionButton = ActionButton

Header.CommunitiesDropdown = CommunitiesDropdown

Header.Tab = Tab

Header.Title = Title 

export default Header
