import React, { PropTypes } from 'react'

const Tab = ({ text }) => (
  <a
    href="#"
    className="btn border-only-bottom border-pagenta h4 px0 py2 mr3 inline-block"
    style={{ borderBottomWidth: '3px' }}
  >
    {text}
  </a>
)

Tab.propTypes = {
  text: PropTypes.string.isRequired
}

export default Tab
