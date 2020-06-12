import React from 'react'
import PropTypes from 'prop-types'

const Role = ({ row: { original } }) => {
  return (
    <span>
      {original.role === 2 ? 'mobilizador(a)' : 'administrador(a)'}
    </span>
  )
}

Role.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.any
  })
}

export default Role
