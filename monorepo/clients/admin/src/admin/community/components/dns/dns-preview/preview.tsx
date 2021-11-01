import PropTypes from 'prop-types'
import React from 'react'
import './styles.scss'


class Preview extends React.Component {
  render() {
    const { children, header } = this.props

    return (
      <div className='container-fluid'>
        {header}
        {children}
      </div>
    )
  }
}

Preview.propTypes = {
  children: PropTypes.node,
  headers: PropTypes.array
}

export default Preview
