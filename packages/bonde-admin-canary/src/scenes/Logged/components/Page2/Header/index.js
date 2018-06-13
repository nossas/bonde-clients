import React from 'react'
import PropTypes from 'prop-types'
import {
  Flexbox2 as Flexbox,
  Header as HeaderStyleguide,
  Icon,
  Navbar,
  Title,
  Spacing
} from 'bonde-styleguide'
import CommunitiesDropdown from './CommunitiesDropdown'
import UserDropdown from './UserDropdown'

const Bonde = () => (
  <a className='homePageLink' href='http://bonde.org' title='Bonde.org'>
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
    <Spacing margin={{ bottom: 16.6 }}>
      <Navbar renderBrand={Bonde}>
        <Flexbox horizontal spacing='between'>
          {renderLeftDropdown ? renderLeftDropdown() : <div />}
          <UserDropdown />
        </Flexbox>
      </Navbar>
    </Spacing>

    <Navbar>
      <Flexbox horizontal spacing='between'>
        {renderTitle ? renderTitle() : <div />}
        {renderActionButtons ? renderActionButtons() : <div />}
      </Flexbox>
    </Navbar>

    {renderTabs && (
      <Spacing margin={{ bottom: -22 }}>
        {renderTabs()}
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

Header.CommunitiesDropdown = CommunitiesDropdown
Header.Title = ({ children }) => <Title.H3 color='#fff'>{children}</Title.H3>

export default Header
