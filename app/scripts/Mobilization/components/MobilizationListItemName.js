import React, { PropTypes } from 'react'

const TRUNCATE_MAX_LENGTH = 60
const truncate = value => `${value.substring(0, TRUNCATE_MAX_LENGTH).trim()}...`

const MobilizationListItemName = ({ name, goal }) => (
  <div className="list-item-name px3 col col-6">
    <div className="table">
      <div className="table-cell align-middle">
        <b className="block mb1">
          {name.length <= TRUNCATE_MAX_LENGTH ? name : truncate(name)}
        </b>
        <span>
          {goal.length <= TRUNCATE_MAX_LENGTH ? goal : truncate(goal)}
        </span>
      </div>
    </div>
  </div>
)

MobilizationListItemName.propTypes = {
  name: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired
}

export default MobilizationListItemName
