import React from 'react'
import PropTypes from 'prop-types'
import { Cell, Panel } from 'bonde-styleguide'

const CausesCells = ({ mobilizations }) => !mobilizations.length
  ? 'Nenhuma causa encontrada no período'
  : mobilizations.slice(0, 4).map(mobilization => (
    <Cell size={[3, 3]}>
      <Panel
        image={mobilization.facebook_share_image}
        title={mobilization.name}
        description={mobilization.goal}
        author={`Por ${mobilization.community_name}`}
      />
    </Cell>
  ))

const { object, number } = PropTypes

CausesCells.propTypes = {
  cells: number.isRequired,
  mobilizations: object.isRequired,
}

CausesCells.defaultProps = {
  cells: 4,
}

export default CausesCells
