import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tab, TabItem } from 'bonde-styleguide'

const PageTabs = ({ location, match, tabs, ...rest }) => {
  const basePath = '/'
  // TODO: should be a default path root
  if (location.pathname.startsWith(match.url)) {
    const pathname = location.pathname.replace(match.url, '')
    const tabSelect = tabs.filter(t => t.to === pathname)[0]
    // TODO: check cascade
    return (
      <Tab>
        {tabs.map(({ name, to }, i) => (
          <TabItem
            key={`default-page-tabs-${i}`}
            active={tabSelect ? tabSelect.to === to : i === 0}
            to={`${match.url}${to || ''}`}
            component={({ className, children, to }) => (<Link className={className} to={to}>{children}</Link>)}
          >
            {name}
          </TabItem>
        ))}
      </Tab>
    )
  }
  return (
    <Tab>
      {tabs.map(({ name, to }, i) => (
        <TabItem
          key={`default-page-tabs-${i}`}
          active={to ? basePath === to : basePath === ''}
          to={`${match.url}${to || ''}`}
          component={Link}
        >
          {name}
        </TabItem>
      ))}
    </Tab>
  )
}

const { array, shape, string } = PropTypes

PageTabs.propTypes = {
  tabs: array.isRequired,
  location: shape({ pathname: string }).isRequired,
  match: shape({ path: string }).isRequired
}

export default PageTabs
