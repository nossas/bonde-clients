import PropTypes from 'prop-types'
import React from 'react'
import './index.scss'


class EmptyList extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className='empty-list'>
        <div className='geometrics-container'>
          <div className='square' />
          <div className='diamond' />
          <div className='circle' />
        </div>
        {children}
      </div>
    )
  }
}

EmptyList.propTypes = {
  children: PropTypes.node
}

export default EmptyList
