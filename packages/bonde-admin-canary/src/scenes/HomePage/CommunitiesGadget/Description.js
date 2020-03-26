import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'bonde-components'

const Description = ({ row }) => (
  <>
    <Header.h4>{row.name}</Header.h4>
    <Header.h5>{row.description || row.city}</Header.h5>
  </>
)

Description.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string
  })
}

export default Description