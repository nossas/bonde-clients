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
  <Spacing margin={{ right: 15 }}>
    <Icon name='bonde' size={20} />
  </Spacing>
)

const Header = ({
  renderTitle,
  renderActionButtons,
  renderTabs
}) => (
  <HeaderStyleguide> 
    <Navbar renderBrand={Bonde}>
      <Flexbox horizontal spacing='between'>
        {renderTitle ? renderTitle() : <div />}
        <UserDropdown />
      </Flexbox>
    </Navbar>

    {renderActionButtons && (
      <Spacing margin={{ top: 16 }}>
        <Navbar>
          <Flexbox horizontal end>
            {renderActionButtons()}
          </Flexbox>
        </Navbar>
      </Spacing>
    )}

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
  renderActionButtons: func,
  renderTabs: func
}

Header.ActionButton = ActionButton

Header.ActionButtonGroup = Flexbox

Header.CommunitiesDropdown = CommunitiesDropdown

Header.Tab = Tab

Header.Title = Title

export default Header
