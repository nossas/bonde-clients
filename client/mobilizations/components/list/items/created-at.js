import React, { PropTypes } from 'react'

const CreatedAt = ({ created_at }) => (
  <div className='created-at px3 col col-2'>
    {created_at}
  </div>
)

CreatedAt.propTypes = {
  created_at: PropTypes.string.isRequired
}

export default CreatedAt

const Header = () => (
  <div className='created-at-header px3 col col-2'>
    Criada em
  </div>
)
CreatedAt.Header = Header
