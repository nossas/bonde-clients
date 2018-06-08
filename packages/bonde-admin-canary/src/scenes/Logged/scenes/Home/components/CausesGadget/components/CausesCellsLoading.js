import React from 'react'
import PropTypes from 'prop-types'
import { Cell, Panel } from 'bonde-styleguide'

const CausesCellsLoading = ({ cells }) => (
  Array(cells).fill('').map(() => (
    <Cell size={[3, 3, 3]}>
      <Panel loading image='' title='' description='' author='' />
    </Cell>
  ))
)

const { number } = PropTypes

CausesCellsLoading.propTypes = {
  cells: number
}

CausesCellsLoading.defaultProps = {
  cells: 4
}

export default CausesCellsLoading
