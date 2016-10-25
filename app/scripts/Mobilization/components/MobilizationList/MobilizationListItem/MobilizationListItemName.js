import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './scss/mobilization-list-item-name.scss'

const TRUNCATE_MAX_LENGTH = 60
const truncate = value => `${value.substring(0, TRUNCATE_MAX_LENGTH).trim()}...`

const MobilizationListItemName = ({ name, goal, className, style }) => (
  <div className={classnames('list-item-name px3 col col-5', className)} style={style}>
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
  goal: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
}

export default MobilizationListItemName
