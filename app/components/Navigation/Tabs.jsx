import React, { PropTypes } from 'react'

import { Tab } from './'

const Tabs = ({ items }) => (
  <nav className="gray20">
    {items.map(tab => <Tab text={tab} />)}
  </nav>
)

Tabs.propTypes = {
  items: PropTypes.array.isRequired
}

export default Tabs
