import PropTypes from 'prop-types'
import React from 'react'

const CreatedAt = ({ created_at, createdAt }) => (
  <div className='created-at px3 col col-3'>
    {new Date(Date.parse(created_at || createdAt)).toLocaleString()}
  </div>
)

CreatedAt.propTypes = {
  created_at: PropTypes.string,
  createdAt: PropTypes.string
}

export default CreatedAt

const Header = () => (
  <div className='created-at-header px3 col col-2'>
    Criada em
  </div>
)
CreatedAt.Header = Header
