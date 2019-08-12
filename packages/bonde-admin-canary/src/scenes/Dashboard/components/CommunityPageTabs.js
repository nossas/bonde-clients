import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tab, TabItem } from 'bonde-styleguide'

const PageTabs = ({ location, baseUrl, tabs, ...rest }) => {
  // TODO: should be a default path root
  return (
    <Tab>
      {tabs.map(({ path, name, to }, i) => (
        <TabItem
          key={`default-page-tabs-${i}`}
          active={path.test(location.pathname)}
          to={`${baseUrl}${to || ''}`}
          component={Link}
        >
          {name}
        </TabItem>
      ))}
    </Tab>
  )
}

PageTabs.propTypes = {
  tabs: PropTypes.array.isRequired
}

// TODO: trick used for fix RenderElement in Header
/*export default (props) => <DefaultPageTabs {...props} />*/
export default PageTabs